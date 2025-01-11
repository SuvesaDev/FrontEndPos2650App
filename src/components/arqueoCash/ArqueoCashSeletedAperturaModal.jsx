import { useSelector, useDispatch } from 'react-redux';
import { CloseCashSeletedAperturaModalTable } from '../CloseCash/CloseCashSeletedAperturaModalTable';
import { FaCalendarDays, FaCashRegister } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilter, FaSearch } from "react-icons/fa";

import { 
    SetCheckAperturaSeletedModalArqueoCash,
    SetCheckFechasSeletedModalArqueoCash,
    SetCheckNombreSeletedModalArqueoCash,
    SetDisableInputsFechaSeletedModalArqueoCash,
    SetFechaDesdeSeletedModalArqueoCash,
    SetFechaHastaSeletedModalArqueoCash,
    SetIsOpenModalSeletedAperturaArqueoCash, 
    SetResetSearchAperturasSinArqueoCash, 
    SetValorSearchAperturaArqueoCash, 
    startSearchAperturasSinArqueoCash
} from '../../actions/arqueocashAction';
import { ArqueoCashSeletedAperturaModalTable } from './ArqueoCashSeletedAperturaModalTable';

export const ArqueoCashSeletedAperturaModal = () => {

    const dispatch = useDispatch();
    const {
        isOpenModalSeletedApertura,
        valorSearchApertura,
        checkAperturaSeletedModal,
        checkNombreSeletedModal,
        checkFechasSeletedModal,
        disableInputsFechaSeletedModal,
        fechaDesdeSeletedModal,
        fechaHastaSeletedModal,
        aperturasSinArqueo,
        aperturasSinArqueoTable
    } = useSelector(state => state.ArqueCash);  
    const columns = [
        {
            Header: "Apertura",
            accessor: "napertura",
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
            Header: "Número Caja",
            accessor: "numCaja",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleCheckApertura = ({ target }) => {

        if( !checkAperturaSeletedModal ) {
            dispatch( SetCheckAperturaSeletedModalArqueoCash( target.checked ) );
            dispatch( SetCheckNombreSeletedModalArqueoCash( false ) );
            dispatch( SetCheckFechasSeletedModalArqueoCash( false ) );
            dispatch( SetDisableInputsFechaSeletedModalArqueoCash( true ) );
        }

    };

    const handleCheckNombre = ({ target }) => {

        if( !checkNombreSeletedModal ) {
            dispatch( SetCheckAperturaSeletedModalArqueoCash( false ) );
            dispatch( SetCheckNombreSeletedModalArqueoCash( target.checked ) );
            dispatch( SetCheckFechasSeletedModalArqueoCash( false ) );
            dispatch( SetDisableInputsFechaSeletedModalArqueoCash( true ) );
        }

    };

    const handleCheckFechas = ({ target }) => {

        if( !checkFechasSeletedModal ) {
            dispatch( SetCheckAperturaSeletedModalArqueoCash( false ) );
            dispatch( SetCheckNombreSeletedModalArqueoCash( false ) );
            dispatch( SetCheckFechasSeletedModalArqueoCash( target.checked ) );
            dispatch( SetDisableInputsFechaSeletedModalArqueoCash( false ) );
        }

    };

    const handleSearch = async (e) => {
        
        e.preventDefault();
        
        if( valorSearchApertura !== '' || checkFechasSeletedModal ) {

            let tipo = 1;
            let filtros = {};

            if( checkAperturaSeletedModal ) {
                tipo = 1;
                filtros = {
                    apertura: valorSearchApertura
                };
            } else if ( checkNombreSeletedModal ) {
                tipo = 2;
                filtros = {
                    nombre: valorSearchApertura
                };
            } else if ( checkFechasSeletedModal ) {
                tipo = 3;
                filtros = {
                    fecha_desde: fechaDesdeSeletedModal,
                    fecha_hasta: fechaHastaSeletedModal
                };
            }
            
            dispatch( startSearchAperturasSinArqueoCash( aperturasSinArqueo, filtros, tipo ) );
        } 
    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch( SetIsOpenModalSeletedAperturaArqueoCash( false ) );
    
        // Clean el state de busqueda de aperturas
        dispatch( SetValorSearchAperturaArqueoCash('') );
        dispatch( SetCheckAperturaSeletedModalArqueoCash( true ) );
        dispatch( SetCheckNombreSeletedModalArqueoCash( false ) );
        dispatch( SetCheckFechasSeletedModalArqueoCash( false ) );
        dispatch( SetDisableInputsFechaSeletedModalArqueoCash( true ) );

        const date = new Date();
        const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

        dispatch(SetFechaDesdeSeletedModalArqueoCash(isoDateTime[0]));
        dispatch(SetFechaHastaSeletedModalArqueoCash(isoDateTime[0]));

        dispatch(SetResetSearchAperturasSinArqueoCash());
    }

    return (
        <>
            <div className="modal fade" id="modalAperturaSinArqueo">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Aperturas sin Arqueo{" "}
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
                                            name="valorSearchApertura"
                                            value={valorSearchApertura}
                                            onChange={e => handleInputChangeWithDispatch(e, SetValorSearchAperturaArqueoCash)}
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
                                            id='checkAperturaSearchUsersModal'
                                            name='checkAperturaSeletedModal'
                                            checked={checkAperturaSeletedModal}
                                            onChange={e => handleCheckApertura(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkAperturaSearchUsersModal"
                                        >
                                            Apertura
                                        </h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-2">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            class="form-check-input checkP"
                                            id='checkNombreSearchUsersModal'
                                            name='checkNombreSeletedModal'
                                            checked={checkNombreSeletedModal}
                                            onChange={e => handleCheckNombre(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkNombreSearchUsersModal"
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
                                            id='checkNombreSearchUsersModal'
                                            name='checkFechasSeletedModal'
                                            checked={checkFechasSeletedModal}
                                            onChange={e => handleCheckFechas(e)}
                                        />
                                        <h5
                                            className="form-check-label"
                                            for="checkNombreSearchUsersModal"
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
                                            name="fechaDesde"
                                            className="form-control"
                                            value={fechaDesdeSeletedModal}
                                            disabled={disableInputsFechaSeletedModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaDesdeSeletedModalArqueoCash)}
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
                                            name="fechaHasta"
                                            className="form-control"
                                            value={fechaHastaSeletedModal}
                                            disabled={disableInputsFechaSeletedModal}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaHastaSeletedModalArqueoCash)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2 mb-3"></div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-12 mb-3">
                                        <hr />
                                        <ArqueoCashSeletedAperturaModalTable columns={columns} data={aperturasSinArqueoTable} />
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
            </div>

        </>
    )
}
