/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main block containing columns
  const daysThree = element.querySelector('.mokobara-days-three');
  if (!daysThree) return;

  // Find the grid that contains the three column divs
  const grid = daysThree.querySelector('.aem-Grid');
  if (!grid) return;

  // The columns are direct children of the grid
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // For each column, extract the carousel-image container (contains both desktop & mobile images and any links)
  const cellContents = columns.map(col => {
    const carousel = col.querySelector('.carousel-image');
    return carousel ? carousel : col;
  });

  // The table structure: header row is a single cell, content row has N columns
  const tableData = [
    ['Columns (columns15)'],
    cellContents
  ];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original container with the new table
  element.replaceWith(table);
}
