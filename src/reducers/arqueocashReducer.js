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
    disableInputs: true,
    disableInputsUser: false,
    claveInterna: '',
    visiblePassword: false,
    detalleEfectivo: {
        Id: 0.00,
        Id_Apertura: 0.00,
        Id_Denominacion: 0.00,
        Moneda: "",
        Tipo: "",
        Monto: 0.00,
        Cantidad: 0.00,
        Total: 0.00
    },
    detalleTarjeta: {
        Id: 0.00,
        IdArqueo: 0.00,
        IdTarjeta: 0.00,
        Tarjeta: "",
        Moneda: "",
        Monto: 0.00,
    },
    arqueo: {
        encabezado: {
            Id: 0,
            EfectivoColones: 0.00,
            EfectivoDolares: 0.00,
            TarjetaColones: 0.00,
            TarjetaDolares: 0.00,
            Cheques: 0.00,
            ChequesDol: 0.00,
            DepositoCol: 0.00,
            DepositoDol: 0.00,
            Total: 0.00,
            IdApertura: 0.00,
            Fecha: "",
            Cajero: '',
            Anulado: false,
            TipoCambioD: 0.00,
            Observaciones: "",
            TarjetaSistema: 0.00,
            OtrasTarjetas: 0.00,
        },
        efectivo: [],
        tarjeta: []
    },
    searUsuarios: [],
    startOpening: false,
    isOpenSearchArqueoCashModal: false,
    isEditArqueoCash: false,
    searchArqueoCash: [],
    detalleOperaciones: [],
    isActiveFechaDesde: false,
    isActiveFechaHasta: false,
    isOpenModalPDFDetalleOperaciones: false,
    isOpenModalAddPreDeposito: false,
    cajeros: [],
    optionsSearchArqueoCash: {
        valorFiltro: '',
        nombre: true,
        numero: false,
        fechas: false,
        fechaDesde: isoDateTime[0],
        fechaHasta: isoDateTime[0]
    },
    isOpenModalSeletedApertura: false,
    valorSearchApertura: '',
    checkAperturaSeletedModal: true,
    checkNombreSeletedModal: false,
    checkFechasSeletedModal: false,
    disableInputsFechaSeletedModal: true,
    fechaDesdeSeletedModal: isoDateTime[0],
    fechaHastaSeletedModal: isoDateTime[0],
    aperturasSinArqueo: [],
    aperturasSinArqueoTable: [],
    isAdminUser: false,
    preDeposito: {
        id: 0,
        fecha: '',
        cajero: '',
        nombreCajero: '',
        cedula: '',
        depositante: '',
        numApertura: 0,
        monto: 0,
        observaciones: ''
    }
};

