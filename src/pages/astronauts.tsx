import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

const createCleanLink = (name: string) => {
  return name.toLowerCase().replace(" ", "-");
};

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
  const [loadingAstronaut, setLoadingAstronaut] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setLoadingAstronaut(true);
    async function fetchAllAstronaut() {
      try {
        const response = await axios.get("/api/astronauts");
        const data: AstronautData = response.data;
        setAllAstronaut(data.people);
      } catch (error) {
        console.error("Error fetching astronauts data:", error);
      } finally {
        setLoadingAstronaut(false);
      }
    }

    if (status === "authenticated") {
      fetchAllAstronaut();
    }
  }, [status]);

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
  if (loadingAstronaut) {
    return (
      <main className="flex justify-center items-center h-screen">
        <div className="flex items-center space-x-4 z-10">
          <FaSpinner className="animate-spin text-indigo-700 text-8xl text-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex justify-center items-center h-screen ">
      <div
        className={`position: absolute z-10 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg w-2/5 bg-white bg-opacity-50 backdrop-blur-sm`}
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
        <p className="text-xl text-black text-center">
          Select a craft or astronaut and embark on an exhilarating journey to
          uncover fascinating details about them.
        </p>
        <p className="text-xl text-black text-center pt-4">
          Guided by the spirit of Niel Armstrong himself!
        </p>
        <div className="mt-8 w-full">
          <div className="flex justify-between px-4 py-2 border-b border-gray-300 font-bold">
            <h3 className="text-white text-lg">Astronaut</h3>
            <h3 className="text-white text-lg">Craft</h3>
          </div>
          {allAstronaut.map((astronaut, index) => (
            <div
              key={index}
              className="flex justify-between px-4 py-2 border-b border-gray-300"
            >
              <Link
                className="text-white hover:text-indigo-700"
                href={`/person-${createCleanLink(astronaut.name)}`}
              >
                {astronaut.name}
              </Link>
              <Link
                className="text-white hover:text-indigo-700"
                href={`/craft-${createCleanLink(astronaut.craft)}`}
              >
                {astronaut.craft}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AstronautsPage;
