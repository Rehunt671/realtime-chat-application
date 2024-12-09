export const FormatChatDate = (dateObj: Date) => {
  const formattedDate = new Date(dateObj).toLocaleDateString("en-US", {
    weekday: "short", // "Mon", "Tue", etc.
    month: "short", // "Dec", "Jan", etc.
    day: "numeric", // Day of the month (e.g., "2")
    year: "numeric", // Year (e.g., "2024")
  });

  const formattedTime = new Date(dateObj).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });

  return `${formattedDate} at ${formattedTime}`;
};
