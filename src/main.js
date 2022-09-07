// API Doc https://todoo.5xcamp.us/api-docs/index.html
// UI 設計稿 https://www.figma.com/file/pFivfS3rDX3N3u3dN9aIlx/TodoList?node-id=6%3A194

/* 載入圖片 */
import './assets/images/image.png'
import './assets/images/logo_lg.png'
import './assets/images/empty.png'
/* 載入 CSS */
import './assets/scss/all.scss'
/* 載入 bootstrap JS */
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
/* 載入 bootstrap 驗證 */
import { formValidation } from './assets/js/Validation'

/* 載入套件 */
import axios from 'axios'

/* 載入版型 */
import { startPage } from './assets/js/IndexLayout'
import { login } from './assets/js/LoginLayout'
import { register } from './assets/js/RegisterLayout'
import { initList } from './assets/js/InitListLayout'
import { dataList } from './assets/js/ListCardLayout'
import { noneList } from './assets/js/NoListLayout'

/* API 網址 */
const apiUrl = 'https://todoo.5xcamp.us/'

/* 使用者資料 */
const user = {}
const todo = {}
let todoData = []

