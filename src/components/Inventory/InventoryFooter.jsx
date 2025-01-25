import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useSelector, useDispatch } from 'react-redux';

import { FaWindowClose } from "react-icons/fa";
import { TbTrashXFilled } from "react-icons/tb";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdNoteAdd, MdSave } from "react-icons/md";

// Models
import { Inventory } from '../../models/inventory';
import { RelatedArticles } from '../../models/relatedArticles';

// Modals
import { InventorySearchModal } from './InventorySearchModal';
import { InventorySearchPresentacionModal } from './InventorySearchPresentacionModal';
import { InventorySearchFamiliaModal } from './InventorySearchFamiliaModal';
import { InventorySearchUbicacionModal } from './InventorySearchUbicacionModal';
import { InventorySearchProveedorModal } from './InventorySearchProveedorModal';
import { InventorySearchBodegaModal } from './InventorySearchBodegaModal';
import { InventoryBodyFeautesCategoriaModal } from './inventory_body/inventory_body_features/InventoryBodyFeaturesCategoriaModal';
import { InventorySearchCodigoCabysModal } from './InventorySearchCodigoCabysModal';

//Actions
import { DeleteTab } from '../../actions/tabs';
import {
    ActiveButtonNewInventory,
    ActiveButtonRemoveInventory,
    ActiveButtonSaveInventory,
    ActiveButtonSearchInventory,
    CleanArrayStatePricesSellInventory,
    CleanInputsRelatedArticleInventory,
    CleanRelatedArticleInventory,
    CleanStateInventory,
    CleanStatePricesSellInventory,
    DisableInputsInventory,
    IsEditInventory,
    IsInventoryDisable,
    IsNewInventory,
    IsOpenSearchModalRelacionados,
    IsSelectedRelatedArticleInventory,
    IsShowTabCodigoBarrasInventory,
    OpenSearchModalInventory,
    SetDefaultButtonsInventory,
    SetHasRebajaOtroArt,
    startDeleteInventory,
    startEditInventory,
    startSaveInventory
} from '../../actions/inventory';

// Catalogos
import { startGetAllPresentaciones } from '../../actions/PresentacionesAction';
import { startGetAllSubFamilias } from '../../actions/SubFamiliasAction';
import { startGetAllSubUbicaciones } from '../../actions/SubUbicacionesAction';
import { startGetAllProveedores } from '../../actions/ProveedoresAction';
import { startGetAllMarcas } from '../../actions/MarcasAction';
import { startGetAllMonedas } from '../../actions/MonedasAction';
import { startGetAllImpuestos } from '../../actions/ImpuestosAction';
import { startGetAllBodegas } from '../../actions/bodegasAction';
import { startGetAllCategoriasInventory } from '../../actions/CategoriasAction';
import { InventorySearchCodPadreModal } from './InventorySearchCodPadreModal';


