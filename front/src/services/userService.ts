import { FormValues } from "@/app/register/RegisterForm";
import { LoginValues } from "@/app/login/LoginForm";

const API_URL = process.env.API_URL;

export async function registerService(userData: FormValues) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    if (response.ok) {
            return response.json();
        } else {
            alert("No pudimos registrarte con exito");
            throw new Error("Registro fallido");
        }
    } catch (error: any) {
      throw new Error(error);
    }
}

export async function loginService(userData: LoginValues) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData)
    });
    if (response.ok) {
            return response.json();
        } else {
            alert("No pudimos loguearte con exito");
            throw new Error("Logueo fallido");
        }
    } catch (error: any) {
      throw new Error(error);
    }
}