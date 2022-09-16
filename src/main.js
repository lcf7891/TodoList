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

/* 載入 axios 套件 */
import axios from 'axios'

/* 載入版型 */
import { indexPage } from './assets/js/layout/IndexLayout'
import { login } from './assets/js/layout/LoginLayout'
import { register } from './assets/js/layout/RegisterLayout'
import { initList } from './assets/js/layout/InitListLayout'
import { noneList } from './assets/js/layout/NoListLayout'
import { listCard } from './assets/js/layout/ListCardLayout'

/* 載入 DOM 頁面控制 */
import { gbControl, loginView, errMsgDom, toDosControl, itemControl, aLink, buttonBtn } from './assets/js/DomControl'

/* API 網址 */
const apiUrl = 'https://todoo.5xcamp.us/'

/* 使用者資料 */
// 使用者待辦事項暫存
let toDosData = []
// 頁籤狀態
let state = 'all'

/* 渲染初始頁面 */
function Rendering() {
  // 初始頁面
  gbControl().innerHTML = indexPage
  // 顯示登入區塊
  loginView().innerHTML = login
  // 登入驗證
  loginVerify()
  // 登入與註冊切換
  transformView()
}

/* 登入驗證 */
function loginVerify() {
  buttonBtn().addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.innerText === '登入') {
      // 取得輸入資料
      const email = document.getElementById('signInEmail').value.trim()
      const PW = document.getElementById('signInPassword').value.trim()
      // 輸入驗證
      formValidation()
      // 登入 AJAX
      signIn(email, PW)
    }
  })
}

/* 登入與註冊切換 */
function transformView() {
  aLink().addEventListener('click', (e) => {
    e.preventDefault()
    if(e.target.innerText === '註冊') {
      // 切換至註冊
      loginView().innerHTML = register
      // 註冊頁面控制
      regControl()
    } else if(e.target.innerText === '登入') {
      // 點擊登入按鈕重新渲染頁面
      Rendering()
    }
  })
}

/* 註冊頁面控制 */
function regControl() {
  // 登入與註冊切換
  transformView()
  // 註冊驗證
  regVerify()
}

/* 註冊驗證 */
function regVerify() {
  buttonBtn().addEventListener('click', (e) => {
    if(e.target.innerText === '註冊帳號') {
      // 取得輸入資料
      const email = document.getElementById('signUpEmail').value.trim()
      const nickname = document.getElementById('nickname').value.trim()
      let PW = document.getElementById('signUpPassword')
      let PWS = document.getElementById('signUpPasswords')
      // 註冊密碼檢查
      const password = PWCheck(PW, PWS, nickname)
      // 輸入驗證
      formValidation()
      // 註冊
      signUp(email, nickname, password)
    }
  })
}

/* 註冊密碼檢查 */
function PWCheck(PW, PWS, name) {
  errMsgDom().style.display = 'none'
  if(name !== '') {
    if(PW.value.trim() !== PWS.value.trim()) {
      PW.value = ''
      PWS.value = ''
      errMsgDom().innerHTML = '<p>輸入兩次密碼不一致，請重新輸入密碼。</p>'
      errMsgDom().style.display = 'block'
    } else {
      return PW.value.trim()
    }
  }
}

/* 登入 AJAX */
function signIn(email, password) {
  errMsgDom().style.display = 'none'
  axios.post(`${apiUrl}users/sign_in`, {
    user: {
      email,
      password
    }
  })
    .then(response => {
      if(response.status === 200) {
        // 將使用者 Token 在 axios headers 作為預設值
        axios.defaults.headers.common['Authorization'] = response.headers.authorization
        // 載入待辦事項初始畫面
        gbControl().innerHTML = initList
        // 加入使用者暱稱
        const userName = document.querySelector('.nav span')
        userName.innerText = `${response.data.nickname} 的待辦事項`
        // 待辦事項頁面控制
        listControl()
      }
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      // 顯示錯誤訊息
      errMsgDom().innerHTML = `
        <p>${error.response.data.message}</p>
        <p>帳號密碼錯誤，如未註冊，請先註冊。</p>
      `
      errMsgDom().style.display = 'block'     
    })
}

