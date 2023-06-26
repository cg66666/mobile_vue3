import { ref } from 'vue';
enum statusEnum {
  START,
  PAUSE,
  CANCEL
}
/**
 *
 * @param diffTime 需要计时的剩余时间（毫秒）
 * @returns
 */
export const useCountdown = (diffTime: number) => {
  let timer: number;
  const currentDiffTime = ref(diffTime);
  let middleDiffTime = diffTime;
  let startTime: number;
  let status = statusEnum.CANCEL;
  const startCountdown = () => {
    if (status === statusEnum.START) return;
    console.log(111);

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
    console.log(222);

    status = statusEnum.CANCEL;
    currentDiffTime.value = diffTime;
    middleDiffTime = diffTime;
    cancelAnimationFrame(timer);
  };
  const pauseCountdown = () => {
    if (status === statusEnum.PAUSE) return;
    console.log(333);

    status = statusEnum.PAUSE;
    middleDiffTime = currentDiffTime.value;
    cancelAnimationFrame(timer);
  };
  return {
    startCountdown,
    cancelCountdown,
    pauseCountdown,
    currentDiffTime
  };
};
