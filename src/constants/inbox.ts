import { InboxFormType } from "@/types/inbox";

export const INBOX_FORM_INITIAL_STATE: InboxFormType = {
  to: "",
  body: "",
  subject: "",
  allMembers: false,
  allEmployees: false,
};
