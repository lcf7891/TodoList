// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
// 載入 CSS
import './assets/scss/all.scss'

import { url } from './assets/js/AjaxApi'
import { login } from './assets/js/DomControl'
import { loginForm } from './assets/js/Templates'


console.log(url)
console.log(login)
console.log(loginForm)

login.innerHTML = loginForm