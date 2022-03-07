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
      localStorage.removeItem(THEME_KEY);
    }
  });
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
