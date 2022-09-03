const register = `
  <h3 class="d-md-block d-none fw-bold mb-6">註冊帳號</h3>
  <div class="d-md-none d-block text-center">
    <img class="mb-5" src="./assets/images/logo_lg.png" alt="logo_lg">
    <h3 class="fw-bold mb-6">註冊帳號</h3>
  </div>
  <form class="col-lg-7 needs-validation" novalidate>
    <div class="mb-6">
      <label for="signUpEmail" class="form-label">Email</label>
      <input type="email" class="form-control form-control-lg py-3" id="signUpEmail" placeholder="請輸入Email" required>
      <div class="invalid-feedback">
        請輸入您的 Email
      </div>
    </div>
    <div class="mb-6">
      <label for="nickname" class="form-label">您的暱稱</label>
      <input type="text" class="form-control form-control-lg py-3" id="nickname" placeholder="請輸入您的暱稱" required>
      <div class="invalid-feedback">
        請輸入您的暱稱
      </div>
    </div>
    <div class="mb-6">
      <label for="signUpPassword" class="form-label">密碼</label>
      <input type="password" class="form-control form-control-lg py-3" id="signUpPassword" placeholder="請輸入密碼" required>
      <div class="invalid-feedback">
        請輸入密碼
      </div>
    </div>
    <div class="mb-6">
      <label for="signUpPasswords" class="form-label">請再次輸入密碼</label>
      <input type="password" class="form-control form-control-lg py-3" id="signUpPasswords" placeholder="請再次輸入密碼" required>
      <div class="invalid-feedback">
        請再次輸入密碼
      </div>
    </div>
    <div class="errMessage"></div>
    <div class="mb-4 text-center">
      <button class="btn btn-lg btn-secondary py-3 px-12" type="submit">註冊帳號</button>
    </div>
    <div class="text-center">
      <a class="link-secondary text-decoration-none" href="#">登入</a>
    </div>
  </form>
`

export { register }