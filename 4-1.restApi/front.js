const methodXHR = (method, url, data = {}) => {
  return axios({
    method,
    url,
    data,
  });
};

const editItem = async (key, name) => {
  try {
    const result = await methodXHR('PUT', `/user/${key}`, { name });
    if (result.status !== 200) throw new Error('put error');
    getUser();
  } catch (error) {
    console.error(error);
  }
};

const removeUser = async (key) => {
  try {
    const result = await methodXHR('DELETE', `/user/${key}`);
    console.log(result);
    if (result.status !== 200) throw new Error('delete error');
    getUser();
  } catch (error) {
    console.error(error);
  }
};

const getUser = async () => {
  try {
    const result = await methodXHR('GET', '/users');
    const users = result.data;
    const fragment = new DocumentFragment();
    const ul = document.querySelector('.user');

    ul.innerHTML = '';

    Object.keys(users).forEach((key) => {
      let li = document.createElement('li');
      let edit = document.createElement('button');
      let remove = document.createElement('button');

      edit.textContent = '수정';
      remove.textContent = '삭제';
      li.textContent = users[key];
      li.appendChild(edit);
      li.appendChild(remove);

      edit.addEventListener('click', () => {
        let name = prompt();
        editItem(key, name);
      });

      remove.addEventListener('click', () => {
        removeUser(key);
      });

      fragment.appendChild(li);
    });

    ul.appendChild(fragment);
  } catch (error) {
    console.error(error);
  }
};

const formSubmit = () => {
  const formEl = document.querySelector('form');
  const sendData = async (target) => {
    await methodXHR('POST', '/user', { name: target.name.value });
    target.name.value = '';
    getUser();
  };
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    sendData(e.target);
  });
};

window.addEventListener('DOMContentLoaded', formSubmit);
window.addEventListener('load', getUser);
