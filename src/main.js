// API Doc https://todoo.5xcamp.us/api-docs/index.html
// UI 設計稿 https://www.figma.com/file/pFivfS3rDX3N3u3dN9aIlx/TodoList?node-id=6%3A194
/* 載入圖片 */
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
/* 載入 CSS */
import './assets/scss/all.scss'
/* 載入 bootstrap JS */
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
/* 載入 bootstrap 驗證 */
import { formValidation } from './assets/js/Validation'

/* 載入佈局 */
import { login } from './assets/js/LoginLayout'
import { register } from './assets/js/RegisterLayout'
import axios from 'axios'

/* API 網址 */
const apiUrl = 'https://todoo.5xcamp.us/'

/* 使用者資料 */
const user = {}

/* 宣告 DOM 控制變數 */
const globalControl = document.getElementById('js-global-control')

const loginPage = document.getElementById('js-LoginRegister-control')

/* 初始頁面 */
function Rendering() {
  loginPage.innerHTML = login
  // 登入頁面控制
  loginControl()
  // 切換註冊
  transformPage()
}

/* 登入與註冊切換 */
function transformPage() {
  const regBtn = document.querySelector('[href="#"]')
  regBtn.addEventListener('click', (e) => {
    if(e.target.innerText === '註冊') {
      loginPage.innerHTML = register
      // 註冊頁面控制
      regControl()
    } else {
      Rendering()
    }
  })
}

/* 登入頁面控制 */
function loginControl() {
  const inBtn = document.querySelector('[type="submit"]')
  inBtn.addEventListener('click', () => {
    user.email = document.getElementById('signInEmail').value.trim()
    user.password = document.getElementById('signInPassword').value.trim()
    // 輸入資料驗證
    formValidation()
    // 登入 AJAX
    signIn()
  })
}

/* 註冊頁面控制 */
function regControl() {
  const regBtn = document.querySelector('[type="submit"]')
  const errMsg = document.querySelector('.errMessage')
  errMsg.style.display = 'none'
  const errBlock = errMsg.style.display = 'block'
  regBtn.addEventListener('click', () => {
    user.email = document.getElementById('signUpEmail').value.trim()
    user.nickname = document.getElementById('nickname').value.trim()
    let pwOne = document.getElementById('signUpPassword')
    let pwTwo = document.getElementById('signUpPasswords')
    if(user.nickname !== '') {
      if(pwOne.value !== pwTwo.value) {
        pwOne.value = ''
        pwTwo.value = ''
        errMsg.innerHTML = '<p>輸入兩次密碼不一致，請重新輸入密碼。</p>'
        errBlock     
      }
      user.password = pwOne.value.trim()
    }
    // 輸入資料驗證
    formValidation()
    // 註冊 AJAX
    signUp(errMsg, errBlock)
  })
  // 切換登入
  transformPage()
}

/* 登入 AJAX */
function signIn() {
  axios.post(`${apiUrl}users/sign_in`, { user:user })
    .then(response => {
      console.log(response)
      axios.defaults.headers.common['Authorization'] = response.headers.authorization
    })
    .catch(error => console.log('錯誤資訊：', error.response, user))
}

/* 註冊 AJAX */
function signUp(errMsg, errBlock) {
  axios.post(`${apiUrl}users`, { user })
    .then(response => console.log(response))
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      if(error.response.data.error.length = 1) {
        errMsg.innerHTML = `<p>${error.response.data.error}</p>`
        errBlock
      }
    })
}

Rendering()

// // 載入版型 JS 
// import { startPage, logIn, register, initList, noneList, dataList } from './assets/js/Templates'

// // 載入 bootstrap 驗證
// import { formValidation } from './assets/js/Validation'

// // 載入 AJAX 工具
// import axios from 'axios'

// // API 網址
// const apiUrl = 'https://todoo.5xcamp.us/'

// // 使用者資料變數
// let user = {}

// // 宣告全域 DOM 元素控制
// const globalControl = document.getElementById('js-global-control')

// // 初始頁面控制
// function Rendering() {
//   // 渲染初始頁面
//   globalControl.innerHTML = startPage
//   globalControl.classList = 'bg-primary'
//   // 載入登入格式
//   const registerLogIn = document.getElementById('js-user-control')
//   registerLogIn.innerHTML = logIn
//   // 監聽登入按鈕
//   const signInBtn = document.querySelector('[type="button"]')
//   monitorAddBtn('in', signInBtn)
//   // 監聽切換註冊按鈕
//   changeRegister(register, registerLogIn)
// }

// // 登入與註冊切換
// function changeRegister(state, registerLogIn) {
//   const registerBtn = document.querySelector('form a')
//   registerBtn.addEventListener('click', () => {
//     if(state === register) {
//       registerPage(registerLogIn)
//     } else {
//       Rendering()
//     }
//   })
// }

// // 註冊頁面控制
// function registerPage(registerLogIn) {
//   registerLogIn.innerHTML = register
//   // 監聽註冊按鈕
//   const signUpBtn = document.querySelector('[type="button"]')
//   monitorAddBtn('up', signUpBtn)
//   // 監聽切換登入按鈕
//   changeRegister(logIn, registerLogIn)
// }

