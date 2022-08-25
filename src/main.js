// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

// import { url } from './assets/js/AjaxApi'
import { startPage, logIn, signUp, initList, noneList, dateList } from './assets/js/Templates'

const globalControl = document.getElementById('js-global-control')

globalControl.innerHTML = startPage

const startlogin = document.getElementById('js-user-control')

startlogin.innerHTML = logIn

// const listControl = document.getElementById('js-list-control')

// listControl.innerHTML = dateList