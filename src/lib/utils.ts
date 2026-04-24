/**
 * 1. CLASS JOINER (Zero Dependency)
 * Pengganti cn yang tidak butuh library clsx/tailwind-merge.
 * Cukup untuk menggabungkan class dasar.
 */
export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * 2. CURRENCY FORMATTER (IDR)
 */
export const formatRupiah = (value: number | string) => {
  const numericValue = typeof value === "string" ? parseInt(value) : value;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue || 0);
};

/**
 * 3. DATE FORMATTER
 */
export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

/**
 * 4. TEXT TRUNCATE
 */
export const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * 5. INITIALS GENERATOR
 */
export const getInitials = (name: string) => {
  if (!name) return "??";
  const names = name.split(" ");
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};