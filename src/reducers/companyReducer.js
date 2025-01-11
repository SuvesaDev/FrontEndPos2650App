import { types } from "../types/types";

var date = new Date();

const initialState = {
    currentTabCompany: 'DatosEmisor',
    nameFileUploadCompany: '',
    cantonesCompany: [],
    distritosCompany: [],
    disableInputCantones: true,
    disableInputDistritos: true,
    identificacionBuscada: '',
    disableBtnSearchActividadesEmpresa: false,
    disableInputIdentificacion: false,
    activeButtonNewCompany: true,
    activeButtonSaveCompany: false,
    activeButtonSearchCompany: false,
    activeButtonRemoveCompany: false,
    disableInputs: true,
    startOpeningCompany: false,
    visiblePasswordHacienda: false,
    isCuentaBancariaEdit: false,
    indexCuentaBancariaSeleted: 0,
    bancos: [],
    monedas: [],
    cuentaBancariasActual: {
        numero: '',
        idBanco: 0,
        nameBanco: '',
        idMoneda: 0,
        nameMoneda: ''
    },
    empresa: {
        id: 0,
        tipoIdentificacion: 0,
        identificacion: '',
        nombre: '',
        correo: '',
        telefono: '',
        sucursal: '',
        provincia: 0,
        canton: 0,
        distrito: 0,
        otrasSeñas: '',
        usuario: '',
        clave: '',
        certificado: '',
        numeroResolucion: '',
        fechaResolucion: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        venceCertificado: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
        contrasenaCertificado: '',
        actividades: [],
        cuentasBancarias: []
    }
};

