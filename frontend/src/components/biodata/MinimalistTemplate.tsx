import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";
import { t, Language } from "@/lib/i18n";

interface MinimalistTemplateProps {
  data: BiodataFormData;
  accentColor?: string;
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
  return `${age} yrs`;
};

const MinimalistTemplate = ({ data, accentColor = "#b91c4a", showWatermark = true, language = "en" }: MinimalistTemplateProps) => {
  const age = calculateAge(data.dateOfBirth);
  const l = (key: string) => t(key, language);

  const Detail = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <div className="flex justify-between items-baseline py-2 border-b border-border/30 last:border-0">
        <span className="font-body text-xs tracking-wide text-muted-foreground uppercase">{label}</span>
        <span className="font-body text-sm text-foreground text-right max-w-[55%]">{value}</span>
      </div>
    );
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-heading text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mt-6 mb-2">
      {children}
    </h3>
  );

  return (
    <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-elegant max-w-md mx-auto">
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <p className="font-heading text-4xl font-bold text-primary/10 -rotate-45 select-none whitespace-nowrap">
            ShaadiBio
          </p>
        </div>
      )}

      <div className="h-px w-full" style={{ backgroundColor: accentColor }} />

      <div className="p-8 md:p-10">
        <div className="text-center mb-8">
          {data.photoUrl ? (
            <img src={data.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border border-border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 border border-border">
              <User className="h-8 w-8 text-muted-foreground/30" />
            </div>
          )}
          <h2 className="font-heading text-xl font-semibold text-foreground tracking-wide">{data.fullName || "Your Name"}</h2>
          {data.occupation && <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">{data.occupation}</p>}
        </div>

        <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: accentColor }} />

        <div>
          <Detail label={l("born")} value={data.dateOfBirth ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}${age ? ` · ${age}` : ""}` : ""} />
          <Detail label={l("gender")} value={data.gender} />
          <Detail label={l("height")} value={data.height} />
          <Detail label={l("religion")} value={[data.religion, data.caste].filter(Boolean).join(" · ")} />
          <Detail label={l("mother_tongue")} value={data.motherTongue} />
          <Detail label={l("status")} value={data.maritalStatus} />
          <Detail label={l("nationality")} value={data.nationality} />
        </div>

        {(data.education || data.occupation) && (
          <>
            <SectionTitle>{l("career")}</SectionTitle>
            <Detail label={l("education")} value={data.education} />
            <Detail label={l("work")} value={[data.occupation, data.company].filter(Boolean).join(" · ")} />
            {!data.hideIncome && <Detail label={l("income")} value={data.income} />}
          </>
        )}

        {(data.fatherName || data.motherName) && (
          <>
            <SectionTitle>{l("family")}</SectionTitle>
            <Detail label={l("father")} value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` · ${data.fatherOccupation}` : ""}` : ""} />
            <Detail label={l("mother")} value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` · ${data.motherOccupation}` : ""}` : ""} />
            <Detail label={l("siblings")} value={data.siblings} />
            <Detail label={l("family_type")} value={data.familyType} />
            <Detail label={l("family_status")} value={data.familyStatus} />
            <Detail label={l("native")} value={data.nativePlace} />
          </>
        )}

        {(data.rashi || data.nakshatra || data.gotra) && (
          <>
            <SectionTitle>{l("horoscope")}</SectionTitle>
            <Detail label={l("rashi")} value={data.rashi} />
            <Detail label={l("nakshatra")} value={data.nakshatra} />
            <Detail label={l("gotra")} value={data.gotra} />
            <Detail label={l("birth_time")} value={data.timeOfBirth} />
            <Detail label={l("birth_place")} value={data.placeOfBirth} />
          </>
        )}

        {!data.hideContact && (data.phone || data.email) && (
          <>
            <SectionTitle>{l("contact")}</SectionTitle>
            <Detail label={l("phone")} value={data.phone} />
            <Detail label={l("email")} value={data.email} />
            {data.address && <Detail label={l("address")} value={data.address} />}
          </>
        )}
      </div>

      <div className="px-8 py-3 text-center">
        <p className="font-body text-[9px] text-muted-foreground/40 tracking-widest uppercase">{l("created_with")}</p>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
