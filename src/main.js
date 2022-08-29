// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
// import '../node_modules/axios/dist/axios'

// 載入版型 JS 
import { startPage, logIn, signUp, initList, noneList, dateList } from './assets/js/Templates'

// 載入 AJAX 工具
// import { axios } from '../node_modules/axios/dist/axios'
const axios = require('axios').default;

// API 網址
const apiUrl = 'https://todoo.5xcamp.us/'

// 使用者資料變數
let user = {}

// 宣告初始 DOM 元素控制
const globalControl = document.getElementById('js-global-control')

// 初始渲染
function Rendering() {
  // 初始化頁面
  globalControl.innerHTML = startPage
  // 加載登入版型
  const startLogin = document.getElementById('js-user-control')
  startLogin.innerHTML = logIn
  // 建立登入按鈕監聽
  const addBtn = document.querySelector('[type="submit"]')
  addBtn.addEventListener('click', () => {
    user.email = document.querySelector('[type="email"]').value.trim()
    user.password = document.querySelector('[type="password"]').value.trim()
    // 登入輸入框驗證
    formValidation()
    // 登入 AJAX
    userLogin()
  })
  // 建立註冊帳號按鈕監聽
  changeUserInfo()
  // const changeBtn = document.querySelector('form a')
  // changeBtn.addEventListener('click', () => {
  //   // 註冊 AJAX
  //   userSignUp(startLogin)
  // })
}

// bootstrap form 驗證
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

// 登入與註冊頁面切換
function changeUserInfo(state) {
  const changeBtn = document.querySelector('form a')
  changeBtn.addEventListener('click', () => {
    if(state === 'in') {
      // 登入 AJAX
      userLongin()
    } else {
      // 註冊 AJAX
      userSignUp()
    }
  })
}

// 登入 AJAX
function userLogin() {
  axios.post(`${apiUrl}users/sign_in`, { user })
    .then(response => {
      console.log(response)
    })
}

// 註冊 AJAX
function userSignUp(startLogin) {
  startLogin.innerHTML = signUp
  console.log('signUp')
}

Rendering()


// function Rendering() {
//   // 將登入頁面載入
//   const globalControl = document.getElementById('js-global-control')
//   globalControl.innerHTML = startPage

//   // 登入版型載入
//   const startLogin = document.getElementById('js-user-control')
//   startLogin.innerHTML = logIn

//   // 監聽登入按鈕
//   const addBtn = document.querySelector('[type="submit"]')
//   addBtn.addEventListener('click', (e) => {
//     user.email = document.querySelector('[type="email"]').value.trim()
//     user.password = document.querySelector('[type="password"]').value.trim()
//     // bootstrap 驗證
//     formValidation()
//     // 串接登入 API
//     userLogin(user, globalControl)
//   })

//   // 切換註冊畫面
//   const changeSignUp = document.querySelector('form a')
//   changeSignUp.addEventListener('click', () => {
//     startLogin.innerHTML = signUp
//     registerInfo(startLogin)
//   })
// }

// function checkPermissions() {
//   fetch(`${apiUrl}check`, {
//     headers: {
//       'content-type': 'application/json'
//     },
//     method: 'GET'
//   })
//     .then(response => response.json())
//     .then(data => console.log(data))
//   console.log('g')
// }

// function formValidation() {
//   const forms = document.querySelectorAll('.needs-validation')
//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms)
//     .forEach(form => {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//         form.classList.add('was-validated')
//       }, false)
//     })
// }

// function userLogin(user, globalControl) {
//   const errMessage = document.querySelector('.errMessage')
//   errMessage.style.display = 'none'
//   fetch(`${apiUrl}users/sign_in`, {
//     method: 'POST',
//     body: JSON.stringify({user}),
//     headers: {
//       'content-type': 'application/json'
//     },
//   })
//     .then(Response => Response.json())
//     .then(data => {
//       console.log(data)
//       if(data.message === '登入成功') {
//         globalControl.innerHTML =initList
//         userList(data.nickname)
//         // checkPermissions()
//         // globalControl.innerHTML = initList
//       } else if(data.message === '登入失敗') {
//         errMessage.style.display = 'block'
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error))
// }

// function registerInfo(startLogin) {
//   const registerBtn = document.querySelector('[type="submit"]')
//   registerBtn.addEventListener('click', () => {
//     user.email = document.querySelector('[type="email"]').value.trim()
//     user.nickname = document.getElementById('nickName').value.trim()
//     const password = document.querySelector('[type="password"]').value.trim()
//     const passwords = document.getElementById('loginPasswords').value.trim()
//     const errMessage = document.querySelector('.errMessage')
//     errMessage.style.display = 'none'
//     if(password === passwords) {
//       // bootstrap 驗證
//       formValidation()
//       // 串接註冊 API
//       userSignUp(user, startLogin)
//     } else {
//       document.getElementById('loginPasswords').classList.add('is-invalid')
//       errMessage.innerHTML = `<p>輸入第 2 次的密碼與第 1 次的不相同</p>`
//         errMessage.style.display = 'block'
//     }
//   })

//   // 切換註冊畫面
//   const changeLogIn = document.querySelector('form a')
//   changeLogIn.addEventListener('click', () => {
//     Rendering()
//   })
// }

// function userSignUp(user, startLogin) {
//   const errMessage = document.querySelector('.errMessage')
//   errMessage.style.display = 'none'
//   fetch(`${apiUrl}users`, {
//     method: 'POST',
//     body: JSON.stringify({user}),
//     headers: {
//       'content-type': 'application/json'
//     },
//   })
//     .then(response => response.json())
//     .then(data => {
//       if(data.message === '註冊成功') {
//         errMessage.innerHTML = `
//           <p>${data.message}</p>
//           <p>將在 5 秒後跳轉至登入頁面</p>
//         `
//         errMessage.style.display = 'block'

//         // 切換登入畫面
//         setTimeout(() => {
//           startLogin.innerHTML = logIn
//         }, 5000)  
//       } else if(data.message === '註冊發生錯誤') {
//         errMessage.innerHTML = `<p>${data.error[1]}。${data.error[3]}</p>`
//         errMessage.style.display = 'block'
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error))
// }

// function userList(nickname) {
//   // 將暱稱改成使用者暱稱
//   const nickName = document.querySelector('span')
//   nickName.innerText = nickname
//   // 宣告列表 DOM 元素的控制
//   const listControl = document.getElementById('js-list-control')
//   console.log(listControl)
// }

// axios.post(`${apiUrl}users/sign_in`, {
//   user: {
//     email: 'qwe789@456.asd',
//     password: 'qsc753'
//   }
// })
//   .then(response => {
//     console.log(response)
//     const token = response.headers.authorization
//     console.log(response.headers.authorization)
//   })
//   .catch(error => console.log('錯誤訊息：', error))

// Rendering()
