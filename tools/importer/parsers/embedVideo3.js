/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Embed'];

  // Flexible content extraction: include all text and HTML from the embed area
  let contentCell = [];
  const embedDiv = element.querySelector('.cmp-embed');

  if (embedDiv) {
    // Get all child nodes: elements and text nodes
    embedDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        contentCell.push(node);
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent.trim();
        if (text) contentCell.push(text);
      }
    });
    // If nothing meaningful inside, fallback to textContent (covers edge case of only text)
    if (contentCell.length === 0) {
      const text = embedDiv.textContent && embedDiv.textContent.trim();
      if (text) contentCell.push(text);
    }
  }

  // If .cmp-embed had nothing at all, try for any direct text in the main element
  if (contentCell.length === 0) {
    const text = element.textContent && element.textContent.trim();
    if (text) contentCell.push(text);
  }

  // Ensure at least one cell (empty string if nothing at all)
  if (contentCell.length === 0) contentCell = [''];

  // The Embed block is always a single-column, two-row table
  const cells = [headerRow, [contentCell.length > 1 ? contentCell : contentCell[0]]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with our new structured table
  element.replaceWith(table);
}