/* 註冊 AJAX */
function signUp(email, nickname, password) {
  errMsgDom().style.display = 'none'
  axios.post(`${apiUrl}users`, {
    user: {
      email,
      nickname,
      password
    }
  })
    .then(response => {
      if(response.status === 200) {
        // 顯示跳轉畫面預告
        errMsgDom().innerHTML = `
          <p>${response.data.message}</p>
          <p>將在 5 秒後跳轉至登入頁面</p>
        `
        errMsgDom().style.display = 'block'
        setTimeout(() => {
          // 渲染初始頁面
          Rendering()
        }, 5000)
      }
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      // 顯示錯誤訊息
      if(error.response.data.error.length <= 1) {
        errMsgDom().innerHTML = `
          <p>${error.response.data.error[0]}</p>
        `
      }
      errMsgDom().style.display = 'block'
    })
}

/* 待辦事項頁面控制 */
function listControl() {
  // 登出按鈕監聽
  aLink().addEventListener('click', (e) => {
    if(e.target.innerText === '登出') {
      // 登出 AJAX
      signOut()
    }
  })
  // 取得待辦事項
  getToDos()
  // 監聽輸入，檢查資料
  const addBtn = document.querySelector('.addTodoBtn')
  const newTodo = document.getElementById('newTodo')
  addBtn.addEventListener('click', () => checkInput(newTodo))
  newTodo.addEventListener('keyup', (e) => {
    // 當點擊鍵盤 Enter 觸發動作
    if(e.key === 'Enter') {
      // 檢查輸入資料
      checkInput(newTodo)
    }
  })
}

