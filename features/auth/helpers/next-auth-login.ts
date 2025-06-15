import { signIn as signInClient } from "next-auth/react"; // Importa la versión del cliente
import { LoginResponse } from "../types/login.interface";

export const loginNextAuth = async (params: LoginResponse) => {
  try {
    await signInClient("credentials", {
      id: params.user.id,
      name: params.user.person.name,
      surname: params.user.person.surname,
      dni: params.user.person.dni,
      email: params.user.person.email,
      username: params.user.username,
      password: params.user.password,
      role: params.user.role,
      accessToken: params.token,
      redirect: false,
    });
    return { status: "success", message: "Inicio de sesión exitoso" };
  } catch (error) {
    console.error("Login failed:", error);
    return { status: "error", message: "Error en el inicio de sesión" };
  }
};
