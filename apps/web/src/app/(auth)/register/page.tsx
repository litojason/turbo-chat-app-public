import { Metadata } from "next";
import Link from "next/link";

import RegisterForm from "./components/register-form";

export const metadata: Metadata = {
  title: "Chat App Register",
  description: "Register new account to start chatting.",
};

export default function RegisterPage() {
  return (
    <>
      <div>
        <h1>Register</h1>
        <p>Enter your credentials below to register new account</p>
      </div>

      <RegisterForm />

      <div>
        Already have an account?{" "}
        <Link href="/login" replace className="text-primary">
          Login
        </Link>
      </div>
    </>
  );
}
