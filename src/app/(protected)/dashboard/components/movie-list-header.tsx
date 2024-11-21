import { toast } from "@/hooks/useToast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function MovieListHeader() {
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
    <div className="text-primary-foreground flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-[32px] lg:text-5xl font-semibold mr-3">
          My movies
        </div>
        <div
          className="mt-4 cursor-pointer"
          onClick={() => router.push("/movie/add")}
        >
          <Image
            src="/assets/images/add.svg"
            height={32}
            width={32}
            alt=""
          ></Image>
        </div>
      </div>
      <div
        onClick={() => handleLogout()}
        className="font-bold flex text-[16px] hover:cursor-pointer justify-end"
      >
        <span className="mr-[16px] hidden sm:flex ">Logout</span>
        <Image
          src="/assets/images/logout.svg"
          height={24}
          width={24}
          alt=""
        ></Image>
      </div>
    </div>
  );
}

export default MovieListHeader;
