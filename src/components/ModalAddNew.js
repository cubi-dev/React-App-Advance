import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/UserService";
import { ToastContainer, toast } from 'react-toastify';


const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props; //ngoặc này dùng để tạo biến (short hand)
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  
  const handleSaveUser = async () => {
    // Nó là async function bởi vì nó là bất đồng bộ 
    let res = await postCreateUser(name, job)
    console.log(">>>check res: ", res);
    // success 
    if (res && res.id) {//nếu có trả về trường id 
      handleClose(); 
      setName(""); 
      setJob(""); 
      toast.success("🤰🏻A User is created succeed")
      handleUpdateTable({first_name: name, id: res.id})
    }else {// error 
      toast.error("🚩An Error.....")
    }
  };

  return (
    <>
      <Modal 
      show={show} 
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new users</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddNew;
