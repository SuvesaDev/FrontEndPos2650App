import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose, FaEyeSlash, FaEye } from 'react-icons/fa';
import { PiKeyFill } from "react-icons/pi";

import { startGetAllProveedores } from '../../actions/ProveedoresAction';
import { startGetAllMonedas } from '../../actions/MonedasAction';
import { 
    CleanStateOrdenCompra,
    SetActiveButtonDisableOrdenCompra, 
    SetActiveButtonNewOrdenCompra, 
    SetActiveButtonSaveOrdenCompra, 
    SetActiveButtonSearchOrdenCompra, 
    SetClaveInternaOrdenCompra, 
    SetDisableInputsOrdenCompra,
    SetVisibleClaveInternaOrdenCompra,
    startSaveOrdenCompra,
    startValidateClaveInternaOrdenCompra
} from '../../actions/ordenCompraAction';
import { DeleteTab } from '../../actions/tabs';

import { PurchaseOrderBodyProveedorModal } from './PurchaseOrderBodyProveedorModal';
import { InventorySearchModal } from '../Inventory/InventorySearchModal';
import { PurchaseOrderBodySearchModal } from './PurchaseOrderBodySearchModal';

export const PurchaseOrderIcons = () => {

    const dispatch = useDispatch();

    const { proveedoresInventory } = useSelector(state => state.proveedores);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { currentTab } = useSelector(state => state.tabs);

    const { 
        ActiveButtonNew,
        ActiveButtonSearch,
        ActiveButtonSave,
        ActiveButtonDisable,
        claveInterna,
        visibleClaveInterna,
        disableInputsUser,
        ordenCompra
    } = useSelector((state) => state.ordenCompra);

    const {
        numeroOrdenCompra,
        idProveedor,
        nombreProveedor,
        fechaEmision,
        nombreEntrega,
        moneda,
        formaPagoContado,
        formaPagoCredito,
        cantidadDias,
        articulos,
        totalSubTotal,
        totalDescuento,
        totalImpuestos,
        totalFinal
    } = ordenCompra;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleNewOrdenCompra = async (e) => {
    
        e.preventDefault();

        if (ActiveButtonNew) {

            dispatch(SetActiveButtonNewOrdenCompra(false));
            dispatch(SetActiveButtonSearchOrdenCompra(true));
            dispatch(SetActiveButtonSaveOrdenCompra(true));
            dispatch(SetActiveButtonDisableOrdenCompra(false));
            dispatch(SetDisableInputsOrdenCompra(false));

            // Se cargan los catalogos
            await loadCatalogos();
        }
    }

    const handleSearchOrdenCompra = async (e) => {
    
        e.preventDefault();

        if (ActiveButtonSearch) {

            dispatch(CleanStateOrdenCompra());
            dispatch(SetActiveButtonNewOrdenCompra(true));
            dispatch(SetActiveButtonSearchOrdenCompra(true));
            // dispatch(SetActiveButtonSaveOrdenCompra(true));
            // dispatch(SetActiveButtonDisableOrdenCompra(true));
            dispatch(SetDisableInputsOrdenCompra(false));

            // Se cargan los catalogos
            await loadCatalogos();
        }
    
    }

    const loadCatalogos = async (e) => {
    
        if( proveedoresInventory != null && monedasInventory != null ) {
            return;
        }

        //Mostrar el loading
        Swal.fire({
            title: 'Por favor, espere cargando catalogos',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            imageUrl: loadingImage,
            customClass: 'alert-class-login',
            imageHeight: 100,
        });

        if(proveedoresInventory === null) {
            await dispatch(startGetAllProveedores());
        }

        if(monedasInventory === null){
            await dispatch(startGetAllMonedas());
        }

        //Quitar el loading
        Swal.close();
    
    }

    const handleCloseWindow = (e) => {
    
        e.preventDefault();

        //Mostrar un mensaje de confirmacion
        Swal.fire({
            title: '¿Desea cerrar la orden de compra?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Mantener',
            denyButtonText: `Cancelar`,
        }).then(async (result) => {

            if (result.isDenied) {
                // Delete this tab
                dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            
                dispatch(CleanStateOrdenCompra());
            }
        });

        
    }

    const handleVisibleClave = (e) => {

        if (!disableInputsUser) {
            e.preventDefault();
            dispatch(SetVisibleClaveInternaOrdenCompra(!visibleClaveInterna));
        }
    }

    const handleOnKeyDownUser = async (e) => {
    
        if( disableInputsUser ) return;

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

            dispatch( startValidateClaveInternaOrdenCompra(claveInterna));
        }
    
    }

    const handleSaveOrdenCompra = () => {

        const newOrdenCompra = {
            proveedor: idProveedor,
            fecha: fechaEmision,
            contado: formaPagoContado,
            credito: formaPagoCredito,
            diascredito: cantidadDias,
            plazo: 0,
            descuento: totalDescuento,
            impuesto: totalImpuestos,
            total: totalFinal,
            observaciones: "",
            usuario: nombreEntrega,
            nombreUsuario: nombreEntrega,
            entregar: "", 
            codMoneda: moneda,
            subTotalGravado: 0,
            subTotalExento: 0,
            subTotal: totalSubTotal,
            anulado: false,
            idSucursal: 0, 
            usuarioModificacion: null,
            nombreUsuarioModificacion: null,
            fechaModificacion: null,
            detalleOrdenCompra: articulos.map( article => {
                return {
                    orden: numeroOrdenCompra,
                    codigo: article.idArticulo,
                    descripcion: article.descripcion,
                    costoUnitario: 0,
                    cantidad: article.cantidad,
                    totalCompra: article.total,
                    porcDescuento: article.descuento,
                    descuento: article.montoDescuento,
                    porcImpuesto: article.impuesto,
                    impuesto: article.montoImpuesto,
                    otrosCargos: 0,
                    montoFlete: 0,
                    costo: 0,
                    gravado: 0,
                    exento: 0,
                    vendidos: 0,
                    existActual: 0
                }
            })
        }

        dispatch( startSaveOrdenCompra(newOrdenCompra) );

    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonNew ? "btn btn-success espacio" : "btn btn-success espacio disabled")
                        }
                        disabled={!ActiveButtonNew}
                        onClick={handleNewOrdenCompra}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn"/>
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonSearch ? "btn btn-primary espacio" : "btn btn-primary espacio disabled")
                        }
                        disabled={!ActiveButtonSearch}
                        onClick={handleSearchOrdenCompra}
                        data-bs-toggle='modal'
                        data-bs-target='#modalSearchOrdenCompra'
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonSave ? "btn btn-dark espacio" : "btn btn-dark espacio disabled")
                        }
                        onClick={handleSaveOrdenCompra}
                    >
                        Registrar <FaRegSave className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonDisable ? "btn btn-danger espacio" : "btn btn-danger espacio disabled")
                        }
                        disabled={!ActiveButtonDisable}
                    >
                        Anular <RiDeleteBin2Fill className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={"btn btn-warning espacio"}
                        onClick={handleCloseWindow}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>

                <div className="col-md-2 mt-1 ms-3">
                    <div className="input-group">

                        <span className="input-group-text">
                            <PiKeyFill className="iconSize" />
                        </span>

                        <input
                            type={ (visibleClaveInterna) ? 'text' : 'password' }
                            name="claveInterna"
                            className="form-control"
                            placeholder="Clave Interna"
                            disabled={disableInputsUser}
                            value={claveInterna}
                            onKeyDown={handleOnKeyDownUser}
                            onChange={e => handleInputChangeWithDispatch(e, SetClaveInternaOrdenCompra)}
                        />
                        <span
                            className="input-group-text"
                            onClick={handleVisibleClave}
                            style={{ cursor: "pointer" }}
                        >
                            {
                                (visibleClaveInterna)
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                        </span>
                    </div>
                </div>

            </div>

            <PurchaseOrderBodyProveedorModal />

            <InventorySearchModal />

            <PurchaseOrderBodySearchModal />
        </>

    )
}
