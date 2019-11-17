import getCookieValue from './getCookieValue'

export default function setCookieLang(pageLang) {
	const cookieLang = getCookieValue('lang')
	if (cookieLang === '' || cookieLang !== pageLang) {
		if(typeof pageLang !== 'undefined') {
			document.cookie = `lang=${pageLang}; path=/`;
		}
	}
	return
}