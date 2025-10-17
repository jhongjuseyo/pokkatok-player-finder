# 💜 POKKATOK Player Finder

เว็บเช็กผู้เล่นบนเซิร์ฟเวอร์ **FiveM** แบบเรียลไทม์ — สร้างด้วย React + Tailwind + Framer Motion  
และมี API Proxy backend ด้วย Express.js

---

## 🚀 วิธี Deploy ฟรี

### 1️⃣ Backend (Render)
1. สมัครที่ [https://render.com](https://render.com)
2. สร้าง Web Service ใหม่
3. Root Directory → `backend`
4. Build Command → `npm install`
5. Start Command → `node index.js`
6. รอ Deploy แล้วจะได้ URL เช่น  
   `https://pokkatok-player-finder-backend.onrender.com`

---

### 2️⃣ Frontend (Vercel)
1. สมัครที่ [https://vercel.com](https://vercel.com)
2. สร้างโปรเจกต์ใหม่จาก GitHub เดียวกัน
3. Root Directory → `frontend`
4. เพิ่ม Environment Variable:
   - `VITE_API_BASE=https://pokkatok-player-finder-backend.onrender.com`
5. Deploy ได้เลย 🎉

---

### 3️⃣ ปลุก Render ไม่ให้หลับ (Optional)
- ใช้ [https://uptimerobot.com](https://uptimerobot.com)  
  Ping ไปที่ backend URL ทุก 5 นาที เพื่อให้ Render ตื่นตลอดเวลา

---

### 4️⃣ รันทดสอบในเครื่อง
```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

แล้วเปิดเบราว์เซอร์ไปที่ http://localhost:5173

---

Made with 💜 by POKKATOK
