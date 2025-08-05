/* global WebImporter */
export default function parse(element, { document }) {
  // Collect all the relevant columns for the block
  const columns = [];

  // Find the accordion containing the first three content columns
  const accordion = element.querySelector('#footer-accordion');
  if (accordion) {
    const accCols = Array.from(accordion.querySelectorAll('.col-12.col-md-3.ig-acc-sitemap')).slice(0, 3);
    columns.push(...accCols);
  }

  // Find the social/downloads/awards column
  const socialCol = element.querySelector('.col-lg-3.social-downloads');
  if (socialCol) {
    columns.push(socialCol);
  }

  // Fallback: if no columns found, put the whole element in a single cell
  if (columns.length === 0) {
    columns.push(element);
  }

  // Build the table rows: header must be a single cell, next row has N columns
  const headerRow = ['Columns (columns16)'];
  const contentRow = columns;
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
