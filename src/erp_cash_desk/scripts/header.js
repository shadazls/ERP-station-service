function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeString = `${hours} : ${minutes}`;
    currentTimeElement.textContent = currentTimeString;
}
  
setInterval(updateCurrentTime, 1000);
  
updateCurrentTime();
  