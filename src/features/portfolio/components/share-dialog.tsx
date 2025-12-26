"use client";

import { useState, useEffect } from "react";
import {
  Share2,
  Copy,
  Check,
  QrCode,
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  Code,
  Download,
  FileDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ShareDialogProps {
  slug: string;
  title: string;
  isPublished: boolean;
}

export function ShareDialog({ slug, title, isPublished }: ShareDialogProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingZIP, setIsGeneratingZIP] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  // Use production URL if available, otherwise use current origin
  const getBaseUrl = () => {
    if (typeof window === "undefined") return "";
    
    // Check if we're on localhost - use production URL for sharing
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    
    if (isLocalhost) {
      // Return the production Vercel URL for sharing
      return "https://portfoliobuilder-flax.vercel.app";
    }
    
    return window.location.origin;
  };
  
  const baseUrl = getBaseUrl();
  const portfolioUrl = `${baseUrl}/p/${slug}`;

  // Generate QR code on mount
  useEffect(() => {
    if (slug) {
      // Using QR Server API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioUrl)}&bgcolor=1a1a2e&color=22d3ee`;
      setQrCodeUrl(qrUrl);
    }
  }, [slug, portfolioUrl]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareToSocial = (platform: string) => {
    const encodedUrl = encodeURIComponent(portfolioUrl);
    const encodedTitle = encodeURIComponent(`Check out ${title}'s portfolio!`);

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      email: `mailto:?subject=${encodedTitle}&body=Check out this portfolio: ${encodedUrl}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const embedCode = `<iframe src="${portfolioUrl}" width="100%" height="800" frameborder="0" style="border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"></iframe>`;

  const embedCodeResponsive = `<div style="position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe src="${portfolioUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; border-radius: 12px;" allowfullscreen></iframe>
</div>`;

  const exportAsPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Open portfolio in new window for printing
      const printWindow = window.open(portfolioUrl, "_blank");
      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print();
          }, 1500); // Give time for styles to load
        };
      }
    } catch (error) {
      console.error("Failed to export PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const downloadAsZIP = async () => {
    setIsGeneratingZIP(true);
    try {
      // Create a simple HTML file with embedded styles
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { 
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
    }
  </style>
</head>
<body>
  <div style="padding: 2rem; text-align: center;">
    <h1 style="font-size: 2rem; font-weight: bold; color: #22d3ee; margin-bottom: 1rem;">${title}</h1>
    <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem;">Portfolio exported from AMCV</p>
    <p style="color: rgba(255,255,255,0.5);">
      To view the full interactive portfolio, visit: 
      <a href="${portfolioUrl}" style="color: #a855f7;">${portfolioUrl}</a>
    </p>
    <iframe 
      src="${portfolioUrl}" 
      style="width: 100%; height: 80vh; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; margin-top: 2rem;"
    ></iframe>
  </div>
</body>
</html>`;

      // Create and download the HTML file
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${slug}-portfolio.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download:", error);
    } finally {
      setIsGeneratingZIP(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const a = document.createElement("a");
      a.href = qrCodeUrl;
      a.download = `${slug}-qrcode.png`;
      a.target = "_blank";
      a.click();
    }
  };

  if (!isPublished) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="border-white/20 opacity-50"
        title="Publish your portfolio to share it"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-white/20 hover:border-cyan-400 hover:bg-cyan-400/10"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg border-white/10 bg-gray-900/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Share2 className="h-5 w-5 text-cyan-400" />
            Share Your Portfolio
          </DialogTitle>
          <DialogDescription>
            Share your portfolio with the world using these options
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="link" className="data-[state=active]:bg-cyan-500/20">
              Link
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-cyan-500/20">
              Social
            </TabsTrigger>
            <TabsTrigger value="embed" className="data-[state=active]:bg-cyan-500/20">
              Embed
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-cyan-500/20">
              Export
            </TabsTrigger>
          </TabsList>

          {/* Link Tab */}
          <TabsContent value="link" className="space-y-4 mt-4">
            {/* Portfolio URL */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-2 block">
                Portfolio URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={portfolioUrl}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white focus:outline-none"
                />
                <Button
                  onClick={() => copyToClipboard(portfolioUrl, "url")}
                  variant="outline"
                  className="border-white/20 hover:border-cyan-400"
                >
                  {copied === "url" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => window.open(portfolioUrl, "_blank")}
                  variant="outline"
                  className="border-white/20 hover:border-cyan-400"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* QR Code */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-cyan-400" />
                  <span className="font-medium">QR Code</span>
                </div>
                <Button
                  onClick={downloadQRCode}
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
              <div className="flex justify-center">
                {qrCodeUrl ? (
                  <div className="rounded-lg bg-white p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrCodeUrl}
                      alt="Portfolio QR Code"
                      className="h-40 w-40"
                    />
                  </div>
                ) : (
                  <div className="h-40 w-40 animate-pulse rounded-lg bg-white/10" />
                )}
              </div>
              <p className="text-center text-xs text-white/40 mt-3">
                Scan to view portfolio on mobile
              </p>
            </div>
          </TabsContent>

          {/* Social Tab */}
          <TabsContent value="social" className="space-y-4 mt-4">
            <p className="text-sm text-white/60 mb-4">
              Share your portfolio on social media
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => shareToSocial("twitter")}
                variant="outline"
                className="border-white/10 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 hover:border-[#1DA1F2]/50 justify-start"
              >
                <Twitter className="mr-3 h-5 w-5 text-[#1DA1F2]" />
                Twitter / X
              </Button>
              <Button
                onClick={() => shareToSocial("linkedin")}
                variant="outline"
                className="border-white/10 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 justify-start"
              >
                <Linkedin className="mr-3 h-5 w-5 text-[#0A66C2]" />
                LinkedIn
              </Button>
              <Button
                onClick={() => shareToSocial("facebook")}
                variant="outline"
                className="border-white/10 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 hover:border-[#1877F2]/50 justify-start"
              >
                <Facebook className="mr-3 h-5 w-5 text-[#1877F2]" />
                Facebook
              </Button>
              <Button
                onClick={() => shareToSocial("email")}
                variant="outline"
                className="border-white/10 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/50 justify-start"
              >
                <Mail className="mr-3 h-5 w-5 text-purple-400" />
                Email
              </Button>
            </div>

            {/* Native share (mobile) */}
            {typeof navigator !== "undefined" && navigator.share && (
              <Button
                onClick={() =>
                  navigator.share({
                    title: `${title} - Portfolio`,
                    text: `Check out ${title}'s portfolio!`,
                    url: portfolioUrl,
                  })
                }
                className="w-full bg-linear-to-r from-cyan-500 to-purple-500 mt-4"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share via Device
              </Button>
            )}
          </TabsContent>

          {/* Embed Tab */}
          <TabsContent value="embed" className="space-y-4 mt-4">
            <p className="text-sm text-white/60 mb-4">
              Embed your portfolio on any website
            </p>

            {/* Fixed size embed */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-2 block">
                Fixed Size Embed
              </label>
              <div className="relative">
                <textarea
                  readOnly
                  value={embedCode}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white/80 font-mono focus:outline-none resize-none"
                />
                <Button
                  onClick={() => copyToClipboard(embedCode, "embed")}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  {copied === "embed" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Responsive embed */}
            <div>
              <label className="text-sm font-medium text-white/70 mb-2 block">
                Responsive Embed (16:9)
              </label>
              <div className="relative">
                <textarea
                  readOnly
                  value={embedCodeResponsive}
                  rows={4}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white/80 font-mono focus:outline-none resize-none"
                />
                <Button
                  onClick={() => copyToClipboard(embedCodeResponsive, "embedResponsive")}
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  {copied === "embedResponsive" ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3">
              <Code className="h-5 w-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-cyan-200/80">
                Paste this code into your website&apos;s HTML to embed your portfolio
              </p>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-4 mt-4">
            <p className="text-sm text-white/60 mb-4">
              Download your portfolio in different formats
            </p>

            <div className="space-y-3">
              {/* PDF Export */}
              <button
                onClick={exportAsPDF}
                disabled={isGeneratingPDF}
                className="w-full flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-left group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                  <FileDown className="h-6 w-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Export as PDF</p>
                  <p className="text-xs text-white/50">
                    Print-ready version of your portfolio
                  </p>
                </div>
                {isGeneratingPDF && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
                )}
              </button>

              {/* HTML Download */}
              <button
                onClick={downloadAsZIP}
                disabled={isGeneratingZIP}
                className="w-full flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-left group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                  <Download className="h-6 w-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Download HTML</p>
                  <p className="text-xs text-white/50">
                    Standalone HTML file for self-hosting
                  </p>
                </div>
                {isGeneratingZIP && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
                )}
              </button>

              {/* QR Code Download */}
              <button
                onClick={downloadQRCode}
                className="w-full flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition-all text-left group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/20 group-hover:bg-cyan-500/30 transition-colors">
                  <QrCode className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Download QR Code</p>
                  <p className="text-xs text-white/50">
                    PNG image for print materials
                  </p>
                </div>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
