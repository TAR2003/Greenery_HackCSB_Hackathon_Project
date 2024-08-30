// export function sanitizeInput(input) {
//   if (typeof input === 'string') {
//     // Replace dangerous characters with their encoded versions
//     return input.replace(/&/g, "&amp;")
//                 .replace(/</g, "&lt;")
//                 .replace(/>/g, "&gt;")
//                 .replace(/"/g, "&quot;")
//                 .replace(/'/g, "&#039;");
//   }
//   return input; // Return as is if not a string
// }








export function sanitizeInput(input) {
  // If input is supposed to be HTML, use DOMPurify
  if (typeof input === 'string') {
    return DOMPurify.sanitize(input);
  }
  return input; // Return as is if not a string
}
