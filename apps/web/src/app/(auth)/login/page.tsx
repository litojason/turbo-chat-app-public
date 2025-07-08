import { Metadata } from "next";
import Link from "next/link";

import LoginForm from "./components/login-form";

export const metadata: Metadata = {
  title: "Chat App Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      <div>
        <h1>Login</h1>
        <p>Enter your email below to login to your account</p>
      </div>

      <LoginForm />

      <div>
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </div>
    </>
  );
}
