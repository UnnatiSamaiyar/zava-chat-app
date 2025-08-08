// src/components/Features/VoiceRecorderComponent.tsx
import React, { useState, useRef } from "react";
import { Mic, StopCircle, PlayCircle } from "lucide-react";

const VoiceRecorderComponent = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (e) => chunks.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      chunks.current = [];
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex items-center gap-3">
      {recording ? (
        <button onClick={stopRecording} className="text-red-500">
          <StopCircle size={28} />
        </button>
      ) : (
        <button onClick={startRecording} className="text-gray-700 hover:text-black">
          <Mic size={28} />
        </button>
      )}

      {audioURL && (
        <audio controls src={audioURL} className="rounded-lg bg-gray-100 p-2" />
      )}
    </div>
  );
};

export default VoiceRecorderComponent;
