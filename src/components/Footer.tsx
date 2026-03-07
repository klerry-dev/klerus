import {
  Home,
  User,
  Briefcase,
  Store,
  MessageCircle,
  Mic,
  MessageSquare,
  Plus,
  SendHorizontal,
  Image,
  Music,
  Film,
  FileText,
  Zap,
  Brain,
  Loader2,
  Square,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils";
import { motion } from "motion/react";
import { useChat } from "../contexts/ChatContext";
import { useState, useRef, useEffect } from "react";

export function Footer() {
  const {
    isChatActive,
    isFooterHidden,
    messages,
    sendMessage,
    attachedFile,
    setAttachedFile,
    isLoading,
    selectedModel,
    setSelectedModel,
    isPaused,
    togglePause,
  } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-grow textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSendMessage = async () => {
    if (inputValue.trim() || attachedFile) {
      let messageText = inputValue;
      let fileToSend = attachedFile;

      if (attachedFile) {
        // Only send user text, don't include file metadata in the message
        if (!inputValue.trim()) {
          messageText = ""; // Empty text if no user input
        }
      }

      await sendMessage(messageText, selectedModel, fileToSend);
      setInputValue("");
      setAttachedFile(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const startRecording = async () => {
    console.log("startRecording called");
    try {
      console.log("Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted");

      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        console.log("Data available:", e.data);
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        console.log("Recorder stopped");
        const audioBlob = new Blob(chunks, { type: "audio/webm" });
        const audioFile = new File(
          [audioBlob],
          `recording_${Date.now()}.webm`,
          { type: "audio/webm" },
        );

        // Add the audio recording as a message
        sendMessage(
          `[Audio Recording: ${formatTime(recordingTime)}] (Model: ${selectedModel === "fast" ? "Fast" : "GPT-4"})`,
          selectedModel,
        );

        // Clean up
        stream.getTracks().forEach((track) => track.stop());
        setRecordingTime(0);
        if (recordingIntervalRef.current) {
          clearInterval(recordingIntervalRef.current);
        }
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      console.log("Recording started");

      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleMicMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mic mouse down - starting recording");
    startRecording();
  };

  const handleMicMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mic mouse up - stopping recording");
    stopRecording();
  };

  const handleMicTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mic touch start - starting recording");
    startRecording();
  };

  const handleMicTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Mic touch end - stopping recording");
    stopRecording();
  };

  const handleAddPhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAttachedFile({
          type: "photo",
          name: file.name,
          file: file,
        });
      }
    };
    input.click();
  };

  const handleAddAudio = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAttachedFile({
          type: "audio",
          name: file.name,
          file: file,
        });
      }
    };
    input.click();
  };

  const handleAddVideo = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAttachedFile({
          type: "video",
          name: file.name,
          file: file,
        });
      }
    };
    input.click();
  };

  const handleAddFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setAttachedFile({
          type: "file",
          name: file.name,
          file: file,
        });
      }
    };
    input.click();
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "about", icon: User, label: "About", path: "/about" },
    { id: "projects", icon: Briefcase, label: "Projects", path: "/projects" },
    { id: "shop", icon: Store, label: "Shop", path: "/shop" },
    { id: "chat", icon: MessageCircle, label: "Chat", path: "/chat" },
  ] as const;

  // Show blank navigation when chat is active and footer is hidden
  if (isChatActive && isFooterHidden) {
    return (
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-100 max-w-md z-50">
        <div className="relative flex items-end justify-between gap-2">
          {/* Perfect circle on the left - fixed position */}
          <div className="absolute bottom-0 left-0 w-16 h-16 pill-surface rounded-full shadow-2xl flex items-center justify-center">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white/60 hover:text-white cursor-pointer transition-colors"
            >
              <Plus
                size={24}
                className={`transition-transform duration-300 ${showMenu ? "-rotate-45" : "rotate-0"}`}
              />
            </button>
          </div>

          {/* Menu modal - minimal card */}
          {showMenu && (
            <>
              {/* Backdrop to close on tap */}
              <div
                className="fixed inset-0 z-9"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute bottom-20 left-0 bg-brand-gray rounded-2xl shadow-2xl p-6 min-w-72 z-10">
                {/* File type icons - larger */}
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => {
                      handleAddPhoto();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Photos"
                  >
                    <Image
                      size={24}
                      className="text-white/60 group-hover:text-white"
                    />
                    <span className="text-white/60 group-hover:text-white text-sm">
                      Photos
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddAudio();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Audio"
                  >
                    <Music
                      size={24}
                      className="text-white/60 group-hover:text-white"
                    />
                    <span className="text-white/60 group-hover:text-white text-sm">
                      Audio
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddVideo();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Video"
                  >
                    <Film
                      size={24}
                      className="text-white/60 group-hover:text-white"
                    />
                    <span className="text-white/60 group-hover:text-white text-sm">
                      Video
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleAddFile();
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors group"
                    title="Files"
                  >
                    <FileText
                      size={24}
                      className="text-white/60 group-hover:text-white"
                    />
                    <span className="text-white/60 group-hover:text-white text-sm">
                      Files
                    </span>
                  </button>
                </div>

                <div className="border-t border-white/10 pt-4">
                  {/* Model selection - icons with labels */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedModel("fast")}
                      className={`flex-1 flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        selectedModel === "fast" ?
                          "bg-brand-accent text-black"
                        : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                      }`}
                      title="Fast Model"
                    >
                      <Zap size={18} />
                      <span className="text-xs font-medium">Fast</span>
                    </button>
                    <button
                      onClick={() => setSelectedModel("gpt4")}
                      className={`flex-1 flex items-center gap-2 p-2 rounded-lg transition-colors ${
                        selectedModel === "gpt4" ?
                          "bg-brand-accent text-black"
                        : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white"
                      }`}
                      title="GPT-4 Model"
                    >
                      <Brain size={18} />
                      <span className="text-xs font-medium">GPT-4</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Pill shape on the right with input and circle - with left margin for the circle */}
          <div className="flex-1 min-h-16 pill-surface rounded-4xl shadow-2xl px-4 flex items-end gap-3 ml-20 relative">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-base ml-2 py-3 resize-none overflow-hidden"
              style={{ minHeight: "2.5rem", maxHeight: "8rem" }}
            />
            <div
              onClick={() => {
                if (isLoading) {
                  // Toggle pause state when loading
                  togglePause();
                } else if (inputValue.trim()) {
                  handleSendMessage();
                }
              }}
              className={`absolute bottom-2 right-3 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                isRecording ? "bg-brand-accent animate-pulse"
                : inputValue.trim() && !isLoading ?
                  "bg-brand-accent hover:bg-brand-accent/90"
                : "bg-brand-accent hover:bg-brand-accent/90"
              }`}
              onMouseDown={
                (inputValue.trim() && !isLoading) || isRecording ?
                  undefined
                : handleMicMouseDown
              }
              onMouseUp={
                (inputValue.trim() && !isLoading) || isRecording ?
                  undefined
                : handleMicMouseUp
              }
              onMouseLeave={
                (inputValue.trim() && !isLoading) || isRecording ?
                  undefined
                : handleMicMouseUp
              }
              onTouchStart={
                (inputValue.trim() && !isLoading) || isRecording ?
                  undefined
                : handleMicTouchStart
              }
              onTouchEnd={
                (inputValue.trim() && !isLoading) || isRecording ?
                  undefined
                : handleMicTouchEnd
              }
            >
              {isLoading && !isPaused ?
                <Square size={16} className="text-black" />
              : isLoading && isPaused ?
                <SendHorizontal size={16} className="text-black" />
              : isRecording ?
                <div className="flex items-center gap-1">
                  <Loader2 size={12} className="text-black animate-spin" />
                  <span className="text-black text-xs font-medium">
                    {formatTime(recordingTime)}
                  </span>
                </div>
              : inputValue.trim() ?
                <SendHorizontal size={16} className="text-black" />
              : <Mic size={16} className="text-black" />}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Primary Navigation */}
      <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-100 max-w-md z-50">
        <div className="pill-surface rounded-4xl h-16 px-4 flex items-center justify-between shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "relative flex flex-col items-center justify-center w-12 h-12 transition-all duration-300",
                    isActive ? "text-brand-accent" : (
                      "text-white/40 hover:text-white/60"
                    ),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/5 rounded-full"
                        transition={{
                          type: "spring",
                          bounce: 0.0,
                          duration: 0.3,
                        }}
                      />
                    )}
                    <Icon
                      size={24}
                      className={cn("relative z-10", isActive && "scale-110")}
                    />
                    <span className="sr-only">{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
