"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks/useApi";
import { toast } from "@/hooks/useToast";
import { loginSchema } from "@/lib/validations/auth/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: 'onBlur'
  });
  const router = useRouter();
  const {isLoading, error, data, callApi} = useApi();

  useEffect(() => {
    if (data) {
      // Set success toast notification
      toast({ title: "Login successful!" });
      // Redirect after the login is successful
      router.replace('/dashboard'); 
    } else if (error) {
      // If there's an error, show the error message
      toast({ title: error });
    }
  },[data, error, router])

  const onSubmit = async (loginFormData: LoginFormData) => {
    try {
      // Make the API call to login
      await callApi({
        url: "/api/auth/login",
        method: 'POST',
        body: loginFormData,
      });
    } catch (error: unknown) {
      // Handle any errors during the login request
      toast({ title: "An error occurred. Please try again." });
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[300px] flex flex-col justify-center items-center">
      <div className="text-primary-foreground text-center font-semibold text-[48px] lg:text-[64px] mb-40">
        Sign in
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

      <div className="mb-24 flex items-center justify-center w-full">
        <Checkbox
          id="rememberMeCheckbox"
          className="h-[17px] w-[18px] mr-8 bg-input outline-none border-none"
          onClick={() => setValue("rememberMe", !getValues("rememberMe"))}
        />
        <Label
          htmlFor="rememberMeCheckbox"
          className="font-normal text-[14px] text-primary-foreground tracking-wider"
        >
          Remember me
        </Label>
      </div>

      <div>
        <Button type="submit" disabled={isLoading}>Login</Button>
      </div>
    </form>
  );
} 