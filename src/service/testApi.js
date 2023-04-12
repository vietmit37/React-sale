import { api } from "./baseService";

export const testApi = {
  getTest() {
    return api.get("database/category");
  },
};
