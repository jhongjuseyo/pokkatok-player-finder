const express = require('express')
const axios = require('axios')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120 })
app.use(limiter)

app.get('/health', (req, res) => res.json({ ok: true }))

app.get('/api/players', async (req, res) => {
  const server = req.query.server
  if (!server) return res.status(400).json({ error: 'server query parameter required (ip:port)' })
  if (!/^[a-z0-9.\-:\[\]]+$/i.test(server)) return res.status(400).json({ error: 'invalid server' })

  const url = `http://${server}/players.json`
  try {
    const r = await axios.get(url, { timeout: 5000 })
    return res.json(r.data)
  } catch (e) {
    const status = e.response ? e.response.status : 502
    return res.status(status).json({ error: `failed to fetch players.json: ${e.message}` })
  }
})

// optional serve frontend build
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(frontendPath))
app.get('*', (req, res) => {
  const index = path.join(frontendPath, 'index.html')
  if (fs.existsSync(index)) return res.sendFile(index)
  return res.status(404).json({ error: 'Not found' })
})

app.listen(PORT, () => console.log(`✅ pokkatok-player-finder backend listening on port ${PORT}`))
