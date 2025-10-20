import { getAdminSupabaseClient } from "../utils/admin";

export async function deleteUser(userId: string) {
  const adminAuth = getAdminSupabaseClient();

  try {
    if (!userId) {
      throw new Error("Missing user ID");
    }

    const { error: authError } = await adminAuth.deleteUser(userId);

    if (authError) throw authError;

    return {
      success: true,
      message: "User has been deleted successfully.",
    };
  } catch (err: any) {
    console.error("Error deleting user:", err);
    return {
      success: false,
      message: err.message || "Failed to delete user. Please try again later.",
    };
  }
}
