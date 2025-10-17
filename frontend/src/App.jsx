import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IpChecker() {
  const [ip, setIp] = useState("146.19.69.69:30120");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(false);
  const [search, setSearch] = useState("");

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
      setError("Unable to connect to the server :-(");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 text-gray-800 px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-pink-600 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        pok ka tok (✿ᴗ͈ˬᴗ͈)⁾⁾
      </motion.h1>

      {/* ✅ Layout 2 ฝั่ง */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 grid md:grid-cols-2 gap-6"
      >
        {/* 🔹 ฝั่งซ้าย: Connect Box */}
        <div className="flex flex-col justify-center text-center border-r border-pink-200 pr-6">
          <p className="text-sm text-gray-600 mb-4">
            กำลังเชื่อมต่อกับ IP:{" "}
            <span className="font-semibold">{ip}</span>
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
                className="text-green-600 font-medium"
              >
                ✅ เชื่อมต่อสำเร็จ
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 ฝั่งขวา: Player List */}
<div className="bg-white/80 rounded-2xl shadow-inner p-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100 transition-all duration-300">
  <h2 className="font-semibold text-pink-600 mb-2 text-center">
    รายชื่อผู้เล่น ({players.length})
  </h2>

  {/* ✅ ช่องค้นหา */}
  <input
    type="text"
    placeholder="🔍 ค้นหาชื่อผู้เล่น..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border border-pink-200 rounded-xl px-3 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
  />

  {/* ✅ รายชื่อคงขนาดกล่อง */}
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
            initial={{ opacity: 0, backgroundColor: "#fce7f3" }}
            animate={{ opacity: 1, backgroundColor: "#fff0f6" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-pink-100 px-3 py-1 rounded-lg shadow-sm"
          >
            {p.name || "Unknown Player"}
          </motion.li>
        ))}
    </AnimatePresence>
  </ul>

  {/* ✅ ข้อความเมื่อไม่พบผู้เล่น */}
  {players.filter((p) =>
    (p.name || "Unknown Player")
      .toLowerCase()
      .includes(search.toLowerCase())
  ).length === 0 && (
    <p className="text-gray-400 text-sm text-center mt-2">
      ไม่พบผู้เล่นที่ค้นหา
    </p>
  )}
</div>


      <footer className="mt-6 text-xs text-gray-500">
        ห้ามส่งต่อนะครัฟ อิ____อิ
      </footer>
    </div>
  );
}
