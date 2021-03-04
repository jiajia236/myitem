const Mock = require('mockjs')
// var data = Mock.mock({
//     // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
//     'list|1-10': [{
//         // 属性 id 是一个自增数，起始值为 1，每次增 1
//         'id|+1': 1
//     }]
// })
const url="http://127.0.0.1:3000"
// 输出结果
Mock.mock(`${url}/list`,'get',{
  'list|10':[{
    'id|+1':1,
    'cname':'@cname'
  }]
})

Mock.mock(`${url}/ceshilog`,'post',(options)=>{
  console.log(JSON.parse(options.body).uname);
  return {code:200}
  // if(){

  // }
})

Mock.mock(/${url}\/ceshiparams/,'get',(options)=>{
  console.log(options)
});
console.log(1);
// console.log(JSON.stringify(data,null,4))