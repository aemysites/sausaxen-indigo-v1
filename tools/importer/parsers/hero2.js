/* global WebImporter */
export default function parse(element, { document }) {
  // Header: exactly matches the required value
  const headerRow = ['Hero (hero2)'];

  // --- Row 2: Background image element ---
  // Use the first <img> from the block
  const bgImg = element.querySelector('img');

  // --- Row 3: All relevant text/cta content ---
  // We'll build up an array of elements to include, always referencing existing elements
  const contentElems = [];

  // Add the title (h2) if present
  const h2 = element.querySelector('h2');
  if (h2) contentElems.push(h2);

  // Add the CTA link (Book Now) if present
  const cta = element.querySelector('a.btn');
  if (cta) {
    // Fix href if data-path is present
    if (cta.hasAttribute('data-path')) {
      cta.href = cta.getAttribute('data-path');
    }
    contentElems.push(cta);
  }

  // Add any text content from the info/textblock area
  // Look for all <p> inside .dest-city-info (even if inside .hide, as content may be hidden by CSS only)
  const infoPs = element.querySelectorAll('.dest-city-info p');
  infoPs.forEach((p) => {
    // Only add if not already included
    if (!contentElems.includes(p)) {
      contentElems.push(p);
    }
  });

  // Compose the table rows (always 3 rows, 1 column each)
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentElems]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
