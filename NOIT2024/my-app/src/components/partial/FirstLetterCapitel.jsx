export const CapitalizeFirstLowercaseRest = (str) => {
  if (!str) return '';

  // Convert the first character to uppercase and the rest to lowercase using toLocaleUpperCase
  const firstChar = str.charAt(0).toLocaleUpperCase('bg-BG');
  const restChars = str.slice(1).toLocaleLowerCase('bg-BG');

  return firstChar + restChars;
};