/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER: block name
  const headerRow = ['Columns (columns19)'];

  // Find the 3 sitemap columns
  const accordion = element.querySelector('.ig-footer-accordion');
  let navCols = [];
  if (accordion) {
    navCols = Array.from(
      accordion.querySelectorAll('.col-12.col-md-3.ig-acc-sitemap')
    ).slice(0, 3);
  }

  // Find the right column: social, downloads, awards
  let socialCol = null;
  const row = element.querySelector('.row');
  if (row) {
    socialCol = row.querySelector('.col-lg-3.social-downloads');
  }

  // Compose table row: 4 columns
  let columnsRow = [];
  // Reference sitemap cols
  columnsRow = navCols;
  // Reference social col
  if (socialCol) {
    columnsRow.push(socialCol);
  } else {
    // If missing, pad with empty divs
    while (columnsRow.length < 4) {
      columnsRow.push(document.createElement('div'));
    }
  }

  // If fewer than 4 columns, pad with empty divs
  while (columnsRow.length < 4) {
    columnsRow.push(document.createElement('div'));
  }

  // Copyright row: find first copyright text
  let copyrightCell = '';
  const copyrightBlock = element.querySelector('.copyright-blck');
  if (copyrightBlock) {
    // Find preferred copyright text: prefer .copyright-content p.d-none.d-sm-block, fallback to any <p>
    let copyrightText = copyrightBlock.querySelector('p.d-none.d-sm-block');
    if (!copyrightText) {
      copyrightText = copyrightBlock.querySelector('p');
    }
    if (copyrightText) {
      copyrightCell = copyrightText.textContent.trim();
    }
  }

  // Compose cells: header, content row, copyright row as 1 cell spanning all 4 cols
  const cells = [
    headerRow,
    columnsRow,
    [copyrightCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
