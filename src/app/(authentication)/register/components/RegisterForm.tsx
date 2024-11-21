"use client";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { registerSchema, RegisterSchema } from '@/lib/validations/auth/auth.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: RegisterSchema) => {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            toast({
                title: "Account created successfully",
                description: "Please login to continue",
                variant: "default"
            });
            router.push("/login");
        } else {
            toast({
                title: "Something went wrong",
                description: "Please try again",
                variant: "destructive"
            });
        }
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <div className="flex flex-col gap-2">
            <Input placeholder="Email" type="email" {...register("email")} />
            <p className="text-red-500 text-xs">
                {errors.email?.message}
            </p>
        </div>
        <div className="flex flex-col gap-2">
            <Input placeholder="Password" type="password" {...register("password")} />
            <p className="text-red-500 text-xs">
                {errors.password?.message}
            </p>
        </div>
        <div className="flex flex-col gap-2">
            <Input placeholder="Confirm Password" type="password" {...register("confirmPassword")} />
            <p className="text-red-500 text-xs">
                {errors.confirmPassword?.message}
            </p>
        </div>
        <Button type="submit">Register</Button>
    </form>
  )
}

export default RegisterForm