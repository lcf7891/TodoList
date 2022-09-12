import axios from 'axios'

const apiUrl = 'https://todoo.5xcamp.us/'
let fulfilled = {}

// const resResolve = ''
// const resReject = ''

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
      fulfilled.resMsg = response.data.message
    })
    .catch(error => {
      console.log('錯誤資訊：', error.response)
      if (error.response.data.error.length <= 1) {
        fulfilled.resMsg = error.response.data.error
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
    })
    .catch(error => console.log('錯誤資訊：', error.response))
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

export { signUp, signIn, signOut, getToDos, fulfilled }