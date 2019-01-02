// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init(
)
const db = cloud.database()
exports.main = async (event, context) => db.collection('checkRecordList').field({ operator: true,
savedate: true}).get()
// exports.main = async (event, context) => db.collection('checkRecordList').field({
//   operator: true,
//   issueList: false,
//   confirmList: false,
//   pendingList: false,
//   savedate: true
//   //_id: false,
// }).get()
// 云函数入口函数
//exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
//}