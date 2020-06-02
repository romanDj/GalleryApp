let API_ROOT = 'https://api.unsplash.com/';
let token = 'cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0';

let f = async (url, method = 'get', data = null, useToken = true) => {
  method = method.toUpperCase();
  let options = {
    url,
    method,
    headers: {
      //'content-type': 'multipart/form-data'
    },
  };

  if (useToken) {
    options.headers.Authorization = `Client-ID ${token}`;
  }

  const res = await fetch(`${API_ROOT}${url}`, options);

  if (res.ok) {
    return await res.json();
  }

  throw await res.json();
};

const Unsplash = {
  photos: (page = 1) => f(`photos?page=${page}`),
  photo: id => f(`photos/${id}`),
};

export default {
  Unsplash,
};
