import React, { useRef, useCallback, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import shaadiCover from "@/assets/shaadi-cover.jpg";
import testimonialBg1 from "@/assets/testimonial-bg-1.jpg";
import testimonialBg2 from "@/assets/testimonial-bg-2.jpg";
import testimonialBg3 from "@/assets/testimonial-bg-3.jpg";
import testimonialBg4 from "@/assets/testimonial-bg-4.jpg";

const pageBgs = [testimonialBg1, testimonialBg2, testimonialBg3, testimonialBg4];

interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface BookTestimonialProps {
  testimonials: Testimonial[];
}

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => (
    <div ref={ref} className="bg-card rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  )
);
Page.displayName = "Page";

const BookTestimonial = ({ testimonials }: BookTestimonialProps) => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = testimonials.length + 2; // cover + testimonials + thank you

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const goNext = () => bookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev();

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Book */}
      <div className="perspective-[2000px]">
        {/* @ts-ignore */}
        <HTMLFlipBook
          ref={bookRef}
          width={340}
          height={440}
          size="stretch"
          minWidth={280}
          maxWidth={400}
          minHeight={360}
          maxHeight={500}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          className="shadow-2xl"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
        >
          {/* Cover Page */}
          <Page>
            <div className="h-full relative overflow-hidden">
              <img src={shaadiCover} alt="Shaadi" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-end p-8 pb-10 text-primary-foreground">
                <h3 className="font-heading text-2xl font-bold text-center mb-1 drop-shadow-lg">
                  What Families Say
                </h3>
                <p className="font-body text-sm opacity-90 text-center drop-shadow">
                  Swipe or click to read
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary-foreground/80 text-primary-foreground/80" />
                  ))}
                </div>
              </div>
            </div>
          </Page>

          {/* Testimonial Pages */}
          {testimonials.map((t, i) => (
            <Page key={i}>
              <div className="h-full relative overflow-hidden">
                <img
                  src={pageBgs[i % pageBgs.length]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative h-full flex flex-col justify-between p-8">
                  {/* Page number */}
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                    <span className="font-body text-xs text-muted-foreground">
                      {i + 1} / {testimonials.length}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="flex-1 flex items-center">
                    <p className="font-body text-base text-foreground leading-relaxed italic">
                      "{t.text}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="pt-6 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-heading text-sm font-bold text-foreground">{t.name}</div>
                        <div className="font-body text-xs text-muted-foreground">{t.location}</div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 text-accent fill-accent" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Page>
          ))}

          {/* Back Cover */}
          <Page>
            <div className="h-full bg-gradient-to-br from-accent/90 to-primary/80 flex flex-col items-center justify-center p-8 text-primary-foreground">
              <h3 className="font-heading text-2xl font-bold text-center mb-2">
                Thank You!
              </h3>
              <p className="font-body text-sm opacity-80 text-center">
                We appreciate your trust in ShaadiBio
              </p>
            </div>
          </Page>
        </HTMLFlipBook>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          onClick={goPrev}
          disabled={currentPage === 0}
          className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-body text-sm text-muted-foreground min-w-[80px] text-center">
          {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage >= totalPages - 1}
          className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default BookTestimonial;
