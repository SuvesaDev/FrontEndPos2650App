
import { useSelector, useDispatch } from 'react-redux';
import { CloseCashSeletedAperturaModalTable } from './CloseCashSeletedAperturaModalTable';
import { 
    SetCheckAperturaSeletedAperturaModalCloseCash, 
    SetCheckFechasSeletedAperturaModalCloseCash, 
    SetCheckNombreSeletedAperturaModalCloseCash, 
    SetDisableInputsFechasSeletedAperturaModalCloseCash, 
    SetFechaDesdeSeletedAperturaModalCloseCash, 
    SetFechaHastaSeletedAperturaModalCloseCash, 
    SetIsOpenModalSeletedAperturaCloseCash, 
    SetResetAperturasCloseCash, 
    SetValorSearchAperturaCloseCash,
    startSearchAperturasCloseCash
} from '../../actions/CloseCashAction';
import { FaCalendarDays, FaCashRegister } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { FaFilter, FaSearch } from "react-icons/fa";


export const CloseCashSeletedAperturaModal = () => {


    const dispatch = useDispatch();
    const {
        checkAperturaSeletedModal,
        checkNombreSeletedModal,
        checkFechasSeletedModal,
        fechaDesdeSeletedModal,
        fechaHastaSeletedModal,
        disableInputsFecha,
        isOpenModalSeletedApertura,
        aperturasSinCerrarTable,
        valorSearchApertura,
    } = useSelector(state => state.closeCash);  

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
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const handleCheckApertura = ({ target }) => {

        if( !checkAperturaSeletedModal ) {
            dispatch( SetCheckAperturaSeletedAperturaModalCloseCash( target.checked ) );
            dispatch( SetCheckNombreSeletedAperturaModalCloseCash( false ) );
            dispatch( SetCheckFechasSeletedAperturaModalCloseCash( false ) );
            dispatch( SetDisableInputsFechasSeletedAperturaModalCloseCash( true ) );
        }

    };

    const handleCheckNombre = ({ target }) => {

        if( !checkNombreSeletedModal ) {
            dispatch( SetCheckAperturaSeletedAperturaModalCloseCash( false ) );
            dispatch( SetCheckNombreSeletedAperturaModalCloseCash( target.checked ) );
            dispatch( SetCheckFechasSeletedAperturaModalCloseCash( false ) );
            dispatch( SetDisableInputsFechasSeletedAperturaModalCloseCash( true ) );
        }

    };

    const handleCheckFechas = ({ target }) => {

        if( !checkFechasSeletedModal ) {
            dispatch( SetCheckAperturaSeletedAperturaModalCloseCash( false ) );
            dispatch( SetCheckNombreSeletedAperturaModalCloseCash( false ) );
            dispatch( SetCheckFechasSeletedAperturaModalCloseCash( target.checked ) );
            dispatch( SetDisableInputsFechasSeletedAperturaModalCloseCash( false ) );
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
            
            dispatch( startSearchAperturasCloseCash( aperturasSinCerrarTable, filtros, tipo ) );
        } 
    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch( SetIsOpenModalSeletedAperturaCloseCash( false ) );
    
        // Clean el state de busqueda de aperturas
        dispatch( SetValorSearchAperturaCloseCash('') );
        dispatch( SetCheckAperturaSeletedAperturaModalCloseCash( true ) );
        dispatch( SetCheckNombreSeletedAperturaModalCloseCash( false ) );
        dispatch( SetCheckFechasSeletedAperturaModalCloseCash( false ) );
        dispatch( SetDisableInputsFechasSeletedAperturaModalCloseCash( true ) );

        // Reset de resultados Aperturas
        dispatch( SetResetAperturasCloseCash() );

    }

    return (
        <>

            <div className="modal fade" id="modalAperturaSinCerrar">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Aperturas de Caja sin Cerrar <FaCashRegister className="iconSizeBtn" />
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
                                            onChange={e => handleInputChangeWithDispatch(e, SetValorSearchAperturaCloseCash)}
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
                                            disabled={disableInputsFecha}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaDesdeSeletedAperturaModalCloseCash)}
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
                                            disabled={disableInputsFecha}
                                            onChange={e => handleInputChangeWithDispatch(e, SetFechaHastaSeletedAperturaModalCloseCash)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-2 mb-3"></div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-12 mb-3">
                                        <hr />
                                        <CloseCashSeletedAperturaModalTable columns={columns} data={aperturasSinCerrarTable} />
                                    </div>
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
    )
}
