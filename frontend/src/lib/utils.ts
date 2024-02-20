export const formattedDate = (stringDate: Date) => {
  const date = new Date(stringDate);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month is zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
