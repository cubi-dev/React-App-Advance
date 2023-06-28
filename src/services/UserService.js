import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);

};

const  postCreateUser = (name, job) => {
  return axios.post("/api/users", {name, job})
}
// Ở đây cách viết tường minh sẽ phải là {name: name, job: job}
// Nhma cta viết tắt như v cũng đc vì ReactJS sẽ tự hiểu  

const putUpdateUser = (name, job) => {
  return axios.put("/api/users/2", {name, job})
}

const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
  return axios.post('/api/login', {email, password })
}

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser, loginApi };
// Export dưới dạng object thì export bao nhiêu biến cũng được 