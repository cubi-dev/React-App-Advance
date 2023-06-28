import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUpdateUser } from "../services/UserService";
import { ToastContainer, toast } from "react-toastify";

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props; //ngoặc này dùng để tạo biến (short hand)
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  //
  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updatedAt) {
      // Success
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose(); 
      toast.success("🤍User updated successfull")
    }else{
      toast.error("🚩Error")
    }
    console.log(res);
  };
  //
  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  console.log(">>> check props: ", dataUserEdit);
  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <small id="nameHelp" className="form-text text-muted">
                This is react-learn!
              </small>
            </div>
            <div className="form-group">
              <label>Job</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="nameHelp"
                placeholder="Enter job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
              <small id="nameHelp" className="form-text text-muted">
                This is react-learn!
              </small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditUser;
