export const TOAST_TYPES = {
  SUCCESS: "success",
  WARNING: "warning",
  FAILED: "failed",
  INFO: "info",
} as const;

export type ToastMessage = {
  type?: (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];
  message: string;
};
