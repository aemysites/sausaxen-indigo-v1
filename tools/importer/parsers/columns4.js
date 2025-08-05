/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main stats wrapper
  const statsWrapper = element.querySelector('.stats-ig-wrapper');
  if (!statsWrapper) return;

  // Find the row with columns
  const row = statsWrapper.querySelector('.d-flex');
  if (!row) return;

  // Select all immediate children blocks (columns)
  const columns = Array.from(row.querySelectorAll(':scope > .wrapper-flight-blocks'));
  if (columns.length === 0) return;

  // Prepare the header row: one cell only
  const headerRow = ['Columns (columns4)'];

  // Prepare the content row: each column is a cell
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  element.replaceWith(table);
}
