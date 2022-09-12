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
import { startPage } from './assets/js/IndexLayout'
import { login } from './assets/js/LoginLayout'
import { register } from './assets/js/RegisterLayout'
import { initList } from './assets/js/InitListLayout'
import { dataList } from './assets/js/ListCardLayout'
import { noneList } from './assets/js/NoListLayout'

/* API 網址 */
const apiUrl = 'https://todoo.5xcamp.us/'

/* 使用者資料 */
const user = {}
// 使用者待辦事項暫存
let todo = {}
// API 資料存放
let todoData = []
// 頁籤狀態
let state = 'all'

/* 宣告 DOM 控制變數 */
const globalControl = document.getElementById('js-global-control')
globalControl.innerHTML = startPage
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
    if (e.target.innerText === '註冊') {
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
  const changeBtn = document.querySelector('[type="submit"]')
  changeBtn.addEventListener('click', () => {
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
    if (user.nickname !== '') {
      if (pwOne.value !== pwTwo.value) {
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
  axios.post(`${apiUrl}users/sign_in`, { user })
    .then(response => {
      axios.defaults.headers.common['Authorization'] = response.headers.authorization
      if (response.status === 200) {
        globalControl.innerHTML = initList
        // 改成使用者暱稱
        const changeName = document.querySelector('li>span')
        changeName.innerText = response.data.nickname
        userTodos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 註冊 AJAX */
function signUp(errMsg, errBlock) {
  axios.post(`${apiUrl}users`, { user })
    .then(response => {
      if (response.data.message === '註冊成功') {
        errMsg.innerHTML = `
          <p>${response.data.message}</p>
          <p>將在 5 秒後跳轉至登入頁面</p>
        `
        errBlock
        setTimeout(() => {
          Rendering()
        }, 5000)
      }
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      if (error.response.data.error.length <= 1) {
        errMsg.innerHTML = `<p>${error.response.data.error}</p>`
        errBlock
      }
    })
}

/* 待辦事項頁面控制 */
function userTodos() {
  // 登出按鈕監聽
  const log_out = document.querySelector('li>a')
  log_out.addEventListener('click', (e) => {
    signOut()
  })
  // 取得待辦事項列表
  getTodos()
  const addInput = document.getElementById('newTodo')
  const addBtn = document.getElementById('addTodoBtn')
  // 監聽新增按鈕
  addInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      examine(addInput)
    }
  })
  addBtn.addEventListener('click', () => examine(addInput))
}

/* 登出 AJAX */
function signOut() {
  axios.delete(`${apiUrl}users/sign_out`)
    .then(response => {
      if(response.status === 200) {
        // 清除 axios headers 預設的 Authorization
        axios.defaults.headers.common['Authorization'] = ''
        globalControl.innerHTML = startPage
        document.getElementById('js-LoginRegister-control').innerHTML = login
        // 登入頁面控制
        loginControl()
        // 切換註冊
        transformPage()
      }
      
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 檢查待辦事項輸入資料 */
function examine(source) {
  let data = source.value.trim()
  const origin = todo.find(item => data === item.content)
  const errMeg = document.querySelector('.errMessage')
  errMeg.style.display = 'none'
  if (data === '') {
    errMeg.innerHTML = '<p>請輸入待辦事項</p>'
    errMeg.style.display = 'block'
  } else if (data !== '' && origin !== undefined) {
    errMeg.innerHTML = `<p>${data}，重複的待辦事項</p>`
    errMeg.style.display = 'block'
  } else {
    todo = {}
    todo.content = data
    addTodo()
  }
  source.value = ''
}

/* 新增待辦事項 */
function addTodo() {
  axios.post(`${apiUrl}todos`, { todo })
    .then(response => {
      if(response.status === 201) {
        // 取得待辦事項列表
        getTodos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 取得待辦事項列表 */
function getTodos() {
  const startList = document.getElementById('js-list-control')
  axios.get(`${apiUrl}todos`)
    .then(response => {
      todo = response.data.todos
      if(todo.length === 0) {
        // 沒有代辦事項時顯示無資料畫面
        startList.innerHTML = noneList
      } else {
        // 儲存回傳資料
        todoData = todo
        // 有代辦事項時渲染列表卡
        startList.innerHTML = dataList
        // 渲染待辦事項列表
        renderList(todoData)
      }
    })
    .catch(error => console.log('錯誤資訊：?', error.response))
}

/* 渲染待辦事項列表 */
function renderList(data) {
  const listCard = document.getElementById('js-toDos-control')
  let toDosList = ''
  // 組裝事項列表
  data.forEach(item => {
    toDosList += `
      <li class="li-style" data-id="${item.id}">
        <label for="${item.content}" class="col DynamicBox">
          <input type="checkbox" name="${item.content}" id="${item.id}" ${item.completed_at ? 'checked' : ''}>
          <span class="ms-5">${item.content}</span>
        </label>
        <button class="btn btn-todoitem bi bi-pencil-fill" type="button" aria-label="editBtn"></button>
        <button class="btn btn-todoitem bi bi-x-lg" type="button" aria-label="removeBtn"></button>
      </li>
    `
  })
  // 渲染完成的事項列表
  listCard.innerHTML = toDosList

  // 顯示待完成項目數量
  const nuDone = data.filter(item => item.completed_at === null)
  const pending = document.querySelector('[data-num]')
  pending.innerText = nuDone.length

  // 切換頁籤
  const tabs = document.getElementById('js-tabs-control')
  tabs.addEventListener('click', toggleTab)
  // 選擇待辦事項，編輯與刪除
  listCard.addEventListener('click', checkTodo)

  // 取得清除已完成項目按鈕控制
  const delAllDoneBtn = document.querySelector('.btn-clearAll')
  // 判斷有無完成項目開啟按鈕
  const allDone = data.filter(item => item.completed_at !== null)
  if(allDone.length !== 0) {
    delAllDoneBtn.removeAttribute('disabled')
  } else {
    delAllDoneBtn.setAttribute('disabled', '')
  }
  // 監聽清除已完成項目按鈕
  delAllDoneBtn.addEventListener('click', delAllDone)
}

/* 選擇待辦事項，編輯與刪除 */
function checkTodo(e) {
  let id = e.target.closest('li').dataset.id
  if(e.target.getAttribute('aria-label') === 'editBtn') {
    e.preventDefault();
    console.log('編輯按鈕', id)
  } else if(e.target.getAttribute('aria-label') === 'removeBtn') {
    e.preventDefault();
    // 刪除單一待辦事項
    delTodo(id)
    getTodos()
  } else {
    const checkItem = todoData.find(item => id === item.id)
    // 已完成事項切換
    statusToggle(checkItem.id)
  }
  // 選擇指定項目後更新畫面
  // renderList(todoData)
}

/* 已完成事項切換 */
function statusToggle(id) {
  axios.patch(`${apiUrl}todos/${id}/toggle`)
    .then(response => {
      if(response.status === 200) {
        getTodos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 刪除單一待辦事項 */
function delTodo(id) {
  axios.delete(`${apiUrl}todos/${id}`)
    .then(response => console.log('delTodo', response))
    // .then(response => {
    //   if(response.status === 200) {
    //     // 重新取得事項列表
    //     getTodos()
    //   }
    // })
    .catch(error => console.log('錯誤資訊：', error.response))
}

/* 切換頁籤 */
function toggleTab(e) {
  const tag = document.querySelectorAll('#js-tabs-control li')
  tag.forEach((item) => item.classList.remove('active'));
  state = e.target.closest('li').dataset.toggle
  e.target.closest('li').classList.add('active')
  // 頁籤分類
  tagSort()
}

/* 頁籤分類 */
function tagSort() {
  let tempData = []
  if(state === 'wait') {
    tempData = todoData.filter(item => item.completed_at === null)
  } else if (state === 'done') {
    tempData = todoData.filter(item => item.completed_at !== null)
  } else {
    tempData = todoData
  }
  // 渲染待辦事項列表
  renderList(tempData)
}

/* 清除已完成所有項目 */

function delAllDone() {
  const delData = todoData.filter(item => item.completed_at !== null)
  const idList = []
  delData.forEach(item => idList.push(item.id))
  console.log(idList)
}



Rendering()
