import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";
import { t, Language } from "@/lib/i18n";

interface ModernTemplateProps {
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
  return `${age} years`;
};

const ModernTemplate = ({ data, accentColor = "#b91c4a", showWatermark = true, language = "en" }: ModernTemplateProps) => {
  const age = calculateAge(data.dateOfBirth);
  const l = (key: string) => t(key, language);

  const InfoItem = ({ label, value }: { label: string; value: string }) => {
    if (!value) return null;
    return (
      <div className="py-1.5">
        <span className="font-body text-[11px] uppercase tracking-wider text-muted-foreground block">{label}</span>
        <span className="font-body text-sm text-foreground font-medium">{value}</span>
      </div>
    );
  };

  return (
    <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-elegant max-w-md mx-auto">
      {showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <p className="font-heading text-4xl font-bold text-primary/10 -rotate-45 select-none whitespace-nowrap">
            ShaadiBio
          </p>
        </div>
      )}

      <div className="h-3 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }} />

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-5 mb-8">
          <div className="shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Profile" className="w-24 h-24 rounded-2xl object-cover border-2" style={{ borderColor: accentColor }} />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center border-2 border-border">
                <User className="h-10 w-10 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">{data.fullName || "Your Name"}</h2>
            {data.occupation && <p className="font-body text-sm text-muted-foreground mt-1">{data.occupation}</p>}
            {data.religion && (
              <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-body font-medium" style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
                {data.religion}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6">
          <InfoItem label={l("date_of_birth")} value={data.dateOfBirth ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}${age ? ` (${age})` : ""}` : ""} />
          <InfoItem label={l("gender")} value={data.gender} />
          <InfoItem label={l("height")} value={data.height} />
          <InfoItem label={l("marital_status")} value={data.maritalStatus} />
          <InfoItem label={l("caste")} value={data.caste} />
          <InfoItem label={l("mother_tongue")} value={data.motherTongue} />
          <InfoItem label={l("nationality")} value={data.nationality} />
        </div>

        {(data.education || data.occupation) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">{l("education_career")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label={l("education")} value={data.education} />
              <InfoItem label={l("company")} value={data.company} />
              {!data.hideIncome && <InfoItem label={l("income")} value={data.income} />}
            </div>
          </>
        )}

        {(data.fatherName || data.motherName) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">{l("family")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label={l("father")} value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` (${data.fatherOccupation})` : ""}` : ""} />
              <InfoItem label={l("mother")} value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` (${data.motherOccupation})` : ""}` : ""} />
              <InfoItem label={l("siblings")} value={data.siblings} />
              <InfoItem label={l("family_type")} value={data.familyType} />
              <InfoItem label={l("family_status")} value={data.familyStatus} />
              <InfoItem label={l("native_place")} value={data.nativePlace} />
            </div>
          </>
        )}

        {(data.rashi || data.nakshatra || data.gotra) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">{l("horoscope")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label={l("rashi")} value={data.rashi} />
              <InfoItem label={l("nakshatra")} value={data.nakshatra} />
              <InfoItem label={l("gotra")} value={data.gotra} />
              <InfoItem label={l("birth_time")} value={data.timeOfBirth} />
              <InfoItem label={l("birth_place")} value={data.placeOfBirth} />
            </div>
          </>
        )}

        {!data.hideContact && (data.phone || data.email) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">{l("contact")}</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 pl-4">
              <InfoItem label={l("phone")} value={data.phone} />
              <InfoItem label={l("email")} value={data.email} />
              {data.address && <div className="col-span-2"><InfoItem label={l("address")} value={data.address} /></div>}
            </div>
          </>
        )}
      </div>

      <div className="px-6 py-3 border-t border-border/50 text-center">
        <p className="font-body text-[10px] text-muted-foreground/50">{l("created_with")}</p>
      </div>
    </div>
  );
};

export default ModernTemplate;
