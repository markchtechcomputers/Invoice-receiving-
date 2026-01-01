const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Scanner running on http://localhost:${PORT}`);
});

/* SCAN LINE */
.scan-line {
  position: absolute;
  left: 8%;
  width: 84%;
  height: 4px;
  background: linear-gradient(to right, transparent, #00ff00, transparent);
  animation: scan 2.5s linear infinite;
  opacity: 0.4;
}

.ready .scan-line {
  opacity: 1;
}

@keyframes scan {
  from { top: 10%; }
  to { top: 90%; }
}

.status {
  position: absolute;
  bottom: 12px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #333;
}

canvas {
  display: none;
}
  
