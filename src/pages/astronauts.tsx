import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import FullScreenLoading from "../components/fullScreenLoading";
import Logo from "../components/logo";
import useProtectedRoute from "../hooks/useProtectedRotue";

const createSlugFromName = (name: string) => {
  return name.toLowerCase().replaceAll(" ", "-");
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

  const { status } = useProtectedRoute();

  useEffect(() => {
    setLoadingAstronaut(true);

    async function fetchAllAstronauts() {
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
      fetchAllAstronauts();
    }
  }, [status]);

  return (
    <>
      <FullScreenLoading loading={loadingAstronaut} />
      <main className="flex justify-center items-center h-screen ">
        <div
          className={`position: absolute z-10 flex flex-col items-center p-4 bg-white rounded-lg shadow-lg w-2/5 bg-white bg-opacity-50 backdrop-blur-sm`}
        >
          <Logo />
          <p className="text-xl text-black text-center">
            Select an astronaut you would like to talk to!
          </p>
          <div className="mt-4 w-full">
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
                  href={`/astronaut/${createSlugFromName(astronaut.name)}`}
                >
                  {astronaut.name}
                </Link>
                <h4 className="text-white">{astronaut.craft}</h4>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AstronautsPage;
