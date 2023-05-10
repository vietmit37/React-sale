import { api } from "./baseService";

const end_point = "user";
const end_point_book = "book";
const end_point_category = "database/category";
const end_point_uploadBook = "file/upload";
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
  bulkCreateUser(data) {
    return api.post(`${end_point}/bulk-create`, data);
  },
  updateUser(data) {
    return api.put(`${end_point}`, data);
  },
  deleteUser(id) {
    return api.delete(`${end_point}/${id}`);
  },
  // Book
  getBookPagination(query) {
    return api.get(`${end_point_book}?${query}`);
  },
  getCategory() {
    return api.get(`${end_point_category}`);
  },
  postUploadBook(fileImg) {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return api({
      method: "post",
      url: `${end_point_uploadBook}`,
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
        "upload-type": "book",
      },
    });
  },
};
