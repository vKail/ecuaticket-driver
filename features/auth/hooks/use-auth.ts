import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginNextAuth } from "../helpers/next-auth-login";
import { LoginRequest } from "../types/auth-login-schema";
import { AuthApiClient } from "../api/auth.api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    const response = await AuthApiClient.getInstance().login(data);
    const result = await loginNextAuth(response);
    if (result.status === "success") {
      toast.success(result.message);
      router.push("/qr-code");
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return {
    onSubmit,
    isLoading,
  };
};
