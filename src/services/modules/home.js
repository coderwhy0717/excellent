import WYRequest from '../request'

// 获取所有
export function getHomeData() {
  return WYRequest.post({
    url:'/items/QueryAll',
  })
}
// 添加
export function additems(title,content,link) {
  return WYRequest.post({
    url:'items/Add',
    params:{
      title,
      content,
      link
    }
  })
}


// 删除
export function deleteItem(id) {
  console.log(id,"idddd");
  return WYRequest.delete({
    url:'/items/Delete',
    params:{
      id
    }
  })
}
