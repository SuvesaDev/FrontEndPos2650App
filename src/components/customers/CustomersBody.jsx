import Swal from "sweetalert2";
import { TbSearch, TbSearchOff, TbNotes } from "react-icons/tb";
import { FaIdCard, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCedulaCustomers,
  SetNombreCustomers,
  SetObservacionesCustomers,
  startSearchCustomerHacienda,
} from "../../actions/customers";
import { CustomersBodyTabs } from "./customersBody/CustomersBodyTabs";
import { CustomersBodyCreditoDescuento } from "./customersBody/CustomersBodyCreditoDescuento";
import { CustomersBodyDatosGenerales } from "./customersBody/CustomersBodyDatosGenerales";
import { CustomersBodyCartaExoneracion } from "./customersBody/CustomersBodyCartaExoneracion";

export const CustomersBody = () => {
  const dispatch = useDispatch();
  const { customer, disableInputs } = useSelector((state) => state.customers);
  const { nombre, cedula, observaciones } = customer;

  const state = useSelector((state) => state.customers);
  const { currentTabCustomers } = state;

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

            <div className="col-md-6 mb-3">
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
