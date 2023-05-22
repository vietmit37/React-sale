import { api } from "./baseService";

const end_point = "order";

export const order = {
  callPlaceOrder(data) {
    return api.post(`${end_point}`, { ...data });
  },
  getHistoryOrder(query) {
    return api.get(`${end_point}?${query}`);
  },
};
