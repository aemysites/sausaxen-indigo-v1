/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as a single cell row, per requirements
  const headerRow = ['Columns (columns1)'];

  // Gather columns: all direct children that are not empty
  const children = Array.from(element.children);
  const columns = [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Accept if any text or child elements
    if (child.textContent.trim().length > 0 || child.querySelector('*')) {
      columns.push(child);
    }
  }
  // Fallback if zero columns detected
  if (columns.length === 0) {
    columns.push(document.createElement('span'));
  }

  // Compose cells: header, then a row for columns
  const cells = [
    headerRow,
    columns
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // After createTable: set header cell colspan to match number of columns in the next row
  const th = table.querySelector('th');
  if (th && table.rows.length > 1) {
    th.colSpan = table.rows[1].cells.length;
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
