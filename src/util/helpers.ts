export const getDayFromDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return day.toString();
};
