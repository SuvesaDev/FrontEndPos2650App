// import { useEffect } from 'react';
import Swal from "sweetalert2";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { FaList, FaUserFriends } from "react-icons/fa";
// import { FaSearch } from 'react-icons/fa';
import { customStyles } from "../../helpers/styleModal";

import {
  SetCedulaOpenCash,
  SetNombreOpenCash,
  openSearchUsuarioModalOpenCash,
} from "../../actions/OpenCashAction";

Modal.setAppElement("#root");

export const OpenCashSeleccionarUsuario = () => {
  const dispatch = useDispatch();

  const { openSearchModal, searUsuarios, caja } = useSelector(
    (state) => state.OpenCash
  );

  const { Nombre, Cedula } = caja.encabezado;

  const closeModal = () => {
    if (Nombre === "" || Cedula === "") {
      Swal.fire({
        icon: "info",
        title: "Informacion importante",
        text: "Debe seleccionar un usuario para apertura de caja",
      });
    } else {
      dispatch(openSearchUsuarioModalOpenCash(false));
    }
  };

  const handleChangeSelectUser = ({ target }) => {
    // Se obtiene el nombre del usuario
    const nombreUsuario = searUsuarios.find(
      (usuario) => usuario.id === parseInt(target.value)
    ).nombre;

    // Se introduce en el state y se cierra el modal
    dispatch(SetCedulaOpenCash(parseInt(target.value)));
    dispatch(SetNombreOpenCash(nombreUsuario));
    dispatch(openSearchUsuarioModalOpenCash(false));
  };

  return (
    <>
      {/* <div className="modal fade" id="modalProveedor">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Seleccionar Usuario <FaUserFriends className="iconSizeBtn" />
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <select
                    id="cboUserSelectedUserModal"
                    onChange={(e) => handleChangeSelectUser(e)}
                  >
                    <option value="" selected disabled hidden>
                      {" "}
                      Seleccione...{" "}
                    </option>
                    {searUsuarios != null ? (
                      searUsuarios.map((tipo) => {
                        return <option value={tipo.id}> {tipo.nombre} </option>;
                      })
                    ) : (
                      <option value="">No se cargaron los usuarios</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cerrar <IoIosCloseCircle className="iconSize" />
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <Modal
        isOpen={openSearchModal}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        style={customStyles}
        overlayClassName={"modal-fondo"}
      >

          <div className="modal-header">
            <h4 className="modal-title">
              Seleccionar Usuario <FaUserFriends className="iconSizeBtn" />
            </h4>
          </div>
          <hr />
          <div className="modal-body">
            <div className="row text-center">
              <div className="col-md-12 mb-3">
                <h5>Lista de Usuarios</h5>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaList className="iconSize" />
                  </span>
                  <select
                    className="form-select"
                    onChange={(e) => handleChangeSelectUser(e)}
                  >
                    <option value="" selected disabled hidden>
                      {" "}
                      Seleccione...{" "}
                    </option>
                    {searUsuarios != null ? (
                      searUsuarios.map((tipo) => {
                        return <option value={tipo.id}> {tipo.nombre} </option>;
                      })
                    ) : (
                      <option value="">No se cargaron los usuarios</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
      </Modal>
    </>
  );
};
