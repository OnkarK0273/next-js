"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LogoutBtn() {
  const router = useRouter();
  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/doc");
        },
      },
    });
  };

  return (
    <Button
      onClick={logout}
      className="bg-red-400 text-red-950 hover:bg-red-300"
    >
      Logout
    </Button>
  );
}
