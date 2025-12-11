import { FormValues } from "@/app/register/RegisterForm";
import { LoginValues } from "@/app/login/LoginForm";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
            throw new Error("Registration failed");
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
            throw new Error("Login failed");
        }
    } catch (error: any) {
      throw new Error(error);
    }
}