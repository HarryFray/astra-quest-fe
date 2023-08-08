import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FaSpinner } from "react-icons/fa";

const buildFirstQuestion = (name: string) => {
  let strippedURl = Boolean(name) ? name.replaceAll("-", " ") : "space";
  return `Hey Neil, can you tell me something about the ${strippedURl}?`;
};

interface Entry {
  role: string;
  content: string;
}

const LearnFromNeil = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const learn_from_neil_topic = String(router.query.learn_from_neil_topic);
  const initialQuestions = buildFirstQuestion(learn_from_neil_topic);

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
    } finally {
      setLoadingConversation(false);
    }
  };

  // TODO: SHOULD BE ELIVATED TO A HIGHER ORDER COMPONENT
  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-screen ">
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
    <main className="flex flex-col justify-center items-center h-screen ">
      <div
        className={`position: absolute z-10 flex flex-col items-center p-8 bg-white rounded-lg shadow-lg w-2/5 h-3/5 bg-white bg-opacity-50 backdrop-blur-sm`}
      >
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
                  {entry.role === "user" ? session?.user?.name : "Neil"}:{" "}
                </strong>
                {entry.content}
              </div>
            );
          })}
          {loadingConversation && (
            <div className="flex items-center justify-center space-x-4 z-10 h-full w-full">
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
