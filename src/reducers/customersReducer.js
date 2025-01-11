import { types } from '../types/types';

const initialState = {
    currentTabCustomers: 'DatosGenerales',
    activeCredito : false,
    activeButtonNew : true,
    activeButtonSearch : true,
    activeButtonSave : false,
    activeButtonRemove : false,
    disableInputs: true,
    customer: {
        identificacion    : '',
        nombre            : '',
        cedula            : '',
        observaciones     : '',
        telefono          : '',
        fax               : '',
        provincia         : '',
        canton            : '',
        distrito          : '',
        direccion         : '',
        correocuentas     : '',
        correoFacturacion : '',
        tipoCliente       : '',
        agente            : '',
        actualizado       : false,
        fallecido         : false,
        enviaRecibo       : false,
        correoRecibo      : '',
        tipoPrecio        : '',
        descuentoEspcial  : '',
        inactivo          : false,
        mag               : false,
        abierto           : false,
        codMonedaCredito  : 0,
        plazoCredito      : '',
        maxCredito        : '',
        descuento         : '',
        empresa           : false,
        sinrestriccion    : false,
        clienteMoroso     : false,
        ordenCompra       : false,
        estado            : false
    },
    searchCustomers : [],
    provinciasCustomers : [],
    cantonesCustomers : [],
    distritosCustomers : [],
    openSearchModal: false,
    isCustomerEdit: false,
    isCustomerDisable: false,
    hasCartaExoneracion : null,
    disableCantones: true,
    disableDistritos: true,
    sinAgente: false,
    startOpening: false
};

