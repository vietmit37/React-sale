import { admin } from "@/service/adminService";

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

export const adminGetBookId = () => {
  return async (id, thunkAPI) => {
    try {
      const res = await admin.getBookId(id);
      console.log(res.data);
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

export const adminCreatBook = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.createBook(data);
      console.log(res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};

export const adminUpdateBook = () => {
  return async (data, thunkAPI) => {
    try {
      const res = await admin.updateBook(data);
      return res.data;
    } catch (err) {
      console.log(err);
      // return thunkAPI.rejectWithValue(err.response.data.message);
    }
  };
};
