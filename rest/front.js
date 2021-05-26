const formEl = document.querySelector('form');
const listEl = document.querySelector('.list');

async function getUser() {
  const { data } = await axios.get('/users');

  listEl.innerHTML = '';

  Object.keys(data).map((key) => {
    const pEl = document.createElement('p');
    const spanEl = document.createElement('span');
    const editEl = document.createElement('button');
    const removeEl = document.createElement('button');

    spanEl.textContent = data[key];
    editEl.textContent = '수정';
    removeEl.textContent = '삭제';

    editEl.addEventListener('click', async () => {
      const name = prompt('바꿀이름 입력');

      if (!name) return alert('이름을 입력하세요');

      try {
        await axios.put(`/user/${key}`, { name });
        getUser();
      } catch (err) {
        console.error(err);
      } // try / catch
    });

    // remove
    removeEl.addEventListener('click', async () => {
      console.log('delete');
      await axios.delete(`/user/${key}`);
      getUser();
    });

    pEl.appendChild(spanEl);
    pEl.appendChild(editEl);
    pEl.appendChild(removeEl);

    listEl.appendChild(pEl);
  }); // map
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const inputEl = e.target.username;
  const value = inputEl.value;

  if (!value) return alert('이름을 입력하세요');

  try {
    await axios.post('/user', { value });
    getUser();
  } catch (err) {
    console.error(err);
  }

  inputEl.value = '';
});
