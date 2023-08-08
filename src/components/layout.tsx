import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 p-4 w-screen flex items-center justify-between z-50">
        <Link
          href="/home"
          className="text-4xl font-bold text-black hover:line-through"
        >
          AstroQuest
        </Link>
        {session && (
          <div className="flex">
            <Link
              href="/astronauts"
              className="text-2xl font-bold hover:line-through text-black cursor-pointer ml-8"
            >
              Astronauts
            </Link>
            <Link
              href="/profile"
              className="text-2xl font-bold hover:line-through text-black cursor-pointer ml-8"
            >
              Profile
            </Link>
            <div
              onClick={() => signOut()}
              className="
              font-ubuntu-mono text-2xl font-bold hover:line-through text-black cursor-pointer ml-8"
            >
              Sign Out
            </div>
          </div>
        )}
      </header>
      {children}
    </>
  );
};

export default RootLayout;
