const disk = require('diskusage');

const diskUsageElement = document.getElementById('diskUsage');

const updateDiskUsage = () => {
  disk.check('/', function (err, info) {
    if (err) {
      diskUsageElement.textContent = 'Error getting disk usage information';
      return;
    }

    const usedSpaceInPercentage = (info.total - info.free) / info.total * 100;
    const freeSpaceInPercentage = info.free / info.total * 100;

    diskUsageElement.textContent = `Sizning C diskingiz: ${usedSpaceInPercentage.toFixed(1)}% egallangan / ${freeSpaceInPercentage.toFixed(1)}% bo'sh`;
  });
};
updateDiskUsage();
setInterval(updateDiskUsage, 60000);
