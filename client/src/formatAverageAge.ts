export function formatAverageAge(average: string): string {
  const totalMonths = Math.round(Number(average) * 12);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const yearText = years === 1 ? "1 year" : years + " years";
  const monthText = months === 1 ? "1 month" : months + " months";
  if (months === 0) {
    return yearText;
  }
  if (years === 0) {
    return monthText;
  }
  return yearText + " " + monthText;
}
