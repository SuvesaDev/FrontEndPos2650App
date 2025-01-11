import { types } from '../types/types';

const initialState = {
    proveedoresInventory: null,
    proveedoresSearchOriginal: [],
    proveedoresSearch: [],
    activeButtonNew : true,
    activeButtonSearch : true,
    activeButtonSave : false,
    activeButtonRemove : false,
    disableInputs: true,
    isProveedorEdit: false,
    isProveedorDisable: false,
    openSearchInventory: false,
    hasData: false,
    isEditcuentasBancariasActuales : false,
    indexSelectedcuentasBancariasActuales: null,
    isOpenModalSearchProveedor : false,
    valueFilterSearchProveedor : '',
    cuentasBancariasProveedoresActuales: {
        codigoProv: 0,
        tipo: '',
        banco: '',
        cuenta: '',
        moneda: 'COLON',
        cod_moneda: 1,
        idCuenta: 0,
        estado: 0
    },
    proveedor: {
        identificacion: '',
        cedula: '',
        nombre: '',
        contacto: '',
        telefonoCont: '',
        observaciones: '',
        telefono1: '',
        fax1: '',
        email: '',
        direccion: '',
        cuentaContable: '',
        descripcionCuentaContable: '',
        actualizado: false,
        inhabilitado: false,
        estado: true,
        cuentasBancariasProveedors: []
    }
};

