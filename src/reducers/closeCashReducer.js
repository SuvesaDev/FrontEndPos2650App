import { types } from "../types/types";

const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

const initialState = {
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonRemove: false,
    disableInputs: true,
    disableInputsFecha: true,
    disableInputsFechaSearchModal: true,
    disableInputsUser: false,
    userNameCloseCash: '',
    cedulaUserCloseCash: '',
    claveInterna: '',
    visiblePassword: false,
    isOpenModalSeletedApertura: false,
    isOpenModalSearchCloseCash: false,
    checkAperturaSeletedModal: true,
    checkNombreSeletedModal: false,
    checkFechasSeletedModal: false,
    fechaDesdeSeletedModal: isoDateTime[0],
    fechaHastaSeletedModal: isoDateTime[0],
    fechaCierre: '',
    aperturasSinCerrar: [],
    aperturasSinCerrarTable: [],
    valorSearchApertura: '',
    valorSearchCloseCash: '',
    isStartCloseCash: false,
    checkCierreSearchModal: true,
    checkNombreSearchModal: false,
    checkFechasSearchModal: false,
    fechaDesdeSearchModal: isoDateTime[0],
    fechaHastaSearchModal: isoDateTime[0],
    closecashSearch: [],
    idCierre: 0,
    cierreCaja: {
        codigoCajero: 0,
        nombre: '',
        fondoCaja: 0,
        ventaContado: 0,
        ventaCredito: 0,
        devoluciones: 0,
        totalSistema: 0,
        totalCajero: 0,
        diferenciaCaja: 0,
        montoAdepositar: 0,
        numApertura: 0,
        fechaApertura: '',
        detalleFormasPago: [],
        detalleOperaciones: [],
        opcionesDePagoCierreCajas: []
    },
    tiqueteCierre: [],
};


