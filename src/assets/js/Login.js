
const login = `
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="mb-5 d-lg-none text-center">
        <a href="index.html"><img src="./assets/images/logo_lg.png" alt="logo_lg"></a>
      </div>
      <div class="mb-6">
        <h2 class="fs-3 fw-bold d-none d-lg-block">最實用的線上代辦事項服務</h2>
        <h2 class="fs-3 fw-bold text-center d-lg-none">最實用的線上代辦事項服務</h2>
      </div>
      <form action="#">
        <div class="mb-10">
          <label for="loginEmail" class="form-label fs-5 fw-bold">Email</label>
          <input type="email" class="form-control form-control-lg py-3 px-4" id="loginEmail" placeholder="請輸入Email">
        </div>
        <div class="mb-6">
          <label for="loginpassword" class="form-label fs-5 fw-bold">密碼</label>
          <input type="password" class="form-control form-control-lg py-3 px-4" id="loginpassword" placeholder="請輸入密碼">
        </div>
        <div class="text-center mb-6">
          <button type="button" class="btn btn-lg btn-secondary py-3 px-12">登入</button>
        </div>
        <div class="text-center">
          <a href="#" class="link-secondary text-decoration-none fw-bold fs-5">註冊帳號</a>
        </div>
      </form>
    </div>
  </div>
`

export { login }