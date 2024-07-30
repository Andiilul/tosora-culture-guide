export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const weekday = weekdays[date.getDay()];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const timezoneOffset = -date.getTimezoneOffset();
  const timezoneHour = Math.floor(Math.abs(timezoneOffset) / 60);
  const timezoneSign = timezoneOffset >= 0 ? '+' : '-';
  const formattedTimezone = `GMT${timezoneSign}${timezoneHour}`;

  return `${weekday}, ${month} ${day} ${year} - ${hours}:${minutes} ${formattedTimezone}`;
};