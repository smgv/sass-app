export type AdminFormType = {
  name: string;
  ownerName: string;
  pincode: number;
  locality: string;
  address: string;
  city: string;
  state: string;
  contactNumber: number;
  gstNumber: number;
  websiteURL: string;
  logoURL: string;
};

export type MemberEmployeeFormType = {
  fullName: string;
  role: "member" | "employee";
  pincode: number;
  locality: string;
  address: string;
  city: string;
  state: string;
  contactNumber: number;
  emergencyContactNumber: number;
  photoURL: string;
  websiteURL: string;
};

export type MemberEmployeePasswordFormType = {
  password: string;
  confirmPassword: string;
};