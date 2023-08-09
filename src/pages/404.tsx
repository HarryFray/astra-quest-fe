import Logo from "@/components/logo";
import Link from "next/link";

const NotFoundPage404 = () => {
  return (
    <main className="flex justify-center items-center h-screen ">
      <div
        className={`position: absolute z-10 flex flex-col items-center p-8 rounded-lg bg-white bg-opacity-50 backdrop-blur-sm`}
      >
        <Logo />
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          404 - Page Not Found
        </h2>
        <Link className="text-white hover:text-indigo-700" href="/">
          Go Back To Earth
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage404;
