import { testApi } from "../../service/testApi";

export const fetchTest = () => {
  return async (param, thunkAPI) => {
    try {
      const res = await testApi.getTest();
      console.log(thunkAPI.getState());
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  };
};
