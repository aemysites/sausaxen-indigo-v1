/* global WebImporter */
export default function parse(element, { document }) {
  const grid = element.querySelector('.mokobara-days-three .aem-Grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  const colCells = columns.map(col => {
    const mainContent = col.querySelector('.carousel-image');
    return mainContent ? mainContent : col;
  });
  // Header row must be a single cell (not one per column!)
  const headerRow = ['Columns (columns15)'];
  const cells = [
    headerRow,
    colCells
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
