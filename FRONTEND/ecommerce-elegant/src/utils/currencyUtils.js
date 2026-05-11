export const formatPrice = (price, currency) => {
  if (!currency) {
    return `$${price.toFixed(2)}`; // Fallback to USD format
  }
  const { symbol, rate } = currency;
  const convertedPrice = price * (rate || 1);
  
  return `${symbol || '$'}${convertedPrice.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
