/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Returns all immediate .aem-GridColumn children in order
  function getColumnsFromGrid(grid) {
    return Array.from(grid.querySelectorAll(':scope > .genericcontainer.aem-GridColumn'));
  }

  // Find the main .mokobara-days-three block
  const rootBlock = element.querySelector(':scope > .mokobara-days-three');
  if (!rootBlock) return;
  // Find the main grid (2 columns)
  const mainGrid = rootBlock.querySelector(':scope > .aem-Grid');
  if (!mainGrid) return;
  const mainColumns = getColumnsFromGrid(mainGrid);
  if (mainColumns.length < 2) return;

  // LEFT COLUMN: Get everything under the first main column (usually text + image)
  const leftCol = mainColumns[0];
  // Let's grab all direct children under leftCol, but filter out empty wrappers
  let leftContent = [];
  const leftInnerGrids = leftCol.querySelectorAll(':scope > div > .aem-Grid');
  for (const grid of leftInnerGrids) {
    // e.g. <div class="imagevideo ...">
    for (const child of grid.children) {
      // Only include non-empty elements
      if (child.innerHTML.trim()) {
        leftContent.push(child);
      }
    }
  }

  // RIGHT COLUMN: Contains a nested grid with 2 direct children, each with further rows of images
  const rightCol = mainColumns[1];
  let rightContent = [];
  // Find both inner columns in rightCol
  const rightInnerGrids = rightCol.querySelectorAll(':scope > div > .aem-Grid');
  for (const grid of rightInnerGrids) {
    // Each grid has two .genericcontainer.aem-GridColumn children
    const innerCols = getColumnsFromGrid(grid);
    for (const col of innerCols) {
      // Each col may wrap another grid or be leaf
      const subGrids = col.querySelectorAll(':scope > div > .aem-Grid');
      if (subGrids.length > 0) {
        for (const sg of subGrids) {
          for (const child of sg.children) {
            if (child.innerHTML.trim()) {
              rightContent.push(child);
            }
          }
        }
      } else {
        // Try direct children
        for (const child of col.children) {
          if (child.innerHTML.trim()) {
            rightContent.push(child);
          }
        }
      }
    }
  }

  // Compose table rows as in the Columns example: header, then a row with 2 columns
  const headerRow = ['Columns (columns10)', ''];
  const bodyRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  element.replaceWith(table);
}
