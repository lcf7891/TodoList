const dataList = `
  <div class="listCard">
    <ul class="nav text-center mb-6">
      <li class="nav-item position-relative flex-grow-1">
        <a class="nav-link link-info stretched-link py-4" href="#">完成</a>
      </li>
      <li class="nav-item position-relative flex-grow-1">
        <a class="nav-link link-info stretched-link py-4" href="#">待完成</a>
      </li>
      <li class="nav-item position-relative flex-grow-1">
        <a class="nav-link link-info stretched-link py-4" href="#">已完成</a>
      </li>
    </ul>
    <ul class="px-md-6 px-4 mb-5" id="js-toDos-control"></ul>
    <ul class="d-flex justify-content-between align-items-center px-md-6 px-4 pb-md-6 pb-4">
      <li class="text-secondary">
        <span class="me-1">0</span>個待完成項目
      </li>
      <li>
        <button class="btn-clearAll text-info" type="button" disabled>清除已完成項目</button>
      </li>
    </ul>
  </div>
`

export { dataList }