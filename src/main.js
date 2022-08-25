// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

// 載入版型 JS 
import { startPage, logIn, signUp, initList, noneList, dateList } from './assets/js/Templates'

function init() {
  // 將登入頁面載入
  const globalControl = document.getElementById('js-global-control')
  globalControl.innerHTML = startPage
  // 登入版型載入
  const startlogin = document.getElementById('js-user-control')
  startlogin.innerHTML = logIn
} 

function loginBtn() {
  const btn = document.querySelector('button')
}

init()

// const loginEmail = document.getElementById('loginEmail')

// console.log(loginEmail.value)

// const listControl = document.getElementById('js-list-control')

// listControl.innerHTML = dateList