/* global WebImporter */
export default function parse(element, { document }) {
  // Get all stat elements
  const statsWrapper = element.querySelector('.stats-wrapper');
  if (!statsWrapper) return;
  const row = statsWrapper.querySelector('.row');
  if (!row) return;
  const statColumns = Array.from(row.children).filter(child => child.classList.contains('innerwrap-stats'));
  if (!statColumns.length) return;

  // Per block/table rules, header row is a single cell (1 column),
  // second row contains all stat columns (so N columns, matching the stat columns count)

  // The createTable helper will display the correct table structure, with header spanning N columns
  // To do this, pass one array of length 1 (header), and one array of length N (content columns)
  const cells = [
    ['Columns (columns21)'],
    statColumns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}