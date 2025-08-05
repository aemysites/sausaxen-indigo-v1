/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row must be a single cell
  const headerRow = ['Columns (columns9)'];

  // Get the row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get each column (should be 3)
  const colDivs = row.querySelectorAll(':scope > div');
  const colCells = [];

  colDivs.forEach((col) => {
    // Each cell's content should be a single array of referenced elements
    const colContent = [];
    // For 'Call us' column
    const iconBlk = col.querySelector(':scope > .ig-icon-blck');
    if (iconBlk) colContent.push(iconBlk);
    // Get all .ig-content-blck blocks (may be multiple in one col)
    const contentBlks = col.querySelectorAll(':scope > .ig-content-blck');
    contentBlks.forEach(cb => colContent.push(cb));
    // Get any callTonumber-block (phone numbers)
    const callNumberBlk = col.querySelector(':scope > .callTonumber-block');
    if (callNumberBlk) colContent.push(callNumberBlk);
    // For Feedback/Chat columns, the outer <a> is the top-level column content
    if (colContent.length === 0) {
      // Try to add the <a> (for feedback/chat)
      const aChild = col.querySelector(':scope > a');
      if (aChild) colContent.push(aChild);
    }
    // Push single cell for this column
    colCells.push(colContent);
  });

  // Compose main table rows: header (1 cell), then 1 row with N columns
  const tableRows = [
    headerRow,
    colCells
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
