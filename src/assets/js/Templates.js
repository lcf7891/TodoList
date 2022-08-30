const startPage = `
  <section class="container vh-100">
    <div class="row align-items-center h-100">
      <div class="col-6 text-center d-lg-block d-none">
        <img src="./assets/images/logo_lg.png" alt="logo_lg" class="mb-5">
        <img src="./assets/images/image.png" alt="image">
      </div>
      <div class="col-lg-6" id="js-user-control"></div>
    </div>
  </section>
`

const logIn = `
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="mb-5 d-lg-none text-center">
        <a href="index.html"><img src="./assets/images/logo_lg.png" alt="logo_lg"></a>
      </div>
      <div class="mb-6">
        <h2 class="fs-3 fw-bold d-none d-lg-block">最實用的線上待辦事項服務</h2>
        <h2 class="fs-3 fw-bold text-center d-lg-none">最實用的線上待辦事項服務</h2>
      </div>
      <form class="needs-validation" novalidate>
        <div class="mb-10">
          <label for="loginEmail" class="form-label fs-5 fw-bold">Email</label>
          <input type="email" class="form-control form-control-lg py-3 px-4" id="loginEmail" placeholder="請輸入Email" required>
          <div class="invalid-feedback">
            請輸入正確的Email
          </div>
        </div>
        <div class="mb-6">
          <label for="loginPassword" class="form-label fs-5 fw-bold">密碼</label>
          <input type="password" class="form-control form-control-lg py-3 px-4" id="loginPassword" placeholder="請輸入密碼" required>
          <div class="invalid-feedback">
            請輸入密碼
          </div>
        </div>
        <div class="errMessage">
          <p>帳號或密碼錯誤，如尚未註冊，請先註冊。</p>
        </div>
        <div class="text-center mb-6">
          <button type="submit" class="btn btn-lg btn-secondary py-3 px-12">登入</button>
        </div>
        <div class="text-center">
          <a href="#" class="link-secondary text-decoration-none fw-bold fs-5">註冊帳號</a>
        </div>
      </form>
    </div>
  </div>
`

const signUp = `
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="mb-5 d-lg-none text-center">
        <a href="index.html"><img src="./assets/images/logo_lg.png" alt="logo_lg"></a>
      </div>
      <div class="mb-6">
        <h2 class="fs-3 fw-bold d-none d-lg-block">註冊帳號</h2>
        <h2 class="fs-3 fw-bold text-center d-lg-none">註冊帳號</h2>
      </div>
      <form class="needs-validation" novalidate>
        <div class="mb-6">
          <label for="signUpEmail" class="form-label fs-5 fw-bold">Email</label>
          <input type="email" class="form-control form-control-lg py-3 px-4" id="signUpEmail" placeholder="請輸入Email" required>
          <div class="invalid-feedback">
            請輸入正確的Email
          </div>
        </div>
        <div class="mb-4">
          <label for="nickName" class="form-label fs-5 fw-bold">您的暱稱</label>
          <input type="text" class="form-control form-control-lg py-3 px-4" id="nickName" placeholder="請輸入您的暱稱" required>
          <div class="invalid-feedback">
            請輸入您的暱稱
          </div>
        </div>
        <div class="mb-4">
          <label for="signUpPassword" class="form-label fs-5 fw-bold">密碼</label>
          <input type="password" class="form-control form-control-lg py-3 px-4" id="signUpPassword" placeholder="請輸入密碼" required>
          <div class="invalid-feedback">
            請輸入密碼
          </div>
        </div>
        <div class="mb-6">
          <label for="signUpPasswords" class="form-label fs-5 fw-bold">再次輸入密碼</label>
          <input type="password" class="form-control form-control-lg py-3 px-4" id="signUpPasswords" placeholder="請再次輸入密碼" required>
          <div class="invalid-feedback">
            請再次輸入密碼
          </div>
        </div>
        <div class="errMessage"></div>
        <div class="text-center mb-6">
          <button type="submit" class="btn btn-lg btn-secondary py-3 px-12">註冊帳號</button>
        </div>
        <div class="text-center">
          <a href="#" class="link-secondary text-decoration-none fw-bold fs-5">登入</a>
        </div>
      </form>
    </div>
  </div>
`

const initList = `
  <section class="container-fluid">
    <nav class="navbar py-5 px-md-8 mb-md-8 mb-3">
      <a href="index.html"><img src="./assets/images/logo_lg.png" alt="logo_lg" class="w-75"></a>
      <div class="ms-auto">
        <span class="d-md-inline-block d-none fs-5 fw-bold">暱稱</span>
        <a href="#" class="link-secondary text-decoration-none d-inline-block fs-5 ms-md-6">登出</a>
      </div>
    </nav>
    <article class="row justify-content-center">
      <div class="col-md-6">
        <div class="input-group mb-15">
          <input type="text" class="form-control border-end-0 fs-4 py-3 px-4" placeholder="新增待辦事項">
          <button type="button" class="input-group-text px-2 py-0 bg-white bi bi-plus-square-fill fs-1"></button>
        </div>
        <div class="listCard" id="js-list-control"></div>
      </div>
    </article>
  </section>
`

const noneList = `
  <p class="text-center">目前尚無代辦事項</p>
  <div class="text-center">
    <img src="./assets/images/empty.png" class="img-fluid" alt="empty">
  </div>
`

const dateList = `
  <ul class="d-flex text-center fs-5">
    <li class="border-2 border-bottom w-100 py-4">全部</li>
    <li class="border-2 border-bottom w-100 py-4">待完成</li>
    <li class="border-2 border-bottom w-100 py-4">已完成</li>
  </ul>
  <section class="p-4">
    <ul class="container fs-5">
      <li class="row align-items-center hover-clear">
        <label for="AnimationCheckBox" class="col DynamicBox">
          <input type="checkbox" name="AnimationCheckBox" id="AnimationCheckBox"><span class="ps-4">Lorem ipsum dolor sit amet.</span>
        </label>
        <div class="col-1 mb-4"><button type="button" class="bi bi-x-lg"></button></div>
      </li>
    </ul>
    <div class="d-flex justify-content-between align-items-center">
      <p class="fs-5 mb-0"><span class="px-2">0</span>個待完成項目</p>
      <button type="button" class="btn fs-5">清除已完成項目</button>
    </div>
  </section>  
`

export { startPage, logIn, signUp, initList, noneList, dateList }