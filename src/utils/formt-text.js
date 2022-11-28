// 处理文本内容换行
export function formtText(text) {
  console.log(text);
  if(!text) return
  const content =  text.split('\n')
  console.log(content);
  return content
}
