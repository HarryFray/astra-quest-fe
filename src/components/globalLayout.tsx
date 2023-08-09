import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Route {
  path: string;
  label: string;
}

const routes: Route[] = [
  { path: "/astronauts", label: "Astronauts" },
  { path: "/isslocation", label: "ISS Location" },
  { path: "/profile", label: "Profile" },
];

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const isRouteActive = (pathname: string) => {
    return router.pathname === pathname;
  };

  return (
    <>
      {session && (
        <header
          className={`fixed top-0 left-0 right-0 p-4 w-screen flex items-center justify-between z-50 bg-white bg-opacity-50 backdrop-blur-sm`}
        >
          <Link
            href="/home"
            className="text-4xl font-bold text-white hover:line-through"
          >
            AstroQuest
          </Link>
          <div className="flex">
            {routes.map((route) => (
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
              Sign Out
            </div>
          </div>
        </header>
      )}
      {children}
    </>
  );
};

export default RootLayout;
