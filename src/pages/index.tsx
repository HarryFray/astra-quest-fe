import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">AstroQuest</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Embark on an epic space journey to explore the cosmos and uncover its
          mysteries.
        </p>
        <div className="mt-4">
          {session ? (
            <button
              onClick={() => signOut()}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Sign out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
