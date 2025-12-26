export const formatCurrency = (amount: number, currency = "KES"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// Formats a date to a readable string
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Formats a time to a readable string
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// Combines date and time formatting
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

const formatPhoneNumber = (phone: string) => {
  const formatted = phone.replace(/\s+/g, "");

  if (formatted.startsWith("+")) {
    formatted.substring(1);
  }

  if (formatted.startsWith("0")) {
    return "254" + formatted.substring(1);
  }

  return formatted;
};

export default formatPhoneNumber;