export const ProveedoresReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.GetAllProveedoresInventory:
            return {
                ...state,
                proveedoresInventory : action.payload
            }

        case types.SetIdentificacionProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    identificacion : action.payload
                }
            }

        case types.SetCedulaProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cedula : action.payload
                }
            }

        case types.SetNombreProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    nombre : action.payload
                }
            }

        case types.SetContactoProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    contacto : action.payload
                }
            }

        case types.SetTelefonoContProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    telefonoCont : action.payload
                }
            }

        case types.SetObservacionesProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    observaciones : action.payload
                }
            }

        case types.SetTelefono1Proveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    telefono1 : action.payload
                }
            }

        case types.SetFax1Proveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    fax1 : action.payload
                }
            }

        case types.SetEmailProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    email : action.payload
                }
            }

        case types.SetDireccionProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    direccion : action.payload
                }
            }

        case types.SetCuentaContableProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cuentaContable : action.payload
                }
            }

        case types.SetDescripcionCuentaContableProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    descripcionCuentaContable : action.payload
                }
            }

        case types.SetActualizadoProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    actualizado : action.payload
                }
            }

        case types.SetInhabilitadoProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    inhabilitado : action.payload
                }
            }

        case types.SetActiveButtonNewProveedores:
            return {
                ...state,
                activeButtonNew : action.payload
            }

        case types.SetActiveButtonSearchProveedores:
            return {
                ...state,
                activeButtonSearch : action.payload
            }

        case types.SetActiveButtonSaveProveedores:
            return {
                ...state,
                activeButtonSave : action.payload
            }

        case types.SetActiveButtonRemoveProveedores:
            return {
                ...state,
                activeButtonRemove : action.payload
            }

        case types.SetDisableInputsProveedores:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetIsProveedorEditProveedores:
            return {
                ...state,
                isProveedorEdit : action.payload
            }

        case types.SetIsProveedorDisableProveedores:
            return {
                ...state,
                isProveedorDisable : action.payload
            }

        case types.CleanStateProveedores:
            return {
                ...state,
                isOpenModalSearchProveedor : false,
                cuentasBancariasProveedoresActuales: {
                    codigoProv: 0,
                    tipo: '',
                    banco: '',
                    cuenta: '',
                    moneda: 'COLON',
                    cod_moneda: 1,
                    idCuenta: 0,
                    estado: 0
                },
                proveedor: {
                    identificacion: '',
                    cedula: '',
                    nombre: '',
                    contacto: '',
                    telefonoCont: '',
                    observaciones: '',
                    telefono1: '',
                    fax1: '',
                    email: '',
                    direccion: '',
                    cuentaContable: '',
                    descripcionCuentaContable: '',
                    actualizado: false,
                    inhabilitado: false,
                    estado: true,
                    cuentasBancariasProveedors: []
                },   
            }

        case types.SetDefautlButtonsProveedores:
            return {
                ...state,
                activeButtonNew : true,
                activeButtonSearch : true,
                activeButtonSave : false,
                activeButtonRemove : false,
            }

        case types.OpenSearchModalProveedores:
            return {
                ...state,
                openSearchInventory : action.payload
            }

        case types.SelectedSearchProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    identificacion: action.payload.codigoProv,
                    cedula: action.payload.cedula,
                    nombre: action.payload.nombre,
                    contacto: action.payload.contacto,
                    telefonoCont: action.payload.telefonoCont,
                    observaciones: action.payload.observaciones,
                    telefono1: action.payload.telefono1,
                    fax1: action.payload.fax1,
                    email: action.payload.email,
                    direccion: action.payload.direccion,
                    cuentaContable: action.payload.cuentaContable,
                    descripcionCuentaContable: action.payload.descripcionCuentaContable,
                    actualizado: action.payload.actualizado,
                    inhabilitado: action.payload.inhabilitado,
                    estado: action.payload.estado
                }
            }

        case types.SelectedSearchCuentasBancariasProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cuentasBancariasProveedors: action.payload.map( cuenta => {
                        return {
                            tipo : cuenta.tipoCuenta,
                            banco : cuenta.banco,
                            cuenta : cuenta.numCuenta,
                            moneda : cuenta.monedaNombre,
                            cod_moneda : cuenta.codMoneda,
                            idCuenta: cuenta.idCuenta,
                            estado: cuenta.estado,
                        }
                    })
                }
            }

        case types.SetGetAllSearchProveedores:
            return {
                ...state,
                proveedoresSearch : action.payload
            }

        case types.SetHasDataProveedores:
            return {
                ...state,
                hasData : action.payload
            }

        case types.SetTipocuentasBancariasActualesProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    ...state.cuentasBancariasProveedoresActuales,
                    tipo: action.payload
                },
            }

        case types.SetBancocuentasBancariasActualesProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    ...state.cuentasBancariasProveedoresActuales,
                    banco: action.payload
                },
            }

        case types.SetCuentacuentasBancariasActualesProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    ...state.cuentasBancariasProveedoresActuales,
                    cuenta: action.payload
                },
            }

        case types.SetMonedacuentasBancariasActualesProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    ...state.cuentasBancariasProveedoresActuales,
                    moneda: action.payload
                },
            }

        case types.SetCod_monedacuentasBancariasActualesProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    ...state.cuentasBancariasProveedoresActuales,
                    cod_moneda: action.payload
                },
            }

        case types.SetAddCuentasBancariasProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cuentasBancariasProveedors : [
                        ...state.proveedor.cuentasBancariasProveedors,
                        action.payload
                    ]
                }
            }

        case types.CleanCuentasBancariasActualProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: {
                    codigoProv: 0,
                    tipo: '',
                    banco: '',
                    cuenta: '',
                    moneda: 'COLON',
                    cod_moneda: 1,
                    idCuenta: 0,
                    estado: 0
                }
            }

        case types.SetSelectedCuentasBancariasActualProveedores:
            return {
                ...state,
                cuentasBancariasProveedoresActuales: action.payload
            }

        case types.SetIsEditCuentasBancariasActualProveedores:
            return {
                ...state,
                isEditcuentasBancariasActuales: action.payload
            }

        case types.SetEditCuentasBancariasActualProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cuentasBancariasProveedors : state.proveedor.cuentasBancariasProveedors.map(
                        (cuenta, i) => i === action.payload.index
                            ? {
                                ...cuenta,
                                tipo : action.payload.tipo,
                                banco : action.payload.banco,
                                cuenta : action.payload.cuenta,
                                moneda : action.payload.moneda,
                                cod_moneda : action.payload.cod_moneda,
                                idCuenta: action.payload.idCuenta,
                                estado: action.payload.estado,
                            }
                            : cuenta)
                }
            }

        case types.SetIndexCuentasBancariasActualProveedores:
            return {
                ...state,
                indexSelectedcuentasBancariasActuales: action.payload
            }

        case types.SetDeleteCuentasBancariasActualProveedores:
            return {
                ...state,
                proveedor : {
                    ...state.proveedor,
                    cuentasBancariasProveedors : state.proveedor.cuentasBancariasProveedors.filter(cuenta => cuenta != action.payload)
                }
            }

        case types.SetIsOpenModalSearchProveedores:
            return {
                ...state,
                isOpenModalSearchProveedor : action.payload,
            }

        case types.SetValorFilterSearchProveedores:
            return {
                ...state,
                valueFilterSearchProveedor : action.payload,
            }

        case types.SetSearchProveedoresOriginalProveedores:
            return {
                ...state,
                proveedoresSearchOriginal : action.payload,
            }

        case types.SetDefaultStateSearchProveedores:
            return {
                ...state,
                proveedoresSearch : state.proveedoresSearchOriginal
            }

        default:
            return state;
    }

}