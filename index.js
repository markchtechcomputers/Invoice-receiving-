<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Invoice Scanner</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

<div class="scanner-container">
  <video id="camera" autoplay playsinline></video>
  <div class="scan-line"></div>
  <canvas id="canvas"></canvas>
</div>

<button id="captureBtn">Scan Document</button>

<script src="scanner.js"></script>
</body>
</html>

