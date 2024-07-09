import {
  AdminFormPasswordType,
  AdminFormType,
  MemberEmployeeFormType,
  MemberEmployeePasswordFormType,
} from "@/types/onboarding";

export enum MEMBER_EMPLOYEE_FORM {
  EMAIL = "email",
  ONBOARDING = "onboarding",
  PASSWORD = "password",
}

export const ROLES = {
  EMPLOYEE: "Employee",
  MEMBER: "Member",
};

export const ADMIN_FORM_INITIAL_STATE: AdminFormType = {
  name: "",
  ownerName: "",
  pinCode: 0,
  locality: "",
  address: "",
  city: "",
  state: "",
  contactNumber: 0,
  gstNumber: "",
  websiteURL: "",
  logoURL: "",
};

export const ADMIN_FORM_PASSWORD_INITIAL_STATE: AdminFormPasswordType = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const MEMBER_EMPLOYEE_FORM_INITIAL_STATE: MemberEmployeeFormType = {
  fullName: "",
  role: "Member",
  pinCode: 0,
  locality: "",
  address: "",
  city: "",
  state: "",
  contactNumber: 0,
  emergencyContactNumber: 0,
  photoURL: "",
  websiteURL: "",
};

export const MEMBER_EMPLOYEE_PASSWORD_FORM_INITIAL_STATE: MemberEmployeePasswordFormType =
  {
    password: "",
    confirmPassword: "",
  };
