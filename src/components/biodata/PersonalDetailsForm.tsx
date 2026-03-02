import { BiodataFormData } from "@/types/biodata";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetailsFormProps {
  data: BiodataFormData;
  onChange: (field: keyof BiodataFormData, value: string | boolean) => void;
}

const PersonalDetailsForm = ({ data, onChange }: PersonalDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Personal Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="font-body text-sm">Full Name *</Label>
          <Input
            placeholder="Enter full name"
            value={data.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Gender *</Label>
          <Select value={data.gender} onValueChange={(v) => onChange("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Date of Birth *</Label>
          <Input type="date" value={data.dateOfBirth} onChange={(e) => onChange("dateOfBirth", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Height</Label>
          <Input placeholder="e.g. 5 ft 8 in" value={data.height} onChange={(e) => onChange("height", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Religion</Label>
          <Input placeholder="e.g. Hindu" value={data.religion} onChange={(e) => onChange("religion", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Caste</Label>
          <Input placeholder="Enter caste" value={data.caste} onChange={(e) => onChange("caste", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Mother Tongue</Label>
          <Input placeholder="e.g. Hindi" value={data.motherTongue} onChange={(e) => onChange("motherTongue", e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Marital Status</Label>
          <Select value={data.maritalStatus} onValueChange={(v) => onChange("maritalStatus", v)}>
            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Never Married">Never Married</SelectItem>
              <SelectItem value="Divorced">Divorced</SelectItem>
              <SelectItem value="Widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="font-body text-sm">Nationality</Label>
          <Input placeholder="e.g. Indian" value={data.nationality} onChange={(e) => onChange("nationality", e.target.value)} />
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
