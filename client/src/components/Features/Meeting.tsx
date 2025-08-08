import { VideoIcon } from "lucide-react";
import { useState } from "react";

interface MeetingProps {
  onSendMessage: (message: string) => void;
}

const Meeting: React.FC<MeetingProps> = ({ onSendMessage }) => {
  const [copied, setCopied] = useState(false);

  const handleStartMeeting = () => {
    const meetURL = "https://meet.google.com/new";

    // Open Google Meet link in new tab
    window.open(meetURL, "_blank");

    // Copy link to clipboard
    navigator.clipboard.writeText(meetURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    // Send message to chat
    onSendMessage(`📹 Google Meet started!\nLink: ${meetURL}`);
  };

  return (
    <div className="relative">
      <button
        onClick={handleStartMeeting}
        title="Start Google Meet"
        className="text-indigo-600 hover:text-indigo-800 transition"
      >
        <VideoIcon className="w-6 h-6" />
      </button>
      {copied && (
        <span className="absolute -top-6 left-0 text-xs text-green-500 animate-pulse">
          Link copied!
        </span>
      )}
    </div>
  );
};

export default Meeting;
