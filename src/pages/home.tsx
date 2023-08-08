import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen bg-indigo-900">
        <p>Loading...</p>
      </main>
    );
  }

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <main className="flex justify-center items-center h-screen bg-indigo-900">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
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
            <p className="text-lg text-gray-600 text-center mt-2">
              Welcome, {session.user.name}!
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
