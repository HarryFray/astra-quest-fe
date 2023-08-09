import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

interface IssPosition {
  latitude: number;
  longitude: number;
}

interface ApiResponse {
  message: string;
  timestamp: number;
  iss_position: IssPosition;
}

const IssLocation = () => {
  const [currentLoc, setCurrentLoc] = useState({} as IssPosition);
  const [loadingLoc, setLoadingLoc] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setLoadingLoc(true);
    async function fetchAllAstronaut() {
      try {
        const response = await axios.get("/api/issloc");
        const data: ApiResponse = response.data;

        setCurrentLoc(data.iss_position);
      } catch (error) {
        console.error("Error fetching astronauts data:", error);
      } finally {
        setLoadingLoc(false);
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
  if (loadingLoc) {
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
        <h3 className="text-4xl font-bold text-indigo-700 mb-4">
          ISS Location
        </h3>
        <h1 className="text-2xl font-bold text-white mb-4">
          {`Lat: ${currentLoc.latitude} Long: ${currentLoc.longitude}`}
        </h1>
      </div>
    </main>
  );
};

export default IssLocation;
