import WYRequest from '../request'

// 请求详情
export function  QueryContents(id) {
  return WYRequest.post({
    url:'/items/QueryContents',
    params:{
      id
    }
  })
}
