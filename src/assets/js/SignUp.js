const SignUp = `
<h2 class="fs-2 fw-bold mb-4 w-75 mx-auto">註冊帳號</h2>
<form action="#">
  <div class="mb-4 w-75 mx-auto">
    <label for="loginEmial" class="form-label fs-4">Email</label>
    <input type="email" class="form-control form-control-lg" id="loginEmial" placeholder="請輸入Email">
  </div>
  <div class="mb-4 w-75 mx-auto">
    <label for="nickName" class="form-label fs-4">您的暱稱</label>
    <input type="email" class="form-control form-control-lg" id="nickName" placeholder="請輸入您的暱稱">
  </div>
  <div class="mb-4 w-75 mx-auto">
    <label for="loginPassword" class="form-label fs-4">密碼</label>
    <input type="password" class="form-control form-control-lg" id="loginPassword" placeholder="請輸入密碼">
  </div>
  <div class="mb-4 w-75 mx-auto">
    <label for="loginPasswords" class="form-label fs-4">再次輸入密碼</label>
    <input type="password" class="form-control form-control-lg" id="loginPasswords" placeholder="請再次輸入密碼">
  </div>
  <div class="d-grid gap-2 col-3 mx-auto text-center">
    <button type="submit" class="btn btn-lg btn-secondary mb-3">註冊帳號</button>
    <a href="#" class="text-decoration-none link-secondary fs-4 fw-bold">登入</a>
  </div>
</form>
`

export { SignUp }