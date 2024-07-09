export type AdminFormType = {
  _id?: string;
  name: string;
  ownerName: string;
  pinCode: number;
  locality: string;
  address: string;
  city: string;
  state: string;
  contactNumber: number;
  gstNumber: string;
  websiteURL: string;
  logoURL: string;
};

export type MemberEmployeeFormType = {
  fullName: string;
  role: "Member" | "Employee";
  pinCode: number;
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

export type AdminFormPasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export interface MemberEmployeeFormDataType extends MemberEmployeeFormType {
  email: string;
  password: string;
  classType?: string;
}

export interface AdminMemberEmployeeFormDataType {
  _id: string;
  fullName: string;
  role: "Employee" | "Member";
  email: string;
  password: string;
  contactNumber: number;
  emergencyContactNumber: number;
  address: string;
  locality: string;
  pinCode: number;
  city: string;
  state: string;
  photoURL: string;
  websiteURL: string;
  classType?: string;
  __v: number;
}
