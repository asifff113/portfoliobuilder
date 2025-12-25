"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, RotateCcw, ZoomIn, ZoomOut, Move, X, Maximize2 } from "lucide-react";

interface ARPortfolioViewerProps {
  projectImage?: string;
  projectTitle?: string;
  projectUrl?: string;
}

export function ARPortfolioViewer({ projectImage, projectTitle, projectUrl }: ARPortfolioViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse/touch movement for 3D rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isDragging) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateY = ((e.clientX - centerX) / rect.width) * 30;
    const rotateX = ((centerY - e.clientY) / rect.height) * 30;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      {/* AR Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg"
      >
        <Smartphone className="w-6 h-6 text-white" />
      </motion.button>

      {/* AR Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl mx-4"
            >
              {/* Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                  onClick={() => setScale(Math.min(scale + 0.2, 2))}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setScale(Math.max(scale - 0.2, 0.5))}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={resetView}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 3D Card Container */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="perspective-1000 py-20"
              >
                <motion.div
                  style={{
                    transform: `
                      perspective(1000px)
                      rotateX(${rotation.x}deg)
                      rotateY(${rotation.y}deg)
                      scale(${scale})
                      translate(${position.x}px, ${position.y}px)
                    `,
                    transformStyle: "preserve-3d",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="mx-auto"
                >
                  {/* Phone Frame */}
                  <div className="relative w-80 mx-auto">
                    {/* Phone Bezel */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl" 
                         style={{ transform: "translateZ(-10px)" }} />
                    
                    {/* Screen */}
                    <div className="relative rounded-[2.5rem] overflow-hidden bg-black p-3">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-10" />
                      
                      {/* Screen Content */}
                      <div className="rounded-[2rem] overflow-hidden bg-gray-900 aspect-[9/19.5]">
                        {projectImage ? (
                          <img 
                            src={projectImage} 
                            alt={projectTitle || "Project"} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 mb-4 flex items-center justify-center">
                              <Maximize2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">
                              {projectTitle || "Your Portfolio"}
                            </h3>
                            <p className="text-white/50 text-sm">
                              AR Preview Mode
                            </p>
                            <p className="text-xs text-white/30 mt-4">
                              Move your mouse to rotate
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Reflection */}
                    <div 
                      className="absolute -bottom-20 left-0 right-0 h-20 rounded-[2.5rem] opacity-20 blur-sm"
                      style={{
                        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                        transform: "rotateX(180deg) translateZ(-1px)",
                      }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Info */}
              <div className="text-center text-white/60 text-sm mt-4">
                <p>Move your mouse to rotate • Scroll to zoom</p>
                {projectUrl && (
                  <a 
                    href={projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline mt-2 inline-block"
                  >
                    View Live Project →
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// QR Code for AR viewing on mobile
export function ARQRCode({ url }: { url: string }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-center">
      <div className="w-32 h-32 mx-auto bg-white rounded-lg p-2 mb-3">
        {/* Placeholder QR - in production use qrcode.react or similar */}
        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
          <Smartphone className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <p className="text-sm text-white/60">Scan to view in AR on your phone</p>
    </div>
  );
}
