import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser } from "../services/UserService";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserfromModal } = props; //ngoặc này dùng để tạo biến (short hand)
  const confirmDelete = async () => {
      let res = await deleteUser(dataUserDelete.id)
      if (res && +res.statusCode === 204) {
        // success
        toast.success("👏Delete user successfull!");
        handleClose(); 
        handleDeleteUserfromModal(dataUserDelete); 
      }else{
        // faild 
        toast.error("🚩Error"); 
      }
      console.log(">>>check delete respond: ", res);

  }
  

  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to <b>DELETE</b> this user: <br/>
          <b>Email : "{dataUserDelete.email}" </b> <br/>
          This action can't be undone! 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalConfirm;
