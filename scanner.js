const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const btn = document.getElementById("captureBtn");

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "environment" }
})
.then(stream => {
  video.srcObject = stream;
})
.catch(err => alert("Camera access denied"));

btn.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const image = canvas.toDataURL("image/png");
  download(image);
};

function download(data) {
  const a = document.createElement("a");
  a.href = data;
  a.download = "scan.png";
  a.click();
}
