import { getUserFromToken } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getUserFromToken();
        return NextResponse.json({ status: 200, data: user });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 401 });
    }
}