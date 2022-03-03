export const toggleLoading = (element: HTMLElement | any) => {
  if (!element.classList.contains('loading')) {
    element.classList.add('loading');
  } else {
    element.classList.remove('loading');
  }
};
