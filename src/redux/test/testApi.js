import { testApi } from "../../service/testApi";

export const fetchTest = () => {
  return async (param, thunkAPI) => {
    try {
      const res = await testApi.getTest();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  };
};
