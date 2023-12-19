export default function getNotificationTime() {
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const ampm = hours >= 12 ? "PM" : "AM";

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
