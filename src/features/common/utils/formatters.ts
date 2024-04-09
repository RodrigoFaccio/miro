export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes == 0) {
    return "0 B";
  }
  const k = 1024;

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const size = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, size)).toFixed(decimals)) +
    " " +
    sizes[size]
  );
};

export const formatPercentage = (value: number) => {
  let converted = (value || 0).toFixed(2);
  converted = converted?.replace(".", ",");
  return `${converted}%`;
};

export const formatCNPJ = (value: string) => {
  return (value || "").replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
};

export const formatCPF = (value: string) => {
  return (value || "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatPhone = (value: string) => {
  const cleaned = `${value || ""}`.replace(/\D/g, "");

  const formats = [
    {
      pattern: /^(\d{2})(\d{1})(\d{4})(\d{4})$/,
      mask: "($1) $2 $3-$4",
    },
    {
      pattern: /^(\d{2})(\d{4})(\d{4})$/,
      mask: "($1) $2-$3",
    },
  ];

  const format = formats.find((format) => format.pattern.test(cleaned));

  if (!format) {
    return value;
  }

  const { mask } = format;

  return cleaned.replace(format.pattern, mask);
};
