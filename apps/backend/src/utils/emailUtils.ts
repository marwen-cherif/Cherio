/**
 * Escape HTML to prevent XSS attacks
 */
export const escapeHtml = (text: string): string => {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * Convert newlines to HTML line breaks
 */
export const nl2br = (text: string): string => {
  return text.replace(/\n/g, '<br>');
};

