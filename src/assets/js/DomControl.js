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
  return document.querySelector('[type="submit"]')
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

export { gbControl, loginView, errMsgDom, toDosControl, itemControl, aLink, buttonBtn, modalContent, closeBtn, confirmBtn }