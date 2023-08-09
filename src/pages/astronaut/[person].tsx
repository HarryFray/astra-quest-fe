import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import useProtectedRoute from "@/hooks/useProtectedRotue";

const convertToNameCaseFromSlug = (name: string) => {
  return name
    ?.split("-")
    ?.map((word) => word[0].toUpperCase() + word.slice(1))
    ?.join(" ");
};

interface Entry {
  role: string;
  content: string;
}

const LearnFromNeil = () => {
  const router = useRouter();

  const { session } = useProtectedRoute();

  const person = convertToNameCaseFromSlug(router.query.person as string);
  let initialQuestions = `Hey ${person}! Tell me about your last mission?`;

  const [message, setMessage] = useState(initialQuestions);
  const [conversation, setConversation] = useState<Entry[]>([]);
  const [loadingConversation, setLoadingConversation] = useState(true);

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
    setLoadingConversation(true);
    setConversation([...conversation, { role: "user", content: message }]);
    setMessage("");
    try {
      const response = await axios.post(
        "https://yg8ojcoti6.execute-api.us-east-1.amazonaws.com/converse",
        { message, person }
      );

      setConversation([
        ...conversation,
        { role: "user", content: message },
        { role: person, content: response.data },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoadingConversation(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <div
        className={`position: absolute z-10 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg w-2/5 h-3/5 bg-white bg-opacity-50 backdrop-blur-sm`}
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-4 border-b-2 pb-4">
          {`Chatting with ${person}`}
        </h2>
        <div ref={chatRef} className="mb-4 w-fit h-full overflow-y-auto">
          {conversation.map((entry, index) => {
            return (
              <div
                key={index}
                className={`mb-2 ${
                  entry.role === "user" ? "text-white" : "text-indigo-700"
                }`}
              >
                <strong>
                  {entry.role === "user" ? session?.user?.name : person}:{" "}
                </strong>
                {entry.content}
              </div>
            );
          })}
          {loadingConversation && (
            <div className="flex items-center justify-center space-x-4 z-10 pt-8 w-full">
              <FaSpinner className="animate-spin text-indigo-700 text-4xl text-white" />
            </div>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-black text-white border border-gray-300 p-2 rounded w-8/12 mr-4"
            disabled={loadingConversation}
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-600 w-3/12"
            disabled={loadingConversation}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default LearnFromNeil;
