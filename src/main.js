// 載入圖片
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
// 載入 CSS
import './assets/scss/all.scss'

import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'

// 載入版型 JS 
import { startPage, logIn, register, initList, noneList, dateList } from './assets/js/Templates'

// 載入 bootstrap 驗證
import { formValidation } from './assets/js/Validation'

// 載入 AJAX 工具
import axios from 'axios'

// API 網址
const apiUrl = 'https://todoo.5xcamp.us/'

// 使用者資料變數
let user = {}
let token = ''

// 宣告全域 DOM 元素控制
const globalControl = document.getElementById('js-global-control')

// 初始頁面控制
function Rendering() {
  // 渲染初始頁面
  // globalControl.innerHTML = startPage
  // 載入登入格式
  const registerLogIn = document.getElementById('js-user-control')
  registerLogIn.innerHTML = logIn
  // 監聽登入按鈕
  const signInBtn = document.querySelector('[type="submit"]')
  monitorAddBtn('in', signInBtn)
  // 監聽切換註冊按鈕
  changeRegister(register, registerLogIn)
}

// 監聽登入與註冊按鈕
function monitorAddBtn(state, btn) {
  if(state === 'in') {
    btn.addEventListener('click', () => {
      // 取得使用者輸入資料
      user.email = document.getElementById('loginEmail').value.trim()
      user.password = document.getElementById('loginPassword').value.trim()
      // 檢查輸入資料
      formValidation()
      // 登入 AJAX
      signIn()
    })
  } else {
    btn.addEventListener('click', () => {
      user.email = document.getElementById('signUpEmail').value.trim()
      user.nickname = document.getElementById('nickName').value.trim()
      // 檢查輸入資料
      formValidation()
      // 註冊前輸入資料查驗
      RegistrInfoCheck()
    })
  }
}

// 登入與註冊切換
function changeRegister(state, registerLogIn) {
  const registerBtn = document.querySelector('form a')
  registerBtn.addEventListener('click', () => {
    if(state === register) {
      registerPage(registerLogIn)
    } else {
      Rendering()
    }
  })
}

// 註冊頁面控制
function registerPage(registerLogIn) {
  registerLogIn.innerHTML = register
  // 監聽註冊按鈕
  const signUpBtn = document.querySelector('[type="submit"]')
  monitorAddBtn('up', signUpBtn)
  // 監聽切換登入按鈕
  changeRegister(logIn, registerLogIn)
}

// 註冊前輸入資料查驗
function RegistrInfoCheck() {
  // 錯誤提示區塊控制
  const errText = document.querySelector('.errMessage')
  errText.style.display = 'none'
  let onePW = document.getElementById('signUpPassword')
  let twoPW = document.getElementById('signUpPasswords')
  // 判斷輸入資料是否正確
  if(onePW.value.trim() !== twoPW.value.trim()) {
    errText.innerHTML = '<p>輸入的兩次密碼不同，請重新輸入。</p>'
    errText.style.display = 'block'
    onePW.value = ''
    twoPW.value = ''
  } else if(onePW.value.trim() === '' || twoPW.value.trim() === '') {
    errText.innerHTML = '<p>請輸入密碼，兩次密碼不能為空</p>'
    errText.style.display = 'block'
    onePW.value = ''
    twoPW.value = ''
  } else {
    user.password = onePW.value.trim()
    // 判斷暱稱
    if(user.nickname === '') {
      errText.innerHTML = '<p>請輸入您的暱稱。</p>'
      errText.style.display = 'block'
    } else {
      // 註冊 AJAX
      signUp(errText)
    }
  }
}

// 註冊 AJAX
function signUp(errText) {
  // 串接註冊 API
  axios.post(`${apiUrl}users`, { user })
    .then(response => {
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
      console.log('錯誤資訊：', error.response)
      if(error.response.data.error.length <= 1) {
        errText.innerHTML = `<p>${error.response.data.error}</p>`
        errText.style.display = 'block'
      }
    })
}

// 登入 AJAX
function signIn() {
  // 錯誤提示區塊控制
  const errText = document.querySelector('.errMessage')
  errText.style.display = 'none'
  // 串接登入 API
  axios.post(`${apiUrl}users/sign_in`, { user })
    .then(response => {
      // token = response.headers.authorization
      // axios.defaults.headers.common['Authorization'] = token
      axios.defaults.headers.common['Authorization'] = response.headers.authorization
      todosList()
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      // 顯示錯誤訊息與提示
      errText.innerHTML = `
        <p>${error.response.data.message}</p>
        <p>帳號或密碼錯誤，如尚未註冊，請先註冊。</p>
      `
      errText.style.display = 'block'
    })
    setTimeout(() => {
      console.log(token)
    }, 5000)
}

function todosList() {
  globalControl.innerHTML = initList
  axios.get(`${apiUrl}todos`)
    .then(response => console.log(response))
    .catch(error => console.log('錯誤資訊：', error.response))
}

