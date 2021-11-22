import { getUser } from './getList.js';
import view from './view.js';

const status = {
  users: getUser(),
};

const main = document.querySelector('body');
window.requestAnimationFrame(() => {
  const newMain = view(main, status);
  main.replaceWith(newMain);
});
