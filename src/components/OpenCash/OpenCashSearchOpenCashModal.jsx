import { useSelector, useDispatch } from "react-redux";
import { OpenCashSearchOpenCashModalTable } from "./OpenCashSearchOpenCashModalTable";
import {
  CleanSearchOpenCash,
  SetActiveFechaDesdeSearchOpenCash,
  SetActiveFechaHastaSearchOpenCash,
  SetFechaDesdeSearchOpenCash,
  SetFechaHastaSearchOpenCash,
  SetFechasSearchOpenCash,
  SetNombreSearchOpenCash,
  SetNumeroSearchOpenCash,
  SetOpenModalSearchOpenCash,
  SetValorFiltroSearchOpenCash,
  startSearchOpenCash,
} from "../../actions/OpenCashAction";
import { FaCalendarDays, FaCashRegister } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilter, FaSearch } from "react-icons/fa";


export const OpenCashSearchOpenCashModal = () => {
  const dispatch = useDispatch();
  const {
    isOpenSearchModalOpenCash,
    optionsSearchOpenCash,
    searchOpenCash,
    isActiveFechaDesde,
    isActiveFechaHasta,
  } = useSelector((state) => state.OpenCash);

  const { valorFiltro, nombre, numero, fechas, fechaDesde, fechaHasta } =
    optionsSearchOpenCash;

  const columns = [
    {
      Header: "Apertura",
      accessor: "apertura",
    },
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Fecha",
      accessor: "fecha",
    },
    {
      Header: "Caja",
      accessor: "caja",
    },
  ];

  const handleInputChangeWithDispatch = ({ target }, action) => {
    dispatch(action(target.value));
  };

  const handleNombre = ({ target }) => {
    if (!nombre) {
      dispatch(SetNombreSearchOpenCash(target.checked));
      dispatch(SetNumeroSearchOpenCash(false));
      dispatch(SetFechasSearchOpenCash(false));
      dispatch(SetActiveFechaDesdeSearchOpenCash(false));
      dispatch(SetActiveFechaHastaSearchOpenCash(false));
    }
  };

  const handleNumero = ({ target }) => {
    if (!numero) {
      dispatch(SetNombreSearchOpenCash(false));
      dispatch(SetNumeroSearchOpenCash(target.checked));
      dispatch(SetFechasSearchOpenCash(false));
      dispatch(SetActiveFechaDesdeSearchOpenCash(false));
      dispatch(SetActiveFechaHastaSearchOpenCash(false));
    }
  };

  const handleFechas = ({ target }) => {
    if (!fechas) {
      dispatch(SetNombreSearchOpenCash(false));
      dispatch(SetNumeroSearchOpenCash(false));
      dispatch(SetFechasSearchOpenCash(target.checked));
      dispatch(SetActiveFechaDesdeSearchOpenCash(true));
      dispatch(SetActiveFechaHastaSearchOpenCash(true));
    }
  };

  const handleActiveFechaDesde = () => {
    dispatch(SetActiveFechaDesdeSearchOpenCash(true));
    dispatch(SetActiveFechaHastaSearchOpenCash(false));
  };

  const handleActiveFechaHasta = () => {
    dispatch(SetActiveFechaDesdeSearchOpenCash(false));
    dispatch(SetActiveFechaHastaSearchOpenCash(true));
  };

  const handleFechaDesde = ({ target }) => {
    dispatch(SetFechaDesdeSearchOpenCash(target.value));
  };

  const handleFechaHasta = ({ target }) => {
    dispatch(SetFechaHastaSearchOpenCash(target.value));
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchOpenCash = {
      desde: fechas ? (isActiveFechaDesde ? fechaDesde : null) : null,
      hasta: fechas ? (isActiveFechaHasta ? fechaHasta : null) : null,
      numApertura: numero ? parseInt(valorFiltro) : null,
      usuarioApertura: nombre ? valorFiltro : null,
    };

    dispatch(startSearchOpenCash(searchOpenCash));
  };

  const closeModal = () => {
    // Cerrar el modal
    dispatch(SetOpenModalSearchOpenCash(false));

    //Clean el state de busqueda de open cash
    dispatch(CleanSearchOpenCash());
  };

  return (
    <>
      <div className="modal fade" id="modalCajaAbierta">
        <div className="modal-dialog modal-lg modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                Buscar Apertura de Caja{" "}
                <FaCashRegister className="iconSizeBtn" />
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row mb-2">
                <div className="col-md-12 mb-2">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaFilter className="iconSize" />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar...."
                      name="valorFiltro"
                      value={valorFiltro}
                      onChange={(e) =>
                        handleInputChangeWithDispatch(
                          e,
                          SetValorFiltroSearchOpenCash
                        )
                      }
                    />
                    <form onSubmit={handleSearch}>
                      <button type="submit" className="btn btn-primary">
                        Buscar <FaSearch className="iconSize" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="row mb-2 text-center">
                <div className="col-md-3 mb-3">
                  <h5>Criterios de busqueda</h5>
                  <hr />
                </div>

                <div className="col-md-3 mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="checkNombreSearchOpenCashModal"
                      class="form-check-input checkP"
                      name="nombre"
                      checked={nombre}
                      onChange={(e) => handleNombre(e)}
                    />
                    <h5
                      className="form-check-label"
                      for="checkNombreSearchOpenCashModal"
                    >
                      Nombre
                    </h5>
                  </div>
                  <hr />
                </div>

                <div className="col-md-3 mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="checkNumeroSearchOpenCashModal"
                      class="form-check-input checkP"
                      name="numero"
                      checked={numero}
                      onChange={(e) => handleNumero(e)}
                    />
                    <h5
                      className="form-check-label"
                      for="checkNumeroSearchOpenCashModal"
                    >
                      Número
                    </h5>
                  </div>
                  <hr />
                </div>

                <div className="col-md-3 mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="checkFechasSearchOpenCashModal"
                      class="form-check-input checkP"
                      name="fechas"
                      checked={fechas}
                      onChange={(e) => handleFechas(e)}
                    />
                    <h5
                      className="form-check-label"
                      for="checkFechasSearchOpenCashModal"
                    >
                      Fechas
                    </h5>
                  </div>
                  <hr />
                </div>
              </div>

              <div className="row mb-2 text-center">
                <div className="col-md-2 mb-3"></div>
                <div className="col-md-4 mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="checkDesdeFechaSearchOpenCashModal"
                      name="numero"
                      class="form-check-input checkP"
                      disabled={!fechas}
                      checked={isActiveFechaDesde}
                      onChange={(e) => handleActiveFechaDesde(e)}
                    />
                    <h5
                      className="form-check-label"
                      for="checkDesdeFechaSearchOpenCashModal"
                    >
                      Fecha Desde
                    </h5>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCalendarDays className="iconSize" />
                    </span>
                    <input
                      type="date"
                      name="fechaDesde"
                      className="form-control"
                      disabled={!isActiveFechaDesde}
                      value={fechaDesde}
                      onChange={(e) => handleFechaDesde(e)}
                    />
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id="checkHastaFechaSearchOpenCashModal"
                      class="form-check-input checkP"
                      name="numero"
                      disabled={!fechas}
                      checked={isActiveFechaHasta}
                      onChange={(e) => handleActiveFechaHasta(e)}
                    />
                    <h5
                      className="form-check-label"
                      for="checkHastaFechaSearchOpenCashModal"
                    >
                      Fecha Hasta
                    </h5>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCalendarDays className="iconSize" />
                    </span>
                    <input
                      type="date"
                      name="fechaHasta"
                      className="form-control"
                      disabled={!isActiveFechaHasta}
                      value={fechaHasta}
                      onChange={(e) => handleFechaHasta(e)}
                    />
                  </div>
                </div>
                <div className="col-md-2 mb-3"></div>
              </div>

              <div className="row mb-2 text-center">
                <div className="col-md-12 mb-3">
                  <hr />
                  <OpenCashSearchOpenCashModalTable
                    columns={columns}
                    data={searchOpenCash}
                  />
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
      </div>
    </>
  );
};
