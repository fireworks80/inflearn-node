async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const list = document.querySelector('.list');

    list.innerHTML = '';

    Object.keys(users).map((key) => {
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      const edit = document.createElement('button');

      span.textContent = users[key];
      edit.textContent = '수정';
      edit.addEventListener('click', async () => {
        const name = prompt('바꿀이름 입력');

        if (!name) {
          return alert('이름을 반드시 입력하시오');
        }

        try {
          await axios.put('/user/' + key, { name });
          getUser();
        } catch (err) {
          console.error(err);
        } // try
      });

      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => {
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (err) {
          console.error(err);
        } // try /catch
      });

      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log(res.data);
    });
  } catch (err) {
    console.error(err);
  } // try /catch
}

window.onload = getUser;

document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.username.value;

  if (!name) {
    return alert('이름을 입력하세요');
  }

  try {
    await axios.post('/user', { name });
    getUser();
  } catch (err) {
    console.error(err);
  } // try / catch

  e.target.username.value = '';
});