/* 登出 AJAX */
function signOut() {
  axios.delete(`${apiUrl}users/sign_out`)
    .then(response => {
      if(response.status === 200) {
        // 將 axios 裡的 headers 預設值清空
        axios.defaults.headers.common['Authorization'] = ''
        // 渲染初始頁面
        Rendering()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 取得待辦事項 */
function getToDos() {
  axios.get(`${apiUrl}todos`)
    .then(response => {
      // 將資料存做淺層拷貝
      toDosData = [...response.data.todos]
      // 判斷資料作畫面渲染
      if(toDosData.length === 0) {
        toDosControl().innerHTML = noneList
      } else {
        toDosControl().innerHTML = listCard
        // 顯示待完成項目數量
        const nudone = toDosData.filter(item => item.completed_at === null)
        const pending = document.querySelector('[data-num]')
        pending.innerText = nudone.length
        // 渲染待辦事項列表
        renderList(toDosData)
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 渲染待辦事項列表 */
function renderList(data) {
  // 組合事項列表
  let template = ''
  data.forEach(item => {
    template += `
      <li class="li-style" data-id="${item.id}">
        <label for="${item.id}" class="col DynamicBox">
          <input type="checkbox" name="${item.content}" id="${item.id}" ${item.completed_at ? 'checked' : ''}>
          <span class="ms-5">${item.content}</span>
        </label>
        <button class="btn btn-todoItem bi bi-pencil-fill" type="button" aria-label="editBtn"></button>
        <button class="btn btn-todoItem bi bi-x-lg" type="button" aria-label="removeBtn"></button>
      </li>
    `
  })
  // 渲染完成的事項列表
  itemControl().innerHTML = template
  // 切換頁籤
  tabToggle()
  // 選擇待辦事項
  chooseTodo()
  // 取得清除已完成項目按鈕控制
  const delAllDoneBtn = document.querySelector('.btn-clearAll')
  // 取出已完成事項
  const allDone = data.filter(item => item.completed_at !== null)
  // 判斷有無完成項目開啟按鈕
  if(allDone.length !== 0) {
    delAllDoneBtn.removeAttribute('disabled')
  } else {
    delAllDoneBtn.setAttribute('disabled', '')
  }
  // 監聽清除已完成項目按鈕
  delAllDoneBtn.addEventListener('click', delAllDone)
}

/* 檢查輸入資料 */
function checkInput(newTodo) {
  let newValue = newTodo.value.trim()
  const origin = toDosData.find(item => newValue === item.content)
  errMsgDom().style.display = 'none'
  if(!newValue) {
    errMsgDom().innerHTML = `
      <p>請輸入待辦事項</p>
    `
    errMsgDom().style.display = 'block'
  } else if(newValue !== '' && origin !== undefined) {
    errMsgDom().innerHTML = `
      <p>重複的待辦事項</p>
    `
    errMsgDom().style.display = 'block'
  } else {
    // 新增待辦事項
    addToDos(newValue)
  }
  newTodo.value = ''
}

/* 新增待辦事項 */
function addToDos(toDos) {
  axios.post(`${apiUrl}todos`, {
    todo: {
      content: toDos
    }
  })
    .then(response => {
      if(response.status === 201) {
        // 取得待辦事項
        getToDos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 選擇待辦事項 */
function chooseTodo() {
  itemControl().addEventListener('click', (e) => {
    e.preventDefault()
    // 取得點擊的目標 id 
    const id = e.target.closest('li').dataset.id
    if(e.target.getAttribute('aria-label') === 'editBtn') {
      console.log('編輯按鈕', id)
    } else if(e.target.getAttribute('aria-label') === 'removeBtn') {
      // 刪除單一項目
      delToDos(id)
    } else {
      // 待辦事項 (未完成 / 完成) 切換 AJAX
      toDosToggle(id)
    }
    // 取得待辦事項
    getToDos()
  })
}

/* 刪除單一項目 */
function delToDos(id) {
  axios.delete(`${apiUrl}todos/${id}`)
    .then(response => {
      if(response.status === 200) {
        // 取得待辦事項
        getToDos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 待辦事項 (未完成 / 完成) 切換 AJAX */
function toDosToggle(id) {
  axios.patch(`${apiUrl}todos/${id}/toggle`)
    .then(response => {
      if(response.status === 200) {
        // 取得待辦事項
        getToDos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 切換頁籤 */
function tabToggle() {
  const tag = document.getElementById('js-tabs-control')
  tag.addEventListener('click', (e) =>{
    const tabs = document.querySelectorAll('#js-tabs-control li')
    tabs.forEach(item => item.classList.remove('active'))
    e.target.closest('li').classList.add('active')
    state = e.target.closest('li').dataset.toggle
    // 頁籤分類
    tagSort()
  })
}

/* 頁籤分類 */
function tagSort() {
  let tempData = []
  if(state === 'wait') {
    tempData = toDosData.filter(item => item.completed_at === null)
  } else if (state === 'done') {
    tempData = toDosData.filter(item => item.completed_at !== null)
  } else {
    tempData = toDosData
  }
  // 渲染待辦事項列表
  renderList(tempData)
}

/* 刪除全部已完成待辦事項 */
function delAllDone() {
  console.log('delAll')
}

Rendering()

// gbControl().innerHTML = indexPage

// /* 初始頁面 */
// function initPage() {
//   loginView().innerHTML = login
//   // 登入驗證
//   loginVerify()
//   // 切換註冊
//   transformView()
// }

// /* 登入與註冊切換 */
// function transformView() {
//   const changeBtn = document.querySelector('[href="#"]')
//   changeBtn.addEventListener('click', (e) => {
//     if(e.target.innerText === '註冊') {
//       loginView().innerHTML = register
//       regControl()
//     } else {
//       initPage()
//     }
//   })
// }

// /* 登入驗證 */
// function loginVerify() {
//   const loginBtn = document.querySelector('[type="submit"]')
//   loginBtn.addEventListener('click', () => {
//     const email = document.getElementById('signInEmail').value.trim()
//     const PW = document.getElementById('signInPassword').value.trim()
//     // 輸入驗證
//     formValidation()
//     // 登入
//     signIn(email, PW)
//     toDosControl()
//   })

// }

// /* 註冊頁面控制 */
// function regControl() {
//   // 切換登入
//   transformView()
//   // 註冊驗證
//   regVerify()
// }

// /* 註冊驗證 */
// function regVerify() {
//   const regBtn = document.querySelector('[type="submit"]')
//   regBtn.addEventListener('click', () => {
//     const email = document.getElementById('signUpEmail').value.trim()
//     const nickname = document.getElementById('nickname').value.trim()
//     let PW = document.getElementById('signUpPassword')
//     let PWS = document.getElementById('signUpPasswords')
//     const password = PWCheck(PW, PWS, nickname)
//     // 輸入驗證
//     formValidation()
//     // 初始功能放入跨檔資料暫存
//     const tempFn = { init: initPage()}
//     setApiRes(tempFn)
//     // 註冊
//     signUp(email, nickname, password)
//   })
// }

// /* 註冊密碼檢查 */
// function PWCheck(PW, PWS, name) {
//   errMsgDom().style.display = 'none'
//   if(name !== '') {
//     if(PW.value.trim() !== PWS.value.trim()) {
//       PW.value = ''
//       PWS.value = ''
//       errMsgDom().innerHTML = '<p>輸入兩次密碼不一致，請重新輸入密碼。</p>'
//       errMsgDom().style.display = 'block'
//     } else {
//       return PW.value.trim()
//     }
//   }
// }

// /* 待辦事項頁面控制 */
// function toDosControl() {
//   const userName = document.querySelector('.nav > span')
// }

// initPage()


// const indexLayout = document.getElementById('js-indexLayout-control')
// const viewSignIn = document.getElementById('js-signIn-control')
// const viewSignUp = document.getElementById('js-signUp-control')

// indexLayout.addEventListener('click', (e) => {
//   console.log(e)
// })

// console.log(SignUp)

// /* 宣告 DOM 控制變數 */
// const globalControl = document.getElementById('js-global-control')
// const loginPage = document.getElementById('js-LoginRegister-control')

// /* 初始頁面 */
// function Rendering() {
//   monitorBtn()
// }

// /* 監聽按鈕 */
// function monitorBtn() {
//   const AJAXBtn = document.querySelector('[type="submit"]')
//   const loginReg = document.querySelector('[href="#"]')
//   AJAXBtn.addEventListener('click', (e) => {
//     if(e.target.textContent === '登入') {
//       // 取得使用者輸入資料
//       user.email = document.getElementById('signInEmail').value.trim()
//       user.password = document.getElementById('signInPassword').value.trim()
//       // 輸入欄位驗證
//       formValidation()
//       // 登入 AJAX
//       signIn()
//     }
//   })
// }

// /* 登入 AJAX */
// function signIn() {
//   axios.post(`${apiUrl}users/sign_in`, { user })
//     .then(response => console.log(response))
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// Rendering()

// function Rendering() {
//   loginPage.innerHTML = login
//   // 登入頁面控制
//   loginControl()
//   // 切換註冊
//   transformPage()
// }

// /* 登入與註冊切換 */
// function transformPage() {
//   const regBtn = document.querySelector('[href="#"]')
//   regBtn.addEventListener('click', (e) => {
//     if (e.target.innerText === '註冊') {
//       loginPage.innerHTML = register
//       // 註冊頁面控制
//       regControl()
//     } else {
//       Rendering()
//     }
//   })
// }


// function loginControl() {
//   const changeBtn = document.querySelector('[type="submit"]')
//   changeBtn.addEventListener('click', () => {
//     user.email = document.getElementById('signInEmail').value.trim()
//     user.password = document.getElementById('signInPassword').value.trim()
//     // 輸入資料驗證
//     formValidation()
//     // 登入 AJAX
//     signIn()
//   })
// }

// /* 註冊頁面控制 */
// function regControl() {
//   const regBtn = document.querySelector('[type="submit"]')
//   const errMsg = document.querySelector('.errMessage')
//   errMsg.style.display = 'none'
//   const errBlock = errMsg.style.display = 'block'
//   regBtn.addEventListener('click', () => {
//     user.email = document.getElementById('signUpEmail').value.trim()
//     user.nickname = document.getElementById('nickname').value.trim()
//     let pwOne = document.getElementById('signUpPassword')
//     let pwTwo = document.getElementById('signUpPasswords')
//     if (user.nickname !== '') {
//       if (pwOne.value !== pwTwo.value) {
//         pwOne.value = ''
//         pwTwo.value = ''
//         errMsg.innerHTML = '<p>輸入兩次密碼不一致，請重新輸入密碼。</p>'
//         errBlock
//       }
//       user.password = pwOne.value.trim()
//     }
//     // 輸入資料驗證
//     formValidation()
//     // 註冊 AJAX
//     signUp(errMsg, errBlock)
//   })
//   // 切換登入
//   transformPage()
// }

// /* 登入 AJAX */
// function signIn() {
//   axios.post(`${apiUrl}users/sign_in`, { user })
//     .then(response => {
//       axios.defaults.headers.common['Authorization'] = response.headers.authorization
//       if (response.status === 200) {
//         globalControl.innerHTML = initList
//         // 改成使用者暱稱
//         const changeName = document.querySelector('li>span')
//         changeName.innerText = response.data.nickname
//         userTodos()
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// /* 註冊 AJAX */
// function signUp(errMsg, errBlock) {
//   axios.post(`${apiUrl}users`, { user })
//     .then(response => {
//       if (response.data.message === '註冊成功') {
//         errMsg.innerHTML = `
//           <p>${response.data.message}</p>
//           <p>將在 5 秒後跳轉至登入頁面</p>
//         `
//         errBlock
//         setTimeout(() => {
//           Rendering()
//         }, 5000)
//       }
//     })
//     .catch(error => {
//       console.log('錯誤資訊：', error.response)
//       if (error.response.data.error.length <= 1) {
//         errMsg.innerHTML = `<p>${error.response.data.error}</p>`
//         errBlock
//       }
//     })
// }

// /* 待辦事項頁面控制 */
// function userTodos() {
//   // 登出按鈕監聽
//   const log_out = document.querySelector('li>a')
//   log_out.addEventListener('click', (e) => {
//     signOut()
//   })
//   // 取得待辦事項列表
//   getTodos()
//   const addInput = document.getElementById('newTodo')
//   const addBtn = document.getElementById('addTodoBtn')
//   // 監聽新增按鈕
//   addInput.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       examine(addInput)
//     }
//   })
//   addBtn.addEventListener('click', () => examine(addInput))
// }

// /* 登出 AJAX */
// function signOut() {
//   axios.delete(`${apiUrl}users/sign_out`)
//     .then(response => {
//       if(response.status === 200) {
//         // 清除 axios headers 預設的 Authorization
//         axios.defaults.headers.common['Authorization'] = ''
//         globalControl.innerHTML = startPage
//         document.getElementById('js-LoginRegister-control').innerHTML = login
//         // 登入頁面控制
//         loginControl()
//         // 切換註冊
//         transformPage()
//       }
      
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// /* 檢查待辦事項輸入資料 */
// function examine(source) {
//   let data = source.value.trim()
//   const origin = todo.find(item => data === item.content)
//   const errMeg = document.querySelector('.errMessage')
//   errMeg.style.display = 'none'
//   if (data === '') {
//     errMeg.innerHTML = '<p>請輸入待辦事項</p>'
//     errMeg.style.display = 'block'
//   } else if (data !== '' && origin !== undefined) {
//     errMeg.innerHTML = `<p>${data}，重複的待辦事項</p>`
//     errMeg.style.display = 'block'
//   } else {
//     todo = {}
//     todo.content = data
//     addTodo()
//   }
//   source.value = ''
// }

// /* 新增待辦事項 */
// function addTodo() {
//   axios.post(`${apiUrl}todos`, { todo })
//     .then(response => {
//       if(response.status === 201) {
//         // 取得待辦事項列表
//         getTodos()
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// /* 取得待辦事項列表 */
// function getTodos() {
//   const startList = document.getElementById('js-list-control')
//   axios.get(`${apiUrl}todos`)
//     .then(response => {
//       todo = response.data.todos
//       if(todo.length === 0) {
//         // 沒有代辦事項時顯示無資料畫面
//         startList.innerHTML = noneList
//       } else {
//         // 儲存回傳資料
//         todoData = [...todo]
//         // 有代辦事項時渲染列表卡
//         startList.innerHTML = dataList
//         // 渲染待辦事項列表
//         renderList(todoData)
//       }
//     })
//     .catch(error => console.log('錯誤資訊：?', error.response))
// }

// /* 渲染待辦事項列表 */
// function renderList(data) {
//   const listCard = document.getElementById('js-toDos-control')
//   let todosList = ''
//   // 組裝事項列表
//   data.forEach(item => {
//     todosList += `
//       <li class="li-style" data-id="${item.id}">
//         <label for="${item.content}" class="col DynamicBox">
//           <input type="checkbox" name="${item.content}" id="${item.id}" ${item.completed_at ? 'checked' : ''}>
//           <span class="ms-5">${item.content}</span>
//         </label>
//         <button class="btn btn-todoitem bi bi-pencil-fill" type="button" aria-label="editBtn"></button>
//         <button class="btn btn-todoitem bi bi-x-lg" type="button" aria-label="removeBtn"></button>
//       </li>
//     `
//   })
//   // 顯示待完成項目數量
//   const nudone = data.filter(item => item.completed_at === null)
//   const pending = document.querySelector('[data-num]')
//   pending.innerText = nudone.length
//   // 渲染完成的事項列表
//   listCard.innerHTML = todosList
//   // 切換頁籤
//   const tabs = document.getElementById('js-tabs-control')
//   tabs.addEventListener('click', toggleTab)
//   // 選擇待辦事項，編輯與刪除
//   listCard.addEventListener('click', checkTodo)
//   // 取得清除已完成項目按鈕控制
//   const delAllDoneBtn = document.querySelector('.btn-clearAll')
//   // 取出已完成事項
//   const allDone = data.filter(item => item.completed_at !== null)
//   // 判斷有無完成項目開啟按鈕
//   if(allDone.length !== 0) {
//     delAllDoneBtn.removeAttribute('disabled')
//   } else {
//     delAllDoneBtn.setAttribute('disabled', '')
//   }
//   // 監聽清除已完成項目按鈕
//   delAllDoneBtn.addEventListener('click', delAllDone)
// }

// /* 選擇待辦事項，編輯與刪除 */
// function checkTodo(e) {
//   let id = e.target.closest('li').dataset.id
//   if(e.target.getAttribute('aria-label') === 'editBtn') {
//     e.preventDefault();
//     console.log('編輯按鈕', id)
//   } else if(e.target.getAttribute('aria-label') === 'removeBtn') {
//     e.preventDefault();
//     // 刪除單一項目
//     delTodo(id)
//   } else {
//     todoData.forEach(item => {
//       if(item.id === id) {
//         if(item.completed_at === null) {
//           item.completed_at = new Date()
//         } else {
//           item.completed_at = null
//         }
//       }
//     })
//   }
//   // 選擇指定項目後更新畫面
//   renderList(todoData)
// }

// /* 刪除待辦事項 */
// function delTodo(id) {
//   axios.delete(`${apiUrl}todos/${id}`)
//     .then(response => {
//       if(response.status === 200) {
//         // 重新取得事項列表
//         getTodos()
//       }
//     })
//     .catch(error => console.log('錯誤資訊：', error.response))
// }

// /* 切換頁籤 */
// function toggleTab(e) {
//   const tag = document.querySelectorAll('#js-tabs-control li')
//   tag.forEach((item) => item.classList.remove('active'));
//   state = e.target.closest('li').dataset.toggle
//   e.target.closest('li').classList.add('active')
//   // 頁籤分類
//   tagSort()
// }

// /* 頁籤分類 */
// function tagSort() {
//   let tempData = []
//   if(state === 'wait') {
//     tempData = todoData.filter(item => item.completed_at === null)
//   } else if (state === 'done') {
//     tempData = todoData.filter(item => item.completed_at !== null)
//   } else {
//     tempData = todoData
//   }
//   // 渲染待辦事項列表
//   renderList(tempData)
// }

// /* 清除已完成所有項目 */
// function delAllDone() {
//   console.log('del')
// }


// Rendering()
