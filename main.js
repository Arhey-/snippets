import { editCredentials, view } from './view.js'

const user = localStorage.bitbucketWorkspace
const auth = localStorage.bitbucketAppPwd
const id = localStorage.bitbucketSnippetId
const snippetUrl = `https://api.bitbucket.org/2.0/snippets/${user}`
const headers = { 'Authorization': 'Basic ' + btoa(user + ':' + auth) }

if (!user || !auth || !id) {
  editCredentials();
} else try {
  const r = await get();
  view(r.values)
  next(r.next)
} catch (e) {
  editCredentials(e);
}

async function get(url = snippetUrl) {
  const u = query(url, { fields: '-values.owner,-values.workspace,-values.links' })
  const r = await fetch(u, { headers })
  if (!r.ok) throw r.status
  const j = await r.json()
  console.log(u.href, j)
  return j
}

function query(url, q) {
  const u = new URL(url)
  for (const [k, v] of Object.entries(q)) {
    u.searchParams.set(k, v)
  }
  return u
}

async function next(url) {
  while (url) {
    const r = await get(url)
    url = r.next
    view(r.values)
  }
}