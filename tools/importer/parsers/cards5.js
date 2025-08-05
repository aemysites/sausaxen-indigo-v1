/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Cards'];

  // Find the slides container robustly
  let slidesContainer = element.querySelector('.promotional-slide .slick-track');
  if (!slidesContainer) {
    const slideArea = element.querySelector('.promotional-slide');
    if (slideArea) {
      slidesContainer = slideArea;
    } else {
      return;
    }
  }

  // Get all slides
  const slideDivs = slidesContainer.querySelectorAll('.slick-slide');
  const rows = [];

  slideDivs.forEach((slide) => {
    // For each slide, find the card content
    const cardCol = slide.querySelector('.promotional-slide--carosuel--item');
    if (!cardCol) return;
    const a = cardCol.querySelector('a.promotional-slide--redirection');
    const img = cardCol.querySelector('img');
    if (!img || !a) return;

    // Extract semantic text content: captions, visible text, headings, etc.
    // 1. Check for any element with class containing 'caption', 'desc', or 'title' inside cardCol
    const semanticTextBlocks = cardCol.querySelectorAll('[class*="caption"], [class*="desc"], [class*="title"], figcaption, .caption, .desc, .title');
    let textElems = [];
    semanticTextBlocks.forEach(block => {
      if (block.textContent && block.textContent.trim()) {
        const p = document.createElement('p');
        p.textContent = block.textContent.trim();
        textElems.push(p);
      }
    });

    // 2. If still no semantic text, try any <p> or <span> inside cardCol (excluding anchor and img wrappers)
    if (textElems.length === 0) {
      const psOrSpans = Array.from(cardCol.querySelectorAll('p, span')).filter(el => !el.closest('a') && !el.querySelector('img'));
      psOrSpans.forEach(el => {
        if (el.textContent && el.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = el.textContent.trim();
          textElems.push(p);
        }
      });
    }

    // 3. If still no text, fallback to image alt/title if it's non-generic
    if (textElems.length === 0) {
      let alt = img.alt && img.alt.trim() ? img.alt.trim() : '';
      let title = img.title && img.title.trim() ? img.title.trim() : '';
      // Only add if not a generic repeated string
      if (alt && alt.toLowerCase() !== 'indigo 6e') {
        const p = document.createElement('p');
        p.textContent = alt;
        textElems.push(p);
      } else if (title && title.toLowerCase() !== 'indigo 6e') {
        const p = document.createElement('p');
        p.textContent = title;
        textElems.push(p);
      }
    }

    // Always add the Instagram link
    const linkElem = document.createElement('a');
    linkElem.href = a.href;
    linkElem.target = '_blank';
    linkElem.textContent = 'View on Instagram';

    // Compose the right cell: semantic text (if any) + link
    const rightCell = [...textElems, linkElem];

    // Add the row
    rows.push([img, rightCell]);
  });

  // Compose the table as in the example: header row + rows
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
