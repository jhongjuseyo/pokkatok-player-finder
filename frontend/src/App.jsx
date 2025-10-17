import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [ip, setIp] = useState("146.19.69.69:30120");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    handleConnect();
  }, []);

  const handleConnect = async () => {
    setLoading(true);
    setError("");
    setConnected(false);
    setPlayers([]);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/players?server=${ip}`
      );
      if (!res.ok) throw new Error("Server not found");
      const data = await res.json();
      setPlayers(data);
      setConnected(true);
    } catch (err) {
      setError("❌ ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 text-gray-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center"
      >
        <motion.h1
          className="text-3xl font-bold text-pink-600 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          pok-ka-tok ♡ ♡ 
        </motion.h1>

        <p className="text-sm text-gray-600 mb-6">
          กำลังเชื่อมต่อกับ IP: <span className="font-semibold">{ip}</span>
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="flex-1 border border-pink-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleConnect}
            disabled={loading}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${
              loading
                ? "bg-pink-300 cursor-wait"
                : "bg-gradient-to-r from-pink-400 to-purple-400 hover:opacity-90 text-white shadow-md"
            }`}
          >
            {loading ? "กำลังเชื่อมต่อ..." : "Connect"}
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-red-500 text-sm mb-3"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {connected && !loading && (
            <motion.p
              key="connected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 font-medium mb-4"
            >
              ✅ เชื่อมต่อสำเร็จ: {ip}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {players.length > 0 && (
            <motion.div
              key="players"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-white/80 rounded-2xl shadow-inner p-5 mt-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100"
            >
              <h2 className="font-semibold text-pink-600 mb-2">
                รายชื่อผู้เล่น ({players.length})
              </h2>
              <ul className="space-y-1 text-left text-sm">
                {players.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-pink-50 border border-pink-100 px-3 py-1 rounded-lg"
                  >
                    {p.name || "Unknown Player"}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {!players.length && connected && !loading && (
          <p className="text-gray-500 text-sm">ไม่พบผู้เล่นในเซิร์ฟเวอร์</p>
        )}
      </motion.div>

      <footer className="mt-6 text-xs text-gray-500">
        Made with 💜 by POKKATOK
      </footer>
    </div>
  );
}
