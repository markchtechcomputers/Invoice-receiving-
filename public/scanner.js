const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");
const scanner = document.getElementById("scanner");

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
}).then(stream => video.srcObject = stream);

let stableFrames = 0;

function analyze() {
  if (!window.cv || video.videoWidth === 0) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);

  let src = cv.imread(canvas);
  let gray = new cv.Mat();
  let blur = new cv.Mat();
  let edges = new cv.Mat();

  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  cv.GaussianBlur(gray, blur, new cv.Size(5,5), 0);
  cv.Canny(blur, edges, 75, 200);

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

  let detected = false;

  for (let i = 0; i < contours.size(); i++) {
    let cnt = contours.get(i);
    let peri = cv.arcLength(cnt, true);
    let approx = new cv.Mat();
    cv.approxPolyDP(cnt, approx, 0.02 * peri, true);

    if (approx.rows === 4 && cv.contourArea(approx) > 60000) {
      detected = true;
    }
    approx.delete(); cnt.delete();
  }

  if (detected) {
    stableFrames++;
    statusText.textContent = "Hold steady…";
    scanner.classList.add("ready");
  } else {
    stableFrames = 0;
    statusText.textContent = "Align document inside frame";
    scanner.classList.remove("ready");
  }

  if (stableFrames > 12) {
    savePDF();
    stableFrames = 0;
  }

  src.delete(); gray.delete(); blur.delete(); edges.delete();
  contours.delete(); hierarchy.delete();
}

function savePDF() {
  statusText.textContent = "Captured ✔ Saving…";
  const img = canvas.toDataURL("image/jpeg", 0.98);

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("p","mm","a4");
  pdf.addImage(img, "JPEG", 0, 0, 210, 297);
  pdf.save("invoice.pdf");

  statusText.textContent = "Saved to device ✔";
}

setInterval(analyze, 400);
    
