const dataList = `
  <div class="listCard">
    <ul class="nav text-center mb-6" id="js-tabs-control">
      <li class="nav-item tabs position-relative flex-grow-1" data-toggle="all">
        <a class="nav-link link-info stretched-link py-4" href="#">全部</a>
      </li>
      <li class="nav-item tabs position-relative flex-grow-1" data-toggle="wait">
        <a class="nav-link link-info stretched-link py-4" href="#">待完成</a>
      </li>
      <li class="nav-item tabs position-relative flex-grow-1" data-toggle="done">
        <a class="nav-link link-info stretched-link py-4" href="#">已完成</a>
      </li>
    </ul>
    <ul class="px-md-6 px-4 mb-5" id="js-toDos-control"></ul>
    <ul class="d-flex justify-content-between align-items-center px-md-6 px-4 pb-md-6 pb-4">
      <li class="text-secondary">
        <span class="me-1" data-num="undone">0</span>個待完成項目
      </li>
      <li>
        <button class="btn-clearAll text-info" type="button" disabled>清除已完成項目</button>
      </li>
    </ul>
  </div>
`

// 事項列表版型
{/*
  <li class="li-style" data-id="${item.id}">
    <label for="${item.content}" class="col DynamicBox">
      <input type="checkbox" name="${item.content}" id="${item.id}" ${item.completed_at ? 'checked' : ''}>
      <span class="ms-5">${item.content}</span>
    </label>
    <button class="btn btn-todoitem bi bi-pencil-fill" type="button" aria-label="editBtn"></button>
    <button class="btn btn-todoitem bi bi-x-lg" type="button" aria-label="removeBtn"></button>
  </li>
*/}

export { dataList }