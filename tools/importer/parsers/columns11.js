/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the relevant stats columns
  const container = element.querySelector('.container');
  if (!container) return;
  const statsWrapper = container.querySelector('.stats-wrapper');
  if (!statsWrapper) return;
  const row = statsWrapper.querySelector('.row');
  if (!row) return;

  // Get all direct children .innerwrap-stats (columns)
  const statColumns = Array.from(row.querySelectorAll(':scope > .innerwrap-stats'));
  if (!statColumns.length) return;

  // Build the table: header is one cell, data row has one cell per column
  const cells = [
    ['Columns (columns11)'],
    statColumns
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
