import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import loadingImage from "../../assets/loading_snipiner.gif";

//Icons
import { FaWindowClose } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdNoteAdd, MdSave } from "react-icons/md";
// Actions
import {
  ActiveButtonNewCustomers,
  ActiveButtonRemoveCustomers,
  ActiveButtonSaveCustomers,
  ActiveButtonSearchCustomers,
  CleanStateCustomers,
  DisableInputsCustomers,
  IsCustomerDisable,
  IsCustomerEditCustomers,
  OpenSearchModalCustomers,
  SetDefautlButtonsCustomers,
  startDeleteCustomer,
  startEditCustomer,
  startSaveCustomer,
  startCustomerExist,
  SetStartOpeningCustomers,
} from "../../actions/customers";
import { Customer } from "../../models/customer";
import { CartaExoneracion } from "../../models/cartaExoneracion";
import { DeleteTab } from "../../actions/tabs";
import { CustomerSearchModal } from "./CustomerSearchModal";
import { CleanStateCartaExoneracion } from "../../actions/CartaExoneracionAction";
import { startGetAllProvincias } from "../../actions/ProvinciasAction";
import { startGetAllAgentesVenta } from "../../actions/AgenteVentaAction";
import { CustomerBodyAdjuntosModal } from "./customersBody/CustomerBodyAdjuntosModal";

