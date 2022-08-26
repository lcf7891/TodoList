// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

// 載入版型 JS 
import { startPage, logIn, signUp, initList, noneList, dateList } from './assets/js/Templates'

const apiUrl = 'https://todoo.5xcamp.us/'

let user = {}

function init() {
  // 將登入頁面載入
  const globalControl = document.getElementById('js-global-control')
  globalControl.innerHTML = startPage

  // 登入版型載入
  const startLogin = document.getElementById('js-user-control')
  startLogin.innerHTML = logIn

  // 監聽登入按鈕
  const addBtn = document.querySelector('[type="submit"]')
  addBtn.addEventListener('click', (e) => {
    user.email = document.querySelector('[type="email"]').value.trim()
    user.password = document.querySelector('[type="password"]').value.trim()
    // bootstrap 驗證
    formValidation()
    // 串接登入 API
    userLogin(user)
  })

  // 切換註冊畫面
  const changeSignUp = document.querySelector('form a')
  changeSignUp.addEventListener('click', () => {
    startLogin.innerHTML = signUp
    registerInfo()
  })
}

function formValidation() {
  const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(form => {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
}

function userLogin(user) {
  fetch(`${apiUrl}users/sign_in`, {
    method: 'POST',
    body: JSON.stringify({user}),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(Response => Response.json())
    .then(data => {
      console.log(data)
      if(data.message === '登入失敗') {
        console.log(data.message)
      }
    })
    .catch(error => console.log('錯誤資訊：', error))
}

function registerInfo() {
  const registerBtn = document.querySelector('[type="submit"]')
  registerBtn.addEventListener('click', () => {
    user.email = document.getElementById('loginEmail').value.trim()
    user.nickname = document.getElementById('nickName').value.trim()
    user.password = document.getElementById('loginpassword').value.trim()
    const passwords = document.getElementById('loginPasswords').value.trim()
    // bootstrap 驗證
    formValidation()
    // 串接註冊 API
    userSignUp(user)
  })
}

function userSignUp(user) {
  fetch(`${apiUrl}users`, {
    method: 'POST',
    body: JSON.stringify({user}),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('錯誤資訊：', error))
}

init()

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