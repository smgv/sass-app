import axios from "axios";

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.response ? error.response.data.message : error.message;
  } else {
    return "An unexpected error occurred";
  }
};
