* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: #fff;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

/* FLOATING BUBBLES */
.bubble {
  position: absolute;
  width: 45px;
  height: 45px;
  background: rgba(0,0,0,0.06);
  border-radius: 50%;
  animation: float 16s infinite linear;
}
.bubble:nth-child(1){ left:15%; }
.bubble:nth-child(2){ left:55%; animation-delay:5s; }
.bubble:nth-child(3){ left:80%; animation-delay:9s; }

@keyframes float {
  from { top:110%; }
  to { top:-20%; }
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scanner {
  position: relative;
  width: 90%;
  max-width: 380px;
  height: 520px;
  border-radius: 20px;
  overflow: hidden;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* A4 FRAME */
.frame {
  position: absolute;
  top: 10%;
  left: 8%;
  width: 84%;
  height: 80%;
  border: 2px dashed #999;
  border-radius: 12px;
}

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
  
