import { BiodataFormData } from "@/types/biodata";
import { User } from "lucide-react";

interface MinimalistTemplateProps {
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
  return `${age} yrs`;
};

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

const MinimalistTemplate = ({ data, accentColor = "#b91c4a" }: MinimalistTemplateProps) => {
  const age = calculateAge(data.dateOfBirth);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-elegant max-w-md mx-auto">
      {/* Thin accent line */}
      <div className="h-px w-full" style={{ backgroundColor: accentColor }} />

      <div className="p-8 md:p-10">
        {/* Header — centered, minimal */}
        <div className="text-center mb-8">
          {data.photoUrl ? (
            <img
              src={data.photoUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border border-border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 border border-border">
              <User className="h-8 w-8 text-muted-foreground/30" />
            </div>
          )}
          <h2 className="font-heading text-xl font-semibold text-foreground tracking-wide">
            {data.fullName || "Your Name"}
          </h2>
          {data.occupation && (
            <p className="font-body text-xs text-muted-foreground mt-1 tracking-wide">{data.occupation}</p>
          )}
        </div>

        {/* Thin divider */}
        <div className="w-8 h-px mx-auto mb-6" style={{ backgroundColor: accentColor }} />

        {/* Personal */}
        <div>
          <Detail
            label="Born"
            value={
              data.dateOfBirth
                ? `${new Date(data.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}${age ? ` · ${age}` : ""}`
                : ""
            }
          />
          <Detail label="Gender" value={data.gender} />
          <Detail label="Height" value={data.height} />
          <Detail label="Religion" value={[data.religion, data.caste].filter(Boolean).join(" · ")} />
          <Detail label="Mother Tongue" value={data.motherTongue} />
          <Detail label="Status" value={data.maritalStatus} />
        </div>

        {/* Education & Career */}
        {(data.education || data.occupation) && (
          <>
            <SectionTitle>Career</SectionTitle>
            <Detail label="Education" value={data.education} />
            <Detail label="Work" value={[data.occupation, data.company].filter(Boolean).join(" · ")} />
            {!data.hideIncome && <Detail label="Income" value={data.income} />}
          </>
        )}

        {/* Family */}
        {(data.fatherName || data.motherName) && (
          <>
            <SectionTitle>Family</SectionTitle>
            <Detail
              label="Father"
              value={data.fatherName ? `${data.fatherName}${data.fatherOccupation ? ` · ${data.fatherOccupation}` : ""}` : ""}
            />
            <Detail
              label="Mother"
              value={data.motherName ? `${data.motherName}${data.motherOccupation ? ` · ${data.motherOccupation}` : ""}` : ""}
            />
            <Detail label="Siblings" value={data.siblings} />
            <Detail label="Native" value={data.nativePlace} />
          </>
        )}

        {/* Horoscope */}
        {(data.rashi || data.nakshatra || data.gotra) && (
          <>
            <SectionTitle>Horoscope</SectionTitle>
            <Detail label="Rashi" value={data.rashi} />
            <Detail label="Nakshatra" value={data.nakshatra} />
            <Detail label="Gotra" value={data.gotra} />
            <Detail label="Birth Time" value={data.timeOfBirth} />
            <Detail label="Birth Place" value={data.placeOfBirth} />
          </>
        )}

        {/* Contact */}
        {!data.hideContact && (data.phone || data.email) && (
          <>
            <SectionTitle>Contact</SectionTitle>
            <Detail label="Phone" value={data.phone} />
            <Detail label="Email" value={data.email} />
            {data.address && <Detail label="Address" value={data.address} />}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-3 text-center">
        <p className="font-body text-[9px] text-muted-foreground/40 tracking-widest uppercase">ShaadiBio</p>
      </div>
    </div>
  );
};

export default MinimalistTemplate;
