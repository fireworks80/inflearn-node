const getUserElement = (user) => {
  return `
    <li>
      ${user.name}
      <button data-id="${user.id}">수정</button>
      <button data-id="${user.id}">삭제</button>
    </li>
  `;
};

export default (targetElement, status) => {
  const { users } = status;

  const element = targetElement.cloneNode(true);
  const list = element.querySelector('.user');

  // list.innerHTML = users?.map(getUserElement).join('');
  return element;
};
