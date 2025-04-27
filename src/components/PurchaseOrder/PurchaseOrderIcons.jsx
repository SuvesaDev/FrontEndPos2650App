import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';
import { useDispatch, useSelector } from 'react-redux';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FaRegSave, FaWindowClose } from 'react-icons/fa';

import { startGetAllProveedores } from '../../actions/ProveedoresAction';
import { startGetAllMonedas } from '../../actions/MonedasAction';
import { 
    CleanStateOrdenCompra,
    SetActiveButtonDisableOrdenCompra, 
    SetActiveButtonNewOrdenCompra, 
    SetActiveButtonSaveOrdenCompra, 
    SetActiveButtonSearchOrdenCompra, 
    SetDisableInputsOrdenCompra
} from '../../actions/ordenCompraAction';
import { DeleteTab } from '../../actions/tabs';

import { PurchaseOrderBodyProveedorModal } from './PurchaseOrderBodyProveedorModal';

export const PurchaseOrderIcons = () => {

    const dispatch = useDispatch();

    const { proveedoresInventory } = useSelector(state => state.proveedores);
    const { monedasInventory } = useSelector(state => state.monedas);
    const { currentTab } = useSelector(state => state.tabs);

    const { 
        ActiveButtonNew,
        ActiveButtonSearch,
        ActiveButtonSave,
        ActiveButtonDisable 
    } = useSelector((state) => state.ordenCompra);

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
            dispatch(SetActiveButtonNewOrdenCompra(false));
            dispatch(SetActiveButtonSearchOrdenCompra(false));
            dispatch(SetActiveButtonSaveOrdenCompra(true));
            dispatch(SetActiveButtonDisableOrdenCompra(true));
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
                    >
                        Buscar <FaMagnifyingGlass className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={
                            (ActiveButtonSave ? "btn btn-dark espacio" : "btn btn-dark espacio disabled")
                        }
                        disabled={!ActiveButtonSave}
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

            </div>

            <PurchaseOrderBodyProveedorModal />
        </>

    )
}
