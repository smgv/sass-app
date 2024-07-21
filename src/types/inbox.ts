export type InboxFormType = {
  to: string;
  body: string;
  subject: string;
  allMembers: boolean;
  allEmployees: boolean;
};

export type InboxListType = {
  _id: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  allMembers: boolean;
  allEmployees: boolean;
  __v: number;
};
