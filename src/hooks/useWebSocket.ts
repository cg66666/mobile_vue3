import { onMounted, onUnmounted, ref } from 'vue';
/**
 *
 * @param isHeart 是否开启心跳检测
 * @param wsUrl webSocket对应url
 * @returns
 */
export function useWebSocket<T>(isHeart: boolean, wsUrl?: string) {
  let ws: WebSocket | null;
  const pingTime = 3000;
  let ping: number;
  let closeWebSocket = false;
  // 重启最高次数
  const maxTime = 10;
  const backMsg = ref<T>();
  const initWs = () => {
    ws = new WebSocket(wsUrl ?? 'ws://110.40.134.47:8080');
    ws.onopen = () => {
      console.log('WebSocket 连接已建立！');
      if (isHeart) {
        checkHeart();
      }
    };
    ws.onmessage = (event) => {
      backMsg.value = JSON.parse(event.data);
    };
    ws.onerror = function () {
      console.log('链接断开');
      pingHeart();
    };
    ws.onclose = function () {
      console.log('链接断开');
      pingHeart();
    };
  };
  const sendMsg = (msg: T) => {
    if (ws?.readyState === 1) {
      ws?.send(JSON.stringify(msg));
    } else {
      console.error('webSocket未连接');
    }
  };
  // 心跳检测
  const checkHeart = () => {
    clearInterval(ping);
    ping = setInterval(() => {
      if (ws?.readyState === 1) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, pingTime);
  };
  // 重复唤醒webSocket
  const pingHeart = () => {
    clearInterval(ping);
    if (!closeWebSocket) {
      ws = null;
      let time = 0;
      ping = setInterval(() => {
        initWs();
        time++;
        if (time === maxTime) clearInterval(ping);
      }, pingTime);
    }
  };
  // 关闭webSocket
  const closeWs = () => {
    clearInterval(ping);
    closeWebSocket = true;
    ws?.close();
  };
  onMounted(() => {
    initWs();
  });
  onUnmounted(() => {
    closeWs();
  });
  return { sendMsg, closeWs, backMsg };
}
