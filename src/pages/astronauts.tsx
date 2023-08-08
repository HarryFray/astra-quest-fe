import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AstronautsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // TODO: SHOULD BE ELIVATED TO A HIGHER ORDER COMPONENT
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen bg-indigo-900">
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
    <main className="flex justify-center items-center h-screen bg-indigo-900">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
        <p className="text-lg text-gray-600 text-center">
          Embark on an epic journey to explore the cosmos and uncover its
          mysteries.
        </p>
      </div>
    </main>
  );
};

export default AstronautsPage;
