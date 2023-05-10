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

// Book
export const adminGetBookPagination = () => {
  return async (query, thunkAPI) => {
    try {
      const res = await admin.getBookPagination(query);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminGetCategory = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.getCategory();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminUploadImgBook = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.postUploadBook(data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};
