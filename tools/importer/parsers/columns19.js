/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the four columns: 3 sitemaps, 1 social/downloads
  const columns = [];
  // Find the three sitemap columns
  const accordion = element.querySelector('.ig-footer-accordion');
  let sitemapCols = [];
  if (accordion) {
    sitemapCols = Array.from(accordion.querySelectorAll('.col-12.col-md-3.ig-acc-sitemap')).slice(0, 3);
  }
  // Find the social/downloads column
  const rightCol = element.querySelector('.social-downloads');
  columns.push(...sitemapCols, rightCol);
  // Pad to 4 columns if necessary
  while (columns.length < 4) {
    columns.push(document.createElement('div'));
  }
  // Build table with a single-cell header row, and a 4-cell content row
  const rows = [
    ['Columns (columns19)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
