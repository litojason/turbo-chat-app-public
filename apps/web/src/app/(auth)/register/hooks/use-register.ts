import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ClientError } from "~/lib/client";
import { RegisterFormData, registerFormResolver } from "@repo/db/models/user";
import { postRegister } from "~/actions/user";

export default function useRegister() {
  const router = useRouter();

  const [registerSuccessVisible, setRegisterSuccessVisible] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: registerFormResolver,
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await postRegister(data);

      setRegisterSuccessVisible(true);
    } catch (error) {
      toast.error((error as ClientError).message);
    }
  };

  const navigateToLogin = () => {
    router.replace("/login");
  };

  return {
    form,
    onSubmit,
    isSubmitting,
    registerSuccessVisible,
    navigateToLogin,
  };
}
