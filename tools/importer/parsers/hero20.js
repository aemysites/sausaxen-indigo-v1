/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as per the example
  const headerRow = ['Hero (hero20)'];

  // Get the image from the banner (visible, not data-uri)
  let imageEl = null;
  const bckgrdTupple = element.querySelector('.bckgrd-tupple');
  if (bckgrdTupple) {
    // Look for the first <img> with src that is not a data URI
    const imgs = Array.from(bckgrdTupple.querySelectorAll('img'));
    imageEl = imgs.find(img => img.src && !img.src.startsWith('data:')) || null;
  }

  // Get the banner content div
  let contentCell = '';
  if (bckgrdTupple) {
    const bannerContent = bckgrdTupple.querySelector('.banner-content');
    if (bannerContent) {
      // If .banner-content has content, use it (even if empty)
      contentCell = bannerContent;
    }
  }

  // Build the table
  const cells = [
    headerRow, // header
    [imageEl ? imageEl : ''], // row 2: background image or empty if not exists
    [contentCell], // row 3: content or empty string
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
