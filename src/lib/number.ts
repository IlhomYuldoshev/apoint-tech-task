export const formatPrice = (value: number) => {
  return value.toLocaleString("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });
};
