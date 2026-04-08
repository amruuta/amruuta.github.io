export const toDisplayLabel = (key: string): string => {
  const titleCase = key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim();

  return titleCase.charAt(0).toUpperCase() + titleCase.slice(1);
};

export const normalizeLink = (link: string): string | null => {
  if (!link || !link.trim()) {
    return null;
  }

  return link;
};
