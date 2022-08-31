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
    user.email = document.getElementById('loginEmail').value.trim()
    user.password = document.getElementById('loginPassword').value.trim()
    // 登入輸入框驗證
    formValidation()
    // 登入 AJAX
    userSignIn()
  })
  // 登入與註冊頁面切換
  changeUserInfo(signUp, startLogin)
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
function changeUserInfo(state, startLogin) {
  const changeBtn = document.querySelector('form a')
  changeBtn.addEventListener('click', () => {
    startLogin.innerHTML = state
    if(state === signUp) {
      registerRendering(startLogin)
    } else {
      Rendering()
    }
  })
}

// 登入 AJAX
function userSignIn() {
  // 建立原型鏈，增加時間天數
  Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
  }
  const errText = document.querySelector('.errMessage')
  errText.style.display = 'none'
  axios.post(`${apiUrl}users/sign_in`, { user })
    .then(response => {
      if(response.data.message === '登入成功') {
        // 取得回傳的 Token 值
        const token = response.headers.authorization
        // 建立到期時間
        const expired = new Date().addDays(7)
        // 將 Token 放入瀏覽器 Cookie
        document.cookie = `testToken=${token}; expires=${new Date(expired)}`
        // document.cookie.replace(/(?:(?:^|.*;\s*)Token\s*=\s*([^;]*).*$)|^.*$/, '$1')
        // 切換至待辦事項列表
        userList()
      }
    })
    .catch(error => {
      console.log('錯誤：', error)
      errText.innerHTML = `
        <p>${error.response.data.message}</p>
        <p>密碼錯誤，或尚未註冊。請確認是否有註冊</p>
      `
      errText.style.display = 'block'
    })
}

// 註冊頁面控制
function registerRendering(startLogin) {
  const errText = document.querySelector('.errMessage')
  errText.style.display = 'none'
  const sigUpBtn = document.querySelector('[type="submit"]')
  sigUpBtn.addEventListener('click', () => {
    user.email = document.getElementById('signUpEmail').value.trim()
    user.nickname = document.getElementById('nickName').value.trim()
    let onePassword = document.getElementById('signUpPassword')
    let twoPassword = document.getElementById('signUpPasswords')
    // 註冊輸入框驗證
    formValidation()
    // 兩次密碼確認
    if(onePassword.value.trim() === twoPassword.value.trim()) {
      user.password = onePassword.value.trim()
      userSignUp(errText)
    } else {
      errText.innerHTML = '<p>輸入的兩次密碼不同，請重新輸入。</p>'
      errText.style.display = 'block'
      onePassword.value = ''
      twoPassword.value = ''
    }
  })
  // 登入與註冊頁面切換
  changeUserInfo(logIn, startLogin)
}

// 註冊 AJAX
function userSignUp(errText) {
  axios.post(`${apiUrl}users`, { user })
    .then(response => {
      console.log(response.data)
      if(response.data.message === '註冊成功') {
        // 提示文字
        errText.innerHTML = `
          <p>${response.data.message}</p>
          <p>將在 5 秒後跳轉至登入頁面</p>
        `
        errText.style.display = 'block'
        // 切換登入畫面
        setTimeout(() => {
          Rendering()
        }, 5000)  
      }
    })
    .catch(error => {
      console.log('錯誤：', error)
      errText.innerHTML = `
        <p>${error.response.data.message}</p>
        <p>${error.response.data.error}</p>
      `
      errText.style.display = 'block'
    })
}

// 登入後事項列表
function userList() {
  globalControl.innerHTML = initList
  const listControl = document.getElementById('js-list-control')

  console.log(listControl)
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
