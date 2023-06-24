import { get, post } from '@/ajax/index';
interface detailType {
  ok: number;
}
export const getProductInfo = async (id: number) => {
  const res = await get<detailType>('/detail/getInfo', { id });
  if (res) return res;
};
