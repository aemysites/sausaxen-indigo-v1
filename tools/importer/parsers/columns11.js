/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the stats columns
  const row = element.querySelector('.row');
  let statsCells = [];
  if (row) {
    // Each stat goes in its own column (cell)
    const stats = Array.from(row.querySelectorAll('.innerwrap-stats'));
    statsCells = stats.map((stat) => stat);
  }
  // If for some reason statsCells is empty, fill with one empty cell
  if (statsCells.length === 0) statsCells = [''];
  // The first row (header) should be a single column with the block name, not as many as the columns below
  const cells = [
    ['Columns (columns11)'],
    statsCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}