export const CustomersIcons = () => {
  const dispatch = useDispatch();

  const {
    customer,
    activeButtonNew,
    activeButtonSearch,
    activeButtonSave,
    activeButtonRemove,
    isCustomerEdit,
    isCustomerDisable,
    hasCartaExoneracion,
    startOpening,
    allDatosFacturacion,
    variasSurcursales
  } = useSelector((state) => state.customers);

  const { carta } = useSelector((state) => state.cartaExoneracion);
  const { auth } = useSelector((state) => state.login);
  const { currentTab } = useSelector((state) => state.tabs);
  const { agentesBilling } = useSelector((state) => state.agenteVentas);
  const { provincias } = useSelector((state) => state.provincias);

  const { costaPets } = auth;

  const handleCreateCustomers = async (e) => {

    e.preventDefault();

    if (activeButtonSave) {
      const resp = await dispatch(startCustomerExist(customer.cedula));

      if (resp) {

        if (activeButtonSave) {

          if (customer.nombre != undefined || customer.cedula != undefined) {

            const datosSucursal = allDatosFacturacion.map( dato => {
              return {
                id: 0,
                idCliente: customer.identificacion,
                sucursal: dato.sucursal,
                nombreComercial: dato.nombreFantasia,
                telefono: dato.telefono,
                email: dato.correo,
                contacto: dato.contacto
              }
            });

            dispatch(
              startSaveCustomer(
                new Customer(
                  customer.identificacion,
                  customer.nombre,
                  customer.nombreFantasia,
                  customer.tipoCliente,
                  customer.cedula,
                  customer.observaciones,
                  customer.telefono,
                  customer.fax,
                  customer.direccion,
                  customer.correocuentas,
                  customer.correoFacturacion,
                  customer.agente,
                  customer.actualizado,
                  customer.fallecido,
                  customer.enviaRecibo,
                  customer.correoRecibo,
                  customer.tipoPrecio,
                  customer.descuentoEspecial,
                  customer.inactivo,
                  customer.mag,
                  customer.abierto,
                  customer.codMonedaCredito,
                  customer.plazoCredito,
                  customer.maxCredito,
                  customer.descuento,
                  customer.empresa,
                  customer.sinrestriccion,
                  customer.clienteMoroso,
                  customer.ordenCompra,
                  customer.provincia,
                  customer.canton,
                  customer.distrito,
                  auth.username,
                  auth.username,
                  (variasSurcursales) ? datosSucursal : []
                ),
                new CartaExoneracion(
                  customer.cedula,
                  carta.motivo,
                  carta.numeroDocumento,
                  carta.fechaEmision,
                  carta.fechaVence,
                  carta.porcentajeCompra,
                  carta.impuesto,
                  carta.nota
                ),
                costaPets
              )
            );
          }
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Ya existe un cliente con este numero de cedula.",
          showConfirmButton: true,
        });
      }
    }
  };

  const handleCloseWindow = (e) => {
    if (startOpening) {
      //Mostrar un mensaje de confirmacion
      Swal.fire({
        title: `¿Desea cancelar ${
          isCustomerEdit ? "edición" : "creación"
        } la  de cliente?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Mantener",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isDenied) {
          e.preventDefault();

          dispatch(CleanStateCustomers());
          dispatch(CleanStateCartaExoneracion());
        }
      });
    } else {
      e.preventDefault();

      dispatch(DeleteTab(currentTab.name, currentTab.routePage));
      dispatch(CleanStateCustomers());
      dispatch(CleanStateCartaExoneracion());
    }
  };

  const handleNewCustomer = async (e) => {
    e.preventDefault();

    if (activeButtonNew) {
      dispatch(ActiveButtonSearchCustomers(false));
      dispatch(ActiveButtonSaveCustomers(true));
      dispatch(ActiveButtonNewCustomers(false));
      dispatch(DisableInputsCustomers(false));
      dispatch(SetStartOpeningCustomers(true));

      await loadCatalogos();
    }
  };

  const loadCatalogos = async (e) => {
    //Mostrar el loading
    Swal.fire({
      title: "Por favor, espere cargando catalogos",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      imageUrl: loadingImage,
      customClass: "alert-class-login",
      imageHeight: 100,
    });

    if (agentesBilling === null) {
      await dispatch(startGetAllAgentesVenta());
    }

    if (provincias.length === 0) {
      await dispatch(startGetAllProvincias());
    }

    //Quitar el loading
    Swal.close();
  };

  const handleEditCustomer = (e) => {
    e.preventDefault();

    if (activeButtonSave) {

      const datosSucursal = allDatosFacturacion.map( dato => {
        return {
          id: 0,
          idCliente: customer.identificacion,
          sucursal: dato.sucursal,
          nombreComercial: dato.nombreFantasia,
          telefono: dato.telefono,
          email: dato.correo,
          contacto: dato.contacto
        }
      });


      dispatch(
        startEditCustomer(
          new Customer(
            customer.identificacion,
            customer.nombre,
            customer.nombreFantasia,
            customer.tipoCliente,
            customer.cedula,
            customer.observaciones,
            customer.telefono,
            customer.fax,
            customer.direccion,
            customer.correocuentas,
            customer.correoFacturacion,
            customer.agente,
            customer.actualizado,
            customer.fallecido,
            customer.enviaRecibo,
            customer.correoRecibo,
            customer.tipoPrecio,
            customer.descuentoEspecial,
            customer.inactivo,
            customer.mag,
            customer.abierto,
            customer.codMonedaCredito,
            customer.plazoCredito,
            customer.maxCredito,
            customer.descuento,
            customer.empresa,
            customer.sinrestriccion,
            customer.clienteMoroso,
            customer.ordenCompra,
            customer.provincia,
            customer.canton,
            customer.distrito,
            auth.username,
            auth.username,
            (variasSurcursales) ? datosSucursal : []
          ),
          hasCartaExoneracion,
          new CartaExoneracion(
            carta.id === null ? 0 : carta.id,
            customer.cedula,
            carta.motivo,
            carta.numeroDocumento,
            carta.fechaEmision,
            carta.fechaVence,
            carta.porcentajeCompra,
            carta.impuesto,
            carta.nota,
            auth.username,
            auth.username
          )
        )
      );
    }
  };

  const handleDeleteCustomer = (e) => {
    e.preventDefault();

    if (activeButtonRemove) {
      const { cedula, nombre } = customer;

      dispatch(
        startDeleteCustomer(
          cedula,
          nombre,
          auth.username,
          isCustomerDisable ? "enable" : "disable"
        )
      );
    }
  };

  return (
    <>

      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mb-2">
          <button
            className={
              activeButtonNew
                ? "btn btn-success espacio"
                : "btn btn-success espacio disabled"
            }
            onClick={handleNewCustomer}
          >
            Nuevo <MdNoteAdd className="iconSizeBtn" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className={
              activeButtonSearch
                ? "btn btn-primary espacio"
                : "btn btn-primary espacio disabled"
            }
            data-bs-toggle="modal"
            data-bs-target="#modalBuscarClientes"
          >
            Buscar <FaMagnifyingGlass className="iconSize" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className={
              activeButtonSave
                ? "btn btn-dark espacio"
                : "btn btn-dark espacio disabled"
            }
            onClick={
              isCustomerEdit ? handleEditCustomer : handleCreateCustomers
            }
          >
            {isCustomerEdit ? "Editar" : "Registrar"}{" "}
            <MdSave className="iconSizeBtn" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className={
              activeButtonRemove
                ? "btn btn-danger espacio"
                : "btn btn-danger espacio disabled"
            }
            onClick={handleDeleteCustomer}
          >
            {isCustomerDisable ? "Activar" : "Desactivar"}{" "}
            <TbTrashXFilled className="iconSizeBtn" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className="btn btn-warning espacio"
            onClick={handleCloseWindow}
          >
            {startOpening ? "Cancelar" : "Cerrar"}{" "}
            <FaWindowClose className="iconSizeBtn" />
          </button>
        </div>
      </div>

      <CustomerSearchModal />

      <CustomerBodyAdjuntosModal />
    </>
  );
};
