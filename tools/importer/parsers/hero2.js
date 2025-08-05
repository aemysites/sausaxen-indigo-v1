/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, EXACT match
  const headerRow = ['Hero (hero2)'];

  // --- Row 2: Background image (img element) ---
  // Find the first visible <img> in the element
  let img = element.querySelector('img');
  let imgCell = '';
  if (img) {
    imgCell = img;
  }

  // --- Row 3: Title, subheading, CTA, and all text content ---
  // We'll gather all visually relevant content into a single array
  const contentElements = [];

  // 1. Main headline - look for h2 or h1
  // Allow for heading to be inside .dest-basic or elsewhere
  let heading = element.querySelector('.dest-basic h2, h1, h2');
  if (heading) {
    contentElements.push(heading);
  }

  // 2. Call-to-action (Book Now button) - a.btn or a.booknow-getins or a with visible text
  // Only push if it is not already part of contentElements
  let cta = element.querySelector('a.btn, a.booknow-getins, a.btn-secondary, a[href^="http"], a[data-path]');
  if (cta && !contentElements.includes(cta) && cta.textContent.trim()) {
    // If href is "javascript:void(0)" and data-path exists, fix the link
    if (cta.getAttribute('href') === 'javascript:void(0)' && cta.hasAttribute('data-path')) {
      cta = cta.cloneNode(true); // reference, but with fixed href
      cta.setAttribute('href', cta.getAttribute('data-path'));
    }
    contentElements.push(cta);
  }

  // 3. Any text content in paragraphs inside the block (e.g., description, promo)
  // Only push if not already included
  // Typical location: .dest-city-info .textblock p
  let paragraphs = element.querySelectorAll('.dest-city-info .textblock p');
  paragraphs.forEach(p => {
    if (!contentElements.includes(p)) contentElements.push(p);
  });

  // Compose the table rows as specified
  const rows = [
    headerRow,
    [imgCell],
    [contentElements]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
