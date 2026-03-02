import { useState, useRef } from "react";
import { BiodataFormData, defaultBiodataForm } from "@/types/biodata";
import PersonalDetailsForm from "@/components/biodata/PersonalDetailsForm";
import FamilyEducationForm from "@/components/biodata/FamilyEducationForm";
import ContactHoroscopeForm from "@/components/biodata/ContactHoroscopeForm";
import BiodataPreview from "@/components/biodata/BiodataPreview";
import ModernTemplate from "@/components/biodata/ModernTemplate";
import MinimalistTemplate from "@/components/biodata/MinimalistTemplate";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/ui/StepIndicator";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Download, Palette, LayoutTemplate, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const steps = ["Personal", "Family & Education", "Contact & Horoscope"];

const accentColors = [
  { name: "Crimson", value: "#b91c4a" },
  { name: "Royal Blue", value: "#1e40af" },
  { name: "Emerald", value: "#047857" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Rose Gold", value: "#b76e79" },
  { name: "Navy", value: "#1e3a5f" },
];

const CreateBiodata = () => {
  const [formData, setFormData] = useState<BiodataFormData>(() => {
    const saved = localStorage.getItem("shaadibio_draft");
    return saved ? JSON.parse(saved) : defaultBiodataForm;
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState<"traditional" | "modern" | "minimalist">("traditional");
  const [accentColor, setAccentColor] = useState("#b91c4a");
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof BiodataFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "File too large", description: "Please upload an image under 5MB", variant: "destructive" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => handleChange("photoUrl", reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem("shaadibio_draft", JSON.stringify(formData));
    toast({ title: "Draft saved!", description: "Your biodata has been saved locally." });
  };

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
      pdf.save(`${formData.fullName || "biodata"}.pdf`);
      toast({ title: "PDF Downloaded!", description: "Your biodata PDF is ready." });
    } catch {
      toast({ title: "Error", description: "Failed to generate PDF. Please try again.", variant: "destructive" });
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-12 container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Create Your Biodata</h1>
          <p className="font-body text-muted-foreground">Fill in your details and preview in real-time</p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden flex justify-center mb-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-body text-sm border border-border"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? "Show Form" : "Show Preview"}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className={`${showPreview ? "hidden lg:block" : ""}`}>
            <div className="bg-card border border-border rounded-xl p-6">
              {/* Photo Upload */}
              <div className="mb-6">
                <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-sm font-body text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:opacity-90 file:cursor-pointer"
                />
                {formData.photoUrl && (
                  <div className="mt-3 flex items-center gap-3">
                    <img src={formData.photoUrl} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-border" />
                    <button
                      onClick={() => handleChange("photoUrl", "")}
                      className="text-xs font-body text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === 0 && <PersonalDetailsForm data={formData} onChange={handleChange} />}
                  {currentStep === 1 && <FamilyEducationForm data={formData} onChange={handleChange} />}
                  {currentStep === 2 && <ContactHoroscopeForm data={formData} onChange={handleChange} />}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-foreground font-body text-sm disabled:opacity-40 border border-border"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm disabled:opacity-40"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Preview Side */}
          <div className={`${showPreview ? "" : "hidden lg:block"} lg:sticky lg:top-20`}>
            {/* Template & Customization Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                <button
                  onClick={() => setTemplate("traditional")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors ${template === "traditional" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  Traditional
                </button>
                <button
                  onClick={() => setTemplate("modern")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors ${template === "modern" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  Modern
                </button>
                <button
                  onClick={() => setTemplate("minimalist")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-body transition-colors ${template === "minimalist" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}
                >
                  Minimalist
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-body hover:bg-secondary/80 transition-colors"
                >
                  <Save className="h-3.5 w-3.5" /> Save
                </button>
                <button
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-body hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Download className="h-3.5 w-3.5" /> {isGeneratingPdf ? "Generating..." : "PDF"}
                </button>
              </div>
            </div>

            {/* Color Picker */}
            {(template === "modern" || template === "minimalist") && (
              <div className="flex items-center gap-2 mb-4">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-body text-muted-foreground">Accent:</span>
                {accentColors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setAccentColor(c.value)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${accentColor === c.value ? "scale-125 border-foreground" : "border-transparent"}`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            )}

            {/* Preview */}
            <div ref={previewRef}>
              {template === "traditional" ? (
                <BiodataPreview data={formData} />
              ) : template === "modern" ? (
                <ModernTemplate data={formData} accentColor={accentColor} />
              ) : (
                <MinimalistTemplate data={formData} accentColor={accentColor} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBiodata;