export const companyReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetSelectedTabCompany:
            return {
                ...state,
                currentTabCompany: action.payload,
            }
            
        case types.SetNameFileUploadCompany:
            return {
                ...state,
                nameFileUploadCompany: action.payload,
            } 

        case types.SetTipoIdentificacionCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    tipoIdentificacion: action.payload
                }
            } 

        case types.SetIdentificacionCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    identificacion: action.payload
                }
            } 

        case types.SetNombreCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    nombre: action.payload
                }
            } 

        case types.SetCorreoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    correo: action.payload
                }
            } 

        case types.SetTelefonoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    telefono: action.payload
                }
            } 

        case types.SetSucursalCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    sucursal: action.payload
                }
            } 

        case types.SetProvinciaCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    provincia: action.payload
                }
            } 

        case types.SetCantonCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    canton: action.payload
                }
            } 

        case types.SetDistritoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    distrito: action.payload
                }
            } 

        case types.SetOtrasSeñasCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    otrasSeñas: action.payload
                }
            } 

        case types.SetUsuarioCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    usuario: action.payload
                }
            } 

        case types.SetClaveCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    clave: action.payload
                }
            } 

        case types.SetCertificadoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    certificado: action.payload
                }
            } 

        case types.SetNumeroResolucionCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    numeroResolucion: action.payload
                }
            } 

        case types.SetFechaResolucionCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    fechaResolucion: action.payload
                }
            } 

        case types.SetVenceCertificadoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    venceCertificado: action.payload
                }
            } 

        case types.SetContrasenaCertificadoCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    contrasenaCertificado: action.payload
                }
            } 

        case types.SetInsertCantonesCompany:
            return {
                ...state,
                cantonesCompany: action.payload
            }

        case types.SetInsertDistritoCompany:
            return {
                ...state,
                distritosCompany: action.payload
            }

        case types.SetDisableInputCantonesCompany:
            return {
                ...state,
                disableInputCantones: action.payload
            }

        case types.SetDisableInputDistritoCompany:
            return {
                ...state,
                disableInputDistritos: action.payload
            }

        case types.SetInsertActividadesEmpresaCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    actividades: action.payload
                }
            }

        case types.SetIdentificacionBuscadaCompany:
            return {
                ...state,
                identificacionBuscada: action.payload
            }

        case types.SetDisableBtnSearchAcitividadesEmpresaCompany:
            return {
                ...state,
                disableBtnSearchActividadesEmpresa: action.payload
            }

        case types.SetDisableInputIdentificacionCompany:
            return {
                ...state,
                disableInputIdentificacion: action.payload
            }

        case types.SetActiveButtonNewCompany:
            return {
                ...state,
                activeButtonNewCompany: action.payload
            }

        case types.SetActiveButtonSaveCompany:
            return {
                ...state,
                activeButtonSaveCompany: action.payload
            }

        case types.SetActiveButtonSearchCompany:
            return {
                ...state,
                activeButtonSearchCompany: action.payload
            }

        case types.SetActiveButtonRemoveCompany:
            return {
                ...state,
                activeButtonRemoveCompany: action.payload
            }

        case types.SetDisableInputsCompany:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetStartOpeningCompany:
            return {
                ...state,
                startOpeningCompany: action.payload
            }

        case types.SetVisablePasswordHaciendaCompany:
            return {
                ...state,
                visiblePasswordHacienda: action.payload
            }

        case types.SetBancosCompany:
            return {
                ...state,
                bancos: action.payload
            }

        case types.SetMonedasCompany:
            return {
                ...state,
                monedas: action.payload
            }

        case types.SetNumeroCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    ...state.cuentaBancariasActual,
                    numero: action.payload
                },
            }

        case types.SetIdBancoCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    ...state.cuentaBancariasActual,
                    idBanco: action.payload
                },
            }

        case types.SetIdMonedaCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    ...state.cuentaBancariasActual,
                    idMoneda: action.payload
                },
            }

        case types.SetNameBancoCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    ...state.cuentaBancariasActual,
                    nameBanco: action.payload
                },
            }

        case types.SetNameMonedaCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    ...state.cuentaBancariasActual,
                    nameMoneda: action.payload
                },
            }

        case types.SetAddCuentaBancariaCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    cuentasBancarias: [
                        ...state.empresa.cuentasBancarias,
                        action.payload
                    ]
                }
            }

        case types.CleanCuentaBancariaActualCompany:
            return {
                ...state,
                cuentaBancariasActual: {
                    numero: '',
                    idBanco: 0,
                    nameBanco: '',
                    idMoneda: 0,
                    nameMoneda: ''
                }
            }

        case types.SetIsCuentaBancariaEditCompany:
            return {
                ...state,
                isCuentaBancariaEdit: action.payload
            }

        case types.SetIndexCuentaBancariaSeletedCompany:
            return {
                ...state,
                indexCuentaBancariaSeleted: action.payload
            }

        case types.SetEditCuentaBancariaCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    cuentasBancarias: state.empresa.cuentasBancarias.map(
                        (cuenta, i) => i === action.payload.index
                            ? action.payload.cuenta
                            : cuenta
                    )
                }
            }

        case types.SetRemoveCuentaBancariaCompany:
            return {
                ...state,
                empresa: {
                    ...state.empresa,
                    cuentasBancarias: state.empresa.cuentasBancarias.filter( cuenta => cuenta != action.payload )
                }
            }

        case types.SetCleanCompany:
            return {
                currentTabCompany: 'DatosEmisor',
                nameFileUploadCompany: '',
                cantonesCompany: [],
                distritosCompany: [],
                disableInputCantones: true,
                disableInputDistritos: true,
                identificacionBuscada: '',
                disableBtnSearchActividadesEmpresa: false,
                disableInputIdentificacion: false,
                activeButtonNewCompany: true,
                activeButtonSaveCompany: false,
                activeButtonSearchCompany: false,
                activeButtonRemoveCompany: false,
                disableInputs: true,
                startOpeningCompany: false,
                visiblePasswordHacienda: false,
                isCuentaBancariaEdit: false,
                indexCuentaBancariaSeleted: 0,
                bancos: [],
                monedas: [],
                cuentaBancariasActual: {
                    numero: '',
                    idBanco: 0,
                    nameBanco: '',
                    idMoneda: 0,
                    nameMoneda: ''
                },
                empresa: {
                    id: 0,
                    tipoIdentificacion: 0,
                    identificacion: '',
                    nombre: '',
                    correo: '',
                    telefono: '',
                    sucursal: '',
                    provincia: 0,
                    canton: 0,
                    distrito: 0,
                    otrasSeñas: '',
                    usuario: '',
                    clave: '',
                    certificado: '',
                    numeroResolucion: '',
                    fechaResolucion: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
                    venceCertificado: new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0],
                    contrasenaCertificado: '',
                    actividades: [],
                    cuentasBancarias: []
                }
            }

        default:
            return state;
    }
};