export const toggleLoading = (element: HTMLElement | any) => {
  element.classList.toggle('loading');
};

export const themeSwitcher = (element: HTMLInputElement) => {
  element.checked = localStorage.getItem('switchedTheme') === 'true';

  element.addEventListener('change', function (e) {
    if ((<HTMLInputElement>e.target).checked === true) {
      localStorage.setItem('switchedTheme', 'true');
    } else {
      localStorage.removeItem('switchedTheme');
    }
  });
};
