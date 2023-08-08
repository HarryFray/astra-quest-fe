import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

const buildFirstQuestion = (name: string) => {
  let strippedURl = Boolean(name) ? name.replaceAll("-", " ") : "space";
  return `Hey Neil, can you tell something about the ${strippedURl}?`;
};

interface Entry {
  role: string;
  content: string;
}

const LearnFromLance = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const learn_from_lance = String(router.query.learn_from_lance);

  const [message, setMessage] = useState(buildFirstQuestion(learn_from_lance));
  const [conversation, setConversation] = useState<Entry[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSendMessage();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = async () => {
    setMessage("");
    try {
      const response = await axios.post(
        "https://yg8ojcoti6.execute-api.us-east-1.amazonaws.com/converse",
        { message }
      );

      setConversation([...conversation, { role: "user", content: message }]);
      setConversation([...conversation, ...response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // TODO: SHOULD BE ELIVATED TO A HIGHER ORDER COMPONENT
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen bg-indigo-900">
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
    <main className="flex flex-col justify-center items-center h-screen bg-indigo-900">
      <h1 className="text-4xl font-bold text-white mb-4 color-white">
        Learn From Lance!
      </h1>
      <div
        ref={chatRef}
        className="border border-gray-300 p-4 rounded-lg shadow-md mb-4 w-2/5 h-4/5 max-h-96 overflow-y-auto"
      >
        {conversation.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 ${
              entry.role === "user" ? "text-green-600" : "text-blue-600"
            }`}
          >
            <strong>
              {entry.role === "user" ? session?.user?.name : "Neil"}:{" "}
            </strong>
            {entry.content}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="border border-gray-300 p-2 rounded w-60"
        />
        <button
          onClick={() => handleSendMessage()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
      <Link href="/astronauts">Go Back</Link>
    </main>
  );
};

export default LearnFromLance;
