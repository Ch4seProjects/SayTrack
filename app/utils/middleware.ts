import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/pending",
  "/rejected",
  "/manifest.json",
  "/logo.png",
  "/favicon.ico",
  "/apple-touch-icon.png",
];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const pathname = request.nextUrl.pathname;

  //  Skip middleware for API routes
  if (pathname.startsWith("/api")) {
    return response;
  }

  if (!user && !publicRoutes.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/"; // redirect to login
    return NextResponse.redirect(url);
  }

  // If logged in, fetch profile status
  if (user?.sub) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", user.sub)
      .single();

    if (error) {
      console.error("Error fetching profile status:", error.message);
      return response;
    }

    if (profile?.status === "pending") {
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = "/pending";
      return NextResponse.redirect(url);
    }

    if (profile?.status === "rejected") {
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = "/rejected";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
