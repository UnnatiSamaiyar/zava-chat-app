import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const [percent, setPercent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/login"), 500); // go to login after done
          return 100;
        }
        return prev + 1;
      });
    }, 20); // speed of loading

    return () => clearInterval(interval);
  }, []);

  return (
     <div className="h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1
          className="text-white text-6xl sm:text-7xl font-extrabold tracking-[0.2em] animate-fade-in"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ZAVA.CHAT
        </h1>
        <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-75 ease-linear"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-gray-300 text-sm tracking-wider animate-pulse">
          Loading {percent}%
        </p>
      </div>
    </div>
  );
}
