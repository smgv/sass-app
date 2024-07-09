export type InviteFormType = {
  email: string;
  type: "Member" | "Employee";
  classType: "Regular Class" | "Personal Training" | "N/A";
  contactNumber: number;
};

export type InviteListType = {
  email: string;
  type: "Member" | "Employee";
  classType: "Regular Class" | "Personal Training" | "N/A";
  status: "Pending" | "Accepted" | "Declined";
  _id: string;
  __v: number;
  contactNumber: number;
};
