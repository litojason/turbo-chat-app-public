import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ClientError } from "~/lib/client";
import { LoginFormData, loginFormResolver } from "@repo/db/models/user";
import { postLogin } from "~/actions/user";

export default function useLogin() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: loginFormResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: LoginFormData) => {
    try {
      await postLogin(data);

      router.replace("/chats");
    } catch (error) {
      toast.error((error as ClientError).message);
    }
  };

  return { form, onSubmit, isSubmitting };
}
