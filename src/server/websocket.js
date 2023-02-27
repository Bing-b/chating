/**
 * author: wang
 * createTiem: 2023-2-17
 */

const ws = require('nodejs-websocket') 
const moment = require('moment') // 时间格式化

console.log('开始建立连接')

let users = []   // 用户
let conns = {}   // 存放单聊的connect
let groups = []  // 存放群组

// 广播信息
function boardcast(msg) {
  console.log(msg)
  if(msg.single && msg.single.length) { // single 单聊标识, 存储两个用户的 uid
    obj.single.forEach(item => {
      conns[item].sendText(JSON.stringify(msg))
    })
    return
  }
  if(msg.groupId) { // 群发标识
    group = groups.filter(item => {
      return item.id === msg.groupId
    })[0]
    group.users.forEach(item => {
      conns[item.uid].sendText(JSON.stringify(msg))
    })
    return
  }
  server.connections.forEach((connect) => {
    connect.sendText(JSON.stringify(msg))
  })
}

function getDate() {
  return moment().format('hh:mm:ss')
}


// 创建Websocket 服务器
const server = ws.createServer((connect)=> {
  connect.on('text',(chat) => {              // chat 为一个通信对象
    chat = JSON.parse(chat);
    conns['' + chat.uid + ''] = connect;    // 将所有uid对应的连接conn存到一个对象里面
    console.log(chat)

    switch(chat.type) {
      case 1 : // 创建连接
        let isUser = users.some( user => {
          return user.uid === chat.uid
        })

        if(!isUser) {
          users = [...new Set(users)]; // 去重
          users.push({
            nickname: chat.nickname,
            uid: chat.uid,
            status: 1,
            avater: chat.avater,
            usersign: chat.usersign
          })
        }else {
          users.map( user => {
            user.uid === chat.uid ? user.status = 1 : ''
            return user 
          })
        }
        boardcast({
          type: 1,
          nickname: chat.nickname,
          msg: chat.nickname + '加入聊天室',
          uid: chat.uid,
          avater: chat.avater,
          users: users,
          groups: groups,
          single: chat.single,
          date: getDate()
        })
        break
      
      case 22: // 注销退出群聊
        users.map( user => {
          user.uid === chat.uid ? user.status = 0 : ''
          return user
        })
        boardcast({
          type: 1,
          nickname: chat.nickname,
          msg: chat.nickname + '退出聊天室',
          uid: chat.uid,
          groups: groups,
          date: getDate()
        })
        break
      
      case 10: // 创建群
        groups.push({
          id: moment().valueOf(),
          name: chat.groupName,
          users:[{
            uid: chat.uid,
            nickname: chat.nickname
          }]
        })
        boardcast({
          type: 1,
          nickname: chat.nickname,
          msg: chat.nickname + '创建群聊' + chat.groupName,
          uid: chat.uid,
          users: users,
          groups: groups,
          single: chat.single,
          date: getDate()
        })
        break
      
      case 20: // 加入群聊
        let group = groups.filter( group => {
          return group.id === chat.groupId
        })[0]

        group.users.push({
          uid: chat.uid,
          nickname: chat.nickname
        })
        boardcast({
          type: 1,
          nickname: chat.nickname,
          msg: chat.nickname + '加入群聊' + chat.groupName,
          uid: chat.uid,
          users: users,
          groups: groups,
          single: chat.single,
          date: getDate()
        })
        break
      
      default: // 发送信息
        boardcast({
          type: 2,
          status: 1,
          nickname: chat.nickname,
          msg: chat.msg,
          uid: chat.uid,
          avater: chat.avater,
          single: chat.single,
          groupId: chat.groupId,
          date: getDate()
        })
    }

  })

  connect.on('close',() => {
    console.log('通信连接关闭')
  })
  connect.on('error',() => {
    console.log('连接异常，通信中断...')
  })

})

server.listen('8003',() => {
  console.log('websocket通信已建立完毕...')
})