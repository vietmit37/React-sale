import { api } from "./baseService";

const end_point = "user";
const end_point_book = "book";
const end_point_category = "database/category";
const end_point_upload = "file/upload";
const end_point_changePassw = "user/change-password";
const end_point_Dashboard = "database/dashboard";
export const admin = {
  // User
  getAllUser() {
    return api.get(`${end_point}`);
  },
  getUserPagination(query) {
    return api.get(`${end_point}?${query}`);
  },
  createUser(data) {
    return api.post(`${end_point}`, data);
  },
  postUploadUser(fileImg) {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return api({
      method: "post",
      url: `${end_point_upload}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        "upload-type": "avatar",
      },
    });
  },
  bulkCreateUser(data) {
    return api.post(`${end_point}/bulk-create`, data);
  },
  updateUser(data) {
    return api.put(`${end_point}`, data);
  },
  deleteUser(id) {
    return api.delete(`${end_point}/${id}`);
  },
  postChangePassW(data) {
    return api.post(`${end_point_changePassw}`, data);
  },

  // Book
  getBookPagination(query) {
    return api.get(`${end_point_book}?${query}`);
  },
  getCategory() {
    return api.get(`${end_point_category}`);
  },
  getBookId(id) {
    return api.get(`${end_point_book}/${id}`);
  },
  postUploadBook(fileImg) {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return api({
      method: "post",
      url: `${end_point_upload}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        "upload-type": "book",
      },
    });
  },
  createBook(data) {
    return api.post(`${end_point_book}`, data);
  },
  updateBook(data) {
    return api.put(`${end_point_book}/${data._id}`, data);
  },

  // Dashboard
  getDashboard() {
    return api.get(`${end_point_Dashboard}`);
  },
};
