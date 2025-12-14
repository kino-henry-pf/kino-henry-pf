'use client';

import Image from "next/image";
import KinoLogo from "@/../public/logo.png";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { loginService } from "@/services/userService";
import { useAuth } from "@/context/authContext";
import { useEffect } from "react";
import toast from "react-hot-toast";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginValues {
  email: string;
  password: string;
}

function LoginForm() {
  const { setDataUser, dataUser } = useAuth();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const validate = (values: LoginValues) => {
    const errors: Partial<LoginValues> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Invalid email format.";
    }

    if (!values.password) {
      errors.password = "A password is required.";
    }

    return errors;
  };

  const handleSubmit = async (values: LoginValues) => {
    try {
      const response = await loginService(values);
      setDataUser(response);
      console.log('Logged in user', response);
      toast.success("✅ User logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
        toast.error(
        "❌ Error logging in user"
      );
    }
  }; 

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("userSession");

    setDataUser(dataUser);
    localStorage.setItem("userSession", JSON.stringify(dataUser));
}, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#121212]">
      <Image
        src={KinoLogo}
        alt="Kino Logo"
        width={200}
        height={100}
        priority
        className="mb-6"
      />

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white/3 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
              Login
            </h2>

            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 rounded bg-[#3d3c3c] text-white"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            <div>
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 rounded bg-[#3d3c3c] text-white"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F3CC63] hover:bg-[#f6d783] transition p-2 rounded font-semibold text-black cursor-pointer"
            >
              Login
            </button>

            <p className="p-2">
              Don't you have an account?{" "}
              <a className="text-blue-300 text-center" href="/register">
                Create Account
              </a>
            </p>

            <a
              href={`${API_URL}/auth/login?provider=google`}
              className="mx-auto mt-4 block"
            >
              <img 
                className="w-10 h-10 rounded-full cursor-pointer shadow-lg" 
                src="https://play-lh.googleusercontent.com/NN8G4Xc03GSv2_Tu-icuoeOwSo1xoZ4ouzUl24fVlwm5OeIAo7gV0zS1dVRWgCay-BU" 
                alt="Google"
              />
            </a>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;