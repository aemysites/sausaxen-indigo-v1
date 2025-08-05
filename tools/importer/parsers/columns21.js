/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the stats
  const statsRow = element.querySelector('.row');
  if (!statsRow) return;

  // Find all stat columns
  const statItems = Array.from(statsRow.querySelectorAll(':scope > .innerwrap-stats'));
  if (statItems.length === 0) return;

  // Build table:
  // Header row: single cell
  const headerRow = ['Columns (columns21)'];
  // Second row: all statItems in one row as separate columns
  const contentRow = statItems;

  // The cells array structure matches the spec: header is single cell, content row is as wide as needed
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
