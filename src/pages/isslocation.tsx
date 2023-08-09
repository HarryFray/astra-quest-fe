import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import FullScreenLoading from "@/components/fullScreenLoading";
import useProtectedRoute from "@/hooks/useProtectedRotue";

interface IssPosition {
  latitude: number;
  longitude: number;
}

interface ApiResponse {
  message: string;
  timestamp: number;
  iss_position: IssPosition;
}

const containerStyle = {
  width: "800px",
  height: "400px",
  zIndex: 10,
};

const IssLocationPage = () => {
  const [currentIssLocation, setCurrentIssLocation] = useState(
    {} as IssPosition
  );
  const [loadingIssLocation, setLoadingIssLocation] = useState(true);

  const { status } = useProtectedRoute();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  const fetchIssLocation = useCallback(async () => {
    try {
      const response = await axios.get("/api/issloc");
      const data: ApiResponse = response.data;
      setCurrentIssLocation(data.iss_position);
    } catch (error) {
      console.error("Error fetching ISS location:", error);
    } finally {
      setLoadingIssLocation(false);
    }
  }, []);

  useEffect(() => {
    setLoadingIssLocation(true);
    if (status === "authenticated") {
      fetchIssLocation();
      const interval = setInterval(fetchIssLocation, 2000);
      return () => clearInterval(interval);
    }
  }, [status, fetchIssLocation]);

  const googleLatLng = {
    lat: Number(currentIssLocation.latitude) || 0,
    lng: Number(currentIssLocation.longitude) || 0,
  };

  return (
    <>
      <FullScreenLoading loading={loadingIssLocation} />
      <main className="flex justify-center items-center h-screen ">
        <div className="position: absolute z-10 flex flex-col items-center">
          <div
            className={`flex flex-col items-center mb-4 p-4 bg-white rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-sm`}
          >
            <h3 className="text-4xl font-bold text-indigo-700 mb-4">
              Current ISS Location
            </h3>
            <h4 className="text-2xl font-bold text-white mb-4">
              {`Lat: ${currentIssLocation.latitude} Long: ${currentIssLocation.longitude}`}
            </h4>
          </div>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={googleLatLng}
              zoom={2}
            >
              <Marker position={googleLatLng} />
            </GoogleMap>
          )}
        </div>
      </main>
    </>
  );
};

export default IssLocationPage;
