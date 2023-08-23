const WebSocket = require('ws');
module.exports = (server) => {
  // 创建 WebSocket 服务器
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    console.log('WebSocket 连接已建立！');
    ws.on('message', (message) => {
      console.log('message', JSON.parse(message));
      const msg = JSON.parse(message);
      // const msg = message;
      // 这里的返回格式假定约定好（详情看前端ts格式）
      if (msg?.type !== 'ping') {
        // 模拟返回延迟时间
        const delay = Math.round(Math.random() * (3000 - 1000) + 1000);
        console.log(`收到消息：`, msg);
        // const time = new Date().getTime();
        // ws.send(JSON.stringify(msg));
        // 向客户端发送消息
        setTimeout(() => {
          ws.send(
            JSON.stringify({
              type: 'message',
              user: 'service_001',
              time: Date.now(),
              msg: `服务器回复：${msg.msg}`,
            })
          );
        }, delay);
      }
    });
    ws.on('close', function () {
      console.log('连接关闭');
    });
    ws.on('open', function () {
      console.log('连接成功');
    });
  });
};
