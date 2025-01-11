import Modal from 'react-modal';

import { customStyles } from '../../helpers/styleModal';
import { useSelector, useDispatch } from 'react-redux';
// import { UsersSearchTable } from './UsersSearchTable';

import {
    CleanSearchOptionsUsers,
    SetIdUsuarioSearchUsers,
    SetIsOpenModalSearchUsers,
    SetNombreSearchUsers,
    SetValorFiltroSearchUsers,
    startSearchUsers
} from '../../actions/UsersAction';
//---------------------------------------------------------------------->
import {
    CleanStateSearchPreDeposits,
    SetFechaDesdeSearchPreDeposits,
    SetFechaHastaSearchPreDeposits,
    SetFechasSearchPreDeposits,
    SetIsOpenModalSearchPreDeposits,
    SetNumeroAperturaSearchPreDeposits,
    SetNumeroSearchPreDeposits,
    SetValorFiltroSearchPreDeposits,
    startSearchPreDeposits
} from '../../actions/PreDepositsAction';
//---------------------------------------------------------------------->

import { PreDepositsSearchModalTable } from './PreDepositsSearchModalTable';
import { FaCalendar, FaFilter, FaMoneyBill } from 'react-icons/fa';
import { FaHashtag, FaMagnifyingGlass } from 'react-icons/fa6';

Modal.setAppElement('#root');

export const PreDepositsSearchModal = () => {

    const dispatch = useDispatch();
    //---------------------------------------------------------------------->
    const {
        isOpenModalSearch,
        optionsSearchPreDeposito,
        resultSearchPreDepositos
    } = useSelector(state => state.preDeposits);
    //---------------------------------------------------------------------->


    //---------------------------------------------------------------------->
    const {
        valorFiltro,
        numero,
        numeroApertura,
        fechas,
        fechaDesde,
        fechaHasta
    } = optionsSearchPreDeposito;
    //---------------------------------------------------------------------->
    const columns = [
        {
            Header: "Número",
            accessor: "numero",
        },
        {
            Header: "Cajero",
            accessor: "cajero",
        },
        {
            Header: "Monto",
            accessor: "monto",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    //handleIdUsuario 
    //---------------------------------------------------------------------->
    const handleNumero = ({ target }) => {

        if (!numero) {
            dispatch(SetNumeroSearchPreDeposits(target.checked));
            dispatch(SetNumeroAperturaSearchPreDeposits(false));
            dispatch(SetFechasSearchPreDeposits(false));
        }

    };
    //---------------------------------------------------------------------->

    //handleNombre  
    //---------------------------------------------------------------------->
    const handleNumeroApertura = ({ target }) => {

        if (!numeroApertura) {
            dispatch(SetNumeroAperturaSearchPreDeposits(target.checked));
            dispatch(SetNumeroSearchPreDeposits(false));
            dispatch(SetFechasSearchPreDeposits(false));
        }

    };
    //---------------------------------------------------------------------->

    const handleFechas = ({ target }) => {

        if (!fechas) {
            dispatch(SetFechasSearchPreDeposits(target.checked));
            dispatch(SetNumeroSearchPreDeposits(false));
            dispatch(SetNumeroAperturaSearchPreDeposits(false));
        }

    };

    const handleSearch = (e) => {

        if (valorFiltro !== '' || fechas) {

            e.preventDefault();

            // Busqueda por numero
            if (numero && !numeroApertura && !fechas) {

                const searchPreDeposits = {
                    numero: valorFiltro,
                    numApertura: null,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por num Apertura
            if (numeroApertura && !numero && !fechas) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: valorFiltro,
                    desde: null,
                    hasta: null
                }

                dispatch(startSearchPreDeposits(searchPreDeposits));

                return;
            }

            // Busqueda por fechas
            if (fechas && !numero && !numeroApertura) {

                const searchPreDeposits = {
                    numero: null,
                    numApertura: null,
                    desde: fechaDesde,
                    hasta: fechaHasta
                }

                dispatch(startSearchPreDeposits(searchPreDeposits));

                return;
            }

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor escriba un criterio de busqueda.'
            });
        }

    }

    const closeModal = () => {
        dispatch(SetIsOpenModalSearchPreDeposits(false));
        //Clean el state de busqueda de users
        dispatch(CleanStateSearchPreDeposits());

    }

    return (

        <>
            <div className="modal fade" id="modalBuscarPreDeposito" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Pre Depósito <FaMoneyBill className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSearch}>
                                <div className="row mb-2 text-center">
                                    <div className="col-md-12 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaMagnifyingGlass className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className="form-control"
                                                placeholder='Buscar...'
                                                name="valorfiltroPresentacion"
                                                value={valorFiltro}
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchPreDeposits)}
                                            />
                                            <button className='btn btn-primary' type='submit' id='btnSearchPreDepositsModal'>
                                                Buscar <FaMagnifyingGlass className="iconSize" />
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-3 mb-3">
                                        <h4><FaFilter className='iconSize' /> Criterios de busqueda</h4>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input checkP"
                                                id="txtCheckBoxNumero"
                                                checked={numero}
                                                onChange={e => handleNumero(e)}
                                            />
                                            <h5 className="form-check-label" for="txtCheckBoxNumero">Número</h5>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input checkP"
                                                id="checkIdUsuarioSearchUsersModal"
                                                checked={numeroApertura}
                                                onChange={e => handleNumeroApertura(e)}
                                            />
                                            <h5 className="form-check-label" for="checkIdUsuarioSearchUsersModal">Número Apertura</h5>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                class="form-check-input checkP"
                                                id="checkIdUsuarioSearchFechas"
                                                checked={fechas}
                                                onChange={e => handleFechas(e)}
                                            />
                                            <h5 className="form-check-label" for="checkIdUsuarioSearchFechas">Fechas</h5>
                                        </div>
                                        <hr />
                                    </div>
                                </div>

                                <div className='row mb-3 text-center'>
                                <div className="col-md-3 mb-3"></div>
                                <div className="col-md-3 mb-3"></div>
                                    <div className="col-md-3 mb-3">
                                        <h5>Desde</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaCalendar className="iconSize" />
                                            </span>
                                            <input
                                                type='date'
                                                className='form-control'
                                                name="fechaDesde"
                                                disabled={!fechas}
                                                value={fechaDesde}
                                                onChange={e => handleInputChangeWithDispatch(e, SetFechaDesdeSearchPreDeposits)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <h5>Hasta</h5>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaCalendar className="iconSize" />
                                            </span>
                                            <input
                                                type='date'
                                                className='form-control'
                                                name="fechaHasta"
                                                disabled={!fechas}
                                                value={fechaHasta}
                                                onChange={e => handleInputChangeWithDispatch(e, SetFechaHastaSearchPreDeposits)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <hr />
                                    <div className="col-md-12 mb-3">
                                        <PreDepositsSearchModalTable columns={columns} data={resultSearchPreDepositos} />
                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
