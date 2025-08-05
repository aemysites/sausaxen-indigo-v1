/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns: 3 menu columns and the right column (social/downloads/awards)
  const accordion = element.querySelector('.ig-footer-accordion');
  const menuCols = [];
  if (accordion) {
    // menu columns are first three .col-12.col-md-3.ig-acc-sitemap inside accordion
    const allCols = Array.from(accordion.querySelectorAll(':scope > .col-12.col-md-3.ig-acc-sitemap'));
    for (let i = 0; i < 3; i++) {
      const col = allCols[i];
      if (col) {
        // Collect all child nodes except empty divs for each menu column
        // (to ensure headings, lists, and any text nodes are included)
        const content = [];
        Array.from(col.childNodes).forEach((node) => {
          if (
            (node.nodeType === Node.ELEMENT_NODE && (node.textContent.trim() !== '' || node.querySelector('ul,li,a,p,h6,button'))) ||
            (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '')
          ) {
            content.push(node);
          }
        });
        menuCols.push(content.length === 1 ? content[0] : content);
      } else {
        menuCols.push('');
      }
    }
  } else {
    menuCols.push('', '', '');
  }

  // The right-most column: social/download/awards
  let rightCol = '';
  const row = element.querySelector(':scope > .row');
  if (row) {
    const socialDiv = row.querySelector('.social-downloads');
    if (socialDiv) {
      // Reference all meaningful child nodes, including text, headings, lists, images, etc.
      const nodes = Array.from(socialDiv.childNodes).filter(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // include non-empty elements
          return node.textContent.trim() !== '' || node.querySelector('img,ul,li,a,h6,p');
        } else if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim() !== '';
        }
        return false;
      });
      rightCol = nodes.length === 1 ? nodes[0] : nodes;
    }
  }

  // Compose the columns row
  const columnsRow = [...menuCols, rightCol];

  // The table header row must have exactly one column (the block name)
  // The content row must have one cell for each column (total 4)
  const cells = [
    ['Columns (columns16)'], // header row: exactly one cell
    columnsRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
