import { useState } from "react";
import { BiodataFormData, defaultBiodataForm } from "@/types/biodata";
import PersonalDetailsForm from "@/components/biodata/PersonalDetailsForm";
import FamilyEducationForm from "@/components/biodata/FamilyEducationForm";
import ContactHoroscopeForm from "@/components/biodata/ContactHoroscopeForm";
import BiodataPreview from "@/components/biodata/BiodataPreview";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";

const steps = ["Personal", "Family & Education", "Contact & Horoscope"];

const CreateBiodata = () => {
  const [formData, setFormData] = useState<BiodataFormData>(defaultBiodataForm);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (field: keyof BiodataFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => handleChange("photoUrl", reader.result as string);
      reader.readAsDataURL(file);
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

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, idx) => (
            <button
              key={step}
              onClick={() => setCurrentStep(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-body transition-colors ${
                idx === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-background/20 flex items-center justify-center text-xs font-semibold">
                {idx + 1}
              </span>
              <span className="hidden sm:inline">{step}</span>
            </button>
          ))}
        </div>

        {/* Mobile Preview Toggle */}
        <div className="lg:hidden flex justify-center mb-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground font-body text-sm"
          >
            {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreview ? "Show Form" : "Show Preview"}
          </button>
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
              </div>

              {currentStep === 0 && <PersonalDetailsForm data={formData} onChange={handleChange} />}
              {currentStep === 1 && <FamilyEducationForm data={formData} onChange={handleChange} />}
              {currentStep === 2 && <ContactHoroscopeForm data={formData} onChange={handleChange} />}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground font-body text-sm disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep === steps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm disabled:opacity-40"
                >
                  Next <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className={`${showPreview ? "" : "hidden lg:block"} lg:sticky lg:top-20`}>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4 text-center">Live Preview</h2>
            <BiodataPreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBiodata;
