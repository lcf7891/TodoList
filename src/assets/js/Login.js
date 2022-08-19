
const login = `
  <h2 class="fs-2 fw-bold mb-4 w-75 mx-auto">最實用的線上待辦事項服務</h2>
  <form action="#">
    <div class="mb-5 w-75 mx-auto">
      <label for="loginEmial" class="form-label fs-4">Email</label>
      <input type="email" class="form-control form-control-lg" id="loginEmial" placeholder="請輸入Email">
    </div>
    <div class="mb-4 w-75 mx-auto">
      <label for="loginPassword" class="form-label fs-4">密碼</label>
      <input type="password" class="form-control form-control-lg" id="loginPassword" placeholder="請輸入密碼">
    </div>
    <div class="d-grid gap-2 col-3 mx-auto text-center">
      <button type="submit" class="btn btn-lg btn-secondary mb-4">登入</button>
      <a href="#" class="text-decoration-none link-secondary fs-4">註冊帳號</a>
    </div>
  </form>
`

export { login }