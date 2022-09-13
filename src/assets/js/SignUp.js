import axios from "axios";

export function SignUp() {
  axios.post(`${apiUrl}users`, {
    user: {
      email: email,
      nickname: nickname,
      password: password
    }
  })
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log('錯誤資訊：', error.response))
}
  