import { BiodataFormData } from "@/types/biodata";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

interface ContactHoroscopeFormProps {
  data: BiodataFormData;
  onChange: (field: keyof BiodataFormData, value: string | boolean) => void;
}

const ContactHoroscopeForm = ({ data, onChange }: ContactHoroscopeFormProps) => {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Phone</Label>
            <Input placeholder="Phone number" value={data.phone} onChange={(e) => onChange("phone", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Email</Label>
            <Input type="email" placeholder="Email address" value={data.email} onChange={(e) => onChange("email", e.target.value)} />
          </div>
          <div className="md:col-span-2 space-y-1.5">
            <Label className="font-body text-sm">Address</Label>
            <Textarea placeholder="Full address" value={data.address} onChange={(e) => onChange("address", e.target.value)} rows={2} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={data.hideContact} onCheckedChange={(c) => onChange("hideContact", !!c)} />
          <Label className="font-body text-sm text-muted-foreground">Hide contact details on biodata</Label>
        </div>
      </div>

      {/* Horoscope Details */}
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-semibold text-foreground">Horoscope Details <span className="text-muted-foreground text-sm font-body font-normal">(Optional)</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Rashi</Label>
            <Input placeholder="e.g. Mesha" value={data.rashi} onChange={(e) => onChange("rashi", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Nakshatra</Label>
            <Input placeholder="e.g. Ashwini" value={data.nakshatra} onChange={(e) => onChange("nakshatra", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Gotra</Label>
            <Input placeholder="Gotra" value={data.gotra} onChange={(e) => onChange("gotra", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Time of Birth</Label>
            <Input type="time" value={data.timeOfBirth} onChange={(e) => onChange("timeOfBirth", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="font-body text-sm">Place of Birth</Label>
            <Input placeholder="Place of birth" value={data.placeOfBirth} onChange={(e) => onChange("placeOfBirth", e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactHoroscopeForm;
