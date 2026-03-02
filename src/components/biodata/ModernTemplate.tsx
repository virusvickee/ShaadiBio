import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";

interface ModernTemplateProps {
  data: BiodataFormData;
  accentColor?: string;
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

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;
  return (
    <div className="py-1.5">
      <span className="font-body text-[11px] uppercase tracking-wider text-muted-foreground block">{label}</span>
      <span className="font-body text-sm text-foreground font-medium">{value}</span>
    </div>
  );
};

const ModernTemplate = ({ data, accentColor = "#b91c4a" }: ModernTemplateProps) => {
  const age = calculateAge(data.dateOfBirth);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-elegant max-w-md mx-auto">
      {/* Top Banner */}
      <div
        className="h-3 w-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)` }}
      />

      <div className="p-6 md:p-8">
        {/* Header with Photo */}
        <div className="flex items-center gap-5 mb-8">
          <div className="shrink-0">
            {data.photoUrl ? (
              <img
                src={data.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-2xl object-cover border-2"
                style={{ borderColor: accentColor }}
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center border-2 border-border">
                <User className="h-10 w-10 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground leading-tight">
              {data.fullName || "Your Name"}
            </h2>
            {data.occupation && (
              <p className="font-body text-sm text-muted-foreground mt-1">{data.occupation}</p>
            )}
            {data.religion && (
              <span
                className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-body font-medium"
                style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
              >
                {data.religion}
              </span>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6">
          <InfoItem label="Date of Birth" value={data.dateOfBirth ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}${age ? ` (${age})` : ""}` : ""} />
          <InfoItem label="Gender" value={data.gender} />
          <InfoItem label="Height" value={data.height} />
          <InfoItem label="Marital Status" value={data.maritalStatus} />
          <InfoItem label="Caste" value={data.caste} />
          <InfoItem label="Mother Tongue" value={data.motherTongue} />
        </div>

        {/* Education */}
        {(data.education || data.occupation) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">Education & Career</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label="Education" value={data.education} />
              <InfoItem label="Company" value={data.company} />
              {!data.hideIncome && <InfoItem label="Income" value={data.income} />}
            </div>
          </>
        )}

        {/* Family */}
        {(data.fatherName || data.motherName) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">Family</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label="Father" value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` (${data.fatherOccupation})` : ""}` : ""} />
              <InfoItem label="Mother" value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` (${data.motherOccupation})` : ""}` : ""} />
              <InfoItem label="Siblings" value={data.siblings} />
              <InfoItem label="Native Place" value={data.nativePlace} />
            </div>
          </>
        )}

        {/* Horoscope */}
        {(data.rashi || data.nakshatra || data.gotra) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">Horoscope</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-6 pl-4">
              <InfoItem label="Rashi" value={data.rashi} />
              <InfoItem label="Nakshatra" value={data.nakshatra} />
              <InfoItem label="Gotra" value={data.gotra} />
              <InfoItem label="Birth Time" value={data.timeOfBirth} />
              <InfoItem label="Birth Place" value={data.placeOfBirth} />
            </div>
          </>
        )}

        {/* Contact */}
        {!data.hideContact && (data.phone || data.email) && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="font-heading text-sm font-semibold text-foreground">Contact</h3>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 pl-4">
              <InfoItem label="Phone" value={data.phone} />
              <InfoItem label="Email" value={data.email} />
              {data.address && <div className="col-span-2"><InfoItem label="Address" value={data.address} /></div>}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-border/50 text-center">
        <p className="font-body text-[10px] text-muted-foreground/50">Created with ShaadiBio</p>
      </div>
    </div>
  );
};

export default ModernTemplate;
