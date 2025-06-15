"use client";
import React from "react";
import { useLogin } from "../../hooks/use-auth";
import { LoginForm } from "../components/login-form";
import Image from "next/image";

export const LoginView: React.FC = () => {
  const login = useLogin();

  return (
    <>
      <div className="min-h-screen flex">
        {/* Lado izquierdo - Solo visible en desktop */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 relative bg-gray-50">
          <div className="text-center z-10">
            <div className="mb-8">
              <Image
                src="/logo_ecuaticket.webp"
                alt="Ecuatickets Bus Logo"
                width={400}
                height={300}
                className="mx-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Lado derecho - Formulario */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 lg:p-8 relative z-10 bg-white lg:bg-gray-50">
          {/* Título solo visible en desktop */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">
              Bienvenido a Ecuatickets
            </h2>
            <p className="text-lg text-gray-500">Inicio de sesión</p>
          </div>

          {/* En móvil, el título está dentro del LoginForm */}
          <LoginForm />
        </div>
      </div>
    </>
  );
};
