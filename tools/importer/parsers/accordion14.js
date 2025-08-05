/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are referencing the existing elements, NOT cloning or creating new content unnecessarily
  const headerRow = ['Accordion (accordion14)'];
  const rows = [headerRow];

  // All accordion items are .faq-sb-heading
  const accItems = element.querySelectorAll('.faq-sb-heading');
  accItems.forEach((heading) => {
    // The clickable title is the <a> with .faq-sb-acc-heading inside the heading
    const titleEl = heading.querySelector('.faq-sb-acc-heading');
    let titleCell = '';
    if (titleEl) {
      // Remove trailing icon from title for semantic clarity, but keep the text & formatting
      const titleContents = Array.from(titleEl.childNodes).filter(node => {
        return !(node.nodeType === 1 && node.tagName === 'I');
      });
      // If only 1 node, use it directly; else, array (which createTable accepts)
      titleCell = titleContents.length === 1 ? titleContents[0] : titleContents;
    } else {
      // fallback: the whole heading's text
      titleCell = heading.textContent.trim();
    }

    // The content is the .faq-acc-inner-content within heading
    let contentCell = '';
    const contentEl = heading.querySelector('.faq-acc-inner-content');
    if (contentEl) {
      // Reference the actual element (not a clone)
      contentCell = contentEl;
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
