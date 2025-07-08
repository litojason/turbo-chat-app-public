"use client";

import { Form } from "@repo/ui/components/ui/form";
import InputField from "@repo/ui/components/control-field/input-field";
import ButtonLoading from "@repo/ui/components/button/button-loading";
import useLogin from "../hooks/use-login";

export default function LoginForm() {
  const { form, onSubmit, isSubmitting } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="eg. test@gmail.com"
        />

        <InputField
          control={form.control}
          type="password"
          name="password"
          label="Password"
          placeholder="eg. pass1234"
        />

        <ButtonLoading type="submit" className="w-full" loading={isSubmitting}>
          Login
        </ButtonLoading>
      </form>
    </Form>
  );
}
