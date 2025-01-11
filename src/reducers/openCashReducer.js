import { types } from "../types/types";

const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

const initialState = {
    activeButtonNew: true,
    activeButtonSave: false,
    activeButtonSearch: false,
    activeButtonRemove: false,
    PosicionActual: -1.00,
    openSearchModal: false,
    openSearchModalOK: false,
    startOpening: false,
    isOpenSearchModalOpenCash: false,
    disableInputs: true,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    detalleTope: {
        id_total_tope: 0.00,
        NApertura: 0.00,
        CodMoneda: 0.00,
        Monto_Tope: 0.00,
        MonedaNombre: ''
    },
    detalleDenominaciones: {
        Id: 0.00,
        Id_Apertura: 0.00,
        Id_Denominacion: 0.00,
        Moneda: "",
        Tipo: "",
        Monto: 0.00,
        Cantidad: 0.00,
        Total: 0.00
    },
    caja: {
        encabezado: {
            NApertura: 0.00,
            Fecha: '',
            Nombre: '',
            Estado: 'A',
            Observaciones: '',
            Anulado: false,
            Cedula: '',
            Num_Caja: 0.00,
            IdSucursal: 0.00
        },
        tope: [],
        denominaciones: []
    },
    totalColones: 0,
    totalDolares: 0,
    searUsuarios: [],
    searCajas: [],
    allCajas: [],
    searchOpenCash: [],
    isActiveFechaDesde: false,
    isActiveFechaHasta: false,
    isOpenCashEdit: false,
    optionsSearchOpenCash: {
        valorFiltro: '',
        nombre: true,
        numero: false,
        fechas: false,
        fechaDesde: isoDateTime[0],
        fechaHasta: isoDateTime[0]
    },
};


