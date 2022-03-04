export const toggleLoading = (element: HTMLElement | any) => {
  element.classList.toggle('loading');
};

const THEME_KEY = 'QM_THEME';

export const themeSwitcher = (element: HTMLInputElement) => {
  if (localStorage.getItem(THEME_KEY) === 'dark') {
    element.checked = true;
    document.body.classList.add('dark');
  }
  element.addEventListener('change', function (e) {
    if ((<HTMLInputElement>e.target).checked) {
      document.body.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.body.classList.remove('dark');
      // localStorage.removeItem('switchedTheme');
      localStorage.removeItem(THEME_KEY);
    }
  });
};
