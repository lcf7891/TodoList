// API Doc https://todoo.5xcamp.us/api-docs/index.html
// UI 設計稿 https://www.figma.com/file/pFivfS3rDX3N3u3dN9aIlx/TodoList?node-id=6%3A194

/* 載入圖片 */
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'

/* 載入 CSS */
import './assets/scss/all.scss'

/* 載入 bootstrap JS */
import * as bootstrap from 'bootstrap'

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
import {
  gbControl,
  loginView,
  errMsgDom,
  toDosControl,
  itemControl,
  aLink,
  buttonBtn,
  formControl,
  modalContent,
  closeBtn,
  confirmBtn
} from './assets/js/DomControl'

/* API 網址 */
const apiUrl = 'https://todoo.5xcamp.us/'

/* 使用者資料 */
// 使用者待辦事項暫存
let toDosData = []
// 頁籤狀態
let state = 'all'
// 已完成的待辦事項
let allDone = []

/* 渲染初始頁面 */
function Rendering() {
  // 初始背景色
  gbControl().setAttribute('class', 'bg-primary')
  // 初始頁面
  gbControl().innerHTML = indexPage
  // 顯示登入區塊
  loginView().innerHTML = login
  // 登入驗證
  buttonBtn().addEventListener('click', loginVerify)
  // 登入與註冊切換
  transformView()
}

/* 登入驗證 */
function loginVerify() {
  errMsgDom().style.display = 'none'
  // 取得輸入資料
  const email = document.getElementById('signInEmail').value.trim()
  const PW = document.getElementById('signInPassword').value.trim()
  if(!formControl().checkValidity()) {
    // 檢查輸入資料
    formControl().classList.add('was-validated')
  } else {
    // 登入 AJAX
    signIn(email, PW)
  }
}

