export const getDayFromDate = (date: string) => {
  const newDate = new Date(date);
  const day = newDate.toLocaleDateString("en-US", {
    weekday: "short",
  });
  return day.toString();
};

export const calcAverage = (...numbers: number[]) => {
  if (numbers.length === 0) return;

  const sum = numbers.reduce((a, b) => a + b, 0);
  const average = sum / numbers.length;
  return average;
};
