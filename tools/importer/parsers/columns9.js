/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns row
  const row = element.querySelector('.row');
  if (!row) return;
  // Find all direct column divs (should be three)
  const columns = Array.from(row.children).filter(col => col.classList.contains('col-12') && col.classList.contains('col-md-4'));

  // Extract each column's content, referencing existing elements
  const colCells = columns.map(col => {
    if (col.children.length === 1 && col.firstElementChild.tagName === 'A') {
      return col.firstElementChild;
    }
    return Array.from(col.children);
  });

  // Header row must be a single cell (one column)
  const headerRow = ['Columns (columns9)'];
  // Second row is an array with as many columns as needed
  const cells = [ headerRow, colCells ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
