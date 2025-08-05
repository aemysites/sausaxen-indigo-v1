/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract a column's content: strong title + <ul> links
  function getAccordionColumnContent(accordion) {
    const button = accordion.querySelector('button.cmp-accordion__button');
    // The button contains the title text (might have icons)
    let title = '';
    if (button) {
      // Get text only (ignore <i> icon)
      title = Array.from(button.childNodes).filter(n => n.nodeType === 3).map(n => n.textContent).join('').trim();
    }
    const panel = accordion.querySelector('[data-cmp-hook-accordion="panel"]');
    let ul = null;
    if (panel) {
      ul = panel.querySelector('ul.child-links');
    }
    const colContent = [];
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title;
      colContent.push(strong);
    }
    if (ul) {
      colContent.push(ul);
    }
    return colContent;
  }

  // Get all three accordion columns
  const accordionColumns = element.querySelectorAll('.container__links__item');
  const columns = [];
  accordionColumns.forEach((accordion) => {
    const content = getAccordionColumnContent(accordion);
    columns.push(content);
  });

  // Fourth column: Social, Download, Our Awards
  const socialColumn = element.querySelector('.social-links.non-mobile');
  let socialContent = [];
  if (socialColumn) {
    // Only use top-level direct children, retaining structure
    socialColumn.childNodes.forEach(child => {
      if (child.nodeType === 1) { // element node
        socialContent.push(child);
      }
    });
  }
  columns.push(socialContent);

  // Header row matches example exactly
  const headerRow = ['Columns (columns6)'];
  // Second row (columns): each cell is an array (or element if only one)
  const secondRow = columns.map(content => content.length === 1 ? content[0] : content);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  element.replaceWith(table);
}
