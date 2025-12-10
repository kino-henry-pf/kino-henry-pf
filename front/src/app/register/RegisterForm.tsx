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
    errors.name = "El nombre es obligatorio.";
  } else if (values.name.length < 3) {
    errors.name = "Debe tener al menos 3 caracteres.";
  } else if (values.name.length > 50) {
    errors.name = "Debe tener máximo 50 caracteres.";
  }

  if (!values.email) {
    errors.email = "El correo es obligatorio.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Formato de correo inválido.";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (values.password.length < 8) {
    errors.password = "Debe tener al menos 8 caracteres.";
  } else if (values.password.length > 20) {
    errors.password = "Debe tener máximo 20 caracteres.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "Debe incluir mayúscula, minúscula, número y caracter especial (!@#$%^&*).";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  if (!values.address) {
    errors.address = "La dirección es obligatoria.";
  } else if (values.address.length < 3) {
    errors.address = "Debe tener al menos 3 caracteres.";
  } else if (values.address.length > 100) {
    errors.address = "Debe tener máximo 100 caracteres.";
  }

  return errors;
};

  const handleSubmit = async (values: FormValues) => {
  try {
    const response = await registerService(values);
    console.log("Usuario registrado", response)

    toast.success("✅ Usuario registrado correctamente");

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  } catch (error: any) {
    toast.error(
      "❌ Error al registrar usuario"
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
              Registro
            </h2>

            <div>
              <Field
                type="text"
                name="name"
                placeholder="Nombre"
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
                placeholder="Contraseña"
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
                placeholder="Confirmar Contraseña"
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
                placeholder="Dirección"
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
              Registrarse
            </button>

            <p className="p-2 text-center">
              Ya tenes cuenta?{" "}
              <a className="text-blue-300" href="/login">
                Iniciar Sesión
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;