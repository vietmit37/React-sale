import { auth } from "@/service/authService";

export const authRegisterAPI = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await auth.getRegister(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const authLoginAPI = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await auth.getLogin(data);
      const token = res.data.access_token;
      localStorage.setItem("access", token);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const authLogoutAPI = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await auth.getLogout();
      localStorage.removeItem("access");
      window.location.reload();
      return res;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const getAccountAPI = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await auth.getAccount(data);
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};
