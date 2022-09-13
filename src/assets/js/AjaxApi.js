import { gbControl, errMsgDom } from './DomControl'
import { apiRes } from './DataSend'
import { initList } from './layout/InitListLayout'

import axios from 'axios'

const apiUrl = 'https://todoo.5xcamp.us/'

// 註冊
function signUp(email, nickname, password) {
  axios.post(`${apiUrl}users`, {
    user: {
      email,
      nickname,
      password
    }
  })
    .then(response => {
      console.log(response)
      errMsgDom().innerHTML = `<p>${response.data.message}</p>`
      errMsgDom().style.display = 'block'
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      if (error.response.data.error.length <= 1) {
        errMsgDom().innerHTML = `<p>${error.response.data.error}</p>`
        errMsgDom().style.display = 'block'
      }
    })
}

// 登入
function signIn(email, password) {
  axios.post(`${apiUrl}users/sign_in`, {
    user: {
      email,
      password
    }
  })
    .then(response => {
      console.log(response)
      axios.defaults.headers.common['Authorization'] = response.headers.authorization
      gbControl().innerHTML = initList
      apiRes(response.data.nickname)
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      errMsgDom().innerHTML = `
        <p>${error.response.data.message}</p>
        <p>請確認帳號密碼是否正確。<br>尚未註冊請先註冊。</p>
      `
      errMsgDom().style.display = 'block'
    })
}

// 登出
function signOut() {
  axios.delete(`${apiUrl}users/sign_out`)
    .then(response => console.log('登出', response))
    .catch(error => console.log('錯誤資訊：', error.response))
}

// 取得列表
function getToDos() {
  axios.get(`${apiUrl}todos`)
    .then(response => console.log(response))
    .catch(error => console.log('錯誤資訊：', error.response))
}


export { signUp, signIn, signOut, getToDos, errMsgDom, gbControl }