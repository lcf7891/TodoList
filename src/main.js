// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

// 載入版型 JS 
import { startPage, logIn, signUp, initList, noneList, dateList } from './assets/js/Templates'

let loginData = {
  email: '',
  password: ''
}

function init() {
  // 將登入頁面載入
  const globalControl = document.getElementById('js-global-control')
  globalControl.innerHTML = startPage
  // 登入版型載入
  const startLogin = document.getElementById('js-user-control')
  startLogin.innerHTML = logIn

  const addBtn = document.querySelector('[type="button"]')
  console.log(addBtn)
  addBtn.addEventListener('click', (e) => {
    console.log(e)
  })
}

// 抓取使用者登入資料


// addBtn.addEventListener('click', () => {
//   loginData.email = document.querySelector('[type="email"').value.trim()
//   loginData.password = document.querySelector('[type="password"').value.trim()
//   console.log(loginData.email)
//   console.log(loginData.password)
// })

init()

// const loginEmail = document.getElementById('loginEmail')

// console.log(loginEmail.value)

// const listControl = document.getElementById('js-list-control')

// listControl.innerHTML = dateList