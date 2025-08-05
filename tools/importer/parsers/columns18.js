/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header: single cell with exact text
  const headerRow = ['Columns (columns18)'];

  // Extract logical columns from the source HTML
  const fromCol = element.querySelector(':scope > .from-destination');
  const swapIcon = element.querySelector(':scope > .icon-swap');
  const toCol = element.querySelector(':scope > .to-destination');
  const dateCol = element.querySelector(':scope > .date-container');
  const searchBtn = element.querySelector(':scope > button.custom-button');

  // 2nd row: four columns (cells)
  const contentRow = [
    fromCol || '',
    [swapIcon, toCol].filter(Boolean),
    dateCol || '',
    searchBtn || ''
  ];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
