/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Locate the FAQ accordion group
  const faqAccGroup = element.querySelector('.faq-sb-acc-group.faq-top-queries');
  if (faqAccGroup) {
    // For each accordion heading (one per question)
    const items = faqAccGroup.querySelectorAll(':scope > .faq-sb-heading');
    items.forEach((item) => {
      // Title cell: use the anchor's childNodes except the icon
      const titleAnchor = item.querySelector(':scope > .faq-sb-acc-heading');
      let titleContent = [];
      if (titleAnchor) {
        // Copy all child nodes except <i> (icon)
        titleContent = Array.from(titleAnchor.childNodes)
          .filter(node => !(node.nodeType === Node.ELEMENT_NODE && node.tagName === 'I'));
      }
      if (titleContent.length === 0) {
        // fallback to textContent
        const fallback = document.createElement('div');
        fallback.textContent = titleAnchor ? titleAnchor.textContent.trim() : '';
        titleContent = [fallback];
      }

      // Content cell: reference the actual .faq-acc-inner-content div's children
      const contentDiv = item.querySelector('.faq-acc-inner-content');
      let contentContent = [];
      if (contentDiv && contentDiv.childNodes.length > 0) {
        contentContent = Array.from(contentDiv.childNodes);
      } else {
        // fallback: empty div
        contentContent = [document.createElement('div')];
      }
      rows.push([titleContent, contentContent]);
    });
  }

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
