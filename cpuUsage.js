const os = require('os');

let prevCpuTimes = [];

const updateCpuUsage = () => {
  try {
    const { model } = os.cpus()[0];
    const cpuUsage = getCPUUsage();
    const cpuUsagePercentage = cpuUsage.toFixed(1);

    const cpuUsageElement = document.getElementById('cpuUsage');
    cpuUsageElement.textContent = `CPU: ${model} Ishlatilishi: ${cpuUsagePercentage}%`;
  } catch (error) {
    console.error('Error getting CPU usage:', error);
  }
};

const getCPUUsage = () => {
  const cpus = os.cpus();

  if (!prevCpuTimes.length) {
    prevCpuTimes = cpus.map((cpu) => ({ idle: cpu.times.idle, total: getTotalTime(cpu.times) }));
    return 0;
  }

  const currentCpuTimes = cpus.map((cpu) => ({ idle: cpu.times.idle, total: getTotalTime(cpu.times) }));
  const cpuUsage = calculateCpuUsage(prevCpuTimes, currentCpuTimes);
  prevCpuTimes = currentCpuTimes;

  return cpuUsage;
};

const getTotalTime = (times) => Object.values(times).reduce((acc, time) => acc + time, 0);

const calculateCpuUsage = (prevTimes, currentTimes) => {
  const idleDiff = currentTimes.reduce((acc, cpu, index) => acc + (cpu.idle - prevTimes[index].idle), 0);
  const totalDiff = currentTimes.reduce((acc, cpu, index) => acc + (cpu.total - prevTimes[index].total), 0);

  const usagePercentage = ((totalDiff - idleDiff) / totalDiff) * 100;

  return usagePercentage;
};

setInterval(updateCpuUsage, 1000);
