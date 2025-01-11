import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { customStylesInventory } from '../../helpers/styleModal';
import { BuysSearchModalTable } from './BuysSearchModalTable';

import {
    startSearchCompras,
    SetFacturaSearchModalCompras,
    SetValorFiltroSearchModalCompras,
    SetopenSearchModal,
    SetProveedorSearchModalCompras
} from '../../actions/ComprasAction';
import { FaBilibili } from 'react-icons/fa6';
import { TbCircleX } from 'react-icons/tb';
import { IoReceipt } from 'react-icons/io5';
import { FaFilter, FaSearch } from 'react-icons/fa';

Modal.setAppElement('#root');

export const BuysSearchModal = () => {

    const dispatch = useDispatch();

    const { openSearchModal, searchCompras, optionsSearchCompras } = useSelector(state => state.compras)

    const {
        valorfiltro,
        Proveedor,
        Factura
    } = optionsSearchCompras;

    const columns = [
        {
            Header: "IdCompra",
            accessor: "IdCompra",
        },
        {
            Header: "Factura",
            accessor: "Factura",
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

    const handleChangeProveedor = ({ target }) => {

        // Se activa el proveedor
        dispatch(SetProveedorSearchModalCompras(true));

        // Se desactiva el factura
        dispatch(SetFacturaSearchModalCompras(false));
    };

    const handleChangeFactura = ({ target }) => {

        // Se activa el factura
        dispatch(SetFacturaSearchModalCompras(true));

        // Se desactiva el proveedor
        dispatch(SetProveedorSearchModalCompras(false));
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

            let opcionFiltro = {};

            if (Factura === false && Proveedor === true) {
                opcionFiltro = {
                    "proveedor": valorfiltro,
                }
            } else if (Factura === true && Proveedor === false) {
                opcionFiltro = {
                    "numero": valorfiltro,
                }
            } else if (Factura === false && Proveedor === false) {
                return;
            }

            dispatch(startSearchCompras(opcionFiltro));
        }
    }

    const closeModal = () => {
        dispatch(SetopenSearchModal(false));
    }

    return (

        <>
            <div className="modal fade" id="modalBuscaFactCompra">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Buscar Factura de Compra <IoReceipt className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    <form onSubmit={handleSearch}>

                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaFilter className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Buscar....'
                                                name="valorfiltro"
                                                value={valorfiltro}
                                                autoFocus
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchModalCompras)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type="submit"
                                            >
                                                Buscar <FaSearch className="iconSize" />
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkdescripcionSearchBuys"
                                            type="checkbox"
                                            name="Factura"
                                            checked={Factura}
                                            onChange={e => handleChangeFactura(e)}
                                        />
                                        <h5 className="form-check-label" for="checkdescripcionSearchBuys">Número Factura</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkubicacionSearchBuys"
                                            type="checkbox"
                                            name="Proveedor"
                                            checked={Proveedor}
                                            onChange={e => handleChangeProveedor(e)}
                                        />
                                        <h5 className="form-check-label" for="checkubicacionSearchBuys">Proveedor</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                            <div className='row mb-2 text-center'>
                                <div className='col-md-12 mb-2'>
                                    <BuysSearchModalTable columns={columns} data={searchCompras} />
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
