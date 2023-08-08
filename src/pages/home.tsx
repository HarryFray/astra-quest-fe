import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";

const HomePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // TODO: SHOULD BE ELIVATED TO A HIGHER ORDER COMPONENT
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen ">
        <p>Loading...</p>
      </main>
    );
  }

  // TODO: UTILIZE ON ALL PROTECTED ROUTES
  // TODO: SHOULD BE ELIVATED TO A HIGHER ORDER COMPONENT
  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <main className="flex justify-center items-center h-screen ">
      <UserProfile />
    </main>
  );
};

export default HomePage;
