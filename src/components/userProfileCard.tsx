import { useSession } from "next-auth/react";
import Image from "next/image";
import Logo from "@/components/logo";

const UserProfile = () => {
  const { data: session } = useSession();

  return (
    <div
      className={`position: absolute z-10 flex flex-col items-center p-8 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm`}
    >
      <Logo />
      <div className="flex flex-col items-center">
        {session?.user?.image && (
          <div className="rounded-full w-20 h-20 mb-2 overflow-hidden">
            <Image
              src={session.user.image}
              alt={session.user.name || "User Image"}
              width={80}
              height={80}
              layout="responsive"
            />
          </div>
        )}
        {session?.user?.name && (
          <p className="text-lg text-gray-600 text-center mt-2 text-white">
            Welcome, {session.user.name}!
          </p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
