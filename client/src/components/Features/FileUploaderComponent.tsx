// src/components/Features/FileUploaderComponent.tsx
import React, { useState } from "react";
import {
  Paperclip,
  FileImage,
  FileText,
  Music,
  MapPin,
  Contact,
  MoreHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Media", icon: FileImage, color: "bg-indigo-100" },
  { name: "Documents", icon: FileText, color: "bg-green-100" },
  { name: "Audio", icon: Music, color: "bg-yellow-100" },
  { name: "Location", icon: MapPin, color: "bg-red-100" },
  { name: "Contact", icon: Contact, color: "bg-blue-100" },
  { name: "More", icon: MoreHorizontal, color: "bg-gray-100" },
];

export default function FileUploaderComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileClick = (category: string) => {
    alert(`You clicked ${category}`);
    // handle actual file input or route to category
  };

  return (
    <div className="relative">
      {/* Expanding category buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-14 left-0 flex flex-col items-start gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }}
            exit={{ opacity: 0, y: 10 }}
          >
            {categories.map((cat, idx) => (
              <motion.button
                key={cat.name}
                onClick={() => handleFileClick(cat.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm ${cat.color} hover:scale-105 transition`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <cat.icon size={18} />
                <span className="text-sm font-medium">{cat.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Clip Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition shadow"
      >
        <Paperclip size={20} />
      </motion.button>
    </div>
  );
}
