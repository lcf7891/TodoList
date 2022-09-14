const tempData = {}

function setApiRes(value) {
  let typeV = typeof(value)
  switch(typeV) {
    case 'number':
      tempData.num = value
      break
    case 'string':
      tempData.sting = value
      break
    default:
      tempData.obj = value
  }
}

function getApiRes() {
  return tempData
}

export { setApiRes, getApiRes }