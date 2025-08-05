/* global WebImporter */
export default function parse(element, { document }) {
  // Find major columns
  const fromCol = element.querySelector('.from-destination');
  const swapIcon = element.querySelector('.icon-swap');
  const toCol = element.querySelector('.to-destination');
  const dateCol = element.querySelector('.date-container');
  const searchButton = element.querySelector('button.custom-button');

  // Compose swap+to in a single fragment for its column
  let swapToCol = null;
  if (swapIcon || toCol) {
    swapToCol = document.createElement('div');
    if (swapIcon) swapToCol.appendChild(swapIcon);
    if (toCol) swapToCol.appendChild(toCol);
  }

  // Compose the content row (four columns)
  const contentRow = [
    fromCol || '',
    swapToCol || '',
    dateCol || '',
    searchButton || ''
  ];

  // Use WebImporter.DOMUtils.createTable to ensure a single header cell, multiple content cells
  // We provide a single-cell header row, then a multi-cell row
  const cells = [
    ['Columns (columns18)'],
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
