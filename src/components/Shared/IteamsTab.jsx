import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { CleanStateCartaExoneracion } from '../../actions/CartaExoneracionAction';
import {
    CleanStateCustomers,
    DisableInputsCustomers,
    IsCustomerDisable,
    IsCustomerEditCustomers,
    SetDefautlButtonsCustomers
} from '../../actions/customers';
import {
    CleanArrayStatePricesSellInventory,
    CleanInputsRelatedArticleInventory,
    CleanRelatedArticleInventory,
    CleanStateInventory,
    CleanStatePricesSellInventory,
    DisableInputsInventory,
    IsEditInventory,
    IsInventoryDisable,
    IsSelectedRelatedArticleInventory,
    IsShowTabCodigoBarrasInventory,
    SetDefaultButtonsInventory,
    SetHasRebajaOtroArt
} from '../../actions/inventory';

import {
    CleanStateProveedores,
    SetDefautlButtonsProveedores,
    SetDisableInputsProveedores,
    SetHasDataProveedores,
    SetIsProveedorDisableProveedores,
    SetIsProveedorEditProveedores
} from '../../actions/ProveedoresAction';

import { CleanBilling, SetRemoveArrayStateBilling } from '../../actions/billing';

import { DeleteTab, SelectTab } from '../../actions/tabs';
import { CleanOpenCash } from '../../actions/OpenCashAction';
import { CleanArqueoCash } from '../../actions/arqueocashAction';
import { CleanUsers } from '../../actions/UsersAction';
import { CleanStateCharge } from '../../actions/ChargeAction';
import { CleanStateConsultAlbaranes } from '../../actions/consultAlbaranesAction';
import { SetCleanCompany } from '../../actions/CompanyAction';
import { CleanCompras } from '../../actions/ComprasAction';
import { CleanPresentations } from '../../actions/PresentacionesAction';
import { CleanStateOrdenCompra } from '../../actions/ordenCompraAction';

export const IteamsTab = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state.tabs);
    const { tabs, currentTab } = state;
    const { billings } = useSelector(state => state.billing);

    const handleSelectTab = (tab) => {
        dispatch(SelectTab(tab.name, tab.routePage));
    }

    const handleDeleteTab = (tab) => {

        if (tab.name.split('#')[0] == 'Venta ') {
            
            if ( billings[ parseInt(tab.name.split('#')[1].trim()) - 1 ] !== undefined ) {
                
                if (billings[ parseInt(tab.name.split('#')[1].trim()) - 1 ].startOpening ) {
                    
                    //Mostrar un mensaje de confirmacion
                    Swal.fire({
                        title: '¿Desea cancelar la factura?',
                        showDenyButton: true,
                        showCancelButton: false,
                        confirmButtonText: 'Mantener',
                        denyButtonText: `Cancelar`,
                    }).then(async (result) => {
    
                        if ( result.isDenied ) {
                            console.log('entro')
                            dispatch( CleanBilling( { number: parseInt(tab.name.split('#')[1].trim()) - 1 } ));
                            // dispatch( SetRemoveArrayStateBilling( parseInt(tab.name.split('#')[1].trim()) ) );
                        }
                    });
                } else {
                
                    dispatch( CleanBilling( { number: parseInt(tab.name.split('#')[1].trim()) - 1 } ));
                    dispatch( SetRemoveArrayStateBilling( parseInt(parseInt(tab.name.split('#')[1].trim()) - 1) ) );
                    dispatch( DeleteTab(tab.name, tab.routePage) );
                }
    

            } else {
                
                dispatch( CleanBilling( { number: parseInt(tab.name.split('#')[1].trim()) - 1 } ));
                dispatch( SetRemoveArrayStateBilling( parseInt(parseInt(tab.name.split('#')[1].trim()) - 1) ) );
                dispatch( DeleteTab(tab.name, tab.routePage) );
            }

        } else {
            dispatch(DeleteTab(tab.name, tab.routePage));
        }

        switch (tab.name) {

            case 'Clientes':
                dispatch(SetDefautlButtonsCustomers());
                dispatch(DisableInputsCustomers(true));
                dispatch(IsCustomerEditCustomers(false));
                dispatch(IsCustomerDisable(false));
                dispatch(CleanStateCustomers());
                dispatch(CleanStateCartaExoneracion());
                break;

            case 'Inventarios':
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
                break;

            case 'Proveedores':

                dispatch(SetDefautlButtonsProveedores());
                dispatch(SetDisableInputsProveedores(true));

                dispatch(SetIsProveedorEditProveedores(false));
                dispatch(SetIsProveedorDisableProveedores(false));

                dispatch(CleanStateProveedores());

                dispatch(SetHasDataProveedores(false));
                break;

            case 'Apertura Caja':
                dispatch(CleanOpenCash());
                
            case 'Arqueo Caja':
                dispatch(CleanArqueoCash());

            case 'Usuarios':
                dispatch(CleanUsers());

            case 'Consulta Albaranes':
                dispatch( CleanStateConsultAlbaranes() );

            case 'Cobrar':
                dispatch( CleanStateCharge() ); 

            case 'Empresas':
                dispatch( SetCleanCompany() );

            case 'Compra':
                dispatch( CleanCompras() );

            case 'Presentaciones':
                dispatch( CleanPresentations() );

            case 'Orden de compra manual':
                dispatch( CleanStateOrdenCompra());


            default:
                break;

        }

    }

    return (
        (tabs.length !== 0)
            ?
            <ul>
                {tabs.map(tab => {
                    return (
                        <li className="Tabs_li" key={tab.name}>

                            <button
                                className={currentTab.name == tab.name ? "tab active" : "tab"}
                                onClick={() => handleSelectTab(tab)}
                            >
                                <Redirect to={currentTab.routePage} />
                                {tab.name}
                            </button>

                            <button
                                className={currentTab.name == tab.name ? "tab-delete active" : "tab-delete"}
                                onClick={() => handleDeleteTab(tab)}
                            >
                                <Redirect to={currentTab.routePage} />
                                X
                            </button>
                        </li>
                    );
                })}

            </ul>
            : <Redirect to={currentTab.routePage} />
    )
}
