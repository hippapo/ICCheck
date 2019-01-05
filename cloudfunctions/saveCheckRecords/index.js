// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => db.collection('checkRecordList').add({
  // data 字段表示需新增的 JSON 数据
  data: {
    //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
    operator: event.operator,
    confirmList: event.confirmList,
    pendingList: event.pendingList,
    issueList: event.issueList,
    savedate: event.savedate,
    savedatestring: event.savedatestring
    //done: false,
    // due: new Date('2018-09-01'),
    // style: {"color": "blue"},
    // tags: [
    //  'cloud',
    //  'database'
    //],
  },
  success(res) {
    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    console.log("added")
  }, fail: (res) => {
    console.log("fail added")
  }
})
  //const wxContext = cloud.getWXContext()

 //return {
  //  event,
  //  openid: wxContext.OPENID,
   // appid: wxContext.APPID,
  //  unionid: wxContext.UNIONID,
  //sum: event.a + event.b + event.b + event.b,
 //}
