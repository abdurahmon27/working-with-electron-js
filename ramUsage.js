const os = require('os');

const updateRamUsage = () => {
  const ramUsageElement = document.getElementById('ramUsage');
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const usedMemoryGB = (usedMemory / Math.pow(1024, 3)).toFixed(1);
    const totalMemoryGB = (totalMemory / Math.pow(1024, 3)).toFixed(1);

    ramUsageElement.textContent = `RAM ishlatilishi: ${usedMemoryGB}/${totalMemoryGB}GB)`;
  } catch (error) {
    console.error('Error getting RAM usage:', error);
  }
};

setInterval(updateRamUsage, 1000);
