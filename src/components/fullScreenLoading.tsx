import { FaSpinner } from "react-icons/fa";

interface IFullScreenLoadingProps {
  loading?: boolean;
}

const FullScreenLoading = ({ loading = true }: IFullScreenLoadingProps) => {
  return loading ? (
    <main className="flex justify-center items-center h-screen">
      <div className="flex items-center space-x-4 z-10">
        <FaSpinner className="animate-spin text-indigo-700 text-8xl text-white" />
      </div>
    </main>
  ) : null;
};

export default FullScreenLoading;
