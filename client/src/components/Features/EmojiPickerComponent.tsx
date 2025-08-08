// src/components/EmojiPickerComponent.tsx
import React from "react";
import EmojiPicker from "emoji-picker-react";

type EmojiPickerProps = {
  onEmojiClick: (emojiData: any) => void;
};

const EmojiPickerComponent: React.FC<EmojiPickerProps> = ({ onEmojiClick }) => {
  return (
    <div className="absolute bottom-20 left-4 z-50">
      <EmojiPicker
        theme="light"
        onEmojiClick={onEmojiClick}
        height={350}
        width={300}
      />
    </div>
  );
};

export default EmojiPickerComponent;
