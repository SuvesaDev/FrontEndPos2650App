import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { TbSearch, TbSearchOff, TbNotes } from "react-icons/tb";
import { FaIdCard, FaUser, FaPersonCircleQuestion, } from "react-icons/fa6";

// import {
//   SetCedulaCustomers,
//   SetNombreCustomers,
//   SetObservacionesCustomers,
//   SetTipoClienteCustomers,
//   startSearchCustomerHacienda,
// } from "../../actions/customers";
import { FollowingConsignmentTabs } from "./FollowingConsignmentBody/FollowingConsignmentTabs";
import { FollowingConsignmentBodyList } from "./FollowingConsignmentBody/FollowingConsignmentBodyList/FollowingConsignmentBodyList";
import { FollowingConsignmentBodyDetails } from "./FollowingConsignmentBody/FollowingConsignmentBodyDetails/FollowingConsignmentBodyDetails";

// import { BillingConsignmentTabs } from "./BillingConsignmentBody/BillingConsignmentTabs";
// import { BillingConsignmentBodyList } from "./BillingConsignmentBody/BillingConsignmentBodyList/BillingConsignmentBodyList";


// import { CustomersBodyTabs } from "./customersBody/CustomersBodyTabs";
// import { CustomersBodyCreditoDescuento } from "./customersBody/CustomersBodyCreditoDescuento";
// import { CustomersBodyDatosGenerales } from "./customersBody/CustomersBodyDatosGenerales";
// import { CustomersBodyCartaExoneracion } from "./customersBody/CustomersBodyCartaExoneracion";
// import { CustomersBodyAdjuntos } from "./customersBody/CustomersBodyAdjuntos";
// import { CustomersBodyDatosFacturacion } from "./customersBody/CustomersBodyDatosFacturacion";

export const FollowingConsignmentBody = () => {

  // const dispatch = useDispatch();

  // const { customer, disableInputs, currentTabCustomers } = useSelector((state) => state.customers);
  // const { nombre, cedula, observaciones, tipoCliente} = customer;

  // const { auth } = useSelector((state) => state.login);
  // const { costaPets } = auth;

  const redirectComponent = () => {
    switch ("DetalleConsignacion") {

      case "ListadoConsignacion":
        return <FollowingConsignmentBodyList />;

      case "DetalleConsignacion":
        return <FollowingConsignmentBodyDetails />;

      default:
        break;
    }
  };

  return (
    <>

          <div className="row mb-2 centerP">
            <FollowingConsignmentTabs />
          </div>

          <div className="row mb-2 text-md-center">
            <div className="col-md-12">{redirectComponent()}</div>
          </div>
    </>
  );
};