/* 登入與註冊切換 */
function transformView() {
  aLink().addEventListener('click', (e) => {
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
  // 註冊驗證
  buttonBtn().addEventListener('click', regVerify)
  // 登入與註冊切換
  transformView()
}

/* 註冊驗證 */
function regVerify() {
  errMsgDom().style.display = 'none'
  // 取得輸入資料
  const email = document.getElementById('signUpEmail').value.trim()
  const nickname = document.getElementById('nickname').value.trim()
  let PW = document.getElementById('signUpPassword')
  let PWS = document.getElementById('signUpPasswords')
  // 註冊密碼檢查
  let password = PWCheck(PW, PWS, nickname)
  if(!formControl().checkValidity()) {
    // 檢查輸入資料
    formControl().classList.add('was-validated')
  }
  if(password) {
    // 註冊 AJAX
    signUp(email, nickname, password)
  }
}

/* 註冊密碼檢查 */
function PWCheck(PW, PWS, name) {
  if(name) {
    if(PW.value.trim() !== PWS.value.trim()) {
      PW.value = ''
      PWS.value = ''
      errMsgDom().innerHTML = '<p>輸入兩次密碼不一致，請重新輸入密碼。</p>'
      errMsgDom().style.display = 'block'
      // 檢查輸入資料
      // formControl().classList.add('was-validated')
    } else {
      // 回傳
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
      console.log(response)
      if(response.status === 201) {
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
  // 更改背景
  gbControl().classList = 'bg-twoColor'
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
  errMsgDom().style.display = 'none'
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
        const nuDone= toDosData.filter(item => item.completed_at === null)
        const pending = document.querySelector('[data-num]')
        pending.innerText = nuDone.length
        // 取得已完成項目
        allDone = toDosData.filter(item => item.completed_at !== null)
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
  // 刪除全部已完成的按鈕控制
  delAllDone()
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
    const id = e.target.closest('li').dataset.id
    // 取出點擊的事項
    const toDosItem = toDosData.filter(item => item.id === id)[0]
    if(e.target.getAttribute('aria-label') === 'editBtn') {
      // 編輯待辦事項
      editModal(id, toDosItem)
    } else if(e.target.getAttribute('aria-label') === 'removeBtn') {
      // 刪除單一項目
      delModal(id, toDosItem)
      // delToDos(id)
    } else {
      // 待辦事項 (未完成 / 完成) 切換 AJAX
      toDosToggle(id)
    }
    // 取得待辦事項
    getToDos()
  })
}

/* 渲染版型 Modal 通用控制 */
function commonModalControl(status, template) {
  // 創建 Modal
  const createModal = new bootstrap.Modal(document.getElementById('hintModal'))
  // 開啟 Modal
  createModal.show()
  // 渲染版型
  modalContent().innerHTML = template
  confirmBtn().innerText = status
  // 監聽取消按鈕，關閉 Modal
  closeBtn().addEventListener('click', () => createModal.hide())
  return createModal
}

/* 刪除確認 */
function delModal(id, toDosItem) {
  // 建立版型
  const template = `
    <div class="modal-header">
      <h5 class="modal-title text-danger">刪除 - ${toDosItem.content}</h5>
    </div>
    <div class="modal-body">
      <p class="text-danger">是否要刪除『 ${toDosItem.content} 』，刪除後無法復原。</p>
    </div>
  `
  // 渲染版型，回傳 Modal 控制
  const createModal = commonModalControl('確認刪除', template)
  // 監聽確認刪除按鈕，刪除單一項目
  confirmBtn().addEventListener('click', () => {
    delToDos(id)
    createModal.hide()
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
  // 取得全部頁籤所在並監聽
  const tag = document.getElementById('js-tabs-control')
  tag.addEventListener('click', (e) =>{
    // 取得所有頁籤 DOM 內容
    const tabs = document.querySelectorAll('#js-tabs-control li')
    // 清除全部 li 裡 class 的 active
    tabs.forEach(item => item.classList.remove('active'))
    // 點擊的目標 li 加上 active
    e.target.closest('li').classList.add('active')
    // 依點擊的目標修改 state 內容
    state = e.target.closest('li').dataset.toggle
    // 頁籤分類
    tagSort()
  })
}

/* 頁籤分類 */
function tagSort() {
  let tempData = []
  // 依照當前狀態取得相應的資料
  if(state === 'wait') {
    tempData = toDosData.filter(item => item.completed_at === null)
  } else if (state === 'done') {
    tempData = allDone
  } else {
    tempData = toDosData
  }
  // 渲染待辦事項列表
  renderList(tempData)
}

/* 刪除全部已完成的按鈕控制 */
function delAllDone() {
  // 取得清除已完成項目按鈕控制
  const delAllDoneBtn = document.querySelector('.btn-clearAll')
  // 判斷有無完成項目開啟按鈕
  if(allDone.length !== 0) {
    delAllDoneBtn.removeAttribute('disabled')
  } else {
    delAllDoneBtn.setAttribute('disabled', '')
  }
  // 監聽清除已完成項目按鈕
  delAllDoneBtn.addEventListener('click', () => {
    const delArr = allDone.map(item => delToDos(item.id))
    Promise.all(delArr)
  })
}

/* 編輯待辦事項 */
function editModal(id, toDosItem) {
  // 建立版型
  const template = `
    <div class="modal-header">
      <h5 class="modal-title text-danger">編輯 - ${toDosItem.content}</h5>
    </div>
    <div class="modal-body">
      <div class="form-floating">
        <input type="text" class="form-control" id="editInput" placeholder="${toDosItem.content}">
        <label for="editInput">${toDosItem.content}</label>
      </div>
    </div>
    <div class="editErrMsg"></div>
  `
  // 渲染版型，回傳 Modal 控制
  const createModal = commonModalControl('儲存編輯', template)
  // 取得 template 渲染後 DOM 元素
  const editTxt = document.getElementById('editInput')
  const editErrMsg = document.querySelector('.editErrMsg')
  // 監聽儲存編輯按鈕
  confirmBtn().addEventListener('click', () => {
    editErrMsg.style.display = 'none'
    const toDos = editTxt.value.trim()
    // 檢查編輯資料
    if(editTxt.value.trim() === '') {
      editErrMsg.innerHTML = '<p>請輸入要修改的名稱</p>'
      editTxt.style.border = '1px solid red'
      editErrMsg.style.display = 'block'
    } else {
      // 篩選現有待辦事項與欲編輯的名稱是否有相同
      const compareData = toDosData.filter(item => item.content === toDos)
      if(compareData.length !== 0) {
        editErrMsg.innerHTML = '<p>已有相同的待辦事項</p>'
        editTxt.style.border = '1px solid red'
        editErrMsg.style.display = 'block'
      } else {
        // 編輯 AJAX
        editToDos(id, toDos)
        // 關閉 Modal
        createModal.hide()
      }
    }
  })
}

/* 編輯 AJAX */
function editToDos(id, content) {
  axios.put(`${apiUrl}todos/${id}`, {
    todo: {
      content
    }
  })
    .then(response => {
      if(response.status === 200) {
        getToDos()
      }
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}

Rendering()