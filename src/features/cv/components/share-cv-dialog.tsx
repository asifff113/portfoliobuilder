"use client";

/**
 * Share CV Dialog
 * 
 * Allows users to share their CV via:
 * - Public link
 * - QR code
 * - Direct download links
 * - Social sharing
 */

import { useState, useEffect, useCallback } from "react";
import { 
  Share2, 
  Copy, 
  Check, 
  QrCode, 
  Globe, 
  Lock, 
  Eye,
  Download,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  RefreshCw,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCVStore } from "../store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ShareCVDialogProps {
  cvId: string | null;
}

export function ShareCVDialog({ cvId }: ShareCVDialogProps) {
  const { meta, updateMeta } = useCVStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Generate the shareable URL
  const shareUrl = cvId 
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/cv/${cvId}`
    : null;

  // Generate QR code using a free API
  const generateQRCode = useCallback(async () => {
    if (!shareUrl) return;
    
    setIsGeneratingQR(true);
    try {
      // Using QR Server API (free, no auth required)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shareUrl)}&bgcolor=1a1a2e&color=00f0ff`;
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setIsGeneratingQR(false);
    }
  }, [shareUrl]);

  // Generate QR code when dialog opens
  useEffect(() => {
    if (isOpen && shareUrl && !qrCodeUrl) {
      generateQRCode();
    }
  }, [isOpen, shareUrl, qrCodeUrl, generateQRCode]);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy link");
    }
  };

  const handleTogglePublic = () => {
    updateMeta({ isPublic: !meta.isPublic });
    toast.success(meta.isPublic ? "CV is now private" : "CV is now public");
  };

  const handleShareTwitter = () => {
    if (!shareUrl) return;
    const text = `Check out my CV! ${meta.title || 'My Resume'}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleShareLinkedIn = () => {
    if (!shareUrl) return;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleShareEmail = () => {
    if (!shareUrl) return;
    const subject = `${meta.title || 'My CV'} - Check it out!`;
    const body = `Hi,\n\nI wanted to share my CV with you:\n\n${shareUrl}\n\nBest regards`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `cv-qr-${cvId || 'code'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR code downloaded!");
  };

  if (!cvId) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-neon-cyan" />
            Share Your CV
          </DialogTitle>
          <DialogDescription>
            Share your CV with recruiters, colleagues, or on social media.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Visibility Toggle */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
            <div className="flex items-center gap-3">
              {meta.isPublic ? (
                <Globe className="h-5 w-5 text-green-400" />
              ) : (
                <Lock className="h-5 w-5 text-yellow-400" />
              )}
              <div>
                <p className="font-medium">
                  {meta.isPublic ? "Public" : "Private"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {meta.isPublic 
                    ? "Anyone with the link can view" 
                    : "Only you can view this CV"}
                </p>
              </div>
            </div>
            <Switch
              checked={meta.isPublic}
              onCheckedChange={handleTogglePublic}
            />
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <Label>Share Link</Label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={shareUrl || ""}
                className="bg-white/5"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(shareUrl || '', '_blank')}
                className="shrink-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* QR Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                QR Code
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateQRCode}
                disabled={isGeneratingQR}
              >
                <RefreshCw className={cn("h-4 w-4", isGeneratingQR && "animate-spin")} />
              </Button>
            </div>
            <div className="flex items-center justify-center rounded-lg bg-white p-4">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="CV QR Code"
                  className="h-40 w-40"
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center text-muted-foreground">
                  {isGeneratingQR ? "Generating..." : "No QR code"}
                </div>
              )}
            </div>
            {qrCodeUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQR}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
            )}
          </div>

          {/* Social Sharing */}
          <div className="space-y-2">
            <Label>Share on Social Media</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShareLinkedIn}
              >
                <Linkedin className="mr-2 h-4 w-4 text-[#0077B5]" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShareTwitter}
              >
                <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleShareEmail}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>

          {/* View Stats (placeholder) */}
          <div className="rounded-lg border border-white/10 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>View statistics coming soon</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

