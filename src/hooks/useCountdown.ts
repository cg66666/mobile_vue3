import { ref, watch, type Ref } from 'vue';
enum statusEnum {
  START,
  PAUSE,
  CANCEL,
}
/**
 *
 * @param diffTime 需要计时的剩余时间（毫秒）
 * @returns 开始函数、暂停函数、重新计算函数、计算剩余时间（毫秒）
 */
export const useCountdown = (diffTime: Ref<number>) => {
  let timer: number;
  let startTime: number;
  let status = statusEnum.CANCEL;
  const currentDiffTime = ref<number>(diffTime.value);
  let middleDiffTime: number = diffTime.value;
  const startCountdown = () => {
    if (status === statusEnum.START) return;
    status = statusEnum.START;
    startTime = Date.now();
    const doCountdown = () => {
      const currentTime = Date.now();
      currentDiffTime.value = middleDiffTime - (currentTime - startTime);
      timer = requestAnimationFrame(doCountdown);
    };
    requestAnimationFrame(doCountdown);
  };
  const cancelCountdown = () => {
    if (status === statusEnum.CANCEL) return;
    initCountDown(diffTime.value);
  };
  const pauseCountdown = () => {
    if (status === statusEnum.PAUSE) return;
    cancelAnimationFrame(timer);
    status = statusEnum.PAUSE;
    middleDiffTime = currentDiffTime.value;
  };
  const initCountDown = (val: number) => {
    cancelAnimationFrame(timer);
    status = statusEnum.CANCEL;
    currentDiffTime.value = val;
    middleDiffTime = val;
  };
  watch(diffTime, (nv) => {
    initCountDown(nv);
    startCountdown();
  });
  return {
    startCountdown,
    cancelCountdown,
    pauseCountdown,
    currentDiffTime,
  };
};
