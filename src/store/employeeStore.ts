import axiosInstance from "@/api/axiosInstance";
import { defineStore } from "pinia";
// import { ref } from "vue";
import { useToastStore } from "./toastStore";
import { MemberEmployeeFormDataType } from "@/types/onboarding";
import { useRouter } from "vue-router";

const EMPLOYEE_BASE_URL = "/employee";

export const useEmployeeStore = defineStore("employee", () => {
  const toastStore = useToastStore();
  const router = useRouter();

  const getEmployee = async (token: string) => {
    try {
      const response = await axiosInstance.get(
        `${EMPLOYEE_BASE_URL}/get-details/${token}`
      );
      const { employee, status, message } = response.data;

      if (status === "success" && employee) {
        return employee;
      } else {
        toastStore.setToastMessage({ type: "failed", message });
        return null;
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Employee Get Error:", error);
      return null;
    }
  };

  const postEmployee = async (
    memberDetails: MemberEmployeeFormDataType,
    adminEmail: string
  ) => {
    try {
      const response = await axiosInstance.post(
        `${EMPLOYEE_BASE_URL}/post-details`,
        {
          ...memberDetails,
          adminEmail,
        }
      );
      const { status, message } = response.data;

      if (status === "success") {
        toastStore.setToastMessage({ type: "success", message });
        router.push("/onboarding-status");
      } else {
        toastStore.setToastMessage({ type: "failed", message });
      }
    } catch (error: any) {
      toastStore.setToastMessage({
        type: "failed",
        message: error.response.data.message as string,
      });
      console.error("Employee Post Error:", error);
    }
  };

  const getEmployeeOnboardingStatus = async (email: string) => {
    try {
      const response = await axiosInstance.post(`${EMPLOYEE_BASE_URL}/status`, {
        email,
      });
      const { status } = response.data;

      if (status === "success") {
        router.push("/onboarding-status");
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Employee Onboarding Status Error:", error);
      return null;
    }
  };

  const getAdminEmployees = async () => {
    try {
      const response = await axiosInstance.get(
        `${EMPLOYEE_BASE_URL}/admin-employee`
      );
      const { status, employeeList } = response.data;

      if (status === "success") {
        return employeeList;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Admin Member Error:", error);
      return null;
    }
  };

  return {
    getEmployee,
    getEmployeeOnboardingStatus,
    postEmployee,
    getAdminEmployees,
  };
});
