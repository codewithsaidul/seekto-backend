export const generateExcerpt = (content: string, maxLength: number = 100): string => {
  if (!content) return "";

  const plainText = content.replace(/<[^>]*>?/gm, "").trim();
  
  if (plainText.length <= maxLength) return plainText;
  

  return plainText.substring(0, plainText.lastIndexOf(" ", maxLength)) + "...";
};