export function addClass(el, className) {
  el.classList.add(className);
}

export function getData(el, prefix, val) {
  prefix = "data-" + prefix;
  if (val) {
    el.setAttribute(prefix, val);
  } else {
    return el.getAttribute(prefix);
  }
}
