/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion items
  const accGroup = element.querySelector('.faq-sb-acc-group');
  if (!accGroup) return;
  const accItems = accGroup.querySelectorAll(':scope > .faq-sb-heading');

  // Prepare accordion rows
  const rows = [];
  accItems.forEach((item) => {
    // Title cell: .faq-sb-acc-heading <a>
    const accTitleAnchor = item.querySelector('.faq-sb-acc-heading');
    let titleContent = '';
    if (accTitleAnchor) {
      // Remove any icon from the title
      const icon = accTitleAnchor.querySelector('i');
      if (icon) icon.remove();
      titleContent = accTitleAnchor.textContent.trim();
    }
    // Content cell: .faq-acc-inner-content > first <p>, or the div itself if no <p>
    const contentDiv = item.querySelector('.faq-acc-inner-content');
    let contentContent = '';
    if (contentDiv) {
      const p = contentDiv.querySelector('p');
      contentContent = p ? p : contentDiv;
    }
    rows.push([titleContent, contentContent]);
  });

  // Header row: must always be a single cell
  const headerRow = ['Accordion (accordion14)'];
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
