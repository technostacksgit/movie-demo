"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/useToast";
import Image from "next/image";

function DashboardEmptyState() {
  const router = useRouter();

  const handleLogout = async () => {
    const data = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any necessary headers here (e.g., Authorization)
      },
    });

    if (data) {
      router.replace("/login");
      toast({
        title: "Logged out successfully!",
      });
    } else {
      toast({
        title: "Something went wrong.",
      });
    }
  };

  return (
    <div>
      <div className="text-primary-foreground flex items-center justify-between absolute right-10 top-10">
        <div
          onClick={() => handleLogout()}
          className=" font-bold flex text-[16px] hover:cursor-pointer justify-end"
        >
          <Image
            src="/assets/images/logout.svg"
            height={24}
            width={24}
            alt=""
          ></Image>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="font-semibold text-center p-[20px] text-[32px] lg:text-5xl text-primary-foreground mb-40">
          Your movie list is empty
        </div>
        <div>
          <Button size="sm" onClick={() => router.push("/movie/add")}>
            Add a new movie
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardEmptyState;
