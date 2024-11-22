"use client";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  registerSchema,
  RegisterSchema,
} from "@/lib/validations/auth/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApi } from "@/hooks/useApi";
import { useEffect } from "react";

const RegisterForm = () => {
  const router = useRouter();
  const { callApi, data, error, isLoading } = useApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (data) {
      // Assuming successful API call
      toast({
        title: "Your blockbuster account is ready!",
        description: "Roll the credits and add your first movie!",
        variant: "default",
      });
      return router.push("/dashboard");
    }
    if (error) {
      toast({
        title: error || "An error occurred",
        variant: `${error ? 'warning' : 'destructive'}`,
      });
    }
  }, [error, data, router]);

  const onSubmit = async (data: RegisterSchema) => {
      await callApi({
        url: "/api/auth/register",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[300px] flex flex-col justify-center items-center"
    >
      <div className="text-primary-foreground text-center font-semibold text-[48px] lg:text-[64px] mb-40">
        Register
      </div>

      <div className="mb-5 w-full">
        <Input
          className="w-full"
          placeholder="Email"
          type="email"
          isInputvalid={errors.email ? false : true}
          {...register("email")}
        />
        <div className="h-4">
          {errors.email && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-5 w-full">
        <Input
          placeholder="Password"
          type="password"
          className="w-full"
          isInputvalid={errors.password ? false : true}
          {...register("password")}
        />
        <div className="h-4">
          {errors.password && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-5 w-full">
        <Input
          placeholder="Confirm password"
          type="password"
          className="w-full"
          isInputvalid={errors.confirmPassword ? false : true}
          {...register("confirmPassword")}
        />
        <div className="h-4">
          {errors.confirmPassword && (
            <p className="text-red-500 text-[11px] mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-[1.1rem]">
        <Button type="submit" loading={isLoading}>
          Sign up
        </Button>
      </div>
      <div className="font-normal text-[14px] text-primary-foreground/70 tracking-wider">
        <span>Already have an account? </span>{" "}
        <Link href={"/login"} className="text-primary">
          Log In.
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
