const initTemplate = `
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
        <label for="AnimationCheckBox" class="col">
          <input type="checkbox" name="AnimationCheckBox" id="AnimationCheckBox"><span class="ps-4">Lorem ipsum dolor sit amet.</span>
        </label>
        <div class="col-1"><button type="button" class="bi bi-x-lg"></button></div>
      </li>
    </ul>
    <div class="d-flex justify-content-between align-items-center">
      <p class="fs-5 mb-0"><span class="px-2">0</span>個待完成項目</p>
      <button type="button" class="btn fs-5">清除已完成項目</button>
    </div>
  </section>  
`

export { initTemplate, noneList, dateList }