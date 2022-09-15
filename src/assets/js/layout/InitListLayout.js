const initList = `
  <nav class="navbar align-items-center py-4 px-md-9 mb-md-6">
    <div class="container-fluid">
      <a href="./index.html"><img src="./assets/images/logo_lg.png" alt="logo_lg"></a>
      <ul class="nav">
        <li class="nav-item d-md-block d-none">
          <span class="text-secondary fw-bold">暱稱</span>
        </li>
        <li class="nav-item ms-md-6">
          <a class="link-secondary text-decoration-none" href="#">登出</a>
        </li>
      </ul>
    </div>
  </nav>
  <article class="container">
    <div class="row justify-content-center">
      <section class="col-md-10 mb-1">
        <div class="input-group shadow-sm mb-3">
          <input type="text" class="form-control form-control-lg border-0 py-3" id="newTodo" placeholder="新增代辦事項">
          <button class="input-group-text addTodoBtn" type="button"><i class="bi bi-plus-lg"></i></button>
        </div>
        <div class="errMessage"></div>
      </section>
      <section class="col-md-10" id="js-list-control"></section>
    </div>
  </article>
`

export { initList }