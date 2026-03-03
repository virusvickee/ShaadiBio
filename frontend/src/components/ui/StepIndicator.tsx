import { motion } from "framer-motion";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((step, idx) => (
        <div key={step} className="flex items-center">
          <button
            onClick={() => onStepClick(idx)}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-body transition-all"
          >
            {/* Active background */}
            {idx === currentStep && (
              <motion.div
                layoutId="activeStep"
                className="absolute inset-0 bg-primary rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                idx === currentStep
                  ? "bg-primary-foreground/20 text-primary-foreground"
                  : idx < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {idx < currentStep ? "✓" : idx + 1}
            </span>
            <span
              className={`relative z-10 hidden sm:inline transition-colors ${
                idx === currentStep
                  ? "text-primary-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </button>
          {idx < steps.length - 1 && (
            <div
              className={`w-8 h-0.5 mx-1 rounded-full transition-colors ${
                idx < currentStep ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
