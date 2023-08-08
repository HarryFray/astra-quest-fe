import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

interface AstronautData {
  message: string;
  number: number;
  people: Astronaut[];
}

interface Astronaut {
  name: string;
  craft: string;
}

const AstronautsPage = () => {
  const [allAstronaut, setAllAstronaut] = useState<Astronaut[]>([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchAllAstronaut() {
      try {
        const response = await axios.get("/api/astronauts");
        const data: AstronautData = response.data;
        setAllAstronaut(data.people);
      } catch (error) {
        console.error("Error fetching astronauts data:", error);
      }
    }

    if (status === "authenticated") {
      fetchAllAstronaut();
    }
  }, [status]);

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
        <div className="mt-8 w-full">
          {allAstronaut.map((astronaut, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-2 border-b border-gray-300"
            >
              <p>{astronaut.name}</p>
              <p>{astronaut.craft}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AstronautsPage;
