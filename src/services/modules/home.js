import WYRequest from '../request'

export function getHomeData() {
  return WYRequest.post({
    url:'/items/QueryAll',
  })
}
