"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import Image from "next/image";
import KinoLogo from "@/../public/logo.png";
import { registerService } from "@/services/userService";
import toast from "react-hot-toast";

export interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}

const RegisterForm: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  };

  const validate = (values: FormValues) => {
  const errors: Partial<FormValues> = {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

  if (!values.name) {
    errors.name = "The name is required.";
  } else if (values.name.length < 3) {
    errors.name = "It must have at least 3 characters.";
  } else if (values.name.length > 50) {
    errors.name = "It must have a maximum of 50 characters.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email format.";
  }

  if (!values.password) {
    errors.password = "A password is required.";
  } else if (values.password.length < 8) {
    errors.password = "It must have at least 8 characters.";
  } else if (values.password.length > 20) {
    errors.password = "It must have a maximum of 20 characters.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "It must include uppercase letters, lowercase letters, numbers, and special characters (!@#$%^&*).";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "You must confirm the password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "The passwords do not match.";
  }

  if (!values.address) {
    errors.address = "The address is required.";
  } else if (values.address.length < 3) {
    errors.address = "It must have at least 3 characters.";
  } else if (values.address.length > 100) {
    errors.address = "It must have a maximum of 100 characters.";
  }

  return errors;
};

  const handleSubmit = async (values: FormValues) => {
  try {
    const response = await registerService(values);
    console.log("Registered user", response)

    toast.success("✅ User successfully registered");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error: any) {
    toast.error(
      "❌ Error registering user"
    );
  }
};
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
        {({ isSubmitting }: FormikProps<FormValues>) => (
          <Form className="bg-white/3 p-8 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-white">
              Register
            </h2>

            <div>
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full p-2 rounded bg-[#3d3c3c] text-white"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

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

            {/* NUEVO INPUT CONFIRM PASSWORD */}
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 rounded bg-[#3d3c3c] text-white"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            <div>
              <Field
                type="text"
                name="address"
                placeholder="Address"
                className="w-full p-2 rounded bg-[#3d3c3c] text-white"
              />
              <ErrorMessage
                name="address"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#F3CC63] hover:bg-[#f6d783] transition p-2 rounded font-semibold text-black cursor-pointer"
            >
              Register
            </button>

            <p className="p-2 text-center">
              Do you already have an account?{" "}
              <a className="text-blue-300" href="/login">
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;