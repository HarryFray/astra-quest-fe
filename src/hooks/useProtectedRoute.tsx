import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const useProtectedRoute = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  return { session, status };
};

export default useProtectedRoute;
