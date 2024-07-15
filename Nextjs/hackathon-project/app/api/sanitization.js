import DOMPurify from 'dompurify';

export function sanitizeInput(input) {
  // If input is supposed to be HTML, use DOMPurify
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  }
  return input; // Return as is if not a string
}
