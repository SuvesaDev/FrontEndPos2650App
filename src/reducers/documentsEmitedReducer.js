import { types } from '../types/types';

var date = new Date();

const initialState = {
    openSearchCustomerModalDE: false,
    checkCustomer: true,
    checkDates: false,
    disableInputsCustomer: false,
    disableInputsDatesDesde: false,
    disableInputsDatesHasta: true,
    disableInputsMonto: false,
    disableInputsDocumento: false,
    customer: {
        identificacion: '', 
        cedula: '',
        nombre: ''
    },
    searchData: {
        codCliente : '',
        desde: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        hasta: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        monto: '',
        documento: ''
    },
    facturasDocumentsEmited: []
};

export const DocumentsEmitedReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.setFacturasDocumentsEmited:
            return {
                ...state,
                facturasDocumentsEmited : action.payload
            }

        case types.openSearchCustomerModalDocumentsEmited:
            return {
                ...state,
                openSearchCustomerModalDE : action.payload
            }

        case types.setCustomerDocumentsEmited:
            return {
                ...state,
                customer : action.payload
            }

        case types.setCustomerIDSearchDocumentsEmited:
            return {
                ...state,
                searchData : {
                    ...state.searchData,
                    codCliente : action.payload
                }
            }

        case types.setCedulaCustomerDocumentsEmited:
            return {
                ...state,
                customer : {
                    ...state.customer,
                    cedula : action.payload
                }
            }

        case types.setFechaDesdeSearchDocumentsEmited:
            return {
                ...state,
                searchData : {
                    ...state.searchData,
                    desde : action.payload
                }
            }

        case types.setFechaHastaSearchDocumentsEmited:
            return {
                ...state,
                searchData : {
                    ...state.searchData,
                    hasta : action.payload
                }
            }

        case types.setMontoSearchDocumentsEmited:
            return {
                ...state,
                searchData : {
                    ...state.searchData,
                    monto : action.payload
                }
            }

        case types.setDocumentoSearchDocumentsEmited:
            return {
                ...state,
                searchData : {
                    ...state.searchData,
                    documento : action.payload
                }
            }
            
        case types.setcheckCustomerDocumentsEmited:
            return {
                ...state,
                checkCustomer: action.payload
            }

        case types.setcheckDatesDocumentsEmited:
            return {
                ...state,
                checkDates: action.payload
            }

        case types.setdisableInputsCustomerDocumentsEmited:
            return {
                ...state,
                disableInputsCustomer: action.payload
            }

        case types.setdisableInputsDatesDesdeDocumentsEmited:
            return {
                ...state,
                disableInputsDatesDesde: action.payload
            }

        case types.setdisableInputsDatesHastaDocumentsEmited:
            return {
                ...state,
                disableInputsDatesHasta: action.payload
            }

        case types.setdisableInputsMontoDocumentsEmited:
            return {
                ...state,
                disableInputsMonto: action.payload
            }

        case types.setdisableInputsDocumentoDocumentsEmited:
            return {
                ...state,
                disableInputsDocumento: action.payload
            }

        default:
            return state;
    }

}