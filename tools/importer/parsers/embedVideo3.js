/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];
  // Gather all immediate child nodes that may contain content
  const contentNodes = Array.from(element.childNodes).filter((node) => {
    // Keep element nodes and text nodes with non-empty text
    return (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim().length > 0) ||
           (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
  });

  // If the element contains other elements (not empty), preserve all content
  let contentCell;
  if (contentNodes.length > 0) {
    // If multiple, package them as an array for the cell
    contentCell = contentNodes.length === 1 ? contentNodes[0] : contentNodes;
  } else {
    // If truly empty, cell should be empty string
    contentCell = '';
  }

  const cells = [
    headerRow,
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}