import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";
import { t, Language } from "@/lib/i18n";

interface BiodataPreviewProps {
  data: BiodataFormData;
  showWatermark?: boolean;
  language?: Language;
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

const BiodataPreview = ({ data, showWatermark = true, language = "en" }: BiodataPreviewProps) => {
  const age = calculateAge(data.dateOfBirth);
  const l = (key: string) => t(key, language);

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

  return (
    <div className="relative bg-card border border-gold/30 rounded-xl p-6 md:p-8 shadow-elegant max-w-md mx-auto overflow-hidden">
      {/* Watermark */}
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <p className="font-heading text-4xl font-bold text-primary/10 -rotate-45 select-none whitespace-nowrap">
            ShaadiBio
          </p>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <p className="font-body text-xs text-accent font-semibold tracking-widest uppercase mb-2">
          {l("invocation")}
        </p>
        <h2 className="font-heading text-2xl font-bold text-foreground">{l("biodata")}</h2>
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

      {data.fullName && (
        <h3 className="text-center font-heading text-xl font-bold text-foreground mb-6">{data.fullName}</h3>
      )}

      <Section title={l("personal_details")}>
        <Row label={l("date_of_birth")} value={data.dateOfBirth ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}${age ? ` (${age})` : ""}` : ""} />
        <Row label={l("gender")} value={data.gender} />
        <Row label={l("height")} value={data.height} />
        <Row label={l("religion")} value={data.religion} />
        <Row label={l("caste")} value={data.caste} />
        <Row label={l("mother_tongue")} value={data.motherTongue} />
        <Row label={l("marital_status")} value={data.maritalStatus} />
        <Row label={l("nationality")} value={data.nationality} />
      </Section>

      {(data.education || data.occupation) && (
        <Section title={l("education_career")}>
          <Row label={l("education")} value={data.education} />
          <Row label={l("occupation")} value={data.occupation} />
          <Row label={l("company")} value={data.company} />
          {!data.hideIncome && <Row label={l("annual_income")} value={data.income} />}
        </Section>
      )}

      {(data.fatherName || data.motherName) && (
        <Section title={l("family_details")}>
          <Row label={l("father")} value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` (${data.fatherOccupation})` : ""}` : ""} />
          <Row label={l("mother")} value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` (${data.motherOccupation})` : ""}` : ""} />
          <Row label={l("siblings")} value={data.siblings} />
          <Row label={l("family_type")} value={data.familyType} />
          <Row label={l("family_status")} value={data.familyStatus} />
          <Row label={l("native_place")} value={data.nativePlace} />
        </Section>
      )}

      {(data.rashi || data.nakshatra || data.gotra) && (
        <Section title={l("horoscope_details")}>
          <Row label={l("rashi")} value={data.rashi} />
          <Row label={l("nakshatra")} value={data.nakshatra} />
          <Row label={l("gotra")} value={data.gotra} />
          <Row label={l("time_of_birth")} value={data.timeOfBirth} />
          <Row label={l("place_of_birth")} value={data.placeOfBirth} />
        </Section>
      )}

      {!data.hideContact && (data.phone || data.email) && (
        <Section title={l("contact_details")}>
          <Row label={l("phone")} value={data.phone} />
          <Row label={l("email")} value={data.email} />
          <Row label={l("address")} value={data.address} />
        </Section>
      )}

      <div className="text-center mt-6 pt-4 border-t border-border/50">
        <p className="font-body text-[10px] text-muted-foreground/50">{l("created_with")}</p>
      </div>
    </div>
  );
};

export default BiodataPreview;