export const InventoryFooter = () => {

    const dispatch = useDispatch();

    const {
        inventory,
        relatedArticlesInventory,
        activeButtonNew,
        activeButtonSearch,
        activeButtonSave,
        activeButtonRemove,
        isEditInventory,
        isInventoryDisable,
        isShowTabCodigoBarras
    } = useSelector(state => state.inventory);
    const { currentTab } = useSelector(state => state.tabs);
    const { auth } = useSelector(state => state.login);

    const { subFamiliasInventory } = useSelector(state => state.subFamilias);
    const { subUbicacionesInventory } = useSelector(state => state.subUbicaciones);
    const { proveedoresInventory } = useSelector(state => state.proveedores);
    const { marcasInventory } = useSelector(state => state.marcas);
    const { presentacionesInventory } = useSelector(state => state.presentaciones);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { impuestosInventory } = useSelector(state => state.impuestos);
    const { bodegasInventory } = useSelector(state => state.bodegas);
    const { categoriasInventory } = useSelector(state => state.categorias);

    const handleCreateInventory = (e) => {

        e.preventDefault();

        if (activeButtonSave) {

            let relatedArticlesArray = [];
            let newCodigoBarras = [];

            relatedArticlesInventory.forEach(relatedArticles => {
                relatedArticlesArray.push(new RelatedArticles(
                    0,
                    parseInt(inventory.cod_Articulo),
                    parseInt(relatedArticles.codigo),
                    `${inventory.cod_Articulo}`,
                    relatedArticles.descripcion,
                    parseInt(relatedArticles.cantidad),
                    true,
                    auth.username,
                    relatedArticles.isNewEdit,
                    false,
                ));
            });

            const newCategorias = inventory.categorias.map(categoria => {
                return {
                    idCategoria: categoria.id,
                    fechaCreacion: new Date(),
                    fechaModificacion: new Date(),
                }
            });

            if (isShowTabCodigoBarras) {
                newCodigoBarras = inventory.codigoBarras.map(cb => {
                    return {
                        descripcion: cb.codigoBarras,
                        tarifa: cb.tarifa,
                        fechaCreacion: new Date(),
                        fechaModificacion: new Date(),
                    }
                });
            }

            dispatch(startSaveInventory(
                new Inventory(
                    0,
                    inventory.cod_Articulo,
                    inventory.barras,
                    inventory.descripcion,
                    inventory.presentaCant,
                    inventory.codPresentacion,
                    inventory.codMarca,
                    inventory.subFamilia,
                    inventory.minima,
                    inventory.puntoMedio,
                    inventory.maxima,
                    inventory.existencia,
                    inventory.subUbicacion,
                    inventory.observaciones,
                    inventory.monedaCosto,
                    inventory.precioBase,
                    inventory.fletes,
                    inventory.otrosCargos,
                    inventory.costo,
                    inventory.monedaVenta,
                    inventory.iVenta,
                    inventory.precio_A,
                    inventory.precio_B,
                    inventory.precio_C,
                    inventory.precio_D,
                    inventory.precio_Promo,
                    inventory.promo_Activa,
                    inventory.promo_Inicio,
                    inventory.promo_Finaliza,
                    inventory.max_Comision,
                    inventory.max_Descuento,
                    inventory.servicio,
                    inventory.inhabilitado,
                    inventory.proveedor,
                    inventory.precio_Sugerido,
                    inventory.sugeridoIV,
                    inventory.preguntaPrecio,
                    inventory.lote,
                    inventory.consignacion,
                    inventory.id_Bodega,
                    inventory.existenciaBodega,
                    inventory.maX_Inventario,
                    inventory.maX_Bodega,
                    inventory.cantidadDescarga,
                    inventory.codigoDescarga,
                    inventory.descargaOtro,
                    inventory.cod_PresentOtro,
                    inventory.cantidadPresentOtro,
                    inventory.existenciaForzada,
                    inventory.bloqueado,
                    inventory.pantalla,
                    inventory.clinica,
                    inventory.mascotas,
                    inventory.receta,
                    inventory.peces,
                    inventory.taller,
                    inventory.barras2,
                    inventory.barras3,
                    inventory.apartado,
                    inventory.promo3x1,
                    inventory.orden,
                    inventory.bonificado,
                    inventory.encargado,
                    inventory.serie,
                    inventory.armamento,
                    inventory.tienda,
                    inventory.prestamo,
                    inventory.maquinaria,
                    inventory.productos_organicos,
                    inventory.rifa,
                    inventory.promoCON,
                    inventory.promoCRE,
                    inventory.costoReal,
                    inventory.validaExistencia,
                    inventory.actualizado,
                    inventory.id_Impuesto,
                    inventory.activarBodega2,
                    inventory.existenciaBodega2,
                    inventory.enToma,
                    inventory.usaGalon,
                    inventory.apicarDescuentoTarjeta,
                    inventory.soloContado,
                    inventory.soloConExistencia,
                    inventory.mag,
                    inventory.sinDecimal,
                    inventory.codcabys,
                    inventory.codigoPrestamo,
                    inventory.muestra,
                    inventory.web,
                    inventory.soloUsoInterno,
                    newCategorias,
                    newCodigoBarras,
                    inventory.idCodigoInternoQvet,
                    inventory.proveedor,
                    inventory.descripcionProveedor,
                    true,
                    auth.username,
                    auth.username,
                    false, //inventory.esPadre
                ),
                relatedArticlesArray
            ));
        }
    }

    const handleCloseWindow = (e) => {

        e.preventDefault();

        // Delete this tab
        dispatch(DeleteTab(currentTab.name, currentTab.routePage));

        // Set default buttons inventory
        dispatch(SetDefaultButtonsInventory());

        // Disable inputs 
        dispatch(DisableInputsInventory(true));

        dispatch(SetHasRebajaOtroArt(false));

        // Disable Inventory Edit
        dispatch(IsEditInventory(false));

        // Disable inventory False
        dispatch(IsInventoryDisable(false));

        //Clean State
        dispatch(CleanStateInventory());

        //Clear state Price Sell
        dispatch(CleanStatePricesSellInventory());

        //Clear state Price Sell
        dispatch(CleanArrayStatePricesSellInventory());

        //False is Selected Related Articles
        dispatch(IsSelectedRelatedArticleInventory(false));

        //Clear state Related Articles
        dispatch(CleanRelatedArticleInventory());

        //Clear state inputs Related Articles
        dispatch(CleanInputsRelatedArticleInventory());

        //False isShowTabCodigoBarras
        dispatch(IsShowTabCodigoBarrasInventory(false));

        //False isShowTabCodigoBarras
        dispatch(IsOpenSearchModalRelacionados(false));
    }

    const handleNewInventory = async (e) => {

        e.preventDefault();

        if (activeButtonNew) {
            dispatch(ActiveButtonSearchInventory(false));
            dispatch(ActiveButtonSaveInventory(true));
            dispatch(ActiveButtonNewInventory(false));
            dispatch(DisableInputsInventory(false));
            dispatch(IsNewInventory(true));

            // Se cargan los catalogos
            await loadCatalogos();
        }
    }

    const loadCatalogos = async (e) => {

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

        // if(presentacionesInventory === null){
        await dispatch(startGetAllPresentaciones());
        // }

        // if(subFamiliasInventory === null) {
        await dispatch(startGetAllSubFamilias());
        // }

        // if(subUbicacionesInventory === null) {
        await dispatch(startGetAllSubUbicaciones());
        // }

        // if(proveedoresInventory === null) {
        await dispatch(startGetAllProveedores());
        // }

        // if(marcasInventory === null) {
        await dispatch(startGetAllMarcas());
        // }

        // if(monedasInventory === null){
        await dispatch(startGetAllMonedas());
        // }

        // if(impuestosInventory === null){
        await dispatch(startGetAllImpuestos());
        // }

        // if(bodegasInventory === null){
        await dispatch(startGetAllBodegas());
        // }

        // if(categoriasInventory === null){
        await dispatch(startGetAllCategoriasInventory());
        // }

        //Quitar el loading
        Swal.close();

    }

    const handleSearchInventory = async (e) => {

        e.preventDefault();

        if (activeButtonSearch) {

            dispatch(CleanStateInventory());
            dispatch(ActiveButtonNewInventory(false));
            dispatch(ActiveButtonSearchInventory(false));
            dispatch(ActiveButtonSaveInventory(true));
            dispatch(ActiveButtonRemoveInventory(true));
            dispatch(DisableInputsInventory(false));

            // Se cargan los catalogos
            await loadCatalogos();
        }

    }

    const handleEditInventory = (e) => {

        e.preventDefault();

        if(activeButtonSave) {

            let relatedArticlesArray = [];
            let newCodigoBarras = [];
            let newCategorias = [];

            relatedArticlesInventory.forEach(relatedArticles => {
                relatedArticlesArray.push( new RelatedArticles(
                    0,
                    parseInt(relatedArticles.cod_Articulo),
                    parseInt(relatedArticles.codigo),
                    `${inventory.cod_Articulo}`,
                    relatedArticles.descripcion,
                    parseInt(relatedArticles.cantidad),
                    true,
                    auth.username,
                    relatedArticles.isNewEdit,
                    false
                ) );
            });

            if( inventory.categorias !== null ) {
                newCategorias = inventory.categorias.map( categoria => {
                    return {
                        idCategoriaxInventario: (categoria.idCategoriaxInventario != undefined) ? categoria.idCategoriaxInventario : 0,
                        idCategoria : categoria.id,
                        fechaCreacion: new Date(),
                        fechaModificacion: new Date(),
                    }
                } );
            }

            if( isShowTabCodigoBarras ) {
                if( inventory.codigoBarras !== null ) {
                    newCodigoBarras = inventory.codigoBarras.map( cb => {
                        return {
                            idCodigoBarrasInventario: cb.idCodigoBarrasInventario,
                            descripcion : cb.codigoBarras,
                            tarifa : cb.tarifa,
                            fechaCreacion: new Date(),
                            fechaModificacion: new Date(),
                        }
                    } );
                }
            }
            
            dispatch( startEditInventory(
                new Inventory(
                    inventory.codigo,
                    inventory.cod_Articulo,
                    inventory.barras,
                    inventory.descripcion,
                    inventory.presentaCant,
                    inventory.codPresentacion,
                    inventory.codMarca,
                    inventory.subFamilia,
                    inventory.minima,
                    inventory.puntoMedio,
                    inventory.maxima,
                    inventory.existencia,
                    inventory.subUbicacion,
                    inventory.observaciones,
                    inventory.monedaCosto,
                    inventory.precioBase,
                    inventory.fletes,
                    inventory.otrosCargos,
                    inventory.costo,
                    inventory.monedaVenta,
                    inventory.iVenta,
                    inventory.precio_A,
                    inventory.precio_B,
                    inventory.precio_C,
                    inventory.precio_D,
                    inventory.precio_Promo,
                    inventory.promo_Activa,
                    inventory.promo_Inicio,
                    inventory.promo_Finaliza,
                    inventory.max_Comision,
                    inventory.max_Descuento,
                    inventory.servicio,
                    inventory.inhabilitado,
                    inventory.proveedor,
                    inventory.precio_Sugerido,
                    inventory.sugeridoIV,
                    inventory.preguntaPrecio,
                    inventory.lote,
                    inventory.consignacion,
                    inventory.id_Bodega,
                    inventory.existenciaBodega,
                    inventory.maX_Inventario,
                    inventory.maX_Bodega,
                    inventory.cantidadDescarga,
                    inventory.codigoDescarga,
                    inventory.descargaOtro,
                    inventory.cod_PresentOtro,
                    inventory.cantidadPresentOtro,
                    inventory.existenciaForzada,
                    inventory.bloqueado,
                    inventory.pantalla,
                    inventory.clinica,
                    inventory.mascotas,
                    inventory.receta,
                    inventory.peces,
                    inventory.taller,
                    inventory.barras2,
                    inventory.barras3,
                    inventory.apartado,
                    inventory.promo3x1,
                    inventory.orden,
                    inventory.bonificado,
                    inventory.encargado,
                    inventory.serie,
                    inventory.armamento,
                    inventory.tienda,
                    inventory.prestamo,
                    inventory.maquinaria,
                    inventory.productos_organicos,
                    inventory.rifa,
                    inventory.promoCON,
                    inventory.promoCRE,
                    inventory.costoReal,
                    inventory.validaExistencia,
                    inventory.actualizado,
                    inventory.id_Impuesto,
                    inventory.activarBodega2,
                    inventory.existenciaBodega2,
                    inventory.enToma,
                    inventory.usaGalon,
                    inventory.apicarDescuentoTarjeta,
                    inventory.soloContado,
                    inventory.soloConExistencia,
                    inventory.mag,
                    inventory.sinDecimal,
                    inventory.codcabys,
                    inventory.codigoPrestamo,
                    inventory.muestra,
                    inventory.web,
                    inventory.soloUsoInterno,
                    newCategorias,
                    newCodigoBarras,
                    inventory.idCodigoInternoQvet,
                    inventory.codigoProveedor,
                    inventory.descripcionProveedor,
                    inventory.estado,
                    auth.username,
                    auth.username,
                    inventory.esPadre
                ),
                relatedArticlesArray
            ));
        } 
    }
    
    const handleDeleteInventory = (e) => {
        e.preventDefault();

        const { cod_Articulo, descripcion } = inventory;
        dispatch(startDeleteInventory(cod_Articulo, descripcion, auth.username, (isInventoryDisable) ? 'enable' : 'disable'));
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonNew
                                ? "btn btn-success espacio"
                                : "btn btn-success espacio disabled"
                        }
                        onClick={handleNewInventory}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSearch
                                ? "btn btn-primary espacio"
                                : "btn btn-primary espacio disabled"
                        }
                        onClick={handleSearchInventory}
                        data-bs-toggle="modal"
                        data-bs-target="#modalBuscarArticulo"
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonSave
                                ? "btn btn-dark espacio"
                                : "btn btn-dark espacio disabled"
                        }
                        onClick={isEditInventory ? handleEditInventory : handleCreateInventory}
                    >
                        {isEditInventory ? "Editar" : "Registrar"}{" "}
                        <MdSave className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            activeButtonRemove
                                ? "btn btn-danger espacio"
                                : "btn btn-danger espacio disabled"
                        }
                        onClick={handleDeleteInventory}
                    >
                        {isInventoryDisable ? "Activar" : "Desactivar"}{" "}
                        <TbTrashXFilled className="iconSizeBtn" />
                    </button>
                </div>


                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindow}
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>
            </div>

            <InventorySearchModal />

            <InventorySearchPresentacionModal />

            <InventorySearchFamiliaModal />

            <InventorySearchUbicacionModal />

            <InventorySearchProveedorModal />

            <InventorySearchBodegaModal />

            <InventoryBodyFeautesCategoriaModal />

            <InventorySearchCodigoCabysModal />

            <InventorySearchCodPadreModal />
        </>
    )
}
