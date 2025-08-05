/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell!
  const headerRow = ['Columns (columns1)'];

  // Extract the two main columns:
  // 1. The first child with class .cmp-custom-drop-down (Trip type selector)
  // 2. The .widget-container__filter-bar__pax-selection (Pax selection)

  // Find trip type (first .cmp-custom-drop-down that is a direct child)
  let tripTypeDropdown = null;
  for (const child of Array.from(element.children)) {
    if (child.classList.contains('cmp-custom-drop-down')) {
      tripTypeDropdown = child;
      break;
    }
  }

  // Find pax selection (direct child with class .widget-container__filter-bar__pax-selection)
  let paxSelection = null;
  for (const child of Array.from(element.children)) {
    if (child.classList.contains('widget-container__filter-bar__pax-selection')) {
      paxSelection = child;
      break;
    }
  }

  // Compose the content row with one cell per column
  // If one of the columns is missing, use '' as fallback
  const contentRow = [tripTypeDropdown || '', paxSelection || ''];
  // Ensure header row is one cell, content row is two cells
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
