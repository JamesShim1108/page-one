// Line icons share one 24px grid, a 1.75 stroke, and currentColor so they follow
// the surrounding text color in light and dark themes. Pass a name, not markup.
const paths = {
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  book: '<path d="M4 5.5c2.5-1.2 5.5-1.2 8 .5 2.5-1.7 5.5-1.7 8-.5v13c-2.5-1.2-5.5-1.2-8 .5-2.5-1.7-5.5-1.7-8-.5z"/><path d="M12 6v13"/>',
  target:
    '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".9"/>',
  clipboard:
    '<rect x="5" y="4.5" width="14" height="16" rx="2"/><path d="M9.5 4.5h5v3h-5z"/><path d="M9 12h6M9 16h4"/>',
  cards:
    '<rect x="8" y="4" width="12" height="13" rx="2"/><path d="M4 8v10a2 2 0 0 0 2 2h10"/>',
  map: '<path d="M9 5 3.5 7v12L9 17l6 2 5.5-2V5L15 7 9 5z"/><path d="M9 5v12M15 7v12"/>',
  list: '<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.5" cy="6.5" r=".9"/><circle cx="4.5" cy="12" r=".9"/><circle cx="4.5" cy="17.5" r=".9"/>',
  refresh:
    '<path d="M19.5 12a7.5 7.5 0 0 1-13 5.1"/><path d="M4.5 12a7.5 7.5 0 0 1 13-5.1"/><path d="M18.5 3.5v3.5H15M5.5 20.5V17H9"/>',
  unlock:
    '<rect x="5" y="11" width="14" height="9.5" rx="2"/><path d="M8.5 11V8a3.5 3.5 0 0 1 6.8-1.2"/>',
  person:
    '<circle cx="12" cy="8.5" r="3.8"/><path d="M5 20a7 7 0 0 1 14 0"/><path d="M4 4l16 16"/>',
  pen: '<path d="M4 20l4.2-1 10.3-10.3-3.2-3.2L5 15.8 4 20z"/><path d="m13.8 7.2 3.2 3.2"/>',
  bookmark: '<path d="M7 4.5h10v15l-5-3.5-5 3.5z"/>',
  link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  flag: '<path d="M6 21V4"/><path d="M6 4h11l-2 4 2 4H6"/>',
  calculator:
    '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 7.5h7v3h-7z"/><path d="M8.75 14h.01M12 14h.01M15.25 14h.01M8.75 17.25h.01M12 17.25h.01M15.25 17.25h.01"/>',
};

export function icon(name, className = "") {
  const body = paths[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon ${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}
