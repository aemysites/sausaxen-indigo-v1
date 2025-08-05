/* global WebImporter */
export default function parse(element, { document }) {
  // Select the main column components in order
  // The relevant columns are: from-destination, to-destination, date-container, and the search button

  // Helper to get the direct children as Array
  const directChildren = Array.from(element.children);

  // Find the relevant blocks
  const fromCol = directChildren.find(c => c.classList.contains('from-destination'));
  const toCol = directChildren.find(c => c.classList.contains('to-destination'));
  const dateCol = directChildren.find(c => c.classList.contains('date-container'));
  const buttonCol = directChildren.find(c => c.tagName === 'BUTTON');

  // Build columns array in the visually logical order
  const columns = [fromCol, toCol, dateCol, buttonCol].filter(Boolean);

  // The header row must be a single cell (per the markdown example), even if there are many columns
  const cells = [
    ['Columns (columns7)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
