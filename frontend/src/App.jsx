import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IpChecker() {
  // ✅ Default IP
  const [ip, setIp] = useState("146.19.69.69:30120");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const [search, setSearch] = useState("");

  // Auto-connect when page loads
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
      setError("Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 text-gray-800 px-4">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 text-center grid md:grid-cols-2 gap-6"
      >
        {/* 🔹 Left Section: Connection */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-pink-400 mb-4">
            pok ka tok
            #รู้พิกัด (✿ᴗ͈ˬᴗ͈)⁾⁾
          </h1>

          <p className="text-sm text-gray-600 mb-6">

          </p>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="flex-1 border border-sky-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"

            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleConnect}
              disabled={loading}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                loading
                  ? "bg-sky-300 cursor-wait"
                  : "bg-gradient-to-r from-sky-400 to-sky-600 hover:opacity-90 text-white shadow-md"
              }`}

            >
              {loading ? "Connecting..." : "Connect"}
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
                className="text-zinc-900 font-medium mb-4"
              >
              ♡ ♡ ♡
              </motion.p>
            )}
          </AnimatePresence>

          {!players.length && connected && !loading && (
            <p className="text-gray-500 text-sm">
              No players currently online
            </p>
          )}
        </motion.div>

        {/* 🔹 Right Section: Player List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 rounded-2xl shadow-inner p-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 transition-all duration-300"
        >
          <h2 className="font-semibold text-pink-400 mb-2 text-center">
            Player List ({players.length})
          </h2>

          {/* ✅ Search Box */}
          <input
            type="text"
            placeholder="Search player name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-sky-300 rounded-xl px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"

          />

          {/* ✅ Player List */}
          <ul className="space-y-1 text-left text-sm min-h-[250px]">
            <AnimatePresence>
              {players
                .filter((p) =>
                  (p.name || "Unknown Player")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((p, i) => (
                  <motion.li
                    key={p.id || p.name || i}
                    layout
                    initial={{ opacity: 0, backgroundColor: "#fbcfe8" }}
                    animate={{ opacity: 1, backgroundColor: "#fff0f6" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border border-sky-200 px-3 py-1 rounded-lg shadow-sm"

                  >
                    {p.name || "Unknown Player"}
                  </motion.li>
                ))}
            </AnimatePresence>
          </ul>

          {/* ✅ Message when no players found */}
          {players.filter((p) =>
            (p.name || "Unknown Player")
              .toLowerCase()
              .includes(search.toLowerCase())
          ).length === 0 && (
            <p className="text-gray-400 text-sm text-center mt-2">
              No players found
            </p>
          )}
        </motion.div>
      </motion.div>

      <footer className="mt-6 text-xs text-gray-500">
        ห้ามส่งต่อนะครัฟ อิ____อิ
      </footer>
    </div>
  );
}
