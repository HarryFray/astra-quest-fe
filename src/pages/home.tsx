import { useState, useEffect } from "react";
import UserProfileCard from "@/components/userProfileCard";
import Link from "next/link";
import useProtectedRoute from "@/hooks/useProtectedRotue";

const HomePage = () => {
  const [userProfileVisible, setUserProfileVisible] = useState(true);

  useProtectedRoute();

  useEffect(() => {
    setTimeout(() => {
      setUserProfileVisible(false);
    }, 2000);
  }, []);

  return (
    <main className="flex justify-center items-center h-screen ">
      {userProfileVisible ? (
        <UserProfileCard />
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
