import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { RepaymentSearchModalTable } from './RepaymentSearchModalTable';
import {
    SetFacturaSearchModalRepayment,
    SetNombreSearchModalRepayment,
    SetopenSearchModalRepayment,
    SetValorFiltroSearchModalRepayment,
    startSearchRepayment
} from '../../actions/repaymentAction';
import { FaExchangeAlt, FaFilter, FaSearch } from 'react-icons/fa';
import { IoIosCloseCircle } from 'react-icons/io';

export const RepaymentSearchModal = () => {
    const dispatch = useDispatch();

    const { openSearchModal, searchRepayment, optionsSearchRepayment } = useSelector(state => state.repayment)

    const {
        valorfiltro,
        Nombre,
        Factura,
        Fechas,
        Desde,
        Hasta,
    } = optionsSearchRepayment;

    const columns = [
        {
            Header: "Devolucion",
            accessor: "Id",
        },
        {
            Header: "Cliente",
            accessor: "Nombre",
        },
        {
            Header: "Fecha",
            accessor: "Fecha",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeCheckBoxWithDispatch = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        if (valorfiltro === null || valorfiltro === undefined || valorfiltro === '') {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Se debe ingresar informacion para realizar la busqueda.',
            });
        } else {

            let opcionFiltro = {}
            if (Fechas === true && Factura === false && Nombre === false) {
                opcionFiltro = {
                    "desde": Desde,
                    "hasta": Hasta
                }
            } else if (Fechas === false && Factura === false && Nombre === true) {
                opcionFiltro = {
                    "proveedor": valorfiltro,
                }
            } else if (Fechas === false && Factura === true && Nombre === false) {
                opcionFiltro = {
                    "numero": valorfiltro,
                }
            } else if (Fechas === false && Factura === false && Nombre === false) {

                return
            }

            dispatch(startSearchRepayment(opcionFiltro));
        }
    }

    const closeModal = () => {
        dispatch(SetopenSearchModalRepayment(false));
    }

    return (

        <>
            <div className="modal fade" id="modalBuscarDevoVentas">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar devoluciones de Ventas <FaExchangeAlt className="iconSizeBtn" />
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
                                                <FaSearch className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                name="valorfiltro"
                                                className='form-control'
                                                placeholder='Buscar...'
                                                value={valorfiltro}
                                                autoFocus
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchModalRepayment)}
                                            />
                                            <button type='submit' className="btn btn-primary">Buscar <FaSearch className="iconSize" /></button>

                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2 text-center">
                                    <div className="col-md-3 mb-3">
                                        <h4>Búsqueda por <FaFilter className='iconSize' /></h4>
                                        <hr />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                id="lbldescripcionSearchInventory"
                                                type="checkbox"
                                                name="Factura"
                                                class="form-check-input checkP"
                                                checked={Factura}
                                                onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetFacturaSearchModalRepayment)}
                                            />
                                            <h5 className="form-check-label" for="checkdescripcionSearchInventory">Devolución</h5>
                                        </div>
                                        <hr />
                                    </div>

                                    <div className="col-md-3 mb-3">
                                        <div className="form-check">
                                            <input
                                                id="checkubicacionSearchInventory"
                                                type="checkbox"
                                                name="Nombre"
                                                class="form-check-input checkP"
                                                checked={Nombre}
                                                onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetNombreSearchModalRepayment)}
                                            />
                                            <h5 className="form-check-label" for="checkubicacionSearchInventory">Cliente</h5>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </form>
                            <div className="col-md-12">
                                <RepaymentSearchModalTable columns={columns} data={searchRepayment} />
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
