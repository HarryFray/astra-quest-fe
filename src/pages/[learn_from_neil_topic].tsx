import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";

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
      <div className="position: absolute z-10 flex flex-col items-center w-2/5 h-4/5 max-h-96">
        <div
          ref={chatRef}
          className="shadow-md mb-4 w-fit h-fit overflow-y-auto"
        >
          {conversation.map((entry, index) => {
            return (
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
            );
          })}
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
      </div>
    </main>
  );
};

export default LearnFromNeil;
