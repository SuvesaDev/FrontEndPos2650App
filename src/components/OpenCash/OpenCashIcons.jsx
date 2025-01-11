import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//Icons
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PiKeyFill } from "react-icons/pi";
import { FaWindowClose } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdNoteAdd } from "react-icons/md";

import {
  CleanOpenCash,
  SetClaveInternaOpenCash,
  SetOpenModalSearchOpenCash,
  SetStartOpeningOpenCash,
  SetVisiblePasswordOpenCash,
  startDisableOpenCash,
  startSaveOpenCash,
  startSearchCajas,
  startValidateClaveInternaOpenCash,
} from "../../actions/OpenCashAction";

import { DeleteTab } from "../../actions/tabs";

import { OpenCashSeleccionarUsuario } from "./OpenCashSeleccionarUsuario";
import { OpenCashSearchOpenCashModal } from "./OpenCashSearchOpenCashModal";

export const OpenCashIcons = () => {
  const dispatch = useDispatch();
  const { currentTab } = useSelector((state) => state.tabs);
  const {
    activeButtonNew,
    activeButtonSave,
    activeButtonSearch,
    activeButtonRemove,
    startOpening,
    caja,
    isOpenCashEdit,
    claveInterna,
    visiblePassword,
    disableInputsUser,
  } = useSelector((state) => state.OpenCash);

  const { encabezado, tope, denominaciones } = caja;
  const {auth, idSurcursal} = useSelector(state => state.login)

  const idSucursalOF = auth.idSurcursal ? auth.idSurcursal : idSurcursal;
  const {
    NApertura,
    Nombre,
    Observaciones,
    Estado,
    Anulado,
    Cedula,
    Num_Caja,
  } = encabezado;

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };


  const handleNewOpenCash = async (e) => {

    if (activeButtonNew) {
      e.preventDefault();
      // Llamar a traer los catalogos de cajas
      await dispatch(startSearchCajas(0));
    }
  };

  const handleVisibleClave = (e) => {
    if (!disableInputsUser) {
      e.preventDefault();
      dispatch(SetVisiblePasswordOpenCash(!visiblePassword));
    }
  };

  const handleSave = async (e) => {
    if (activeButtonSave === true) {
      e.preventDefault();

      const newApertura = {
        napertura: 0,
        fecha: new Date().toLocaleDateString("es-CR"),
        nombre: Nombre,
        estado: Estado,
        observaciones: Observaciones,
        anulado: Anulado,
        cedula: `${Cedula}`,
        numCaja: Num_Caja,
        idSucursal: idSucursalOF,
        aperturaDenominacion: denominaciones.map((denominacion) => {
          return {
            // id: denominacion.id,
            // idApertura: denominacion.idApertura,
            idDenominacion: denominacion.Id_Denominacion,
            monto: denominacion.Monto,
            cantidad: denominacion.Cantidad,
          };
        }),
        aperturaTotalTope: tope.map((t) => {
          return {
            // idTotalTope : t.idTotalTope,
            // napertura : t.napertura,
            codMoneda: t.CodMoneda,
            montoTope: t.Monto_Tope,
            monedaNombre: t.MonedaNombre,
          };
        }),
      };

      dispatch(startSaveOpenCash(newApertura));
    }
  };

  const handleSearchOpenCash = (e) => {
    if (activeButtonSearch) {
      e.preventDefault();
      dispatch(SetStartOpeningOpenCash(false));
      dispatch(SetOpenModalSearchOpenCash(true));
    }
  };

  const handleDisableOpenCash = (e) => {
    e.preventDefault();

    if (activeButtonRemove && !Anulado) {
      dispatch(startDisableOpenCash(NApertura));
    }
  };

  const handleCloseWindow = (e) => {
    if (startOpening || isOpenCashEdit) {
      //Mostrar un mensaje de confirmacion
      Swal.fire({
        title: "¿Desea cancelar la apertura de caja?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Mantener",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isDenied) {
          e.preventDefault();

          dispatch(CleanOpenCash());
        }
      });
    } else {
      e.preventDefault();

      dispatch(DeleteTab(currentTab.name, currentTab.routePage));
      dispatch(CleanOpenCash());
    }
  };

  const handleOnKeyDownUser = async (e) => {

    if (e.key === 'Enter') {

      e.preventDefault();

      if (claveInterna == '') {

        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: 'Escriba su contraseña.'
        });

        return;
      }

      dispatch(startValidateClaveInternaOpenCash(claveInterna));
    }

  }
  return (
    <>
      <div className="btn-toolbar" role="toolbar">
        <div className="btn-group mb-2">
          <button
            className={
              activeButtonSave
                ? "btn btn-success espacio"
                : "btn btn-success espacio disabled"
            }
            onClick={handleSave}
          >
            Registrar <MdNoteAdd className="iconSizeBtn" />
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
            data-bs-target="#modalCajaAbierta"
          >
            Buscar <FaMagnifyingGlass className="iconSize" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className={
              activeButtonRemove
                ? "btn btn-danger espacio"
                : "btn btn-danger espacio disabled"
            }
            onClick={handleDisableOpenCash}
          >
            Anular
            <TbTrashXFilled className="iconSizeBtn" />
          </button>
        </div>

        <div className="btn-group mb-2">
          <button
            className="btn btn-warning espacio"
            onClick={handleCloseWindow}
          >
            {startOpening || isOpenCashEdit ? "Cancelar" : "Cerrar"} {""}
            <FaWindowClose className="iconSizeBtn" />
          </button>
        </div>

        <div className="col-md-3 mb-2">
          <div className="input-group">
            <span className="input-group-text">
              <PiKeyFill className="iconSize" />
            </span>
            <input
              type={visiblePassword ? "text" : "password"}
              name="claveInterna"
              className="form-control"
              placeholder="Clave Interna"
              disabled={disableInputsUser}
              value={claveInterna}
              onKeyDown={handleOnKeyDownUser}
              onChange={(e) =>
                handleInputChangeWithDispatch(e, SetClaveInternaOpenCash)
              }
            />
            <span
              className="input-group-text"
              onClick={handleVisibleClave}
              style={{ cursor: "pointer" }}
            >
              {visiblePassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>

      <OpenCashSeleccionarUsuario />

      <OpenCashSearchOpenCashModal />
    </>
  );
};