export const CustomersReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.SelectTabCustomers:
            return {
                ...state,
                currentTabCustomers : action.payload.nameTab,
            }

        case types.SetNombreCustomers:
            return {
                ...state,
                customer: {
                    ...state.customer,
                    nombre : action.payload
                }
            }

        case types.SetCedulaCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    cedula : action.payload
                }
            }

        case types.SetObservacionesCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    observaciones : action.payload
                }
            }

        case types.SetTelefonoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    telefono : action.payload
                }
            }

        case types.SetFaxCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    fax : action.payload
                }
            }

        case types.SetProvinciaCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    provincia : action.payload
                }
            }

        case types.SetCantonCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    canton : action.payload
                }
            }

        case types.SetDistritoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    distrito : action.payload
                }
            }

        case types.SetDireccionCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    direccion : action.payload
                }
            }

        case types.SetCorreocuentasCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    correocuentas : action.payload
                }
            }

        case types.SetCorreoFacturacionCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    correoFacturacion : action.payload
                }
            }

        case types.SetTipoClienteCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    tipoCliente : action.payload
                }
            }

        case types.SetAgenteCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    agente : action.payload
                }
            }

        case types.SetActualizadoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    actualizado : action.payload
                }
            }

        case types.SetFallecidoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    fallecido : action.payload
                }
            }

        case types.SetEnviaReciboCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    enviaRecibo : action.payload
                }
            }

        case types.SetCorreoReciboCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    correoRecibo : action.payload
                }
            }

        case types.SetTipoPrecioCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    tipoPrecio : action.payload
                }
            }

        case types.SetDescuentoEspecialCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    descuentoEspcial : action.payload
                }
            }

        case types.SetInactivoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    inactivo : action.payload
                }
            }

        case types.SetMagCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    mag : action.payload
                }
            }

        case types.ActiveCredito:
            return {
                ...state,
                activeCredito : action.payload
            }

        case types.SetAbiertoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    abierto : action.payload
                }
            }

        case types.SetCodMonenaCreditoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    codMonedaCredito : action.payload
                }
            }

        case types.SetPlazoCreditoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    plazoCredito : action.payload
                }
            }

        case types.SetMaxCreditoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    maxCredito : action.payload
                }
            }

        case types.SetDescuentoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    descuento : action.payload
                }
            }

        case types.SetEmpresaCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    empresa : action.payload
                }
            }

        case types.SetSinRestriccionCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    sinrestriccion : action.payload
                }
            }

        case types.SetClienteMorosoCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    clienteMoroso : action.payload
                }
            }

        case types.SetOrdenCompraCustomers:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    ordenCompra : action.payload
                }
            }

        case types.CleanStateCustomers:
            return {
                currentTabCustomers: 'DatosGenerales',
                activeCredito : false,
                activeButtonNew : true,
                activeButtonSearch : true,
                activeButtonSave : false,
                activeButtonRemove : false,
                disableInputs: true,
                customer: {
                    identificacion    : '',
                    nombre            : '',
                    cedula            : '',
                    observaciones     : '',
                    telefono          : '',
                    fax               : '',
                    provincia         : '',
                    canton            : '',
                    distrito          : '',
                    direccion         : '',
                    correocuentas     : '',
                    correoFacturacion : '',
                    tipoCliente       : '',
                    agente            : '',
                    actualizado       : false,
                    fallecido         : false,
                    enviaRecibo       : false,
                    correoRecibo      : '',
                    tipoPrecio        : '',
                    descuentoEspcial  : '',
                    inactivo          : false,
                    mag               : false,
                    abierto           : false,
                    codMonedaCredito  : 0,
                    plazoCredito      : '',
                    maxCredito        : '',
                    descuento         : '',
                    empresa           : false,
                    sinrestriccion    : false,
                    clienteMoroso     : false,
                    ordenCompra       : false,
                    estado            : false
                },
                searchCustomers : [],
                provinciasCustomers : [],
                cantonesCustomers : [],
                distritosCustomers : [],
                openSearchModal: false,
                isCustomerEdit: false,
                isCustomerDisable: false,
                hasCartaExoneracion : null,
                disableCantones: true,
                disableDistritos: true,
                sinAgente: false,
                startOpening: false
            }

        case types.ActiveButtonNewCustomers:
            return {
                ...state,
                activeButtonNew : action.payload
            }

        case types.ActiveButtonSearchCustomers:
            return {
                ...state,
                activeButtonSearch : action.payload
            }

        case types.ActiveButtonSaveCustomers:
            return {
                ...state,
                activeButtonSave : action.payload
            }

        case types.ActiveButtonRemoveCustomers:
            return {
                ...state,
                activeButtonRemove : action.payload
            }

        case types.SetDefautlButtonsCustomers:
            return {
                ...state,
                activeCredito : false,
                activeButtonNew : true,
                activeButtonSearch : true,
                activeButtonSave : false,
                activeButtonRemove : false,
                disableInputs: true
            }

        case types.DisableInputsCustomers:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetCedulaSearchCustomers:
            return {
                ...state,
                filtersearchCustomer: {
                    ...state,
                    cedula : action.payload
                }
            }

        case types.SetNombreSearchCustomers:
            return {
                ...state,
                filtersearchCustomer: {
                    ...state,
                    nombre : action.payload
                }
            }

        case types.SetSearchCustomers:
            return {
                ...state,
                searchCustomers: action.payload 
            }

        case types.OpenSearchModalCustomers:
            return {
                ...state,
                openSearchModal: true
            }

        case types.CloseSearchModalCustomers:
            return {
                ...state,
                openSearchModal: false
            }

        case types.CleanSearchCustomers:
            return {
                ...state,
                searchCustomers: []
            }

        case types.SelectedSearchCustomers:
            return {
                ...state,
                customer: action.payload
            }

        case types.IsCustomerEditCustomers:
            return {
                ...state,
                isCustomerEdit: action.payload
            }

        case types.IsCustomerDisable:
            return {
                ...state,
                isCustomerDisable: action.payload
            }

        case types.HasCartaExoneracion:
            return {
                ...state,
                hasCartaExoneracion: action.payload
            }

        case types.SetProvinciasCustomers:
            return {
                ...state,
                provinciasCustomers: action.payload
            }

        case types.SetCantonesCustomers:
            return {
                ...state,
                cantonesCustomers: action.payload
            }

        case types.SetDistritosCustomers:
            return {
                ...state,
                distritosCustomers: action.payload
            }

        case types.SetDisableCantonesCustomers:
            return {
                ...state,
                disableCantones: action.payload
            }

        case types.SetDisableDistritosCustomers:
            return {
                ...state,
                disableDistritos: action.payload
            }

        case types.SetSinAgenteCustomers:
            return {
                ...state,
                sinAgente: action.payload
            }

        case types.SetStartOpeningCustomers:
            return {
                ...state,
                startOpening: action.payload
            }
    
        default:
            return state;
    }

}