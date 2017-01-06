import qs from 'qs';
import fetch from 'universal-fetch';

const objs = {};

export default function Trello({
  version = 1,
  apiEndpoint = 'https://api.trello.com',
  authEndpoint = 'https://trello.com',
  intentEndpoint = 'https://trello.com',
  token = null,
  key
}) {
  const baseURL = `${apiEndpoint}/${version}/`;
  const location = window.location;

  function authorized() {
    return !!token;
  }

  function deauthorize() {
    token = null;
    writeStorage('token', token);
    return;
  }
  /*
  parameters =
     #   type - "redirect" or "popup"
     #   name - Name to display
     #   persist - Save the token to local storage?
     #   interactive - If false, don't redirect or popup, only use the stored token, if one exists
     #   scope - The permissions we're requesting
     #   expiration - When we want the requested token to expire ("1hour", "1day", "30days", "never")
     #   appkey - the app-key https://trello.com/app-key
  */
  function authorize({
    type = 'redirect',
    name,
    persist = true,
    interactive = true,
    scope = { read: true, write: false, account: false },
    expiration = '30days'
  }) {
    if (persist) token = readStorage('token');

    if (!token) {
      const res = regexToken.exec(location.hash);
      if (res) token = res[1];
    }

    if (token) {
      if (persist) writeStorage('token', token);
      location.hash = location.hash.replace(regexToken, '');
      return Promise.resolve(token);
    }

    if (!interactive) return Promise.reject();

    scope = Object.keys(scope).filter(k => scope[k]).join(',');
    if (type === 'popup') {
      const width = 420;
      const height = 470;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;
      const origin = /^[a-z]+:\/\/[^\/]*/.exec(location)[0];

      let authWindow = window.open(authorizeURL({
        return_url: origin,
        callback_method: 'postMessage',
        scope,
        expiration,
        name
      }), 'trello', `width=${width},height=${height},left=${left},top=${top}`);

      return new Promise((resolve, reject) => {
        function receiveMessage(event) {
          if (event.origin !== authEndpoint || event.source !== authWindow) {
            return;
          }

          event.source.close();

          if (event.data && /[0-9a-f]{64}/.test(event.data)) {
            token = event.data;
            if (persist) writeStorage('token', token);
            resolve(token);
          } else {
            reject(event.data);
          }

          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
      });
    } else {
      window.location = authorizeURL({
        redirect_uri: location.href,
        callback_method: 'fragment',
        scope,
        expiration,
        name
      });
    }
  }

  function rest(method, path, params) {
    path = path.replace(/^\/*/, '');

    const data = {key, token, ...params};

    const init = {
      method,
      mode: 'cors'
    };

    if (method === 'GET') {
      path = `${path}?${qs.stringify(data)}`;
    } else {
      init['body'] = JSON.stringify(data);
    }

    return fetch(`${baseURL}${path}`, init)
      .then((response) => response.json());
  }

  const regexToken = /[&#]?token=([0-9a-f]{64})/;
  const storagePrefix = 'trello_';

  function readStorage(key) {
    const localStorage = window.localStorage;
    if (localStorage) {
      return localStorage[storagePrefix + key];
    }
    return null;
  }

  function writeStorage(key, value) {
    const localStorage = window.localStorage;
    if (localStorage) {
      if (value == null) {
        delete localStorage[storagePrefix + key];
      } else {
        localStorage[storagePrefix + key] = value;
      }
    } else {
      console.warn('do not suport localStorage');
    }
  }

  function authorizeURL(args) {
    args = {
      response_type: 'token',
      key,
      ...args
    };

    return authEndpoint + '/' + version + '/authorize?' + qs.stringify(args);
  }

  if (objs[key]) return objs[key];

  const operations = {};
  for (const method of ['GET', 'PUT', 'POST', 'DELETE']) {
    operations[method.toLowerCase()] = rest.bind(undefined, method);
  }

  const obj = Object.create({
    authorize,
    deauthorize,
    authorized,
    rest,
    ...operations
  });

  objs[key] = obj;
  return objs[key];
}
