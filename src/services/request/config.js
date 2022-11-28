let BASE_URL = ''
const TIME_OUT = 10000
const NODE_ENV = process.env.NODE_ENV

// 开发环境
if(NODE_ENV === 'development') {
    // BASE_URL = 'http://www.codeman.ink:3000'
    // BASE_URL = 'http://123.207.32.32:9001'
    // BASE_URL = 'http://localhost:3000'
    BASE_URL = '/api'
}else if(NODE_ENV === 'production') {//生产环境
    BASE_URL = 'http://110.40.240.8:9999'
    // BASE_URL = '/api'
}

export { BASE_URL,TIME_OUT }
