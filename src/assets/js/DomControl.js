function gbControl() {
  return document.getElementById('js-global-control')
}

function loginView() {
  return document.getElementById('js-loginRegister-control')
}

function errMsgDom() {
  return document.querySelector('.errMessage')
}

function toDosControl() {
  return document.getElementById('js-list-control')
}

function itemControl() {
  return document.getElementById('js-toDos-control')
}

function aLink() {
  return document.querySelector('[href="#"]')
}

function buttonBtn() {
  return document.querySelector('[type="button"]')
}

function formControl() {
  // 取得 form 所有 DOM 元素，類陣列
  const forms = document.querySelectorAll('.needs-validation')
  // 轉換為陣列
  const form = Array.prototype.slice.call(forms)
  return form[0]
}

function modalContent() {
  return  document.getElementById('js-modal-control')
}

function closeBtn() {
  return document.getElementById('closeBtn')
}

function confirmBtn() {
  return document.getElementById('confirmBtn')
}

export { gbControl, loginView, errMsgDom, toDosControl, itemControl, aLink, buttonBtn, formControl, modalContent, closeBtn, confirmBtn }