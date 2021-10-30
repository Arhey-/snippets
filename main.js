import { html } from '../memman/html.js'

const user = localStorage.bitbucketWorkspace
const auth = localStorage.bitbucketAppPwd
const id = localStorage.bitbucketSnippetId
const snippetUrl = `https://api.bitbucket.org/2.0/snippets/${user}`
const headers = { 'Authorization': 'Basic ' + btoa(user + ':' + auth) }

if (!user || !auth || !id) {
  editCredentials();
} else try {
  const r = await get();
  console.log(r)
} catch (e) {
  editCredentials(e);
}

async function get(name) {
  const r = await fetch(snippetUrl, { headers });
  if (!r.ok) throw r.status;
  return r.json();
}

function editCredentials(error = '') {
  document.body.innerHTML = `<p>${error}</p>`;
  document.body.append(
    input('Workspace', user),
    input('SnippetId', id),
    input('AppPwd', auth),
    html.p('enter correct bitbucket creds and reload')
  );
}

function input(name, value = '') {
  const i = html.input({
    type: 'text',
    value,
    onchange: () => localStorage.setItem('bitbucket' + name, i.value),
  });
  return html.p(html.label(name, i));
}
