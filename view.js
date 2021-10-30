import { html } from '../memman/html.js'

export function editCredentials(error = '') {
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


const base = 'https://bitbucket.org/await-andy/workspace/snippets/'
const list = document.querySelector('#list')

export function view(items) {
	for (const i of items) {
		const a = html.a(
			{ target: '_blank', href: base + i.id },
			i.title
		)
		if (i.is_private) {
			a.classList.add('private')
		}
		list.append(a, html.time(i.updated_on))
	}
}