// // 監聽登入與註冊按鈕
// function monitorAddBtn(state, btn) {
//   if(state === 'in') {
//     btn.addEventListener('click', () => {
//       // 取得使用者輸入資料
//       user.email = document.getElementById('loginEmail').value.trim()
//       user.password = document.getElementById('loginPassword').value.trim()
//       // 檢查輸入資料
//       formValidation()
//       // 登入 AJAX
//       signIn()
//     })
//   } else {
//     btn.addEventListener('click', () => {
//       user.email = document.getElementById('signUpEmail').value.trim()
//       user.nickname = document.getElementById('nickName').value.trim()
//       // 檢查輸入資料
//       formValidation()
//       // 註冊前輸入資料查驗
//       RegisterInfoCheck()
//     })
//   }
// }

// // 註冊前輸入資料查驗
// function RegisterInfoCheck() {
//   // 錯誤提示區塊控制
//   const errText = document.querySelector('.errMessage')
//   errText.style.display = 'none'
//   let onePW = document.getElementById('signUpPassword')
//   let twoPW = document.getElementById('signUpPasswords')
//   // 判斷輸入資料是否正確
//   if(onePW.value.trim() !== twoPW.value.trim()) {
//     errText.innerHTML = '<p>輸入的兩次密碼不同，請重新輸入。</p>'
//     errText.style.display = 'block'
//     onePW.value = ''
//     twoPW.value = ''
//   } else if(onePW.value.trim() === '' || twoPW.value.trim() === '') {
//     errText.innerHTML = '<p>請輸入密碼，兩次密碼不能為空</p>'
//     errText.style.display = 'block'
//     onePW.value = ''
//     twoPW.value = ''
//   } else {
//     user.password = onePW.value.trim()
//     // 判斷暱稱
//     if(user.nickname === '') {
//       errText.innerHTML = '<p>請輸入您的暱稱。</p>'
//       errText.style.display = 'block'
//     } else {
//       // 註冊 AJAX
//       signUp(errText)
//     }
//   }
// }

// // 註冊 AJAX
// function signUp(errText) {
//   // 串接註冊 API
//   axios.post(`${apiUrl}users`, { user })
//     .then(response => {
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
//       console.log('錯誤資訊：', error.response)
//       if(error.response.data.error.length <= 1) {
//         errText.innerHTML = `<p>${error.response.data.error}</p>`
//         errText.style.display = 'block'
//       }
//     })
// }

// // 登入 AJAX
// function signIn() {
//   // 錯誤提示區塊控制
//   const errText = document.querySelector('.errMessage')
//   errText.style.display = 'none'
//   // 串接登入 API
//   axios.post(`${apiUrl}users/sign_in`, { user })
//     .then(response => {
//       axios.defaults.headers.common['Authorization'] = response.headers.authorization
//       toDosList(response.data.nickname)
//     })
//     .catch(error => {
//       console.log('錯誤資訊：', error.response)
//       // 顯示錯誤訊息與提示
//       errText.innerHTML = `
//         <p>${error.response.data.message}</p>
//         <p>帳號或密碼錯誤，如尚未註冊，請先註冊。</p>
//       `
//       errText.style.display = 'block'
//     })
// }

// let todo = {}

// // 待辦事項列表
// function toDosList(nickname) {
//   // 載入初始頁面
//   globalControl.innerHTML = initList
//   globalControl.classList = 'bg-twoColor'
//   // 顯示使用者暱稱
//   const userName = document.getElementById('userName')
//   userName.innerHTML = nickname
//   // 登出按鈕監聽
//   const outBtn = document.getElementById('outBtn')
//   outBtn.addEventListener('click', () => {
//     // 登出 AJAX
//     signOut()
//   })
//   // 宣告控制事項列表區塊
//   const userList = document.getElementById('js-list-control')
//   // 載入事項列表
//   axios.get(`${apiUrl}todos`)
//     .then(response => {
//       const todoData = [...response.data.todos]
//       if(response.data.todos.length >= 1) {
//         userList.innerHTML = dataList
//         userList.classList = 'listCard'
//         let layout = ''
//         todoData.forEach(item => {
//           layout += `
//             <li class="row align-items-center hover-clear">
//               <label for="${item.content}" class="col DynamicBox">
//                 <input type="checkbox" name="${item.content}" id="${item.id}"><span class="ps-4">${item.content}</span>
//               </label>
//               <div class="col-1 mb-4"><button type="button" class="bi bi-x-lg"></button></div>
//             </li>
//           `
//         })
//         const todosList = document.getElementById('js-todos-control')
//         todosList.innerHTML = layout
//       } else {
//         userList.innerHTML = noneList
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))

//   const addTodoBtn = document.querySelector('[type="button"]')
//   const inputTodo = document.getElementById('matters')
//   inputTodo.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//       console.log(inputTodo.value)
//       todo.content = inputTodo.value
//       addTodo()
//     }
//   })
//   addTodoBtn.addEventListener('click', (e) => {
//     todo.content = inputTodo.value
//       addTodo()
//   })
// }

// // 登出 AJAX
// function signOut() {
//   axios.delete(`${apiUrl}users/sign_out`)
//     .then(response => {
//       if(response.data.message === '已登出') {
//         // 清空 Authorization 資料
//         // axios.defaults.headers.common['Authorization'] = ''
//         // 載入初始頁面
//         Rendering()
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// // 新增事項
// function addTodo() {
//   axios.post(`${apiUrl}todos`, { todo })
//     .then(response => console.log(response))
//     .catch(error => console.log('錯誤資訊：', error.response))
// }
// Rendering()
