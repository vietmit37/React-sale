import { admin } from "@/service/adminService";

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
