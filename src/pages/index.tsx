import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import FullScreenLoading from "@/components/fullScreenLoading";

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <FullScreenLoading />;
  }

  if (session) {
    router.push("/home");
    return null;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div
        className={`position: absolute z-10 flex flex-col items-center w-3/5 p-8 bg-white rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-sm`}
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
        <p className="text-lg text-white text-center mb-8">
          Are you prepared to delve into the realm of space exploration? Engage
          in conversations with actual astronauts and unveil the present
          coordinates of the International Space Station!
        </p>
        <div className="mt-4">
          <button
            className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
            onClick={() => signIn()}
          >
            {"Let's Go!"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
