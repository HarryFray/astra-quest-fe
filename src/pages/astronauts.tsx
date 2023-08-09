import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import FullScreenLoading from "@/components/fullScreenLoading";
import Logo from "@/components/logo";

const createNameEndpointString = (name: string) => {
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
    <>
      <FullScreenLoading loading={loadingAstronaut} />
      <main className="flex justify-center items-center h-screen ">
        <div
          className={`position: absolute z-10 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg w-2/5 bg-white bg-opacity-50 backdrop-blur-sm`}
        >
          <Logo />
          <p className="text-xl text-black text-center">
            Select an astronaut you would like to talk to!
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
                  href={`/astronaut/${createNameEndpointString(
                    astronaut.name
                  )}`}
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
