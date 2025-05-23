import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose, FaEyeSlash, FaEye } from 'react-icons/fa';
import { PiKeyFill } from "react-icons/pi";
import { VscVmActive } from "react-icons/vsc";

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
    SetNombreEntregaOrdenCompra,
    SetVisibleClaveInternaOrdenCompra,
    startChangeStateOrdenCompra,
    startEditOrdenCompra,
    startGetLast10OrdenCompra,
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
        ordenCompra,
        usuario,
        isEditOrdenCompra,
        usuarioCreacion,
        nombreUsuarioCreacion

    } = useSelector((state) => state.ordenCompra);

    const {
        numeroOrdenCompra,
        idProveedor,
        observaciones,
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
        totalFinal,
        anulado
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

            const currentName = nombreEntrega;

            dispatch(CleanStateOrdenCompra());
            dispatch(SetActiveButtonNewOrdenCompra(true));
            dispatch(SetActiveButtonSearchOrdenCompra(true));
            dispatch(SetDisableInputsOrdenCompra(false));
            dispatch(SetNombreEntregaOrdenCompra(currentName));

            // Se cargan los catalogos
            await loadCatalogos();

            dispatch( startGetLast10OrdenCompra() );
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
            observaciones: observaciones,
            usuario: usuario,
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
                    codigoArticulo: article.codigo,
                    descripcion: article.descripcion,
                    costoUnitario: article.precioUnitario,
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

    const handleEditOrdenCompra = () => {

        const today = new Date();

        if(isEditOrdenCompra) {
            const editOrdenCompra = {
                orden: numeroOrdenCompra,
                proveedor: idProveedor,
                fecha: fechaEmision,
                contado: formaPagoContado,
                credito: formaPagoCredito,
                diascredito: cantidadDias,
                plazo: 0,
                descuento: totalDescuento,
                impuesto: totalImpuestos,
                total: totalFinal,
                observaciones: observaciones,
                usuario: usuarioCreacion,
                nombreUsuario: nombreUsuarioCreacion,
                entregar: "", 
                codMoneda: moneda,
                subTotalGravado: 0,
                subTotalExento: 0,
                subTotal: totalSubTotal,
                anulado: false,
                idSucursal: 0, 
                usuarioModificacion: usuario,
                nombreUsuarioModificacion: nombreEntrega,
                fechaModificacion: today.toISOString().split('T')[0],
                detalleOrdenCompra: articulos.map( article => {
                    return {
                        id: (article.id != undefined) ? article.id : 0,
                        orden: numeroOrdenCompra,
                        codigo: article.idArticulo,
                        codigoArticulo: article.codigo,
                        descripcion: article.descripcion,
                        costoUnitario: article.precioUnitario,
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
    
            dispatch( startEditOrdenCompra(editOrdenCompra) );
        }

    }

    const handleDesactiveOrdenCompra = () => {

        if(isEditOrdenCompra) {
            dispatch( startChangeStateOrdenCompra(numeroOrdenCompra, true) );
        }

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
                        onClick={ (isEditOrdenCompra) ? handleEditOrdenCompra : handleSaveOrdenCompra }
                    >
                        {(isEditOrdenCompra) ? 'Editar' : 'Registrar'}   <FaRegSave className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonDisable) ? "btn btn-danger espacio" : "btn btn-danger espacio disabled"
                        }
                        disabled={!ActiveButtonDisable}
                        onClick={ handleDesactiveOrdenCompra }
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