export const closeCashReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SetDisableInputsCloseCash:
            return {
                ...state,
                disableInputs: action.payload,
            }

        case types.SetClaveInternaCloseCash:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetUserNameCloseCash:
            return {
                ...state,
                userNameCloseCash: action.payload,
            }

        case types.SetCedulaUserCloseCash:
            return {
                ...state,
                cedulaUserCloseCash: action.payload,
            }

        case types.SetIsOpenModalSeletedAperturaCloseCash:
            return {
                ...state,
                isOpenModalSeletedApertura: action.payload,
            }

        case types.SetCheckAperturaSeletedAperturaModalCloseCash:
            return {
                ...state,
                checkAperturaSeletedModal: action.payload,
            }

        case types.SetCheckNombreSeletedAperturaModalCloseCash:
            return {
                ...state,
                checkNombreSeletedModal: action.payload,
            }

        case types.SetCheckFechasSeletedAperturaModalCloseCash:
            return {
                ...state,
                checkFechasSeletedModal: action.payload,
            }

        case types.SetFechaDesdeSeletedAperturaModalCloseCash:
            return {
                ...state,
                fechaDesdeSeletedModal: action.payload,
            }

        case types.SetFechaHastaSeletedAperturaModalCloseCash:
            return {
                ...state,
                fechaHastaSeletedModal: action.payload,
            }

        case types.SetDisableInputsFechasSeletedAperturaModalCloseCash:
            return {
                ...state,
                disableInputsFecha: action.payload,
            }

        case types.SetDisableInputsUserCloseCash:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetVisiblePasswordCloseCash:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetFechaCierreCloseCash:
            return {
                ...state,
                fechaCierre: action.payload
            }

        case types.SetActiveButtonSaveCloseCash:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.SetActiveButtonSearchCloseCash:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.SetActiveButtonRemoveCloseCash:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.SetAperturasSinCerrarCloseCash:
            return {
                ...state,
                aperturasSinCerrar: action.payload,
                aperturasSinCerrarTable: action.payload
            }

        case types.SetCleanAperturasSinCerrarCloseCash:
            return {
                ...state,
                aperturasSinCerrar: [],
                aperturasSinCerrarTable: []
            }

        case types.SetValorSearchAperturaCloseCash:
            return {
                ...state,
                valorSearchApertura: action.payload
            }

        case types.SetValorSearchCloseCash:
            return {
                ...state,
                valorSearchCloseCash: action.payload
            }

        case types.SetSearchAperturasCloseCash:
            return {
                ...state,
                aperturasSinCerrarTable: action.payload
            }

        case types.SetResetAperturasCloseCash:
            return {
                ...state,
                aperturasSinCerrarTable: state.aperturasSinCerrar
            }

        case types.SetInsertDataCierreCajaCloseCash:
            return {
                ...state,
                cierreCaja: action.payload
            }

        case types.SetCodigoCajeroCloseCash:
            return {
                ...state,
                cierreCaja: {
                    ...state.cierreCaja,
                    codigoCajero: action.payload
                }
            }

        case types.SetNombreCajeroCloseCash:
            return {
                ...state,
                cierreCaja: {
                    ...state.cierreCaja,
                    nombre: action.payload
                }
            }

        case types.SetNumAperturaCloseCash:
            return {
                ...state,
                cierreCaja: {
                    ...state.cierreCaja,
                    numApertura: action.payload
                }
            }

        case types.SetFechaAperturaCloseCash:
            return {
                ...state,
                cierreCaja: {
                    ...state.cierreCaja,
                    fechaApertura: action.payload
                }
            }

        case types.SetIsStartCloseCash:
            return {
                ...state,
                isStartCloseCash: action.payload
            }

        case types.SetIsOpenModalSearchCloseCash:
            return {
                ...state,
                isOpenModalSearchCloseCash: action.payload
            }

        case types.SetCheckCierreSearchModalCloseCash:
            return {
                ...state,
                checkCierreSearchModal: action.payload
            }

        case types.SetCheckNombreSearchModalCloseCash:
            return {
                ...state,
                checkNombreSearchModal: action.payload
            }

        case types.SetCheckFechasSearchModalCloseCash:
            return {
                ...state,
                checkFechasSearchModal: action.payload
            }

        case types.SetCheckFechasSearchModalCloseCash:
            return {
                ...state,
                fechaDesdeSearchModal: action.payload
            }

        case types.SetCheckFechasSearchModalCloseCash:
            return {
                ...state,
                fechaHastaSearchModal: action.payload
            }

        case types.SetFechaDesdeSearchModalCloseCash:
            return {
                ...state,
                fechaDesdeSearchModal: action.payload
            }

        case types.SetFechaHastaSearchModalCloseCash:
            return {
                ...state,
                fechaHastaSearchModal: action.payload
            }

        case types.SetDisableInputsFechasSearchModalCloseCash:
            return {
                ...state,
                disableInputsFechaSearchModal: action.payload
            }

        case types.SetCloseCashSearchCloseCash:
            return {
                ...state,
                closecashSearch: action.payload
            }

        case types.CleanCloseCashSearchCloseCash:
            return {
                ...state,
                closecashSearch: []
            }

        case types.SetIdCierreCloseCash:
            return {
                ...state,
                idCierre: action.payload
            }

        case types.CleanCloseCash:
            return {
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                disableInputs: true,
                disableInputsFecha: true,
                disableInputsFechaSearchModal: true,
                disableInputsUser: false,
                userNameCloseCash: '',
                cedulaUserCloseCash: '',
                claveInterna: '',
                visiblePassword: false,
                isOpenModalSeletedApertura: false,
                isOpenModalSearchCloseCash: false,
                checkAperturaSeletedModal: true,
                checkNombreSeletedModal: false,
                checkFechasSeletedModal: false,
                fechaDesdeSeletedModal: isoDateTime[0],
                fechaHastaSeletedModal: isoDateTime[0],
                aperturasSinCerrar: [],
                aperturasSinCerrarTable: [],
                valorSearchApertura: '',
                valorSearchCloseCash: '',
                fechaCierre: '',
                isStartCloseCash: false,
                checkCierreSearchModal: true,
                checkNombreSearchModal: false,
                checkFechasSearchModal: false,
                fechaDesdeSearchModal: isoDateTime[0],
                fechaHastaSearchModal: isoDateTime[0],
                closecashSearch: [],
                idCierre: 0,
                cierreCaja: {
                    codigoCajero: 0,
                    nombre: '',
                    fondoCaja: 0,
                    ventaContado: 0,
                    ventaCredito: 0,
                    devoluciones: 0,
                    totalSistema: 0,
                    totalCajero: 0,
                    diferenciaCaja: 0,
                    montoAdepositar: 0,
                    numApertura: 0,
                    fechaApertura: '',
                    detalleFormasPago: [],
                    detalleOperaciones: [],
                    opcionesDePagoCierreCajas: []
                }
            }

        case types.SetReporteCloseCash:
            return {
                ...state,
                tiqueteCierre: action.payload
            }


        default:
            return state;
    }
};