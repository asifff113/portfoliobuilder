"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, VolumeX, X, MessageCircle } from "lucide-react";

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

interface VoiceNavigationProps {
  commands?: VoiceCommand[];
  onNavigate?: (section: string) => void;
  onMessage?: (message: string) => void;
}

export function VoiceNavigation({ commands = [], onNavigate, onMessage }: VoiceNavigationProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Default navigation commands
  const defaultCommands: VoiceCommand[] = [
    { command: "go to projects", action: () => onNavigate?.("projects"), description: "Navigate to projects" },
    { command: "go to about", action: () => onNavigate?.("about"), description: "Navigate to about" },
    { command: "go to contact", action: () => onNavigate?.("contact"), description: "Navigate to contact" },
    { command: "go to skills", action: () => onNavigate?.("skills"), description: "Navigate to skills" },
    { command: "scroll down", action: () => window.scrollBy({ top: 500, behavior: "smooth" }), description: "Scroll down" },
    { command: "scroll up", action: () => window.scrollBy({ top: -500, behavior: "smooth" }), description: "Scroll up" },
    { command: "go home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }), description: "Go to top" },
    { command: "dark mode", action: () => document.documentElement.classList.add("dark"), description: "Enable dark mode" },
    { command: "light mode", action: () => document.documentElement.classList.remove("dark"), description: "Enable light mode" },
    ...commands,
  ];

  useEffect(() => {
    // Check for browser support
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      }
    }
  }, []);

  const speak = useCallback((text: string) => {
    if ("speechSynthesis" in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  }, []);

  const processCommand = useCallback((text: string) => {
    const normalizedText = text.toLowerCase().trim();
    
    for (const cmd of defaultCommands) {
      if (normalizedText.includes(cmd.command)) {
        cmd.action();
        setFeedback(`Executing: ${cmd.description}`);
        speak(`Okay, ${cmd.description}`);
        setTimeout(() => setFeedback(null), 2000);
        return true;
      }
    }

    // No command matched
    setFeedback(`Command not recognized: "${text}"`);
    speak("Sorry, I didn't understand that command");
    setTimeout(() => setFeedback(null), 3000);
    return false;
  }, [defaultCommands, speak]);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const transcriptText = result[0].transcript;
      setTranscript(transcriptText);

      if (result.isFinal) {
        processCommand(transcriptText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setFeedback("Microphone access denied. Please allow microphone access.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [isSupported, processCommand]);

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <>
      {/* Floating Voice Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2"
      >
        {/* Help Button */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
        </button>

        {/* Main Voice Button */}
        <motion.button
          onClick={isListening ? undefined : startListening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-full shadow-lg transition-colors ${
            isListening
              ? "bg-red-500 animate-pulse"
              : "bg-gradient-to-r from-cyan-500 to-purple-500"
          }`}
        >
          {isListening ? (
            <Mic className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </motion.button>

        {/* Speaking Indicator */}
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="p-3 rounded-full bg-purple-500 text-white"
          >
            <VolumeX className="w-5 h-5" />
          </button>
        )}
      </motion.div>

      {/* Listening Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setIsListening(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-white/20 rounded-2xl p-8 max-w-md mx-4 text-center"
            >
              {/* Animated Rings */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute inset-0 rounded-full bg-cyan-500"
                />
                <motion.div
                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                  className="absolute inset-0 rounded-full bg-purple-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Mic className="w-12 h-12 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">Listening...</h3>
              <p className="text-white/60 mb-4">
                {transcript || "Say a command like 'go to projects'"}
              </p>

              <button
                onClick={() => setIsListening(false)}
                className="text-white/40 hover:text-white text-sm"
              >
                Click anywhere to cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-40 right-6 z-50 w-72 bg-gray-900 border border-white/20 rounded-xl p-4 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-white">Voice Commands</h4>
              <button onClick={() => setShowHelp(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {defaultCommands.slice(0, 9).map((cmd, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-white/80">"{cmd.command}"</span>
                  <span className="text-white/40 text-xs">{cmd.description}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm"
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
