const methodXHR = (method, url, data = {}) => {
  return axios({
    method,
    headers: {
      'Content-Type': 'Application/json',
    },
    url,
    data,
  });
};

export const getUser = async () => {
  try {
    const result = await methodXHR('GET', 'http://localhost:8080/users');
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  return [];
};
