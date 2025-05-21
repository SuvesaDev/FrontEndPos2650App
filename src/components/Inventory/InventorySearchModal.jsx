import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { InventorySearchTable } from './inventory_body/InventorySearchTable';
import {
    ActiveButtonNewInventory,
    ActiveButtonRemoveInventory,
    ActiveButtonSaveInventory,
    ActiveButtonSearchInventory,
    CleanOptionsSearchModalInventory,
    CleanSearchInventory,
    CloseSearchModalInventory,
    DisableInputsInventory,
    IsOpenSearchModalRebaja,
    IsOpenSearchModalRelacionados,
    SetBarrasSearchModalInventory,
    SetCodigoSearchModalInventory,
    SetCualquierParteSearchModalInventory,
    SetDescripcionSearchModalInventory,
    SetInicioCampoSearchModalInventory,
    SetMostrarImpuestosSearchModalInventory,
    SetMostrarInhabilitadosSearchModalInventory,
    SetUbicacionSearchModalInventory,
    SetValorFiltroSearchModalInventory,
    startSearchInventory
} from '../../actions/inventory';
import { SetOpenSearchInventoryBilling } from '../../actions/billing';
import { setOpenModalSearchInventoryConsultAlbaranes } from '../../actions/consultAlbaranesAction';
import { FaBoxesStacked, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { TbCircleX } from 'react-icons/tb';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { SetOpenSearchInventoryBudgets } from '../../actions/budgetsAction';
import { SetIsOpenModalSearchInventoryOrdenCompra } from '../../actions/ordenCompraAction';
import { SetIsOpenModalSearchBonificaciones } from '../../actions/BonificacionesAction';


export const InventorySearchModal = () => {

    const dispatch = useDispatch();
    const {
        openSearchModal,
        optionsSearchInventory,
        searchInventory,
        isOpenSearchModalRebaja,
        isOpenSearchModalRelacionados
    } = useSelector(state => state.inventory);

    const { isOpenSearchInventoryBilling } = useSelector(state => state.billing);
    const { isOpenModalSearchInventoryConsultAlbaranes } = useSelector(state => state.consultAlbaranes);
    const { isOpenSearchInventoryBudgets } = useSelector(state => state.budgets);
    const { isOpenModalSearchInventoryOrdenCompra } = useSelector((state) => state.ordenCompra);
    const { isOpenModalSearchArticuloBonificaciones } = useSelector((state) => state.bonificaciones);
    const {
        valorfiltro,
        tipofiltro,
        descripcion,
        ubicacion,
        barras,
        codigo,
        coincidir,
        inicioCampo,
        cualquierparte,
        mostrarInhabilitados,
        mostrarimpuestos
    } = optionsSearchInventory;

    const columns = [
        {
            Header: "Código",
            accessor: "cod_Articulo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Precio Final",
            accessor: "precioFinal",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Impuesto %",
            accessor: "iva",
        },
        {
            Header: "Barras",
            accessor: "barras",
        },
        {
            Header: "Prestamo",
            accessor: "prestamo",
        },
        {
            Header: "Existencia",
            accessor: "existencia",
        },
        {
            Header: "Exis Consignación",
            accessor: "consignacion",
        },
        {
            Header: "Ubicacion",
            accessor: "ubicacion",
        },
        {
            Header: "Receta",
            accessor: "receta",
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
            dispatch(startSearchInventory(tipofiltro, valorfiltro, mostrarInhabilitados, coincidir));
        }
    }

    const closeModal = () => {

        if (isOpenSearchModalRebaja) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(IsOpenSearchModalRebaja(false));

        } else if (isOpenSearchModalRelacionados) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(IsOpenSearchModalRelacionados(false));

        } else if (isOpenSearchInventoryBilling) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(SetOpenSearchInventoryBilling(false));

        } else if (isOpenModalSearchInventoryConsultAlbaranes) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(setOpenModalSearchInventoryConsultAlbaranes(false));
            
        } else if (isOpenSearchInventoryBudgets) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(SetOpenSearchInventoryBudgets(false));
            
        } else if (isOpenModalSearchInventoryOrdenCompra) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(SetIsOpenModalSearchInventoryOrdenCompra(false));
            
        } else if (isOpenModalSearchArticuloBonificaciones) {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(SetIsOpenModalSearchBonificaciones(false));
            
        } else {

            dispatch(CleanSearchInventory());
            dispatch(CleanOptionsSearchModalInventory());
            dispatch(CloseSearchModalInventory());
            dispatch(ActiveButtonNewInventory(true));
            dispatch(ActiveButtonSearchInventory(true));
            dispatch(ActiveButtonSaveInventory(false));
            dispatch(ActiveButtonRemoveInventory(false));
            dispatch(DisableInputsInventory(true));

        }

    }

    return (

        <>
            <div className="modal fade" id="modalBuscarArticulo">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Buscar Artículo <FaBoxesStacked className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <form onSubmit={handleSearch}>
                                    <div className="col-md-12 mb-3">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FaMagnifyingGlass className="iconSize" />
                                            </span>
                                            <input
                                                type='text'
                                                className='form-control'
                                                placeholder='Buscar...'
                                                name="valorfiltro"
                                                id="valorfiltro"
                                                value={valorfiltro}
                                                autoFocus
                                                onChange={e => handleInputChangeWithDispatch(e, SetValorFiltroSearchModalInventory)}
                                            />
                                            <button
                                                className="btn btn-primary"
                                                type='submit'
                                            >
                                                <FaSearch className="iconSize" />
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="row mb-2 text-center">
                                <div className='col-md-2 mb-2'>
                                    <h5>Búsqueda en <FaArrowRight className='iconSize' /></h5>
                                </div>
                                <div className="col-md-2 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkdescripcionSearchInventory"
                                            type="checkbox"
                                            name="descripcion"
                                            checked={descripcion}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetDescripcionSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkdescripcionSearchInventory">Descripción</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkubicacionSearchInventory"
                                            type="checkbox"
                                            name="ubicacion"
                                            checked={ubicacion}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetUbicacionSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkubicacionSearchInventory">Ubicación</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkbarrasSearchInventory"
                                            type="checkbox"
                                            name="barras"
                                            checked={barras}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetBarrasSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkubicacionSearchInventory">Barras</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkcodigoSearchInventory"
                                            type="checkbox"
                                            name="codigo"
                                            checked={codigo}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetCodigoSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkcodigoSearchInventory">Código</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-2 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkmostrarPrecioSearchInventory"
                                            type="checkbox"
                                            name="mostrarimpuestos"
                                            checked={mostrarimpuestos}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetMostrarImpuestosSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkcodigoSearchInventory">Mostrar Precios con Impuestos al 1%</h5>
                                    </div>
                                    <hr />
                                </div>
                            </div>

                            <div className="row mb-2 text-center">
                                <div className='col-md-3 mb-2'>
                                    <h5>Coincidir en<FaArrowRight className='iconSize' /></h5>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkinicioSearchInventory"
                                            type="checkbox"
                                            name="inicioCampo"
                                            checked={inicioCampo}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetInicioCampoSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkinicioSearchInventory">Inicio del Campo</h5>
                                    </div>
                                    <hr />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkcualquierSearchInventory"
                                            type="checkbox"
                                            name="cualquierparte"
                                            checked={cualquierparte}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetCualquierParteSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkcualquierSearchInventory">Cualquier Parte</h5>
                                    </div>
                                    <hr />
                                </div>


                                <div className="col-md-3 mb-3">
                                    <div className="form-check">
                                        <input
                                            class="form-check-input checkP"
                                            id="checkmostrarInhabilitadosSearchInventory"
                                            type="checkbox"
                                            name="mostrarInhabilitados"
                                            disabled={(isOpenSearchModalRebaja || isOpenSearchModalRelacionados) ? true : false}
                                            checked={mostrarInhabilitados}
                                            onChange={e => handleInputChangeCheckBoxWithDispatch(e, SetMostrarInhabilitadosSearchModalInventory)}
                                        />
                                        <h5 className="form-check-label" for="checkmostrarInhabilitadosSearchInventory">Mostrar Inhabilitados</h5>
                                    </div>
                                    <hr />
                                </div>

                            </div>
                            <div className="row mb-2 text-center">

                                <hr />
                                <div className="col-md-12 mb-3">
                                    {searchInventory && Object.keys(searchInventory).length > 0 ? (
                                        <InventorySearchTable columns={columns} data={searchInventory} />
                                    ) : (
                                        <center>
                                            <div className="toast show">
                                                <div className={"card-header toast-warning"}>
                                                    <strong className="me-auto">
                                                        2650 Informa <AiFillExclamationCircle className="iconSize" />
                                                    </strong>
                                                </div>
                                                <div className="toast-body">
                                                    <p className="text-danger">
                                                        No existen datos con lo ingresado y/o no ha buscado datos.
                                                    </p>
                                                </div>
                                            </div>
                                        </center>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={closeModal}>Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>

                    </div>
                </div>
            </div >
        </>

    )
}