Rendering()
// // 初始渲染
// function Rendering() {
//   // 初始化頁面
//   globalControl.innerHTML = startPage
//   // 加載登入版型
//   const startLogin = document.getElementById('js-user-control')
//   startLogin.innerHTML = logIn
//   // 建立登入按鈕監聽
//   const logInBtn = document.querySelector('[type="submit"]')
//   logInBtn.addEventListener('click', () => {
//     user.email = document.getElementById('loginEmail').value.trim()
//     user.password = document.getElementById('loginPassword').value.trim()
//     // 登入輸入框驗證
//     formValidation()
//     // 登入 AJAX
//     userSignIn()
//   })
//   // 登入與註冊頁面切換
//   changeUserInfo(signUp, startLogin)
// }

// // bootstrap form 驗證
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

// // 登入與註冊頁面切換
// function changeUserInfo(state, startLogin) {
//   const changeBtn = document.querySelector('form a')
//   changeBtn.addEventListener('click', () => {
//     startLogin.innerHTML = state
//     if(state === signUp) {
//       registerRendering(startLogin)
//     } else {
//       Rendering()
//     }
//   })
// }

// // 登入 AJAX
// function userSignIn() {
//   // 建立原型鏈，當下時間欲增加時間天數
//   Date.prototype.addDays = function(days) {
//     this.setDate(this.getDate() + days);
//     return this;
//   }
//   const errText = document.querySelector('.errMessage')
//   errText.style.display = 'none'
//   axios.post(`${apiUrl}users/sign_in`, { user })
//     .then(response => {
//       if(response.data.message === '登入成功') {
//         // 取得回傳的 Token 值
//         token = response.headers.authorization
//         // 建立到期時間
//         // const expired = new Date().addDays(7)
//         // 將 Token 放入瀏覽器 Cookie
//         // document.cookie = `testToken=${token}; expires=${new Date(expired)}`
//         // document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
//         // 取得使用者暱稱
//         const userName = response.data.nickname
//         // 帶入使用者暱稱並切換至待辦事項列表
//         userList(userName)
//       }
//     })
//     .catch(error => {
//       console.log('錯誤：', error)
//       errText.innerHTML = `
//         <p>${error.response.data.message}</p>
//         <p>密碼錯誤，或尚未註冊。請確認是否有註冊</p>
//       `
//       errText.style.display = 'block'
//     })
// }

// // 註冊頁面控制
// function registerRendering(startLogin) {
//   const errText = document.querySelector('.errMessage')
//   errText.style.display = 'none'
//   const sigUpBtn = document.querySelector('[type="submit"]')
//   sigUpBtn.addEventListener('click', () => {
//     user.email = document.getElementById('signUpEmail').value.trim()
//     user.nickname = document.getElementById('nickName').value.trim()
//     let onePassword = document.getElementById('signUpPassword')
//     let twoPassword = document.getElementById('signUpPasswords')
//     // 註冊輸入框驗證
//     formValidation()
//     // 兩次密碼確認
//     if(onePassword.value.trim() === twoPassword.value.trim()) {
//       user.password = onePassword.value.trim()
//       userSignUp(errText)
//     } else {
//       errText.innerHTML = '<p>輸入的兩次密碼不同，請重新輸入。</p>'
//       errText.style.display = 'block'
//       onePassword.value = ''
//       twoPassword.value = ''
//     }
//   })
//   // 登入與註冊頁面切換
//   changeUserInfo(logIn, startLogin)
// }

// // 註冊 AJAX
// function userSignUp(errText) {
//   axios.post(`${apiUrl}users`, { user })
//     .then(response => {
//       console.log(response.data)
//       if(response.data.message === '註冊成功') {
//         // 提示文字
//         errText.innerHTML = `
//           <p>${response.data.message}</p>
//           <p>將在 5 秒後跳轉至登入頁面</p>
//         `
//         errText.style.display = 'block'
//         // 切換登入畫面
//         setTimeout(() => {
//           Rendering()
//         }, 5000)  
//       }
//     })
//     .catch(error => {
//       console.log('錯誤：', error)
//       errText.innerHTML = `
//         <p>${error.response.data.message}</p>
//         <p>${error.response.data.error}</p>
//       `
//       errText.style.display = 'block'
//     })
// }

// // 登入後事項列表
// function userList(userName) {
//   globalControl.innerHTML = initList
//   const listControl = document.getElementById('js-list-control')
//   let arrList = []
//   axios.get(`${apiUrl}todos`, {
//     headers: {
//       Authorization: token
//     }
//   })
//     .then(response => {
//       arrList = [...response.data.todos]
//     })
//     .catch(error => console.log('錯誤：', error.response))

//   if(arrList.length === 0) {
//     listControl.innerHTML = noneList
//   } else {
//     listControl.classList = 'listCard'
//   }
//   const inputBox = document.querySelector('[type="text"]')
//   // const addBtn = document.querySelector('[type="submit"]')
//   inputBox.addEventListener('keyup', (e) => {
//     const todo = {}
//     if(e.code === 'Enter') {
//       todo.content = inputBox.value.trim()
//       addTodo(todo)
//     }
//   })
// }

// // 新增事項
// function addTodo(todo) {
//   console.log(token)
//   axios.post(`${apiUrl}todos`, {
//     headers: {
//       Authorization: token
//     }
//   })
//     .then(response => console.log(response))
//     .catch(error => console.log('錯誤：', error.response))
// }

// Rendering()
