import { Cookies } from 'react-cookie'
import { CookieSetOptions } from 'universal-cookie'

const cookies = new Cookies()

/* 쿠키 설정 */
export const setCookie = (name: string, value: any, options?: CookieSetOptions)=>{
	return cookies.set(name, value, {...options})
}

/* 쿠키 값 가져오기 */
export const getCookie = (name: string)=>{
	return cookies.get(name)
}

/* 쿠키 삭제 */
export const removeCookie = (name: string)=>{
	return cookies.remove(name)
}