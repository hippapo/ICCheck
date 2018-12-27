// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event.id)
  return db.collection('devicesList').doc(event.id).get()
  // return db.collection('devicesList').doc("173").get()
}