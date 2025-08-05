/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two top-level columns (the left and right halves)
  // These are the two .aem-GridColumn--default--6 elements inside the main .aem-Grid--12 in .mokobara-days-three
  const daysThree = element.querySelector('.mokobara-days-three');
  if (!daysThree) return;
  const grid12 = daysThree.querySelector('.aem-Grid--12');
  if (!grid12) return;

  // The two columns (left and right)
  const gridColumns = Array.from(grid12.children).filter(col =>
    col.classList.contains('aem-GridColumn--default--6')
  );
  if (gridColumns.length !== 2) return; // expects two columns

  // Helper to extract the main content from each column
  function getPrimaryColumnContent(col) {
    // Find the first aem-Grid in the column
    let curr = col;
    while (curr && curr.querySelector(':scope > .aem-Grid')) {
      curr = curr.querySelector(':scope > .aem-Grid');
    }
    // If the only child is a wrapper div, dig deeper
    // Now take all children (not just one)
    const contentEls = Array.from(curr.children).filter(el => el.nodeType === 1);
    // If only one child, return the element itself, else return the array
    return contentEls.length === 1 ? contentEls[0] : contentEls;
  }

  // Build columns content (should be 2)
  const leftContent = getPrimaryColumnContent(gridColumns[0]);
  const rightContent = getPrimaryColumnContent(gridColumns[1]);

  // Compose the table
  const cells = [
    ['Columns (columns10)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
