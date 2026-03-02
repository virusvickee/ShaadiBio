import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";

interface BiodataPreviewProps {
  data: BiodataFormData;
}

const calculateAge = (dob: string): string => {
  if (!dob) return "";
  const birth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return `${age} years`;
};

const Row = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <div className="flex border-b border-border/50 py-2">
      <span className="font-body text-sm text-muted-foreground w-40 shrink-0">{label}</span>
      <span className="font-body text-sm text-foreground">{value}</span>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="font-heading text-base font-semibold text-primary mb-2">{title}</h3>
    <div className="ornament-divider mb-3" />
    {children}
  </div>
);

const BiodataPreview = ({ data }: BiodataPreviewProps) => {
  const age = calculateAge(data.dateOfBirth);

  return (
    <div className="bg-card border border-gold/30 rounded-xl p-6 md:p-8 shadow-elegant max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="font-body text-xs text-accent font-semibold tracking-widest uppercase mb-2">
          ॥ श्री गणेशाय नमः ॥
        </p>
        <h2 className="font-heading text-2xl font-bold text-foreground">Biodata</h2>
        <div className="ornament-divider max-w-[120px] mx-auto mt-2" />
      </div>

      {/* Photo */}
      <div className="flex justify-center mb-6">
        {data.photoUrl ? (
          <img src={data.photoUrl} alt="Profile" className="w-28 h-28 rounded-full object-cover border-2 border-gold" />
        ) : (
          <div className="w-28 h-28 rounded-full bg-secondary flex items-center justify-center border-2 border-border">
            <User className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Name */}
      {data.fullName && (
        <h3 className="text-center font-heading text-xl font-bold text-foreground mb-6">{data.fullName}</h3>
      )}

      {/* Personal Details */}
      <Section title="Personal Details">
        <Row label="Date of Birth" value={data.dateOfBirth ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}${age ? ` (${age})` : ""}` : ""} />
        <Row label="Gender" value={data.gender} />
        <Row label="Height" value={data.height} />
        <Row label="Religion" value={data.religion} />
        <Row label="Caste" value={data.caste} />
        <Row label="Mother Tongue" value={data.motherTongue} />
        <Row label="Marital Status" value={data.maritalStatus} />
      </Section>

      {/* Education & Career */}
      {(data.education || data.occupation) && (
        <Section title="Education & Career">
          <Row label="Education" value={data.education} />
          <Row label="Occupation" value={data.occupation} />
          <Row label="Company" value={data.company} />
          {!data.hideIncome && <Row label="Annual Income" value={data.income} />}
        </Section>
      )}

      {/* Family */}
      {(data.fatherName || data.motherName) && (
        <Section title="Family Details">
          <Row label="Father" value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` (${data.fatherOccupation})` : ""}` : ""} />
          <Row label="Mother" value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` (${data.motherOccupation})` : ""}` : ""} />
          <Row label="Siblings" value={data.siblings} />
          <Row label="Native Place" value={data.nativePlace} />
        </Section>
      )}

      {/* Horoscope */}
      {(data.rashi || data.nakshatra || data.gotra) && (
        <Section title="Horoscope Details">
          <Row label="Rashi" value={data.rashi} />
          <Row label="Nakshatra" value={data.nakshatra} />
          <Row label="Gotra" value={data.gotra} />
          <Row label="Time of Birth" value={data.timeOfBirth} />
          <Row label="Place of Birth" value={data.placeOfBirth} />
        </Section>
      )}

      {/* Contact */}
      {!data.hideContact && (data.phone || data.email) && (
        <Section title="Contact Details">
          <Row label="Phone" value={data.phone} />
          <Row label="Email" value={data.email} />
          <Row label="Address" value={data.address} />
        </Section>
      )}

      {/* Watermark */}
      <div className="text-center mt-6 pt-4 border-t border-border/50">
        <p className="font-body text-[10px] text-muted-foreground/50">Created with ShaadiBio</p>
      </div>
    </div>
  );
};

export default BiodataPreview;
