import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { TbSearch, TbSearchOff, TbNotes } from "react-icons/tb";
import { FaIdCard, FaUser, FaPersonCircleQuestion, } from "react-icons/fa6";

import {
  SetCedulaCustomers,
  SetNombreCustomers,
  SetNombreFantasiaCustomers,
  SetObservacionesCustomers,
  SetTipoClienteCustomers,
  startSearchCustomerHacienda,
} from "../../actions/customers";
import { CustomersBodyTabs } from "./customersBody/CustomersBodyTabs";
import { CustomersBodyCreditoDescuento } from "./customersBody/CustomersBodyCreditoDescuento";
import { CustomersBodyDatosGenerales } from "./customersBody/CustomersBodyDatosGenerales";
import { CustomersBodyCartaExoneracion } from "./customersBody/CustomersBodyCartaExoneracion";

export const CustomersBody = () => {

  const dispatch = useDispatch();

  const { customer, disableInputs, currentTabCustomers } = useSelector((state) => state.customers);
  const { nombre, cedula, observaciones, tipoCliente, nombreFantasia} = customer;

  const { auth } = useSelector((state) => state.login);
  const { costaPets } = auth;

  const redirectComponent = () => {
    switch (currentTabCustomers) {
      case "DatosGenerales":
        return <CustomersBodyDatosGenerales />;

      case "CreditoDescuento":
        return <CustomersBodyCreditoDescuento />;

      case "CartaExoneracion":
        return <CustomersBodyCartaExoneracion />;

      default:
        break;
    }
  };

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleSearchClientHacienda = (e) => {
    if (!disableInputs) {
      e.preventDefault();

      if (cedula.length >= 9) {
        dispatch(startSearchCustomerHacienda(cedula));
      } else {
        Swal.fire({
          icon: "warning",
          title: "Advertencia",
          text: "Ingrese una cédula valida para buscar.",
        });
      }
    }
  };

  const handleSearchClientHaciendaOpcional = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!disableInputs) {
        if (cedula.length >= 9) {
          dispatch(startSearchCustomerHacienda(cedula));
        } else {
          Swal.fire({
            icon: "warning",
            title: "Advertencia",
            text: "Ingrese una cédula valida para buscar.",
          });
        }
      }
    }
  };

  return (
    <>
          <div className="row mb-3 text-md-center">

            <div className="col-md-3 mb-3">
              <h5>Nombre</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser className="iconSize" />
                </span>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  disabled={disableInputs}
                  value={nombre}
                  placeholder="Nombre del Cliente"
                  onChange={(e) =>
                    handleInputChangeWithDispatch(e, SetNombreCustomers)
                  }
                />
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <h5>Cédula</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <FaIdCard className="iconSize" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cédula del Cliente"
                  name="cedula"
                  disabled={disableInputs}
                  value={cedula}
                  onKeyDown={handleSearchClientHaciendaOpcional}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(e, SetCedulaCustomers)
                  }
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  onClick={handleSearchClientHacienda}
                >
                  {disableInputs ? (
                    <TbSearchOff className="iconSize" />
                  ) : (
                    <TbSearch className="iconSize" />
                  )}
                </button>
              </div>
            </div>

            {
              costaPets
                ? <div className="col-md-3 mb-3">
                    <h5>Tipo Cliente</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                        <FaPersonCircleQuestion  className="iconSize" />
                        </span>
                        <select
                        name="tipo"
                        disabled={disableInputs}
                        value={tipoCliente}
                        className="form-select"
                        onChange={(e) =>
                            handleInputChangeWithDispatch(e, SetTipoClienteCustomers)
                        }
                        >
                        <option value="" selected disabled hidden>
                            {" "}
                            Seleccione...{" "}
                        </option>
                        <option value="2">Fisico</option>
                        <option value="3">Juridico</option>
                        <option value="4">DIMEX</option>
                        </select>
                    </div>
                </div>
              : null
            }

            {
              costaPets
                ? <div className="col-md-3 mb-3">
                  <h5>Nombre Fantasía</h5>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser className="iconSize" />
                    </span>
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      disabled={disableInputs}
                      value={nombreFantasia}
                      placeholder="Nombre del Cliente Fantasía"
                      onChange={(e) =>
                        handleInputChangeWithDispatch(e, SetNombreFantasiaCustomers)
                      }
                    />
                  </div>
                </div>
              : null
            }

            <div className={ (costaPets) ? 'col-md-6 mb-3 d-none' : 'col-md-6 mb-3'}>
              <h5>Observaciones</h5>
              <div className="input-group">
                <span className="input-group-text">
                  <TbNotes className="iconSize" />
                </span>
                <textarea
                  class="form-control"
                  rows="1"
                  name="observaciones"
                  disabled={disableInputs}
                  value={observaciones}
                  onChange={(e) =>
                    handleInputChangeWithDispatch(e, SetObservacionesCustomers)
                  }
                ></textarea>
              </div>
            </div>

          </div>
          <hr />

          <div className="row mb-2 centerP">
            <CustomersBodyTabs />
          </div>

          <div className="row mb-2 text-md-center">
            <div className="col-md-12">{redirectComponent()}</div>
          </div>
    </>
  );
};
