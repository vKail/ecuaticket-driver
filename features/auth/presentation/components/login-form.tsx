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
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <FormField
            control={methods.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-gray-900">
                  Usuario
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="usuario"
                    autoComplete="username"
                    className="h-12 px-4 text-sm border border-gray-300 rounded-lg focus:ring-0 focus:border-primary transition-colors placeholder:text-gray-400"
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
                <FormLabel className="text-sm font-medium text-gray-900">
                  Contraseña
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••••••••••"
                    autoComplete="current-password"
                    className="h-12 px-4 text-sm border border-gray-300 rounded-lg focus:ring-0 focus:border-primary transition-colors placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/95 text-white text-sm font-medium rounded-lg transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};
