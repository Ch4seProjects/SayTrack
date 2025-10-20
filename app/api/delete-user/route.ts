import { NextResponse } from "next/server";
import { deleteUser } from "@/app/services/deleteUser";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Missing user ID" },
        { status: 400 }
      );
    }

    const result = await deleteUser(userId);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Error in delete-user route:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
