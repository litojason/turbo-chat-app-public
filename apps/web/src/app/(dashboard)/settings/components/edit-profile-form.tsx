import { Form } from "@repo/ui/components/ui/form";
import InputField from "@repo/ui/components/control-field/input-field";
import ButtonLoading from "@repo/ui/components/button/button-loading";
import useEditProfile from "../hooks/use-edit-profile";

export default function EditProfileForm() {
  const { form, onSubmit, isSubmitting } = useEditProfile();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          control={form.control}
          name="name"
          label="Name"
          placeholder="eg. John Doe"
        />

        <InputField
          control={form.control}
          name="about"
          label="About"
          placeholder="eq. Hi, let's start chatting"
        />

        <ButtonLoading type="submit" className="w-full" loading={isSubmitting}>
          Update
        </ButtonLoading>
      </form>
    </Form>
  );
}
