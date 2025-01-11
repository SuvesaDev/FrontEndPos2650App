import { types } from '../types/types';
const initialState = {
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    idUsuario: '',
    numApertura: 0,
    numCaja: 0,
    proveedores: [],
    proveedoresDefault: [],
    cedulaProveedor: '',
    nombreProveedor: '',
    direccionProveedor: '',
    codigoProveedor: '',
    telefonoProveedor: '',
    plazodiasProveedor: '',
    fechaDesde: '',
    fechaHasta: '',
    datosReporte: [],
    fechaReporte: '',
    datosSucursal: [],
};

export const countswihoutpayReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetDisableInputsWihoutPay:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetClaveInternaWihoutPay:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetVisiblePasswordWihoutPay:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserWihoutPay:
            return {
                ...state,
                disableInputsUser: action.payload
            }


        case types.SetNameUserWihoutPay:
            return {
                ...state,
                nameUser: action.payload
            }


        case types.SetIdUsuarioWihoutPay:
            return {
                ...state,
                idUsuario: action.payload
            }

        case types.SetNumAperturaWihoutPay:
            return {
                ...state,
                numApertura: action.payload
            }

        case types.SetNumCajaWihoutPay:
            return {
                ...state,
                numCaja: action.payload
            }

        case types.SetProveedoresWihoutPay:
            return {
                ...state,
                proveedores: action.payload
            }

        case types.SetCedulaProveedorWihoutPay:
            return {
                ...state,
                cedulaProveedor: action.payload
            }

        case types.SetNombreProveedorWihoutPay:
            return {
                ...state,
                nombreProveedor: action.payload
            }


        case types.SetFechaDesdeWihoutPay:
            return {
                ...state,
                fechaDesde: action.payload
            }

        case types.SetFechaHastaWihoutPay:
            return {
                ...state,
                fechaHasta: action.payload
            }

        case types.SetDatosReporteWihoutPay:
            return {
                ...state,
                datosReporte: action.payload
            }

        case types.SetProveedoresDefaultWihoutPay:
            return {
                ...state,
                proveedoresDefault: action.payload
            }


        case types.SetCodigoProveedorWihoutPay:
            return {
                ...state,
                codigoProveedor: action.payload
            }

        case types.SetTelefonoProveedorWihoutPay:
            return {
                ...state,
                telefonoProveedor: action.payload
            }

        case types.SetDireccionProveedorWihoutPay:
            return {
                ...state,
                direccionProveedor: action.payload
            }

        case types.SetPlazoDiasProveedorWihoutPay:
            return {
                ...state,
                plazodiasProveedor: action.payload
            }

        case types.SetFechaReporteWihoutPay:
            return {
                ...state,
                fechaReporte: action.payload
            }


        case types.SetDatosSucursalWihoutPay:
            return {
                ...state,
                datosSucursal: action.payload
            }

        case types.SetCleanWihoutPay:
            return {
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                nameUser: '',
                idUsuario: '',
                numApertura: 0,
                numCaja: 0,
                proveedores: [],
                proveedoresDefault: [],
                cedulaProveedor: '',
                nombreProveedor: '',
                direccionProveedor: '',
                codigoProveedor: '',
                telefonoProveedor: '',
                plazodiasProveedor: '',
                fechaDesde: '',
                fechaHasta: '',
                datosReporte: [],
                fechaReporte: '',
                datosSucursal: [],
            }
        default:
            return state;
    }

}