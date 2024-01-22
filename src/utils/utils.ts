// export const getUrlQuery = (key: string) => {
// 	const url = decodeURI(window.location.search)
// 	const obj: { [key: string]: string } = {}
// 	if (url.includes('?')) {
// 		const str = url.substring(1)
// 		const strs = str.split('&')
// 		for (let i = 0; i < strs.length; i++) {
// 			obj[strs[i].split('=')[0]] = strs[i].split('=')[1]
// 		}
// 	}
// 	return obj[key]
// }
