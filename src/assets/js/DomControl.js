function gbControl() {
  return document.getElementById('js-global-control')
}

function loginView() {
  return document.getElementById('js-loginRegister-control')
}

function errMsgDom() {
  return document.querySelector('.errMessage')
}

function todosControl() {
  return document.getElementById('js-list-control')
}

function aLink() {
  return document.querySelector('[href="#"]')
}

function buttonBtn() {
  return document.querySelector('[type="submit"]')
}

export { gbControl, loginView, errMsgDom, todosControl, aLink, buttonBtn }