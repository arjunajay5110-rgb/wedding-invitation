"use client";

import React, { useState, useEffect } from "react";
import { Share2, Check, Copy } from "lucide-react";

interface ShareButtonProps {
  customUrl?: string;
  title?: string;
  text?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  customUrl,
  title = "Wedding Invitation",
  text = "You are cordially invited to celebrate our sister's wedding!",
}) => {
  const [copied, setCopied] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    // Safely check for browser API support on mount (SSR safe)
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setIsShareSupported(true);
    }
  }, []);

  const getShareUrl = () => {
    if (customUrl) {
      // If a relative URL like /invite/G001 is provided, make it absolute
      if (customUrl.startsWith("/")) {
        return `${window.location.origin}${customUrl}`;
      }
      return customUrl;
    }
    return window.location.href;
  };

  const handleShare = async () => {
    const shareUrl = getShareUrl();

    if (isShareSupported) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={handleShare}
        className="w-full py-2.5 bg-[#FDFBF7] hover:bg-white text-[#1E3F20] border border-[#C5A059]/40 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#C5A059]/5"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-green-600 animate-bounce" />
            Invitation Link Copied!
          </>
        ) : (
          <>
            {isShareSupported ? (
              <Share2 className="w-4 h-4 text-[#C5A059]" />
            ) : (
              <Copy className="w-4 h-4 text-[#C5A059]" />
            )}
            Share Invitation Link
          </>
        )}
      </button>
    </div>
  );
};
export default ShareButton;
