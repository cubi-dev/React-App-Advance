import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import { ToastContainer, toast } from "react-toastify";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";
import _, { debounce } from "lodash";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  // sortBy: chiều mà muốn sắp xếp | asc, desc: chiều tăng , giảm
  const [sortBy, setSortBy] = useState("asc");
  // sortField: field muốn sắp xếp: ID| Name| Email
  const [sortField, setSortField] = useState("id");
  // Search
  // const [keyword, setKeyword] = useState("");
  // Export CSV file
  const [dataExport, setDataExport] = useState([]);

  useEffect(() => {
    // call apis
    getUsers();
    // Số 1 ở đây chính là lấy số lượng phần tử tại trang đầu tiên
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    // console.log(">>> check new res", res);
    if (res && res.data) {
      //check nếu có api
      setListUsers(res.data); // Lấy được user thành công thì set List user
      setTotalUsers(res.total); // Lấy tổng số phần tử (trong 1 trang)
      setTotalPages(res.total_pages); // Lấy tổng số trang
    }
  };
  const handlePageClick = (event) => {
    // getUsers(1)
    // console.log("event lib: ", event);
    getUsers(+event.selected + 1);
    // Vì sao thêm dấu + ở đầu:
    // Vì k biết selected là kiểu String hay number j nên sẽ thêm dấu "+"
    // Để nó tự convert sang kiểu khác
    //  selected + 1 là vì auto trang đầu tiên đã selected:0 rồi
  };
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  //  update table
  const handleUpdateTable = (user) => {
    // [user, ...listUsers] => Copy lại list user
    setListUsers([user, ...listUsers]);
  };
  // Bật tắt edit User(nút)
  const handleEditUser = (user) => {
    // console.log(user);
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };
  // Bật tắt delete User(nút)
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
    // console.log(user);
  };
  // Hàm update user
  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers); // copy lại listUser
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name; //Cập nhật lại chính thằng index
    setListUsers(cloneListUser);
  };
  // Hàm delete use
  const handleDeleteUserfromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers); // copy lại listUser
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id); //Lấy chính cái mảng clone sau khi delete mà không có tk đã delete để set lại
    setListUsers(cloneListUser);
  };
  // Hàm sort user
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUsers); // copy lại listUser
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUsers(cloneListUser);
  };
  // console.log(">>>check sort: ", sortBy, sortField);
  // Hàm search
  const handleSearch = debounce((event) => {
    // console.log(event.target.value);
    let term = event.target.value;
    console.log(">>> run search term...", term);
    if (term) {
      // console.log(">>> run search term...");
      let cloneListUser = _.cloneDeep(listUsers); // copy lại listUser
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      // Gọi đến hàm filter để duyệt từng phần tử một | check từng email bao gồm phần tử search
      setListUsers(cloneListUser);
      console.log(cloneListUser);
    } else {
      //Khi để rỗng input thì phải fetch lại data
      getUsers(1);
    }
  }, 300);
  // Hàm CSV(Excel)
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];
  // Hàm Export (CSV file)
  const getUsersExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUsers.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };
  // Hàm import (CSV file)
  const handleImportCSV = (event) => {
    if (event.target && event.target.files[0]) {
      //Check file file/csv
      let file = event.target.files[0];
      console.log(">>>check file upload: ", file);
      if (file.type !== "text/csv") {
        toast.error("😢Only accept csv file!!");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("😢 Wrong format header CSV file!");
              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                toast.success("😍Import successful");
                setListUsers(result);
                console.log(">>> check result: ", result);
              }
            } else {
              toast.error("😢 Wrong format CSV file!");
            }
          } else {
            toast.error("😢 Not found data on CSV file!");
          }
          // console.log("Finished:", results.data);
        },
      });
    }
  };
  return (
    <>
      <div>
        <div className="my-3 add-new d-flex justify-content-between align-items-center">
          <span>
            <b>List User:</b>
          </span>
          <div className="d-flex justify-content-between align-items-center">
            <label for="test" className="btn btn-info">
              <i className=" fa-solid fa-file-import"></i> Import
            </label>
            <input
              id="test"
              type="file"
              hidden
              onChange={(event) => handleImportCSV(event)}
            />
            <CSVLink
              filename={"users.csv"}
              className="mx-3 btn btn-primary"
              target="_blank"
              data={dataExport}
              asyncOnClick={true}
              onClick={getUsersExport}
            >
              <i className="  fa-solid fa-file-export"></i> Export
            </CSVLink>

            <button
              className="btn btn-success"
              onClick={() => setIsShowModalAddNew(true)}
            >
              <i className="fa-solid fa-circle-plus"></i> Add new
            </button>
          </div>
        </div>

        <div className="col-12 col-sm-4 my-3">
          <input
            className="form-control"
            placeholder="Search user by email..."
            // value={keyword}
            onChange={(event) => handleSearch(event)}
          />
        </div>

        <div className="customize-table">
          <Table striped bordered hover className="">
            <thead>
              <tr>
                <th>
                  <div className="sort-header">
                    <span>ID</span>
                    <span>
                      <i
                        className="fa-solid fa-arrow-down-long"
                        onClick={() => handleSort("desc", "id")}
                      ></i>
                      <i
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort("asc", "id")}
                      ></i>
                    </span>
                  </div>
                </th>
                <th>
                  <div className="sort-header">Email</div>
                </th>
                <th>
                  <div className="sort-header">
                    <span>First name</span>
                    <span>
                      <i
                        className="fa-solid fa-arrow-down-long"
                        onClick={() => handleSort("desc", "first_name")}
                      ></i>
                      <i
                        className="fa-solid fa-arrow-up-long"
                        onClick={() => handleSort("asc", "first_name")}
                      ></i>
                    </span>
                  </div>
                </th>
                <th>
                  <div className="sort-header">Last name</div>
                </th>
                <th>
                  <div className="sort-header">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Check vòng map */}
              {listUsers &&
                listUsers.length > 0 &&
                listUsers.map((item, index) => {
                  return (
                    // key giúp ứng dụng hiệu năng cao hơn và tránh bị lỗi
                    <tr key={`users-${index}`}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>
                        <button
                          className="btn btn-dark mx-2"
                          onClick={() => handleEditUser(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteUser(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          // số lượng phần tử trang hiển thị trong thanh paginate
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          // tổng số trang (total_pages)
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserfromModal={handleDeleteUserfromModal}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default TableUsers;
