import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { customStylesInventory } from '../../helpers/styleModal';

import {
    SetFacturaSearchModalPurchaseReturns,
    SetNombreSearchModalPurchaseReturns,
    SetopenSearchModalPurchaseReturns,
    SetValorFiltroSearchModalPurchaseReturns,
    startSearchPurchaseReturns
} from '../../actions/purchaseReturnsAction';
import { PurchaseReturnsSearchModalTable } from './PurchaseReturnsSearchModalTable';
import { FaFilter, FaMagnifyingGlass, FaShop } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

Modal.setAppElement('#root');

export const PurchaseReturnsSearchModal = () => {
    const dispatch = useDispatch();

    const { openSearchModal, searchPurchaseReturns, optionsSearchPurchaseReturns } = useSelector(state => state.purchaseReturns)

    const {
        valorfiltro,
        Nombre,
        Factura,
        Fechas,
        Desde,
        Hasta,
    } = optionsSearchPurchaseReturns;


    const columns = [
        {
            Header: "Devolucion",
            accessor: "IdCompra",
        },
        {
            Header: "Proveedor",
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
        
           if (Fechas === false && Factura === false && Nombre === true) {
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

            dispatch(startSearchPurchaseReturns(opcionFiltro));
        }
    }

    const closeModal = () => {
        dispatch(SetopenSearchModalPurchaseReturns(false));
    }

    return (

        <>
            <div className="modal fade" id="modalBuscaDevolucionCompra">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Devoluciones de Compras <FaShop className="iconSizeBtn" />
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
                                    <form onSubmit={handleSearch}>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaFilter className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Buscar...'
                                                name="valorfiltro"
                                                value={valorfiltro}
                                                autoFocus
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchModalPurchaseReturns)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                <FaSearch className="iconSize" />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className="col-md-4 mb-3">
                                    <h5>Seleccione una Opción:</h5>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkdescripcionSearchInventory"
                                            type="checkbox"
                                            name="Factura"
                                            checked={Factura}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetFacturaSearchModalPurchaseReturns)}
                                        />
                                        <h5 className="form-check-label" for="checkdescripcionSearchInventory">Devolución</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkubicacionSearchInventory"
                                            type="checkbox"
                                            name="Nombre"
                                            checked={Nombre}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetNombreSearchModalPurchaseReturns)}
                                        />
                                        <h5 className="form-check-label" for="checkdescripcionSearchInventory">Prooveedor</h5>
                                    </div>
                                    <hr />
                                </div>


                            </div>
                            <div className="row mb-2 text-center">
                                <div className="col-md-12 mb-3">
                                    <PurchaseReturnsSearchModalTable columns={columns} data={searchPurchaseReturns} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )


}
