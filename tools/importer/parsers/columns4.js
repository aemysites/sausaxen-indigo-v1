/* global WebImporter */
export default function parse(element, { document }) {
  // Find the wrapper that contains the stats blocks
  const wrapper = element.querySelector('.stats-ig-wrapper');
  if (!wrapper) return;

  // Find the row containing the columns
  const row = wrapper.querySelector('.d-flex');
  if (!row) return;

  // Get all columns (flight blocks)
  const columns = Array.from(row.querySelectorAll('.wrapper-flight-blocks'));
  if (!columns.length) return;

  // Create header row as a single cell (fixes the reported bug)
  const headerRow = ['Columns (columns4)'];

  // Second row: one cell per column content
  const contentRow = columns;
  
  const tableRows = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
