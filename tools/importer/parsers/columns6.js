/* global WebImporter */
export default function parse(element, { document }) {
  // The main columns container is .container__links
  const columnsContainer = element.querySelector('.container__links');
  const columns = [];

  if (columnsContainer) {
    // Get all the top-level accordion columns (should be 3)
    const accordionCols = Array.from(columnsContainer.querySelectorAll(':scope > .accordion.container__links__item'));
    for (const acc of accordionCols) {
      // Find the visible button label (column title)
      const btn = acc.querySelector('button.cmp-accordion__button');
      let heading = '';
      if (btn && btn.childNodes.length > 0) {
        // Find text node (ignore any <i> icon)
        for (const node of btn.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            heading = node.textContent.trim();
            if (heading) break;
          }
        }
      }
      // Find the list of links under this column (ul.child-links)
      const ul = acc.querySelector('ul.child-links');
      // Build the cell contents
      const colCell = [];
      if (heading) {
        // Use a heading tag for semantic value
        const h = document.createElement('strong');
        h.textContent = heading;
        colCell.push(h);
        colCell.push(document.createElement('br'));
      }
      if (ul) {
        colCell.push(ul);
      }
      columns.push(colCell);
    }
  }

  // The fourth column is the social/download/awards area
  const socialDiv = element.querySelector('.social-links');
  const socialCol = [];
  if (socialDiv) {
    // Find and group all content under each <h3> section
    const children = Array.from(socialDiv.children);
    let currentHeader = null;
    let buffer = [];
    for (const child of children) {
      if (child.tagName === 'H3') {
        if (currentHeader && buffer.length) {
          // Output previous group
          const p = document.createElement('strong');
          p.textContent = currentHeader.textContent;
          socialCol.push(p);
          socialCol.push(document.createElement('br'));
          socialCol.push(...buffer);
        }
        currentHeader = child;
        buffer = [];
      } else {
        buffer.push(child);
      }
    }
    // Push last group
    if (currentHeader && buffer.length) {
      const p = document.createElement('strong');
      p.textContent = currentHeader.textContent;
      socialCol.push(p);
      socialCol.push(document.createElement('br'));
      socialCol.push(...buffer);
    }
  }

  // Ensure there are 4 columns, filling with empty if needed
  while (columns.length < 4) {
    if (columns.length === 3) {
      columns.push(socialCol);
    } else {
      columns.push([]);
    }
  }

  // Create the table
  const cells = [
    ['Columns (columns6)'], // header row, matches guideline
    columns // second row: each column cell (should be 4 total)
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
