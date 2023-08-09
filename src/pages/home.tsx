import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import UserProfile from "@/components/userProfile";
import Link from "next/link";

const HomePage = () => {
  const [userProfileVisible, setUserProfileVisible] = useState(true);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setUserProfileVisible(false);
    }, 2000);
  }, []);

  // TODO: UTILIZE ON ALL PROTECTED ROUTES
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
      {userProfileVisible ? (
        <UserProfile />
      ) : (
        <div className="position: absolute z-10">
          <Link
            className="text-4xl font-bold text-white hover:line-through"
            style={{ animation: "fadein 1s" }}
            href="/astronauts"
          >
            Click here to talk to an astronaut!
          </Link>
        </div>
      )}
    </main>
  );
};

export default HomePage;
