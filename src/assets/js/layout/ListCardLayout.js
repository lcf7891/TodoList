const listCard = `
  <div class="listCard">
    <ul class="nav text-center mb-6" id="js-tabs-control">
      <li class="nav-item tabs position-relative flex-grow-1 active" data-toggle="all">
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
  <!-- Modal -->
  <div class="modal fade" id="editModal" tabindex="-1" data-bs-backdrop="static">
  <div class="modal-dialog">
    <div class="modal-content">

      <div id="js-edit-control"></div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="closeBtn">取消</button>
        <button type="button" class="btn btn-outline-danger" id="saveBtn">儲存編輯</button>
      </div>
    </div>
  </div>
</div>
`

// 事項列表版型
{/*
  <li class="li-style" data-id="${item.id}">
    <label for="${item.content}" class="col DynamicBox">
      <input type="checkbox" name="${item.content}" id="${item.id}" ${item.completed_at ? 'checked' : ''}>
      <span class="ms-5">${item.content}</span>
    </label>
    <button class="btn btn-todoItem bi bi-pencil-fill" type="button" aria-label="editBtn"></button>
    <button class="btn btn-todoItem bi bi-x-lg" type="button" aria-label="removeBtn"></button>
  </li>
*/}

// 編輯的 Modal 版型
{/*
  <div class="modal-header">
    <h5 class="modal-title text-danger">編輯 - ${toDosItem.content}</h5>
  </div>
  <div class="modal-body">
    <div class="form-floating">
      <input type="text" class="form-control" id="editInput" placeholder="${toDosItem.content}">
      <label for="editInput">${toDosItem.content}</label>
    </div>
  </div>
  <div class="editErrMsg"></div>
*/}

export { listCard }