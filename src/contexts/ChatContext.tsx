import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  attachedFile?: {
    type: "photo" | "audio" | "video" | "file";
    name: string;
    file: File;
  };
}

interface AttachedFile {
  type: "photo" | "audio" | "video" | "file";
  name: string;
  file: File;
}

interface ChatContextType {
  isChatActive: boolean;
  chatTapCount: number;
  hasVisitedChatOnce: boolean;
  isFooterHidden: boolean;
  messages: Message[];
  attachedFile: AttachedFile | null;
  isLoading: boolean;
  selectedModel: "fast" | "gpt4";
  isPaused: boolean;
  setIsChatActive: (active: boolean) => void;
  incrementChatTapCount: () => void;
  markChatAsVisited: () => void;
  setIsFooterHidden: (hidden: boolean) => void;
  addMessage: (
    text: string,
    isUser: boolean,
    attachedFile?: AttachedFile,
  ) => void;
  clearMessages: () => void;
  setAttachedFile: (file: AttachedFile | null) => void;
  setSelectedModel: (model: "fast" | "gpt4") => void;
  sendMessage: (
    text: string,
    model: "fast" | "gpt4",
    attachedFile?: AttachedFile,
  ) => Promise<void>;
  togglePause: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatTapCount, setChatTapCount] = useState(0);
  const [hasVisitedChatOnce, setHasVisitedChatOnce] = useState(false);
  const [isFooterHidden, setIsFooterHidden] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<"fast" | "gpt4">("fast");
  const [isPaused, setIsPaused] = useState(false);

  const incrementChatTapCount = () => {
    setChatTapCount((prev) => prev + 1);
  };

  const markChatAsVisited = () => {
    setHasVisitedChatOnce(true);
  };

  const addMessage = (
    text: string,
    isUser: boolean,
    attachedFile?: AttachedFile,
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser,
      attachedFile,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async (
    text: string,
    model: "fast" | "gpt4",
    attachedFile?: AttachedFile,
  ) => {
    console.log("sendMessage called with:", { text, model, attachedFile });

    // Add user message
    addMessage(text, true, attachedFile);

    // Set loading state
    setIsLoading(true);

    try {
      if (model === "fast") {
        console.log("Using fast model - generating local response");

        // Simulate processing time for fast model
        await new Promise((resolve) =>
          setTimeout(resolve, 500 + Math.random() * 1000),
        );

        // Generate contextual response based on user input
        const response = generateLocalResponse(text);

        console.log("Generated local response:", response);

        // Add AI response
        addMessage(response, false);
      } else {
        console.log("Using GPT-4 model - calling API");

        // Call AI API for GPT-4 model
        const response = await fetch("http://localhost:3001/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            model: "gpt4",
          }),
        });

        console.log("API response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to send message: ${response.status}`);
        }

        const data = await response.json();
        console.log("API response data:", data);

        // Add AI response
        addMessage(data.response, false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // If API fails, fallback to local response
      console.log("API failed, using local fallback response");
      const fallbackResponse = generateLocalResponse(text);
      addMessage(fallbackResponse, false);
    } finally {
      console.log("Setting loading to false");
      setIsLoading(false);
    }
  };

  // Generate contextual responses based on user input
  const generateLocalResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();

    // Greeting responses
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      const greetings = [
        "Hello! I'm Bitto, your AI assistant. How can I help you today?",
        "Hi there! I'm here to assist you. What would you like to know?",
        "Hey! I'm Bitto, ready to help. What's on your mind?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Help responses
    if (
      message.includes("help") ||
      message.includes("assist") ||
      message.includes("support")
    ) {
      return "I'm here to help! I can assist with questions, provide information, and have conversations. Feel free to ask me anything!";
    }

    // Question responses
    if (
      message.includes("?") ||
      message.includes("what") ||
      message.includes("how") ||
      message.includes("why") ||
      message.includes("where") ||
      message.includes("when")
    ) {
      const questionResponses = [
        "That's a great question! Let me think about that for you...",
        "Interesting question! Here's what I can tell you about that.",
        "I'd be happy to help with that. Let me share some thoughts.",
        "That's something I can definitely help you with!",
      ];
      return questionResponses[
        Math.floor(Math.random() * questionResponses.length)
      ];
    }

    // Creative/Design responses
    if (
      message.includes("design") ||
      message.includes("creative") ||
      message.includes("art") ||
      message.includes("project")
    ) {
      const creativeResponses = [
        "Design is such a fascinating field! I'd love to help you explore your creative ideas.",
        "Creativity is amazing! What kind of project are you working on?",
        "I love talking about design and art! Tell me more about your creative vision.",
        "Great to hear about your creative work! How can I assist with your project?",
      ];
      return creativeResponses[
        Math.floor(Math.random() * creativeResponses.length)
      ];
    }

    // Tech/Code responses
    if (
      message.includes("code") ||
      message.includes("programming") ||
      message.includes("tech") ||
      message.includes("app")
    ) {
      const techResponses = [
        "Technology and programming are exciting topics! What specific area are you interested in?",
        "I love discussing tech! Are you working on a coding project or have technical questions?",
        "Programming is such a powerful skill! How can I help with your development journey?",
        "Tech is constantly evolving! What aspect of technology interests you most?",
      ];
      return techResponses[Math.floor(Math.random() * techResponses.length)];
    }

    // Learning responses
    if (
      message.includes("learn") ||
      message.includes("study") ||
      message.includes("education") ||
      message.includes("knowledge")
    ) {
      const learningResponses = [
        "Learning is a wonderful journey! What topic are you excited to explore?",
        "Education is powerful! I'd be happy to help you discover new information.",
        "I love supporting learning! What would you like to study or understand better?",
        "Knowledge is beautiful! How can I assist your learning process?",
      ];
      return learningResponses[
        Math.floor(Math.random() * learningResponses.length)
      ];
    }

    // Feeling/Emotion responses
    if (
      message.includes("feel") ||
      message.includes("happy") ||
      message.includes("sad") ||
      message.includes("excited") ||
      message.includes("worried")
    ) {
      const emotionResponses = [
        "I hear you! It's important to acknowledge our feelings. I'm here to listen and support you.",
        "Thank you for sharing that with me. How can I help you feel better or understand things more clearly?",
        "Emotions are a natural part of life. I'm here to help you process whatever you're experiencing.",
        "I appreciate you opening up. Let's work through this together.",
      ];
      return emotionResponses[
        Math.floor(Math.random() * emotionResponses.length)
      ];
    }

    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about what you're thinking.",
      "I'd love to help with that! What specific information would be most useful?",
      "Thanks for sharing that! How can I assist you further?",
      "Great question! Let me think about the best way to help you.",
      "I understand what you're asking. Here's my perspective on that...",
      "That's something I can definitely help you explore!",
      "I appreciate you asking! Let me share some thoughts on that.",
      "Interesting point! Here's what I think about that...",
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatActive,
        chatTapCount,
        hasVisitedChatOnce,
        isFooterHidden,
        messages,
        attachedFile,
        isLoading,
        selectedModel,
        isPaused,
        setIsChatActive,
        incrementChatTapCount,
        markChatAsVisited,
        setIsFooterHidden,
        addMessage,
        clearMessages,
        setAttachedFile,
        setSelectedModel,
        sendMessage,
        togglePause,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
