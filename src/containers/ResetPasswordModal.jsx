import React, { useEffect, useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { API } from "../utils/API";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

const ResetPasswordModal = ({
  dispatched,
  setDispatched,
  title,
  dataToEdit,
}) => {
  const MySwal = withReactContent(Swal);
  let timerInterval;
  const Alert = (message, icon) => {
    MySwal.fire({
      icon: icon,
      position: "top-end",
      html: message ? message : "message not returned",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  const [data, setData] = useState({
    password: "",
  });
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    // dimmer: undefined,
  });
  const { open } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, //spread operator
      [name]: value,
    });
  };

  const registerSector = async (e) => {
    e.preventDefault();
    // console.log("password", data);
    try {
      API.put(`/users/passwordReset/${dataToEdit?.username}`, data).then(
        (res) => {
          if (res.status === 200) {
            Alert("Updated Successfully", "success");
            dispatch({ type: "CLOSE_MODAL" });
            setDispatched(false);
          } else {
            // console.log("failed");
            Alert("Failed to reset password", "error");
            dispatch({ type: "CLOSE_MODAL" });
            setDispatched(false);
          }
          return res;
        }
      );
    } catch (error) {
      Alert("Something went wrong", "error");
      dispatch({ type: "CLOSE_MODAL" });
      setDispatched(false);
    }
  };

  useEffect(() => {
    dispatched && dispatch({ type: "OPEN_MODAL" });
  }, [dispatched]);

  return (
    <Modal
      open={open}
      size="tiny"
      onClose={() => {
        dispatch({ type: "CLOSE_MODAL" });
        setDispatched(false);
      }}
    >
      <Modal.Header className="text-cyan-500">{title}</Modal.Header>
      <Modal.Content>
        <form className="ui small form" onSubmit={registerSector}>
          <div className="md:px-4">
            <div className="field">
              <label className="label">New Password:</label>
              <input
                type="text"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="New Password"
                required
              />
            </div>
            <div className="float-right py-6">
              <Button
                onClick={() => {
                  dispatch({ type: "CLOSE_MODAL" });
                  setDispatched(false);
                }}
              >
                Cancel
              </Button>
              <Button
                positive
                type="submit"
                style={{ backgroundColor: "#06B6D4" }}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ResetPasswordModal;
