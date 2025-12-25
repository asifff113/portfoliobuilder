"use client";

import { motion } from "framer-motion";
import { Download, QrCode, CheckCircle } from "lucide-react";

interface CvSectionBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    cvUrl?: string;
    showQrCode?: boolean;
    showDownloadCount?: boolean;
    buttonText?: string;
    summary?: string;
    highlights?: string[];
  };
  accentColor?: string;
}

export function CvSectionBlock({ config, accentColor = "#06b6d4" }: CvSectionBlockProps) {
  const downloadCount = 234; // Mock data

  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-4">
                {config.title || "Download My CV"}
              </h2>
              
              {config.summary && (
                <p className="text-white/60 mb-6">{config.summary}</p>
              )}

              {config.highlights && config.highlights.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {config.highlights.map((highlight, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-white/70"
                    >
                      <CheckCircle 
                        className="w-5 h-5 shrink-0 mt-0.5" 
                        style={{ color: accentColor }} 
                      />
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap items-center gap-4">
                {config.cvUrl && (
                  <motion.a
                    href={config.cvUrl}
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Download className="w-5 h-5" />
                    {config.buttonText || "Download PDF"}
                  </motion.a>
                )}
                
                {config.showDownloadCount && (
                  <span className="text-white/40 text-sm">
                    {downloadCount.toLocaleString()} downloads
                  </span>
                )}
              </div>
            </div>

            {/* QR Code */}
            {config.showQrCode && config.cvUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 rounded-xl bg-white p-2">
                  {/* Simple QR code placeholder - in production, use a QR library */}
                  <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">Scan to download</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
