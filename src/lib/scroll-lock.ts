// Locks page scrolling while a menu or dialog is open. It is counted, so when two overlap (a form closing as the content it
// opened appears) the page only unlocks once the last one has closed. Separate save-and-restore code could leave a phone
// stuck unable to scroll.
let locks = 0;
let saved = "";

export function lockScroll(): () => void {
  if (locks++ === 0) {
    saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.body.style.overflow = saved;
  };
}
