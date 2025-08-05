/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items
  const items = element.querySelectorAll('.faq-sb-heading');

  items.forEach((item) => {
    // Title cell: get the question text from the <a> (excluding the icon)
    const titleLink = item.querySelector('a.faq-sb-acc-heading');
    let titleCell;
    if (titleLink) {
      // Create a <div> and append all child nodes of the link except the icon
      const titleDiv = document.createElement('div');
      Array.from(titleLink.childNodes).forEach(node => {
        if (!(node.nodeType === 1 && node.tagName === 'I')) {
          titleDiv.appendChild(node.cloneNode(true));
        }
      });
      // Remove leading/trailing whitespace from text nodes
      titleDiv.innerHTML = titleDiv.innerHTML.trim();
      titleCell = titleDiv;
    } else {
      // fallback: empty div
      titleCell = document.createElement('div');
    }

    // Content cell: get the corresponding .faq-acc-inner-content
    let contentCell;
    if (titleLink && titleLink.getAttribute('href') && titleLink.getAttribute('href').startsWith('#')) {
      const contentId = titleLink.getAttribute('href');
      const answerDiv = item.querySelector(contentId);
      if (answerDiv) {
        // Create a wrapper div and append all nodes (to preserve structure and links)
        const contentDiv = document.createElement('div');
        Array.from(answerDiv.childNodes).forEach(node => {
          if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim() !== '')) {
            contentDiv.appendChild(node.cloneNode(true));
          }
        });
        contentCell = contentDiv;
      } else {
        contentCell = document.createElement('div');
      }
    } else {
      contentCell = document.createElement('div');
    }

    rows.push([titleCell, contentCell]);
  });

  // Create and replace with the accordion block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
