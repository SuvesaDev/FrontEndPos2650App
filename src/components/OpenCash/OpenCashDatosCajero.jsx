import { useDispatch, useSelector } from "react-redux";

import { SetNum_CajaOpenCash } from "../../actions/OpenCashAction";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";

export const OpenCashDatosCajero = () => {
  const dispatch = useDispatch();

  const { searCajas, caja, isOpenCashEdit, allCajas, disableInputs } = useSelector(state => state.OpenCash);
  const { Cedula, Nombre, Num_Caja  } = caja.encabezado;

  const handleInputChangeWithDispatch = ({ target }, action) => {
      dispatch(action(parseInt(target.value)));
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-12 mb-2">
          <div className="card text-md-center">
            <div className="card-header bg-primary cartaHMod2">
              <h4>Datos del Cajero</h4>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-1 mb-0"></div>
                <div className="col-md-6 mb-3">
                  <h5>Cajero(a)</h5>
                  <div className="inline-container">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaAddressCard className="iconSize" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Identificación del Usuario"
                        name="Cedula"
                        disabled={true}
                        value={Cedula}
                      />
                    </div>

                    <div className="input-group espacio">
                      <span className="input-group-text">
                        <FaUser className="iconSize" />
                      </span>
                      <input
                        type="text"
                        name="Nombre"
                        className="form-control"
                        placeholder="Nombre del Usuario"
                        disabled={true}
                        value={Nombre}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-4 mb-2">
                  <h5>Nº Caja</h5>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCashRegister className="iconSize" />
                    </span>
                    <select
                      name="Num_Caja"
                      className="form-select"
                      value={Num_Caja}
                      disabled={disableInputs ? disableInputs : isOpenCashEdit}
                      onChange={(e) =>
                        handleInputChangeWithDispatch(e, SetNum_CajaOpenCash)
                      }
                    >
                      <option value={0} selected disabled hidden>
                        {" "}
                        Seleccione...{" "}
                      </option>
                      {isOpenCashEdit ? (
                        allCajas !== null ? (
                          allCajas.map((tipo) => {
                            return (
                              <option value={tipo.numCaja}>
                                {" "}
                                {tipo.numCaja}{" "}
                              </option>
                            );
                          })
                        ) : (
                          <option value="">No se cargaron las cajas</option>
                        )
                      ) : searCajas !== null ? (
                        searCajas.map((tipo) => {
                          return (
                            <option value={tipo.numCaja}>
                              {" "}
                              {tipo.numCaja}{" "}
                            </option>
                          );
                        })
                      ) : (
                        <option value="">No se cargaron las cajas</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
