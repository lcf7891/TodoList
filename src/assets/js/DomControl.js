function gbControl() {
  return document.getElementById('js-global-control')
}

function loginView() {
  return document.getElementById('js-loginRegister-control')
}

function errMsgDom() {
  return document.querySelector('.errMessage')
}

export { gbControl, loginView, errMsgDom }