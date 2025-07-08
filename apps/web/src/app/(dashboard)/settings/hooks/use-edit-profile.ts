import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ClientError } from "~/lib/client";
import {
  EditProfileFormData,
  editProfileFormResolver,
} from "@repo/db/models/user";
import { editProfile } from "~/actions/user";
import { useDashboardContext } from "~/context/dashboard-provider";

export default function useEditProfile() {
  const { profile, setProfile } = useDashboardContext();

  const form = useForm<EditProfileFormData>({
    resolver: editProfileFormResolver,
    defaultValues: {
      name: profile?.name || "",
      about: profile?.about || "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const updatedProfile = await editProfile(data);

      setProfile(updatedProfile);
    } catch (error) {
      toast.error((error as ClientError).message);
    }
  };

  return { form, onSubmit, isSubmitting };
}
