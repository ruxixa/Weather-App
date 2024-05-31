const ipc = require('electron').ipcRenderer

const closeButton = document.getElementById("close");
const minimizeButton = document.getElementById("minimize");

closeButton.addEventListener("click", () => {
  ipc.send('close')
});

minimizeButton.addEventListener("click", () => {
  ipc.send('minimize')
});