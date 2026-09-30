/* Shared field validation (DS V3: validate on blur; errors as text + orange bar). */

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Vietnamese-style phone: optional +84 / 0 prefix, 9–11 digits in total. */
export const isPhone = (value: string) => /^(\+?84|0)?[\d\s.-]{8,13}$/.test(value.trim()) && value.replace(/\D/g, "").length >= 9;
