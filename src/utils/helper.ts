const formatVND = (money: string) => {
  const number = Number(money);
  if (isNaN(number)) {
    return "Invalid number";
  }
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

const convertSpacesToDash = (input: string) => {
  return input.trim().replace(/\s+/g, "-");
};

const sanitizeContent = (html: string) => {
  return html.replace(/<img[^>]*>/g, "");
};

export const HELPER = {
  formatVND,
  formatDate,
  convertSpacesToDash,
  sanitizeContent,
};
