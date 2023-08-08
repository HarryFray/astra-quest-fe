import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaSpinner } from "react-icons/fa";
import { blurredBackground } from "./contants";

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-4 z-10">
          <FaSpinner className="animate-spin text-indigo-700 text-8xl text-white" />
        </div>
      </main>
    );
  }

  if (session) {
    router.push("/home");
    return null;
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div
        className={`position: absolute z-10 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg ${blurredBackground}`}
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
        <p className="text-lg text-white text-center mb-8">
          Embark on an epic space journey to explore the cosmos and uncover its
          mysteries.
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
