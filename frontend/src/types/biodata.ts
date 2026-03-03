export interface BiodataFormData {
  // Personal Details
  fullName: string;
  gender: string;
  dateOfBirth: string;
  height: string;
  religion: string;
  caste: string;
  motherTongue: string;
  maritalStatus: string;
  nationality: string;

  // Contact Details
  phone: string;
  email: string;
  address: string;
  hideContact: boolean;

  // Education & Profession
  education: string;
  occupation: string;
  company: string;
  income: string;
  hideIncome: boolean;

  // Family Details
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  familyStatus: string;
  nativePlace: string;

  // Horoscope Details
  rashi: string;
  nakshatra: string;
  gotra: string;
  timeOfBirth: string;
  placeOfBirth: string;

  // Photo
  photoUrl: string;
}

export const defaultBiodataForm: BiodataFormData = {
  fullName: "",
  gender: "",
  dateOfBirth: "",
  height: "",
  religion: "",
  caste: "",
  motherTongue: "",
  maritalStatus: "",
  nationality: "Indian",
  phone: "",
  email: "",
  address: "",
  hideContact: false,
  education: "",
  occupation: "",
  company: "",
  income: "",
  hideIncome: false,
  fatherName: "",
  fatherOccupation: "",
  motherName: "",
  motherOccupation: "",
  siblings: "",
  familyType: "",
  familyStatus: "",
  nativePlace: "",
  rashi: "",
  nakshatra: "",
  gotra: "",
  timeOfBirth: "",
  placeOfBirth: "",
  photoUrl: "",
};
