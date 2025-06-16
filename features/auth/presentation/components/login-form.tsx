"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  LoginRequest,
  loginSchema,
} from "@/features/auth/types/auth-login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "../../hooks/use-auth";
import Image from "next/image";

export const LoginForm: React.FC = () => {
  const { onSubmit, isLoading } = useLogin();
  const methods = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = (data: LoginRequest) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full max-w-sm lg:max-w-xl mx-auto">
        {/* Logo y título para móvil */}
        <div className="text-center mb-8 lg:hidden">
          <div className="mb-6">
            <Image
              src="/logo_ecuaticket.webp"
              alt="Ecuatickets Bus Logo"
              width={200}
              height={120}
              className="mx-auto"
              priority
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 w-full">
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={methods.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-primary">
                    Correo electrónico
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="example@example.com"
                      autoComplete="username"
                      className="h-12 px-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={methods.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium text-primary">
                    Iniciar Sesión
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••••••••••"
                      autoComplete="current-password"
                      className="h-12 px-4 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Enlace de olvidaste contraseña */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-primary transition-colors underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/95 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Contraseña"}
            </Button>

            {/* Enlace para crear cuenta */}
            <div className="text-center pt-4">
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-primary transition-colors"
              >
                Crea tu cuenta aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
