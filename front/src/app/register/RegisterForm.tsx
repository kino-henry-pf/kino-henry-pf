"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import Image from "next/image";
import KinoLogo from "@/../public/logo.png";

export interface FormValues {
  name: string;
  email: string;
  password: string;
  address: string;
}

const RegisterForm: React.FC = () => {
  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    address: '',
  };

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.name) {
      errors.name = "El nombre es obligatorio.";
    } else if (values.name.length < 3) {
      errors.name = "Debe tener al menos 3 caracteres.";
    }

    if (!values.email) {
      errors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Formato de correo inválido.";
    }

    if (!values.password) {
      errors.password = "La contraseña es obligatoria.";
    } else if (values.password.length < 6) {
      errors.password = "Debe tener al menos 6 caracteres.";
    }

    if (!values.address) {
      errors.address = "La dirección es obligatoria.";
    }

    return errors;
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
        onSubmit={(values, { resetForm }) => {
          console.log("Valores enviados:", values);
          alert("Usuario registrado con exito!!!");

          resetForm(); 
          window.location.href = "/login";
        }}
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
              className="w-full bg-[#F3CC63] hover:bg-[#f6d783] transition p-2 rounded font-semibold text-black"
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