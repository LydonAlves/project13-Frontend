export const formatUserFriendlyDate = (dateString) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const parts = dateString.split("-");
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parts[2];

  const monthName = months[month - 1];

  return `${day} ${monthName} ${year}`;
}
