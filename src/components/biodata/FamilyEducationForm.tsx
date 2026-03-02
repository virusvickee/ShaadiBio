import { BiodataFormData } from "@/types/biodata";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface FamilyEducationFormProps {
  data: BiodataFormData;
  onChange: (field: keyof BiodataFormData, value: string | boolean) => void;
}

const FamilyEducationForm = ({ data, onChange }: FamilyEducationFormProps) => {
  return (
    <div className="space-y-8">
      {/* Education & Profession */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Education & Profession</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Education</Label>
            <Input placeholder="e.g. B.Tech in Computer Science" value={data.education} onChange={(e) => onChange("education", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Occupation</Label>
            <Input placeholder="e.g. Software Engineer" value={data.occupation} onChange={(e) => onChange("occupation", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Company</Label>
            <Input placeholder="Company name" value={data.company} onChange={(e) => onChange("company", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Annual Income</Label>
            <Input placeholder="e.g. ₹10 LPA" value={data.income} onChange={(e) => onChange("income", e.target.value)} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={data.hideIncome} onCheckedChange={(c) => onChange("hideIncome", !!c)} />
          <Label className="font-body text-sm text-muted-foreground">Hide income on biodata</Label>
        </div>
      </div>

      {/* Family Details */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Family Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Father's Name</Label>
            <Input placeholder="Father's name" value={data.fatherName} onChange={(e) => onChange("fatherName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Father's Occupation</Label>
            <Input placeholder="Father's occupation" value={data.fatherOccupation} onChange={(e) => onChange("fatherOccupation", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Mother's Name</Label>
            <Input placeholder="Mother's name" value={data.motherName} onChange={(e) => onChange("motherName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Mother's Occupation</Label>
            <Input placeholder="Mother's occupation" value={data.motherOccupation} onChange={(e) => onChange("motherOccupation", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Siblings</Label>
            <Input placeholder="e.g. 1 Elder Brother, 1 Younger Sister" value={data.siblings} onChange={(e) => onChange("siblings", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Native Place</Label>
            <Input placeholder="Native place" value={data.nativePlace} onChange={(e) => onChange("nativePlace", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyEducationForm;
