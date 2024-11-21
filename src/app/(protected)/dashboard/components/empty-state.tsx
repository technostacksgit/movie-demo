"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";

function DashboardEmptyState() {
  const router = useRouter();

  return (
    <div>
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="font-semibold text-center p-[20px] text-[32px] lg:text-5xl text-primary-foreground mb-40">
          Your movie list is empty
        </div>
        <div>
            <Button size="sm" onClick={() => router.push('/movie/add')}>
              Add a new movie
            </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardEmptyState;
