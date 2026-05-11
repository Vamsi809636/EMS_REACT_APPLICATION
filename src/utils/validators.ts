export const required = (value: string, label: string) =>
  value.trim() ? '' : `${label} is required`;

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
