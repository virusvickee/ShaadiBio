import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Pdf from '../models/Pdf';
import { AppError } from '../middleware/error.middleware';

const PDF_STORAGE_PATH = process.env.PDF_STORAGE_PATH || './uploads/pdfs';

// Ensure PDF directory exists
if (!fs.existsSync(PDF_STORAGE_PATH)) {
  fs.mkdirSync(PDF_STORAGE_PATH, { recursive: true });
}

export const generatePdf = async (
  biodataId: string,
  htmlContent: string,
  hasWatermark: boolean = true
) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    
    // Add watermark if needed
    let finalHtml = htmlContent;
    if (hasWatermark) {
      finalHtml = addWatermark(htmlContent);
    }

    await page.setContent(finalHtml, { waitUntil: 'networkidle0' });

    const filename = `biodata-${biodataId}-${Date.now()}.pdf`;
    const filepath = path.join(PDF_STORAGE_PATH, filename);

    await page.pdf({
      path: filepath,
      format: 'A4',
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
    });

    await browser.close();

    // Save PDF record
    const pdfUrl = `/uploads/pdfs/${filename}`;
    const pdf = await Pdf.create({
      biodataId,
      url: pdfUrl,
      hasWatermark,
      downloadCount: 0
    });

    return pdf;
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new AppError('Failed to generate PDF', 500);
  }
};

const addWatermark = (html: string): string => {
  const watermarkStyle = `
    <style>
      body::before {
        content: 'WATERMARK';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 100px;
        color: rgba(0, 0, 0, 0.1);
        z-index: -1;
        pointer-events: none;
      }
    </style>
  `;
  
  return html.replace('</head>', `${watermarkStyle}</head>`);
};

export const downloadPdf = async (pdfId: string, biodataId: string) => {
  const pdf = await Pdf.findOne({ _id: pdfId, biodataId });

  if (!pdf) {
    throw new AppError('PDF not found', 404);
  }

  // Increment download count
  pdf.downloadCount += 1;
  await pdf.save();

  const filepath = path.join(PDF_STORAGE_PATH, path.basename(pdf.url));
  
  if (!fs.existsSync(filepath)) {
    throw new AppError('PDF file not found', 404);
  }

  return filepath;
};

export const getPdfs = async (biodataId: string) => {
  return await Pdf.find({ biodataId }).sort({ generatedAt: -1 });
};
