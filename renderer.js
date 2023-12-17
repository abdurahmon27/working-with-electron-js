function updateClock() {
  const clockElement = document.getElementById('clock');
  const dayElement = document.getElementById('day');
  const daysOfWeek = ['Yakshanaba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

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
  dayElement.textContent = `${daysOfWeek[day]}, ${formatNumber(date)} ${months[month]} ${year}`;
}

setInterval(updateClock, 1000);
