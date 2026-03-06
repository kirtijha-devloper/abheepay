// // src/utils/slugify.js
// export const slugify = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/\s+/g, '-')           // Space → -
//     .replace(/&/g, '-and-')         // & → -and-
//     .replace(/[^\w\-]+/g, '')       // Remove special chars
//     .replace(/\-\-+/g, '-')         // Multiple - → single -
//     .replace(/^-+/, '')             // Trim start
//     .replace(/-+$/, '');            // Trim end
// };