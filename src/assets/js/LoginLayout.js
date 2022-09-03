const login = `
  <h3 class="d-md-block d-none fw-bold mb-6">最實用的線上待辦事項服務</h3>
  <div class="d-md-none d-block text-center">
    <img class="mb-5" src="./assets/images/logo_lg.png" alt="logo_lg">
    <h3 class="fw-bold mb-6">最實用的線上待辦事項服務</h3>
  </div>
  <form class="col-lg-7 needs-validation" novalidate>
    <div class="mb-10">
      <label for="signInEmail" class="form-label">Email</label>
      <input type="email" class="form-control form-control-lg py-3" id="signInEmail" placeholder="請輸入Email" required>
      <div class="invalid-feedback">
        請輸入正確的Email
      </div>
    </div>
    <div class="mb-10">
      <label for="signInPassword" class="form-label">密碼</label>
      <input type="password" class="form-control form-control-lg py-3" id="signInPassword" placeholder="請輸入密碼" required>
      <div class="invalid-feedback">
        請輸入密碼
      </div>
    </div>
    <div class="errMessage"></div>
    <div class="mb-6 text-center">
      <button class="btn btn-lg btn-secondary py-3 px-12" type="submit">登入</button>
    </div>
    <div class="text-center">
      <a class="link-secondary text-decoration-none" href="#">註冊帳號</a>
    </div>
  </form>
`

export { login }