export const openCashReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.CleanOpenCash:
            return {
                activeButtonNew: true,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                PosicionActual: -1.00,
                openSearchModal: false,
                openSearchModalOK: false,
                startOpening: false,
                isOpenSearchModalOpenCash: false,
                disableInputs: true,
                claveInterna: '',
                visiblePassword: false,
                disableInputsUser: false,
                detalleTope: {
                    id_total_tope: 0.00,
                    NApertura: 0.00,
                    CodMoneda: 0.00,
                    Monto_Tope: 0.00,
                    MonedaNombre: ''
                },
                detalleDenominaciones: {
                    Id: 0.00,
                    Id_Apertura: 0.00,
                    Id_Denominacion: 0.00,
                    Moneda: "",
                    Tipo: "",
                    Monto: 0.00,
                    Cantidad: 0.00,
                    Total: 0.00
                },
                caja: {
                    encabezado: {
                        NApertura: 0.00,
                        Fecha: '',
                        Nombre: '',
                        Estado: 'A',
                        Observaciones: '',
                        Anulado: false,
                        Cedula: '',
                        Num_Caja: 0.00,
                        IdSucursal: 0.00
                    },
                    tope: [],
                    denominaciones: []
                },
                totalColones: 0,
                totalDolares: 0,
                searUsuarios: [],
                searCajas: [],
                allCajas: [],
                searchOpenCash: [],
                isActiveFechaDesde: false,
                isActiveFechaHasta: false,
                isOpenCashEdit: false,
                optionsSearchOpenCash: {
                    valorFiltro: '',
                    nombre: true,
                    numero: false,
                    fechas: false,
                    fechaDesde: isoDateTime[0],
                    fechaHasta: isoDateTime[0]
                },                
            }

        case types.activeButtonNewOpenCash:
            return {
                ...state,
                activeButtonNew: action.payload,
            }

        case types.activeButtonSaveOpenCash:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.activeButtonSearchOpenCash:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.activeButtonRemoveOpenCash:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.openSearchUsuarioModalOpenCash:
            return {
                ...state,
                openSearchModal: action.payload,
            }

        case types.openSearchUsuarioModalOKOpenCash:
            return {
                ...state,
                openSearchModalOK: action.payload,
            }

        case types.SetSearchUsuariosOpenCash:
            return {
                ...state,
                searUsuarios: action.payload,
            }

        case types.SetSearchCajasOpenCash:
            return {
                ...state,
                searCajas: action.payload,
            }

        case types.SetEditDenominacionOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    denominaciones: state.caja.denominaciones.map(
                        (linea, i) => i === action.payload.index
                            ? action.payload.linea
                            : linea)
                }
            }

        case types.SetNAperturaOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        NApertura: action.payload
                    }
                }
            }

        case types.SetFechaOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Fecha: action.payload
                    }
                }
            }

        case types.SetNombreOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Nombre: action.payload
                    }
                }
            }

        case types.SetEstadoOpeAnCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Estado: aAction.payload
                    }
                }
            }

        case types.SetObservacionesOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Observaciones: action.payload
                    }
                }
            }

        case types.SetAnuladoOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Anulado: action.payload
                    }
                }
            }

        case types.SetCedulaOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Cedula: action.payload
                    }
                }
            }

        case types.SetNum_CajaOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        Num_Caja: action.payload
                    }
                }
            }

        case types.SetIdSucursalOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        ...state.caja.encabezado,
                        IdSucursal: action.payload
                    }
                }
            }

        case types.Setid_total_topeDetalleTopeActualCash:
            return {
                ...state,
                detalleTope: {
                    ...state.detalleTope,
                    id_total_tope: action.payload,
                },
            }

        case types.SetidNAperturaDetalleTopeActualCash:
            return {
                ...state,
                detalleTope: {
                    ...state.detalleTope,
                    NApertura: action.payload,
                },
            }

        case types.SetCodMonedaDetalleTopeActualCash:
            return {
                ...state,
                detalleTope: {
                    ...state.detalleTope,
                    CodMoneda: action.payload,
                },
            }

        case types.SetMonto_TopeDetalleTopeActualCash:
            return {
                ...state,
                detalleTope: {
                    ...state.detalleTope,
                    Monto_Tope: action.payload,
                },
            }

        case types.SetMonedaNombreDetalleTopeActualCash:
            return {
                ...state,
                detalleTope: {
                    ...state.detalleTope,
                    MonedaNombre: action.payload,
                },
            }

        case types.SetAddDetalleTopeCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    tope: action.payload
                }
            }

        case types.SetIdDetalleDenominacionActualCash:
            return {
                ...state,
                detalleDenominaciones: {
                    ...state.detalleDenominaciones,
                    Id: action.payload,
                },
            }

        case types.SetId_AperturaDetalleDenominacionActualCash:
            return {
                ...state,
                detalleDenominaciones: {
                    ...state.detalleDenominaciones,
                    Id_Apertura: action.payload,
                },
            }

        case types.SetId_DenominacionDetalleDenominacionActualCash:
            return {
                ...state,
                detalleDenominaciones: {
                    ...state.detalleDenominaciones,
                    Id_Denominacion: action.payload,
                },
            }

        case types.SetMontoDetalleDenominacionActualCash:
            return {
                ...state,
                detalleDenominaciones: {
                    ...state.detalleDenominaciones,
                    Monto: action.payload,
                },
            }

        case types.SetCantidadDetalleDenominacionActualCash:
            return {
                ...state,
                detalleDenominaciones: {
                    ...state.detalleDenominaciones,
                    Cantidad: action.payload,
                },
            }

        case types.SetAddDetalleDenominacionesCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    denominaciones: action.payload
                }
            }

        case types.SetUpdateMontoTopeOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    tope: state.caja.tope.map(
                        ( tope ) => tope.id_total_tope === action.payload.id_total_tope
                            ? {
                                ...tope,
                                Monto_Tope: action.payload.monto,
                            }
                            : tope
                    )
                }
            }

        case types.SetUpdateCantidadDenominacionOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    denominaciones: state.caja.denominaciones.map(
                        ( denominacion ) => denominacion.Id === action.payload.Id
                            ? {
                                ...denominacion,
                                Cantidad: action.payload.cantidad,
                            }
                            : denominacion
                    )
                } 
            }

        case types.SetUpdateTotalDenominacionOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    denominaciones: state.caja.denominaciones.map(
                        ( denominacion ) => denominacion.Id === action.payload.Id
                            ? {
                                ...denominacion,
                                Total: action.payload.total,
                            }
                            : denominacion
                    )
                }
            }

        case types.SetTotalColonesOpenCash:
            return {
                ...state,
                totalColones: action.payload
            }

        case types.SetTotalDolaresOpenCash:
            return {
                ...state,
                totalDolares: action.payload
            }

        case types.SetStartOpeningOpenCash:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetOpenModalSearchOpenCash:
            return {
                ...state,
                isOpenSearchModalOpenCash: action.payload
            }

        case types.SetValorFiltroSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    valorFiltro: action.payload
                }
            }

        case types.SetNombreSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    nombre: action.payload
                }
            }

        case types.SetNumeroSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    numero: action.payload
                }
            }

        case types.SetFechasSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    fechas: action.payload
                }
            }

        case types.SetFechaDesdeSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    fechaDesde: action.payload
                }
            }

        case types.SetFechaHastaSearchOpenCash:
            return {
                ...state,
                optionsSearchOpenCash: {
                    ...state.optionsSearchOpenCash,
                    fechaHasta: action.payload
                }
            }

        case types.SetInsertResultSearchOpenCash:
            return {
                ...state,
                searchOpenCash: action.payload
            }

        case types.SetActiveFechaDesdeSearchOpenCash:
            return {
                ...state,
                isActiveFechaDesde: action.payload
            }

        case types.SetActiveFechaHastaSearchOpenCash:
            return {
                ...state,
                isActiveFechaHasta: action.payload
            }

        case types.CleanSearchOpenCash:
            return {
                ...state,
                searchOpenCash: [],
                isActiveFechaDesde: false,
                isActiveFechaHasta: false,
                optionsSearchOpenCash: {
                    valorFiltro: '',
                    nombre: true,
                    numero: false,
                    fechas: false,
                    fechaDesde: isoDateTime[0],
                    fechaHasta: isoDateTime[0]
                }
            }

        case types.SetSelectSearchOpenCash:
            return {
                ...state,
                caja: action.payload
            }

        case types.SetAllCajasOpenCash:
            return {
                ...state,
                allCajas: action.payload
            }

        case types.SetIsOpenCashEdit:
            return {
                ...state,
                isOpenCashEdit: action.payload
            }

        case types.SetDisableInputsOpenCash:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetClaveInternaOpenCash:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetVisiblePasswordOpenCash:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDisableInputsUserOpenCash:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.CleanStateEncabezadoOpenCash:
            return {
                ...state,
                caja: {
                    ...state.caja,
                    encabezado: {
                        NApertura: 0.00,
                        Fecha: '',
                        Nombre: '',
                        Estado: 'A',
                        Observaciones: '',
                        Anulado: false,
                        Cedula: '',
                        Num_Caja: 0.00,
                        IdSucursal: 0.00
                    },
                }
            }

        default:
            return state;
    }
};