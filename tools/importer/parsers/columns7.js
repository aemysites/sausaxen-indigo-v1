/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child by class
  function getChildByClass(parent, className) {
    for (const child of parent.children) {
      if (child.classList.contains(className)) return child;
    }
    return null;
  }

  // Get relevant top-level columns
  const fromEl = getChildByClass(element, 'from-destination');
  const toEl = getChildByClass(element, 'to-destination');
  const dateEl = getChildByClass(element, 'date-container');

  // Find the swap icon (immediate child)
  let swapIcon = null;
  for (const child of element.children) {
    if (child.tagName === 'I' && child.classList.contains('icon-swap')) {
      swapIcon = child;
      break;
    }
  }

  // Find the search button (immediate child)
  let searchButton = null;
  for (const child of element.children) {
    if (child.tagName === 'BUTTON') {
      searchButton = child;
      break;
    }
  }

  // First column: From field (reference the full from-destination including dropdown)
  let colFrom = fromEl;

  // Second column: To field (reference the full to-destination including dropdown, plus swap icon if present)
  let colTo;
  if (toEl && swapIcon) {
    // Wrap swap icon and toEl together into a div
    colTo = document.createElement('div');
    colTo.appendChild(swapIcon);
    colTo.appendChild(toEl);
  } else if (toEl) {
    colTo = toEl;
  } else if (swapIcon) {
    colTo = swapIcon;
  } else {
    colTo = document.createElement('div');
  }

  // Third column: Date container (reference full date-container)
  let colDates = dateEl;

  // Fourth column: Search button
  let colSearch = searchButton ? searchButton : document.createElement('div');

  // Compose columns array for the content row
  const columns = [colFrom, colTo, colDates, colSearch];

  // Build the table with correct header row (single cell)
  const cells = [
    ['Columns (columns7)'], // header row: single cell
    columns                // content row: one cell for each column
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
