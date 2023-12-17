//Clock

function updateClock() {
  const clockElement = document.getElementById("clock");
  const dayElement = document.getElementById("day");
  const daysOfWeek = [
    "Yakshanaba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ];

  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const day = currentTime.getDay();
  const date = currentTime.getDate();
  const month = currentTime.getMonth();
  const year = currentTime.getFullYear();

  const formatNumber = (num) => (num < 10 ? `0${num}` : num);
  const formattedHours = formatNumber(hours);
  const formattedMinutes = formatNumber(minutes);
  const formattedSeconds = formatNumber(seconds);

  clockElement.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  dayElement.textContent = `${daysOfWeek[day]}, ${formatNumber(date)} ${
    months[month]
  } ${year}`;
}

setInterval(updateClock, 1000);

//RamUsage

const os = require("os");

const updateRamUsage = () => {
  const ramUsageElement = document.getElementById("ramUsage");
  try {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    const usedMemoryGB = (usedMemory / Math.pow(1024, 3)).toFixed(1);
    const totalMemoryGB = (totalMemory / Math.pow(1024, 3)).toFixed(1);

    ramUsageElement.textContent = `RAM ishlatilishi: ${usedMemoryGB}/${totalMemoryGB}GB`;
  } catch (error) {
    console.error("Error getting RAM usage:", error);
  }
};

setInterval(updateRamUsage, 1000);

//Uptime

const updateUptime = () => {
  try {
    const uptimeInSeconds = os.uptime();
    const formattedUptime = formatUptime(uptimeInSeconds);
    const uptimeElement = document.getElementById("uptime");
    uptimeElement.textContent = `Qurilma  ${formattedUptime}dan beri ishlamoqda`;
  } catch (error) {
    console.error("Error getting system uptime:", error);
  }
};

const formatUptime = (uptimeInSeconds) => {
  const hours = Math.floor(uptimeInSeconds / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

setInterval(updateUptime, 1000);

//CpuUsage

let prevCpuTimes = [];

const updateCpuUsage = () => {
  try {
    const { model } = os.cpus()[0];
    const cpuUsage = getCPUUsage();
    const cpuUsagePercentage = cpuUsage.toFixed(1);

    const cpuUsageElement = document.getElementById("cpuUsage");
    cpuUsageElement.textContent = `CPU: ${model} Ishlatilishi: ${cpuUsagePercentage}%`;
  } catch (error) {
    console.error("Error getting CPU usage:", error);
  }
};

const getCPUUsage = () => {
  const cpus = os.cpus();

  if (!prevCpuTimes.length) {
    prevCpuTimes = cpus.map((cpu) => ({
      idle: cpu.times.idle,
      total: getTotalTime(cpu.times),
    }));
    return 0;
  }

  const currentCpuTimes = cpus.map((cpu) => ({
    idle: cpu.times.idle,
    total: getTotalTime(cpu.times),
  }));
  const cpuUsage = calculateCpuUsage(prevCpuTimes, currentCpuTimes);
  prevCpuTimes = currentCpuTimes;

  return cpuUsage;
};

const getTotalTime = (times) =>
  Object.values(times).reduce((acc, time) => acc + time, 0);

const calculateCpuUsage = (prevTimes, currentTimes) => {
  const idleDiff = currentTimes.reduce(
    (acc, cpu, index) => acc + (cpu.idle - prevTimes[index].idle),
    0
  );
  const totalDiff = currentTimes.reduce(
    (acc, cpu, index) => acc + (cpu.total - prevTimes[index].total),
    0
  );

  const usagePercentage = ((totalDiff - idleDiff) / totalDiff) * 100;

  return usagePercentage;
};

setInterval(updateCpuUsage, 1000);

//diskUage

const disk = require("diskusage");

const diskUsageElement = document.getElementById("diskUsage");

const updateDiskUsage = () => {
  disk.check("/", function (err, info) {
    if (err) {
      diskUsageElement.textContent = "Error getting disk usage information";
      return;
    }

    const usedSpaceInPercentage = ((info.total - info.free) / info.total) * 100;
    const freeSpaceInPercentage = (info.free / info.total) * 100;

    diskUsageElement.textContent = `Sizning C diskingiz: ${usedSpaceInPercentage.toFixed(
      1
    )}% egallangan / ${freeSpaceInPercentage.toFixed(1)}% bo'sh`;
  });
};
updateDiskUsage();
setInterval(updateDiskUsage, 60000);
