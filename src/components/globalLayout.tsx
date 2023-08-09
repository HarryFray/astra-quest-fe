import { useEffect } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Logo from "@/components/logo";

interface Route {
  path: string;
  label: string;
}

const HEADER_ROUTES: Route[] = [
  { path: "/astronauts", label: "Astronauts" },
  { path: "/isslocation", label: "ISS Location" },
  { path: "/profile", label: "Profile" },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = `AstroQuest: ${router.pathname}`;
  }, [session, status, router]);

  const isRouteActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <>
      {session && (
        <header
          className={`fixed top-0 left-0 right-0 p-4 w-screen flex items-center justify-between z-50 bg-white bg-opacity-50 backdrop-blur-sm`}
        >
          <Logo linkToHome />
          <div className="flex">
            {HEADER_ROUTES.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                passHref
                className={`text-2xl font-bold ${
                  isRouteActive(route.path)
                    ? "line-through"
                    : "hover:line-through"
                } text-white cursor-pointer ml-8`}
              >
                {route.label}
              </Link>
            ))}
            <div
              onClick={() => signOut()}
              className="font-ubuntu-mono text-2xl font-bold hover:line-through text-white cursor-pointer ml-8"
            >
              Logout
            </div>
          </div>
        </header>
      )}
      {children}
    </>
  );
};

export default RootLayout;
