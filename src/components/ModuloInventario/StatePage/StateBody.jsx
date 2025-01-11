import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillExclamationCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  FaArrowRotateLeft,
  FaListOl,
  FaUser,
  FaStethoscope,
  FaMagnifyingGlass,
  FaTrashCan,
  FaKey,
  FaFilter,
  FaUserCheck,
} from "react-icons/fa6";
import {
  SetSelectMedicalTest,
  SetSelectPersonal,
  SetSelectState,
  startGetCards,
  startGetMedicalTest,
  startGetStates,
  SetDataCardsFilter,
  SetClaveInternaState,
  startValidateClaveInternaState,
} from "../../../actions/StateAction";

export const StateBody = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    selectState,
    selectMedicalTest,
    selectPersonal,
    dataPersonal,
    dataMedicalTest,
    dataStates,
    dataCards,
    dataCardsFilter,
    claveInterna,
    disableInputsUser,
    nameUser,
    disablePassword
  } = useSelector((state) => state.stateInventory);

  const chargeData = () => {
    dispatch(startGetMedicalTest());
    dispatch(startGetStates());
    dispatch(startGetCards());
  };

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleOnKeyDownUser = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (claveInterna == "") {
        Swal.fire({
          icon: "warning",
          title: "Advertencia!",
          text: "Escriba su contraseña.",
        });
        return;
      }
      dispatch(startValidateClaveInternaState(claveInterna));
    }
  };

  const formatFechaHora = (fechaHoraString) => {
    const fechaHora = new Date(fechaHoraString);
    const fechaFormateada = fechaHora.toLocaleDateString();
    const horaFormateada = fechaHora.toLocaleTimeString();
    return `${fechaFormateada} ${horaFormateada}`;
  };

  const handleChangePersonal = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    dispatch(SetSelectPersonal(newValue));
  };

  const handleChangeState = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    let selectedStateId = "";
    const stateSelect = dataStates.find(
      (datoE) => datoE.nombreEstado === newValue
    );
    if (stateSelect !== undefined) {
      selectedStateId = stateSelect.idEstado;
    }
    dispatch(SetSelectState(selectedStateId));
  };

  const handleChangeMedicalTest = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Filtra los datos en base a los valores ingresados
    const filteredDataCards = dataCards.filter(
      (dato) =>
        (newValue === "" ||
          dato.descripcion.toLowerCase().includes(newValue.toLowerCase())) &&
        (selectPersonal === "" ||
          dato.responsableVenta
            .toLowerCase()
            .includes(selectPersonal.toLowerCase())) &&
        (selectState === "" || dato.estado === parseInt(selectState, 10))
    );
    dispatch(SetSelectMedicalTest(newValue));
    dispatch(SetDataCardsFilter(filteredDataCards));
  };

  useEffect(() => {
    // Asegura de que los filtros sean cadenas de caracteres o cadenas vacías
    //No hace falta el de estado por que se lo paso por ID
    const personalFilter = selectPersonal ? selectPersonal.toLowerCase() : "";
    const medicalTestFilter = selectMedicalTest
      ? selectMedicalTest.toLowerCase()
      : "";
    // Filtra los datos en base a los valores ingresados
    const filteredDataCards = dataCards.filter(
      (dato) =>
        (personalFilter === "" ||
          dato.responsableVenta.toLowerCase().includes(personalFilter)) &&
        (selectState === "" || dato.estado === parseInt(selectState, 10)) &&
        (medicalTestFilter === "" ||
          dato.descripcion.toLowerCase().includes(medicalTestFilter))
    );
    dispatch(SetDataCardsFilter(filteredDataCards));
  }, [selectPersonal, selectState, selectMedicalTest, dataCards]);

  return (
    <>
      <div className="row mb-3 text-md-center">
        <div className="col-md-2">
          <h2>
            Filtros <FaFilter className="iconSizeBtn" />
          </h2>
        </div>
        <div className="col-md-3 mb-3">
          <h5>Personal</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser className="iconSize" />
            </span>
            <input
              type="text"
              className="form-control"
              list="personalList"
              disabled={disableInputsUser}
              placeholder="Seleccione Personal"
              onChange={(e) => handleChangePersonal(e)}
            />
            <datalist id="personalList">
              {dataPersonal?.length ? (
                dataPersonal.map((personal) => (
                  <option
                    key={personal.idPersonal}
                    value={personal.nombrePersonal}
                  />
                ))
              ) : (
                <option value="Sin Personal Registrado" />
              )}
            </datalist>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <h5>Estado Albarán</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaListOl className="iconSize" />
            </span>
            <input
              type="text"
              className="form-control"
              list="stateList"
              disabled={disableInputsUser}
              placeholder="Seleccione Estado"
              onChange={(e) => handleChangeState(e)}
            />
            <datalist id="stateList">
              {dataStates?.length ? (
                dataStates.map((dato) => (
                  <option key={dato.idEstado} value={dato.nombreEstado} />
                ))
              ) : (
                <option value="Sin Estados Registrados" />
              )}
            </datalist>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <h5>Prueba Médica</h5>
          <div className="input-group">
            <span className="input-group-text">
              <FaStethoscope className="iconSize" />
            </span>
            <input
              type="text"
              className="form-control"
              list="testMedicalList"
              disabled={disableInputsUser}
              placeholder="Seleccione Prueba Médica"
              onChange={(e) => handleChangeMedicalTest(e)}
            />
            <datalist id="testMedicalList">
              {dataMedicalTest?.length ? (
                dataMedicalTest.map((test) => (
                  <option key={test.idPrueba} value={test.nombrePrueba} />
                ))
              ) : (
                <option value="Sin Pruebas Registradas" />
              )}
            </datalist>
          </div>
        </div>
      </div>

      <hr />
      <div className="row mb-3">
        <div className="col-md-3">
          <button
            className="btn btn-dark"
            disabled={disableInputsUser}
            onClick={chargeData}
          >
            Obtener Peticiones <FaArrowRotateLeft className="iconSize" />
          </button>
        </div>
      </div>

      <div className="card">
        <div>
          {nameUser && (
            <div className="card-header">
              <strong>
                <FaUserCheck className="iconSizeBtn" /> {" : "}
                {nameUser}
              </strong>
            </div>
          )}
        </div>
        <div className="card-body cartaP">
          <div className="row mb-3">
            <div className="col-md-12 mb-2">
              {dataCardsFilter.length > 0 ? (
                dataCardsFilter.map((dato) => (
                  <>
                    <div className="card">
                      <div className="card-header d-flex justify-content-between">
                        <div>
                          Referencia Qvet:{" "}
                          <strong>{dato.idReferenciaQvet}</strong>
                        </div>
                        <button
                          className={
                            dato.estado === 0
                              ? "btn btn-danger espacio2"
                              : dato.estado === 1
                              ? "btn btn-warning espacio2"
                              : dato.estado === 2
                              ? "btn btn-success espacio2"
                              : ""
                          }
                        >
                          Estado{" "}
                          <span className="spinner-grow spinner-grow-sm"></span>
                        </button>
                      </div>

                      <div className="card-body">
                        <div className="row mb-2 text-center">
                          <div className="col-md-3 mb-2">
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Cliente</strong>
                              </div>
                              <p className="espaciosP">{dato.cliente}</p>
                            </div>
                            <hr />
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Mascota</strong>
                              </div>
                              <p className="espaciosP">{dato.mascota}</p>
                            </div>
                          </div>
                          <div className="col-md-3 mb-2">
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Responsable Venta</strong>
                              </div>
                              <p className="espaciosP">
                                {dato.responsableVenta}
                              </p>
                            </div>
                            <hr />
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Fecha y Hora</strong>
                              </div>
                              <p className="espaciosP">
                                {formatFechaHora(dato.fecha)}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Código Prueba</strong>
                              </div>
                              <p className="espaciosP">{dato.idQvet}</p>
                            </div>
                            <hr />
                            <div className="card">
                              <div className="card-header bg-dark text-white">
                                <strong>Prueba Médica</strong>
                              </div>
                              <p className="espaciosP">{dato.descripcion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                ))
              ) : (
                <center>
                  <div className="toast show">
                    <div
                      className={
                        dataCards.length === 0
                          ? "card-header toast-warning"
                          : "card-header toast-danger"
                      }
                    >
                      <strong className="me-auto">
                        2650 Informa{" "}
                        <AiFillExclamationCircle className="iconSize" />
                      </strong>
                    </div>
                    <div className="toast-body">
                      <p className="text-danger">
                        {dataCards.length === 0
                          ? "Peticiones sin cargar."
                          : "No existen coincidencias con los filtros aplicados."}
                      </p>
                    </div>
                  </div>
                </center>
              )}
            </div>
          </div>
        </div>

        <div className="card-footer">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group mb-2">
              {/* <button className="btn btn-primary">
                <FaMagnifyingGlass className="iconSizeBtn" />
              </button>
            </div>
            <div className="btn-group mb-2">
              <button className="btn btn-danger espacio">
                <FaTrashCan className="iconSizeBtn" />
              </button> */}
            </div>
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaKey className="iconSize" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Contraseña"
                  value={password}
                  disabled={disablePassword}
                  onKeyDown={handleOnKeyDownUser}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChangeWithDispatch(e, SetClaveInternaState);
                  }}
                />
                <span
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};
