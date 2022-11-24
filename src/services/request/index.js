import axios from 'axios'
import {BASE_URL,TIME_OUT} from './config'
class WYRequest {
  constructor(baseURL,timeOut = 10000) {
    this.instance = axios.create({
      baseURL,
      timeOut
    }

    )
    this.instance.interceptors.request.use(
      config => {
        console.log("拦截请求 请求成功");
        return config
      },
      err => {
        console.log("拦截请求 请求失败");
        return err
      }
    )
    this.instance.interceptors.response.use(
      res => {
        console.log("拦截响应 响应成功");
        return res
      },
      err => {
        console.log("拦截响应 响应失败");
        return err
      }
    )
  }
  request(config) {
    return new Promise((reslove,reject) => {
      this.instance.request(config).then(res => {
        console.log(res);
        reslove(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config,method:'get'})
  }
  post(config) {
    return this.request({...config,method:'post'})
  }
}


export default new WYRequest(BASE_URL,TIME_OUT)
