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
