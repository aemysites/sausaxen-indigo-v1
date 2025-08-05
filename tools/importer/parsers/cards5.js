/* global WebImporter */
export default function parse(element, { document }) {
  // Header row should match exactly
  const headerRow = ['Cards'];
  const rows = [];

  // Locate the carousel
  const carousel = element.querySelector('.promotional-slide--carosuel.slick-slider');
  if (!carousel) return;

  // Get all slides (cards)
  const slides = carousel.querySelectorAll('.slick-slide');
  slides.forEach(slide => {
    const card = slide.querySelector('.promotional-slide--carosuel--item');
    if (!card) return;
    const anchor = card.querySelector('a');
    const img = card.querySelector('img');
    const imgCell = img || '';

    // Build text cell: heading (title/alt), description (caption if found), CTA
    const textCell = [];
    let headingText = '';
    if (img) {
      headingText = img.getAttribute('title') || img.getAttribute('alt') || '';
    }
    if (headingText) {
      const heading = document.createElement('strong');
      heading.textContent = headingText;
      textCell.push(heading, document.createElement('br'));
    }

    // Try to extract any visible caption/description - check for figcaption, data-caption, aria-label, alt on <a>, or visible text inside anchor
    let description = '';
    // 1. Try aria-label or title on anchor
    if (anchor) {
      description = anchor.getAttribute('aria-label') || anchor.getAttribute('title') || '';
    }
    // 2. Try data-caption anywhere on card
    if (!description) {
      const captionData = card.querySelector('[data-caption]');
      if (captionData) {
        description = captionData.getAttribute('data-caption');
      }
    }
    // 3. Try figcaption
    if (!description) {
      const figcap = card.querySelector('figcaption');
      if (figcap) description = figcap.textContent.trim();
    }
    // 4. Try visible text nodes (not in img or anchor href)
    if (!description && anchor) {
      // Sometimes captions are present as text in the anchor (Instagram embed style)
      const anchorText = Array.from(anchor.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
        .map(n => n.textContent.trim())
        .join(' ');
      if (anchorText) description = anchorText;
    }
    // 5. Try anything else visible inside card (except anchor/img)
    if (!description) {
      const descNodes = Array.from(card.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (descNodes.length) {
        description = descNodes.map(n => n.textContent.trim()).join(' ');
      }
    }
    // Insert the description if found
    if (description) {
      const descP = document.createElement('p');
      descP.textContent = description;
      textCell.push(descP);
    }

    // Add CTA link
    if (anchor && anchor.href) {
      textCell.push(document.createElement('br'));
      const cta = document.createElement('a');
      cta.href = anchor.href;
      cta.target = '_blank';
      cta.textContent = 'View on Instagram';
      textCell.push(cta);
    }

    rows.push([
      imgCell,
      textCell.length ? textCell : ''
    ]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
