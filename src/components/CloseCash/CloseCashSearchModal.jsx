import { useSelector, useDispatch } from 'react-redux';
import { CloseCashSearchModalTable } from './CloseCashSearchModalTable';
import {
    CleanCloseCashSearchCloseCash,
    SetCheckCierreSearchModalCloseCash,
    SetCheckFechasSearchModalCloseCash,
    SetCheckNombreSearchModalCloseCash,
    SetDisableInputsFechasSearchModalCloseCash,
    SetFechaDesdeSearchModalCloseCash,
    SetFechaHastaSearchModalCloseCash,
    SetIsOpenModalSearchCloseCash,
    SetValorSearchCloseCash,
    startSearchAperturasCloseCash,
    startSearchCloseCash
} from '../../actions/CloseCashAction';
import { FaCalendarDays, FaCashRegister } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilter, FaSearch } from "react-icons/fa";


export const CloseCashSearchModal = () => {

    const dispatch = useDispatch();
    const {
        checkCierreSearchModal,
        checkNombreSearchModal,
        checkFechasSearchModal,
        fechaDesdeSearchModal,
        fechaHastaSearchModal,
        disableInputsFechaSearchModal,
        isOpenModalSearchCloseCash,
        valorSearchCloseCash,
        closecashSearch
    } = useSelector(state => state.closeCash);

    const columns = [
        {
            Header: "Cierre",
            accessor: "cierre",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Fecha",
            accessor: "fechaCierre",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleCheckCierre = ({ target }) => {

        if (!checkCierreSearchModal) {
            dispatch(SetCheckCierreSearchModalCloseCash(target.checked));
            dispatch(SetCheckNombreSearchModalCloseCash(false));
            dispatch(SetCheckFechasSearchModalCloseCash(false));
            dispatch(SetDisableInputsFechasSearchModalCloseCash(true));
        }

    };

    const handleCheckNombre = ({ target }) => {

        if (!checkNombreSearchModal) {
            dispatch(SetCheckCierreSearchModalCloseCash(false));
            dispatch(SetCheckNombreSearchModalCloseCash(target.checked));
            dispatch(SetCheckFechasSearchModalCloseCash(false));
            dispatch(SetDisableInputsFechasSearchModalCloseCash(true));
        }

    };

    const handleCheckFechas = ({ target }) => {

        if (!checkFechasSearchModal) {
            dispatch(SetCheckCierreSearchModalCloseCash(false));
            dispatch(SetCheckNombreSearchModalCloseCash(false));
            dispatch(SetCheckFechasSearchModalCloseCash(target.checked));
            dispatch(SetDisableInputsFechasSearchModalCloseCash(false));
        }

    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if (valorSearchCloseCash !== '' || checkFechasSearchModal) {

            let filtros = {};

            if (checkCierreSearchModal) {
                filtros = {
                    idCierre: parseInt(valorSearchCloseCash),
                    numApertura: null,
                    nombre: null,
                    desdeFecha: null,
                    hastaFecha: null
                };
            } else if (checkNombreSearchModal) {
                filtros = {
                    idCierre: null,
                    numApertura: null,
                    nombre: valorSearchCloseCash,
                    desdeFecha: null,
                    hastaFecha: null
                };
            } else if (checkFechasSearchModal) {
                filtros = {
                    idCierre: null,
                    numApertura: null,
                    nombre: null,
                    desdeFecha: fechaDesdeSearchModal,
                    hastaFecha: fechaHastaSearchModal
                };
            }

            dispatch(startSearchCloseCash(filtros));
        }
    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetIsOpenModalSearchCloseCash(false));

        // Clean el state de busqueda de aperturas
        dispatch(SetValorSearchCloseCash(''));
        dispatch(SetCheckCierreSearchModalCloseCash(true));
        dispatch(SetCheckNombreSearchModalCloseCash(false));
        dispatch(SetCheckFechasSearchModalCloseCash(false));
        dispatch(SetDisableInputsFechasSearchModalCloseCash(true));
        dispatch(CleanCloseCashSearchCloseCash());

    }

    return (
        <>
            <div className="modal fade" id="modalBuscaCierreCajas">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Busqueda Cierre Cajas <FaCashRegister className="iconSizeBtn" />
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
                                            name="valorSearchCloseCash"
                                            value={valorSearchCloseCash}
                                            onChange={e => handleInputChangeWithDispatch(e, SetValorSearchCloseCash)}
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
                                            class="form-check-input checkP"
                                            id='checkCierreSearchCloseCashModal'
                                            name='checkCierreSearchModal'
                                            checked={checkCierreSearchModal}
                                            onChange={e => handleCheckCierre(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkCierreSearchCloseCashModal"
                                        >
                                            Cierre
                                        </h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkNombreSearchCloseCashModal'
                                            name='checkNombreSearchModal'
                                            checked={checkNombreSearchModal}
                                            onChange={e => handleCheckNombre(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkNombreSearchCloseCashModal"
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
                                            class="form-check-input checkP"
                                            id='checkNombreSearchCloseCashModal'
                                            name='checkFechasSearchModal'
                                            checked={checkFechasSearchModal}
                                            onChange={e => handleCheckFechas(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkNombreSearchCloseCashModal"
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
                                    <h5>Fecha Desde</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDays className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name='fechaDesdeSearchModal'
                                            value={fechaDesdeSearchModal}
                                            disabled={disableInputsFechaSearchModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaDesdeSearchModalCloseCash)}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Fecha Hasta</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FaCalendarDays className="iconSize" />
                                        </span>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name='fechaHastaSearchModal'
                                            value={fechaHastaSearchModal}
                                            disabled={disableInputsFechaSearchModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaHastaSearchModalCloseCash)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2 mb-3"></div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-12 mb-3">
                                        <hr />
                                        <CloseCashSearchModalTable columns={columns} data={closecashSearch} />
                                    </div>
                                </div>
                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
