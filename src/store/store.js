import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import { tabsReducer } from '../reducers/tabsReducer';
import { InventoryReducer } from '../reducers/inventoryReducer';
import { CustomersReducer } from '../reducers/customersReducer';
import { SettingsReducer } from '../reducers/settingsReducer';
import { SidebarReducer } from '../reducers/sidebarReducer';
import { loginReducer } from '../reducers/loginReducer';
import { PaysReducer } from '../reducers/paysReducer';
import { BillingReducer } from '../reducers/billingReducer';
import { BuysReducer } from '../reducers/buysReducer';
import { TermsReducer } from '../reducers/termsReducer';
import { UnityCodeReducer } from '../reducers/unityCodeReducer';
import { MagIteamListReducer } from '../reducers/magIteamListReducer';
import { AssingCabysCodeReducer } from '../reducers/assingCabysCodeReducer';
import { CartaExoneracionReducer } from '../reducers/cartaExoneracionReducer';
import { TiposExoneracionReducer } from '../reducers/tiposExoneracionReducer';
import { SubFamiliasReducer } from '../reducers/subFamiliasReducer';
import { SubUbicacionesReducer } from '../reducers/subUbicacionesReducer';
import { ProveedoresReducer } from '../reducers/proveedoresReducer';
import { MarcasReducer } from '../reducers/marcasReducer';
import { PresentacionesReducer } from '../reducers/presentacionesReducer';
import { MonedasReducer } from '../reducers/monedasReducer';
import { ImpuestosReducer } from '../reducers/impuestosReducer';
import { BodegasReducer } from '../reducers/bodegasReducer';
import { AgenteVentaReducer } from '../reducers/agenteventaReducer';
import { DocumentsEmitedReducer } from '../reducers/documentsEmitedReducer';
import { TiposFacturasReducer } from '../reducers/tiposFacturasReducer';
import { comprasReducer } from '../reducers/comprasReducer';
import { RepaymentReducer } from '../reducers/repaymentReducer';
import { ConsultAlbaranesReducer } from '../reducers/consultAlbaranesReducer';
import { PurchaseReturnsReducer } from '../reducers/purchaseReturnsReducer';
import { InventoryAdjustmentReducer } from '../reducers/InventoryAdjustmentReducer';
import { openCashReducer } from '../reducers/openCashReducer';
import { arqueoCash } from '../reducers/arqueocashReducer';
import { CategoriasReducer } from '../reducers/categoriasReducer';
import { usersReducer } from '../reducers/usersReducer';
import { chargeReducer } from '../reducers/chargeReducer';
import { companyReducer } from '../reducers/companyReducer';
import { branchReducer } from '../reducers/branchReducer';
import { TiposIdentificacionReducer } from '../reducers/tiposIdentificacionReducer';
import { ProvinciasReducer } from '../reducers/provinciasReducer';
import { closeCashReducer } from '../reducers/closeCashReducer';
import { downPaymentReducer } from '../reducers/downPaymentReducer';
import { PreDepositsReducer } from '../reducers/preDepositsReducer';
import { GenerateDepositsReducer } from '../reducers/generateDepositsReducer';
import { ConsultDepositsReducer } from '../reducers/consultDepositsReducer';
import { bankReducer } from '../reducers/BankReducer';
import { stateReducer } from '../reducers/stateReducer';
import { qrReducer } from '../reducers/qrReducer';
import { CollectReducer } from '../reducers/CollectReducer';
import { reportsReducer } from '../reducers/reportsReducer';
import { farmacyReducer } from '../reducers/farmacyReducer';
import { countswihoutpayReducer } from '../reducers/countswihoutpayReducer';
import { budgetsReducer } from '../reducers/budgetsReducer';
import { familiasReducer } from '../reducers/familiasReducer';

const reducers = combineReducers({
    tabs: tabsReducer,
    inventory: InventoryReducer,
    customers: CustomersReducer,
    settings: SettingsReducer,
    sidebar: SidebarReducer,
    login: loginReducer,
    pays: PaysReducer,
    wihoutpay: countswihoutpayReducer,
    budgets: budgetsReducer,
    billing: BillingReducer,
    buys: BuysReducer,
    terms: TermsReducer,
    unityCode: UnityCodeReducer,
    magIteamsList: MagIteamListReducer,
    assingCabysCode: AssingCabysCodeReducer,
    cartaExoneracion : CartaExoneracionReducer,
    tiposExoneracion : TiposExoneracionReducer,
    subFamilias: SubFamiliasReducer,
    subUbicaciones : SubUbicacionesReducer,
    proveedores : ProveedoresReducer,
    marcas : MarcasReducer,
    presentaciones : PresentacionesReducer,
    monedas : MonedasReducer,
    impuestos : ImpuestosReducer,
    bodegas: BodegasReducer,
    agenteVentas: AgenteVentaReducer,
    documentsEmited: DocumentsEmitedReducer,
    tiposFacturas: TiposFacturasReducer, 
    compras: comprasReducer,
    repayment: RepaymentReducer,
    consultAlbaranes: ConsultAlbaranesReducer,
    purchaseReturns : PurchaseReturnsReducer,
    purchaseReturns : PurchaseReturnsReducer,
    InventoryAdjustment: InventoryAdjustmentReducer, 
    OpenCash : openCashReducer, 
    ArqueCash : arqueoCash, 
    categorias : CategoriasReducer,
    users: usersReducer,
    charge: chargeReducer,
    company: companyReducer,
    branch: branchReducer,
    tiposIdentificacion: TiposIdentificacionReducer,
    provincias: ProvinciasReducer,
    closeCash: closeCashReducer,
    downPayment: downPaymentReducer,
    preDeposits: PreDepositsReducer,
    generateDeposits: GenerateDepositsReducer,
    consultDeposits: ConsultDepositsReducer,
    bank: bankReducer,
    stateInventory: stateReducer,
    stateInventoryQR: qrReducer,
    collect: CollectReducer,
    reports: reportsReducer,
    farmacy: farmacyReducer,
    familias: familiasReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore( 
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);