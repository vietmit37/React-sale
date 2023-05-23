import { admin } from "@/service/adminService";
import { doUpdateUserInf } from "../auth/authSlice";

// User
export const adminGetAllUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.getAllUser();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminCreateUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.createUser(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminBulkCreateUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.bulkCreateUser(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminUpdateUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.updateUser(data);
      thunkAPI.dispatch(doUpdateUserInf(data));
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message[0]);
    }
  };
};

export const adminDeleteUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.deleteUser(data);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const UploadAvtUser = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.postUploadUser(data);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const UserChangePassW = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.postChangePassW(data);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adGetDasboard = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.getDashboard();
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};