export const arqueoCash = (state = initialState, action) => {

    switch (action.type) {

        case types.CleanArqueoCash:
            return {
                activeButtonNew: true,
                activeButtonSave: false,
                activeButtonSearch: false,
                activeButtonRemove: false,
                PosicionActual: -1.00,
                openSearchModal: false,
                disableInputs: true,
                disableInputsUser: false,
                claveInterna: '',
                visiblePassword: false,
                detalleEfectivo: {
                    Id: 0.00,
                    Id_Apertura: 0.00,
                    Id_Denominacion: 0.00,
                    Moneda: "",
                    Tipo: "",
                    Monto: 0.00,
                    Cantidad: 0.00,
                    Total: 0.00
                },
                detalleTarjeta: {
                    Id: 0.00,
                    IdArqueo: 0.00,
                    IdTarjeta: 0.00,
                    Tarjeta: "",
                    Moneda: "",
                    Monto: 0.00,
                },
                arqueo: {
                    encabezado: {
                        Id: 0,
                        EfectivoColones: 0.00,
                        EfectivoDolares: 0.00,
                        TarjetaColones: 0.00,
                        TarjetaDolares: 0.00,
                        Cheques: 0.00,
                        ChequesDol: 0.00,
                        DepositoCol: 0.00,
                        DepositoDol: 0.00,
                        Total: 0.00,
                        IdApertura: 0.00,
                        Fecha: "",
                        Cajero: '',
                        Anulado: false,
                        TipoCambioD: 0.00,
                        Observaciones: "",
                        TarjetaSistema: 0.00,
                        OtrasTarjetas: 0.00,
                    },
                    efectivo: [],
                    tarjeta: []
                },
                searUsuarios: [],
                startOpening: false,
                isOpenSearchArqueoCashModal: false,
                isEditArqueoCash: false,
                searchArqueoCash: [],
                detalleOperaciones: [],
                isActiveFechaDesde: false,
                isActiveFechaHasta: false,
                isOpenModalPDFDetalleOperaciones: false,
                isOpenModalAddPreDeposito: false,
                cajeros: [],
                optionsSearchArqueoCash: {
                    valorFiltro: '',
                    nombre: true,
                    numero: false,
                    fechas: false,
                    fechaDesde: isoDateTime[0],
                    fechaHasta: isoDateTime[0]
                },
                isOpenModalSeletedApertura: false,
                valorSearchApertura: '',
                checkAperturaSeletedModal: true,
                checkNombreSeletedModal: false,
                checkFechasSeletedModal: false,
                disableInputsFechaSeletedModal: true,
                fechaDesdeSeletedModal: isoDateTime[0],
                fechaHastaSeletedModal: isoDateTime[0],
                aperturasSinArqueo: [],
                aperturasSinArqueoTable: [],
                isAdminUser: false,
                preDeposito: {
                    id: 0,
                    fecha: '',
                    cajero: '',
                    nombreCajero: '',
                    cedula: '',
                    depositante: '',
                    numApertura: 0,
                    monto: 0,
                    observaciones: ''
                }
            }

        case types.CleanDenominacionesArqueoCash:
            return {
                ...state,
                arqueo: {                    
                    ...state.arqueo,
                    efectivo: [],                    
                },
            }

        case types.CleanTarjetaArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    tarjeta: [],
                },
            }

        case types.activeButtonNewArqueoCash:
            return {
                ...state,
                activeButtonNew: action.payload,
            }

        case types.activeButtonSaveArqueoCash:
            return {
                ...state,
                activeButtonSave: action.payload,
            }

        case types.activeButtonSearchArqueoCash:
            return {
                ...state,
                activeButtonSearch: action.payload,
            }

        case types.activeButtonRemoveArqueoCash:
            return {
                ...state,
                activeButtonRemove: action.payload,
            }

        case types.openSearchUsuarioModalArqueoCash:
            return {
                ...state,
                openSearchModal: action.payload,
            }

        case types.SetSearchUsuariosArqueoCash:
            return {
                ...state,
                searUsuarios: action.payload,
            }
  
        case types.SetIdArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Id: action.payload
                    }
                }
            }

        case types.SetEfectivoColonesArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        EfectivoColones: action.payload
                    }
                }
            }

        case types.SetEfectivoDolaresArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        EfectivoDolares: action.payload
                    }
                }
            }

        case types.SetTarjetaColonesArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        TarjetaColones: action.payload
                    }
                }
            }

        case types.SetTarjetaDolaresArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        TarjetaDolares: action.payload
                    }
                }
            }

        case types.SetChequesArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Cheques: action.payload
                    }
                }
            }

        case types.SetChequesDolArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        ChequesDol: action.payload
                    }
                }
            }

        case types.SetDepositoColArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        DepositoCol: action.payload
                    }
                }
            }

        case types.SetDepositoDolArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        DepositoDol: action.payload
                    }
                }
            }

        case types.SetTotalArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Total: action.payload
                    }
                }
            }

        case types.SetIdAperturaArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        IdApertura: action.payload
                    }
                }
            }

        case types.SetFechaArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Fecha: action.payload
                    }
                }
            }

        case types.SetCajeroArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Cajero: action.payload
                    }
                }
            }

        case types.SetAnuladoArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Anulado: action.payload
                    }
                }
            }

        case types.SetTipoCambioDArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        TipoCambioD: action.payload
                    }
                }
            }

        case types.SetObservacionesArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        Observaciones: action.payload
                    }
                }
            }

        case types.SetTarjetaSistemaArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        TarjetaSistema: action.payload
                    }
                }
            }

        case types.SetOtrasTarjetasArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    encabezado: {
                        ...state.arqueo.encabezado,
                        OtrasTarjetas: action.payload
                    }
                }
            }

        case types.SetIdDetalleEfectivoActualArqueo:
            return {
                ...state,
                detalleEfectivo: {
                    ...state.detalleEfectivo,
                    Id: action.payload,
                },
            }

        case types.SetIdArqueoDetalleEfectivoActualArqueo:
            return {
                ...state,
                detalleEfectivo: {
                    ...state.detalleEfectivo,
                    IdArqueo: action.payload,
                },
            }

        case types.SetIdDenominacionDetalleEfectivoActualArqueo:
            return {
                ...state,
                detalleEfectivo: {
                    ...state.detalleEfectivo,
                    IdDenominacion: action.payload,
                },
            }

        case types.SetMontoDetalleEfectivoActualArqueo:
            return {
                ...state,
                detalleEfectivo: {
                    ...state.detalleEfectivo,
                    Monto: action.payload,
                },
            }

        case types.SetCantidadDetalleEfectivoActualArqueo:
            return {
                ...state,
                detalleEfectivo: {
                    ...state.detalleEfectivo,
                    Cantidad: action.payload,
                },
            }

        case types.SetAddDetalleDenominacionesArqueo:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    efectivo: [
                        ...state.arqueo.efectivo,
                        action.payload
                    ]
                }
            }

        case types.SetCantidadDenominacionArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    efectivo: state.arqueo.efectivo.map(
                        (row) => row.Id_Denominacion === action.payload.Id_Denominacion
                            ? {
                                ...row,
                                Cantidad: action.payload.cantidad,
                                Total: action.payload.cantidad * row.Monto,
                            }
                            : row
                    )
                }

            }

        case types.SetIdDetalleTarjetaActualArqueo:
            return {
                ...state,
                detalleTarjeta: {
                    ...state.detalleTarjeta,
                    Id: action.payload,
                },
            }

        case types.SetIdArqueoDetalleTarjetaActualArqueo:
            return {
                ...state,
                detalleTarjeta: {
                    ...state.detalleTarjeta,
                    IdArqueo: action.payload,
                },
            }

        case types.SetIdTarjetaDetalleTarjetaActualArqueo:
            return {
                ...state,
                detalleTarjeta: {
                    ...state.detalleTarjeta,
                    IdTarjeta: action.payload,
                },
            }

        case types.SetMontoDetalleTarjetaActualArqueo:
            return {
                ...state,
                detalleTarjeta: {
                    ...state.detalleTarjeta,
                    Monto: action.payload,
                },
            }

        case types.SetAddDetalleTarjetaArqueo:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    tarjeta: [
                        ...state.arqueo.tarjeta,
                        action.payload
                    ]
                }
            }

        case types.SetTotalTarjetaArqueoCash:
            return {
                ...state,
                arqueo: {
                    ...state.arqueo,
                    tarjeta: state.arqueo.tarjeta.map(
                        (row, i) => i === action.payload.index
                            ? {
                                ...row,
                                Monto: action.payload.Monto,
                            }
                            : row
                    )
                }

            }

        case types.SetStartOpeningArqueoCash:
            return {
                ...state,
                startOpening: action.payload
            }

        case types.SetOpenSearchArqueoCashModalArqueoCash:
            return {
                ...state,
                isOpenSearchArqueoCashModal: action.payload
            }

        case types.SetValorFiltroSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    valorFiltro: action.payload
                }
            }
    
        case types.SetNombreSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    nombre: action.payload
                }
            }
    
        case types.SetNumeroSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    numero: action.payload
                }
            }
    
        case types.SetFechasSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    fechas: action.payload
                }
            }
    
        case types.SetFechaDesdeSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    fechaDesde: action.payload
                }
            }
    
        case types.SetFechaHastaSearchArqueoCash:
            return {
                ...state,
                optionsSearchArqueoCash: {
                    ...state.optionsSearchArqueoCash,
                    fechaHasta: action.payload
                }
            }
    
        case types.SetActiveFechaDesdeSearchArqueoCash:
            return {
                ...state,
                isActiveFechaDesde: action.payload
            }
    
        case types.SetActiveFechaHastaSearchArqueoCash:
            return {
                ...state,
                isActiveFechaHasta: action.payload
            }

        case types.SetInsertResultSearchArqueoCash:
            return {
                ...state,
                searchArqueoCash: action.payload
            }
    
    
        case types.CleanSearchArqueoCash:
            return {
                ...state,
                searchArqueoCash: [],
                isActiveFechaDesde: false,
                isActiveFechaHasta: false,
                optionsSearchArqueoCash: {
                    valorFiltro: '',
                    nombre: true,
                    numero: false,
                    fechas: false,
                    fechaDesde: isoDateTime[0],
                    fechaHasta: isoDateTime[0]
                },
            }

        case types.SetSeletedArqueoCash:
            return {
                ...state,
                arqueo: action.payload
            }

        case types.SetIsEditArqueoCash:
            return {
                ...state,
                isEditArqueoCash: action.payload
            }

        case types.SetDisableInputsArqueoCash:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetDisableInputsUserArqueoCash:
            return {
                ...state,
                disableInputsUser: action.payload
            }

        case types.SetClaveInternaArqueoCash:
            return {
                ...state,
                claveInterna: action.payload
            }

        case types.SetVisiblePasswordArqueoCash:
            return {
                ...state,
                visiblePassword: action.payload
            }

        case types.SetDetalleOperacionesArqueoCash:
            return {
                ...state,
                detalleOperaciones: action.payload
            }

        case types.SetIsOpenModalPDFDetalleOperacionesArqueoCash:
            return {
                ...state,
                isOpenModalPDFDetalleOperaciones: action.payload
            }

        case types.SetIsOpenModalAddPreDepositoArqueoCash:
            return {
                ...state,
                isOpenModalAddPreDeposito: action.payload
            }

        case types.SetFechaPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    fecha: action.payload
                }
            }

        case types.SetCajeroPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    cajero: action.payload
                }
            }

        case types.SetNombreCajeroPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    nombreCajero: action.payload
                }
            }

        case types.SetCedulaPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    cedula: action.payload
                }
            }

        case types.SetDepositantePreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    depositante: action.payload
                }
            }

        case types.SetNumAperturaPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    numApertura: action.payload
                }
            }

        case types.SetMontoPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    monto: action.payload
                }
            }

        case types.SetObservacionesPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    ...state.preDeposito,
                    observaciones: action.payload
                }
            }

        case types.SetCajerosPreDepositoArqueoCash:
            return {
                ...state,
                cajeros: action.payload
            }

        case types.SetIsOpenModalSeletedAperturaArqueoCash:
            return {
                ...state,
                isOpenModalSeletedApertura: action.payload
            }

        case types.SetValorSearchAperturaArqueoCash:
            return {
                ...state,
                valorSearchApertura: action.payload
            }

        case types.SetCheckAperturaSeletedModalArqueoCash:
            return {
                ...state,
                checkAperturaSeletedModal: action.payload
            }

        case types.SetCheckNombreSeletedModalArqueoCash:
            return {
                ...state,
                checkNombreSeletedModal: action.payload
            }

        case types.SetCheckFechasSeletedModalArqueoCash:
            return {
                ...state,
                checkFechasSeletedModal: action.payload
            }

        case types.SetDisableInputsFechaSeletedModalArqueoCash:
            return {
                ...state,
                disableInputsFechaSeletedModal: action.payload
            }

        case types.SetFechaDesdeSeletedModalArqueoCash:
            return {
                ...state,
                fechaDesdeSeletedModal: action.payload
            }

        case types.SetFechaHastaSeletedModalArqueoCash:
            return {
                ...state,
                fechaHastaSeletedModal: action.payload
            }

        case types.SetAperturasSinArqueoArqueoCash:
            return {
                ...state,
                aperturasSinArqueo : action.payload,
                aperturasSinArqueoTable : action.payload
            }

        case types.SetSearchAperturasSinArqueoArqueoCash:
            return {
                ...state,
                aperturasSinArqueoTable : action.payload
            }

        case types.SetResetSearchAperturasSinArqueoCash:
            return {
                ...state,
                aperturasSinArqueoTable : state.aperturasSinArqueo
            }

        case types.SetIsAdminUserArqueoCash:
            return {
                ...state,
                isAdminUser : action.payload
            }

        case types.SetCleanPreDepositoArqueoCash:
            return {
                ...state,
                preDeposito: {
                    id: 0,
                    fecha: '',
                    cajero: '',
                    nombreCajero: '',
                    cedula: '',
                    depositante: '',
                    numApertura: 0,
                    monto: 0,
                    observaciones: ''
                }
            }

        default:
            return state;
    }
};        