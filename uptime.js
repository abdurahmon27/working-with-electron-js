const os = require('os');

const updateUptime = () => {
  try {
    const uptimeInSeconds = os.uptime();
    const formattedUptime = formatUptime(uptimeInSeconds);
    const uptimeElement = document.getElementById('uptime');
    uptimeElement.textContent = `Qurilma  ${formattedUptime}dan beri ishlamoqda`;
  } catch (error) {
    console.error('Error getting system uptime:', error);
  }
};

const formatUptime = (uptimeInSeconds) => {
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

setInterval(updateUptime, 1000);
