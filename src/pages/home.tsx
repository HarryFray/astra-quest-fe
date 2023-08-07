"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

const Home = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-indigo-900">
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">AstroQuest</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Embark on an epic space journey to explore the cosmos and uncover its
          mysteries.
        </p>
        <Link
          href="/explore"
          className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800"
        >
          Explore Now
        </Link>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-800 mt-4"
        >
          Sign out
        </button>
      </div>
    </main>
  );
};

export default Home;
