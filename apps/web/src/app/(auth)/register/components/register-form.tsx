"use client";

import RegisterSuccessDialog from "./register-success-dialog";
import useRegister from "../hooks/use-register";
import { Form } from "@repo/ui/components/ui/form";
import InputField from "@repo/ui/components/control-field/input-field";
import ButtonLoading from "@repo/ui/components/button/button-loading";

export default function RegisterForm() {
  const {
    form,
    onSubmit,
    isSubmitting,
    registerSuccessVisible,
    navigateToLogin,
  } = useRegister();

  return (
    <>
      <RegisterSuccessDialog
        visible={registerSuccessVisible}
        onButtonPress={navigateToLogin}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            control={form.control}
            name="name"
            label="Name"
            placeholder="eg. John Doe"
            description="* Minimum 2 characters"
          />

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
            description="* Minimum 6 characters long."
          />

          <InputField
            control={form.control}
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="eg. pass1234"
          />

          <ButtonLoading
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            Register
          </ButtonLoading>
        </form>
      </Form>
    </>
  );
}
