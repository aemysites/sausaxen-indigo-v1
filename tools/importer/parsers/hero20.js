/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the background image (first real image, not a base64 placeholder)
  let backgroundImg = null;
  const imgCandidates = element.querySelectorAll('.bckgrd-tupple img');
  for (const candidate of imgCandidates) {
    if (candidate.src && !candidate.src.startsWith('data:')) {
      backgroundImg = candidate;
      break;
    }
  }

  // 2. Find the banner content (headline, subheading, CTA, etc)
  const bannerContent = element.querySelector('.banner-content');
  let contentCell;
  if (bannerContent) {
    // Gather all children that may contain content
    const contentChildren = Array.from(bannerContent.children).filter(child => {
      // Keep if not empty
      return child.textContent.trim() !== '';
    });
    if (contentChildren.length > 0) {
      contentCell = contentChildren;
    } else {
      // If .banner-content exists but has no content children, check for any text nodes
      if (bannerContent.textContent.trim() !== '') {
        contentCell = [bannerContent.textContent.trim()];
      } else {
        contentCell = '';
      }
    }
  } else {
    contentCell = '';
  }

  // 3. Build the table
  const cells = [
    ['Hero (hero20)'],
    [backgroundImg ? backgroundImg : ''],
    [contentCell]
  ];

  // 4. Create block and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
