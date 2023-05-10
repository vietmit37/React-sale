import { api } from "./baseService";

const end_point_register = "user/register";
const end_point_login = "auth/login";
const end_point_account = "auth/account";
const end_point_logout = "auth/logout";
const delay = 1000;

export const auth = {
  getRegister(data) {
    return api.post(`${end_point_register}`, data);
  },
  getLogin(data) {
    return api.post(`${end_point_login}`, { ...data, delay });
  },
  getAccount() {
    return api.get(`${end_point_account}`);
  },
  getLogout() {
    return api.post(`${end_point_logout}`);
  },
};
