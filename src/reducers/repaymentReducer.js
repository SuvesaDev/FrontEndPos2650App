import { types } from '../types/types';

const initialState = {
    tipoFactura: 0.00,
    numeroCaja: 0.00,
    numeroFactura: 0.00,
    PosicionActual: 0,
    currentTab: 'General',
    disableInputs: true,
    activeButtonSaveRepayment: false,
    activeButtonSearchRepayment: false,
    activeButtonRemoveRepayment: false,
    claveInterna: '',
    visiblePassword: false,
    disableInputsUser: false,
    nameUser: '',
    isOpenSearchBillingModal: false,
    disableInputsBody: true,
    idVentaDetalleSelected: 0,
    showMessageHelp: false,
    isReturnAllArticulos: false,
    isShowSecondTab: false,
    detalleArticuloActual: {
        codFxArticulo: 0.00,
        Descripcion: '',
        CantidadOriginal: 0.00,
        Cantidad: 0.00,
        CantVet: 0.00,
        CantBod: 0,
        Precio_Costo: 0.00,
        Precio_Base: 0,
        Precio_Flete: 0,
        Precio_Otros: 0,
        Precio_Unit: 0.00,
        Descuento: 0,
        Monto_Descuento: 0,
        Impuesto: 0.00,
        Monto_Impuesto: 0.00,
        SubtotalGravado: 0.00,
        SubTotalExcento: 0,
        SubTotal: 0.00,
        Id_Art_Venta: 0.00,
        id_articulo_V: 0.00
    },
    devolucion: {
        encabezado: {
            Id_Factura: 0.00,
            SaldoAnt_Fact: 0.00,
            SubTotalGravado: 0.00,
            SubTotalExcento: 0.00,
            Descuento: 0.00,
            Impuesto: 0.00,
            Monto: 0.00,
            Fecha: '',
            Cedula_Usuario: '',
            Cod_Moneda: 0,
            caja: 0.00,
            MontoDevolucion: 0.00,
            Num_Apertura: 0.00,
            UsuarioRecibio: '',
            NotasDevolucion: '',
            tipoDevolucion: '',
            IdSucursal: 0.00
        },
        detalle: []
    },
    detalleFacturaActual: {
        id_venta_detalle: 0,
        id_factura: 0,
        codFxArticulo: 0,
        codArticulo: '',
        descripcion: '',
        cantidad: 0,
        devoluciones: 0,
        precioUnit: 0,
        descuento: 0,
        impuesto: 0,
        cantVen: 0,
        cantBod: 0,
    },
    factura: {
        encabezado: {
            id: '',
            num_Factura: '',
            fecha: '',
            NumeroCaja: '',
            tipo: 2,
            cod_Cliente: '',
            nombre_Cliente: '',
            Cod_Moneda: '1',
            SubTotalGravada: 0,
            SubTotalExento: 0,
            SubTotal: 0,
            Descuento: 0,
            Imp_Venta: 0,
            Total: 0,
        },
        detalle: []
    },
    openSearchModal: false,
    searchRepayment: [],
    optionsSearchRepayment: {
        ValorFiltro: '',
        Nombre: true,
        Factura: false,
        Fechas: false,
        Desde: '',
        Hasta: ''
    },
    optionsSearchBillingRepayment: {
        Tipo: true,
        Caja: false,
        Nombre: false,
        Fechas: false,
        valueTipo: 0,
        valueCaja: 0,
        valueNombreCliente: '',
        valueFecha: ''
    },
    searchBillingRepayment: [],
    allPersonal: []
};


export const RepaymentReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case types.SetopenSearchModalRepayment:
            return {
                ...state,
                openSearchModal: action.payload,
            }

        case types.SetValorFiltroSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    valorfiltro: action.payload
                }
            }

        case types.SetNombreSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    Nombre: action.payload
                }
            }
            
        case types.SetFacturaSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    Factura: action.payload
                }
            }

        case types.SetFechasSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    Fechas: action.payload
                }
            }

        case types.SetDesdeSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    Desde: action.payload
                }
            }

        case types.SetHastaSearchModalRepayment:
            return {
                ...state,
                optionsSearchRepayment: {
                    ...state.optionsSearchRepayment,
                    Hasta: action.payload
                }
            }

        case types.SetsearchRepayment:
            return {
                ...state,
                searchRepayment: action.payload
            }

        case types.SetId_FacturaRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Id_Factura: action.payload
                    }
                }
            }

        case types.SetSaldoAnt_FactRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SaldoAnt_Fact: action.payload
                    }
                }
            }

        case types.SetSubTotalGravadoRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SubTotalGravado: action.payload
                    }
                }
            }

        case types.SetSubTotalExcentoRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        SubTotalExcento: action.payload
                    }
                }
            }

        case types.SetDescuentoRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Descuento: action.payload
                    }
                }
            }

        case types.SetImpuestoRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Impuesto: action.payload
                    }
                }
            }

        case types.SetMontoRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Monto: action.payload
                    }
                }
            }

        case types.SetFechaRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Fecha: action.payload
                    }
                }
            }

        case types.SetCedula_UsuarioRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Cedula_Usuario: action.payload
                    }
                }
            }

        case types.SetCod_MonedaRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Cod_Moneda: action.payload
                    }
                }
            }

        case types.SetcajaRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        caja: action.payload
                    }
                }
            }

        case types.SetMontoDevolucionRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        MontoDevolucion: action.payload
                    }
                }
            }

        case types.SetNum_AperturaRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        Num_Apertura: action.payload
                    }
                }
            }

        case types.SetUsuarioRecibioRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        UsuarioRecibio: action.payload
                    }
                }
            }

        case types.SetNotasDevolucionRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        NotasDevolucion: action.payload
                    }
                }
            }

        case types.SetTipoDevolucionRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        tipoDevolucion: action.payload
                    }
                }
            }

        case types.SetIdSucursalRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    encabezado: {
                        ...state.devolucion.encabezado,
                        IdSucursal: action.payload
                    }
                }
            }

        case types.CleanRepayment:
            return {
                ...state,
                devolucion: {
                    encabezado: {
                        Id_Factura: 0.00,
                        SaldoAnt_Fact: 0.00,
                        SubTotalGravado: 0.00,
                        SubTotalExcento: 0.00,
                        Descuento: 0.00,
                        Impuesto: 0.00,
                        Monto: 0.00,
                        Fecha: '',
                        Cedula_Usuario: '',
                        Cod_Moneda: 0.00,
                        caja: 0.00,
                        MontoDevolucion: 0.00,
                        Num_Apertura: 0.00,
                        UsuarioRecibio: '',
                        NotasDevolucion: '',
                        IdSucursal: 0.00
                    },
                    detalle: []
                },
                factura: {
                    encabezado: {
                        id: '',
                        num_Factura: '',
                        fecha: '',
                        NumeroCaja: '',
                        tipo: 2,
                        cod_Cliente: '',
                        nombre_Cliente: '',
                        Cod_Moneda: '1',
                        SubTotalGravada: 0,
                        SubTotalExento: 0,
                        SubTotal: 0,
                        Descuento: 0,
                        Imp_Venta: 0,
                        Total: 0,
                    },
                    detalle: []
                },
            }

        case types.SetTipoFacturaRepayment:
            return {
                ...state,
                tipoFactura: action.payload
            }

        case types.SetNumeroCajaRepayment:
            return {
                ...state,
                numeroCaja: action.payload
            }

        case types.SetNumeroFacturaRepayment:
            return {
                ...state,
                numeroFactura: action.payload
            }

        case types.SetCodigoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    codFxArticulo: action.payload,
                },
            }

        case types.SetDescripcionDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descripcion: action.payload,
                },
            }

        case types.SetCantidadOriginalDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CantidadOriginal: action.payload,
                },
            }

        case types.SetCantidadDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Cantidad: action.payload,
                },
            }

        case types.SetCantVetDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CantVet: action.payload,
                },
            }

        case types.SetCantBodDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    CantBod: action.payload,
                },
            }

        case types.SetPrecio_CostoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Costo: action.payload,
                },
            }

        case types.SetPrecio_BaseDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Base: action.payload,
                },
            }

        case types.SetPrecio_FleteDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Flete: action.payload,
                },
            }

        case types.SetPrecio_OtrosDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Otros: action.payload,
                },
            }

        case types.SetPrecio_UnitDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Precio_Unit: action.payload,
                },
            }

        case types.SetDescuentoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Descuento: action.payload,
                },
            }

        case types.SetMonto_DescuentoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Descuento: action.payload,
                },
            }

        case types.SetImpuestoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Impuesto: action.payload,
                },
            }

        case types.SetMonto_ImpuestoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Monto_Impuesto: action.payload,
                },
            }

        case types.SetSubtotalGravadoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubtotalGravado: action.payload,
                },
            }

        case types.SetSubTotalExcentoDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotalExcento: action.payload,
                },
            }

        case types.SetSubTotalDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    SubTotal: action.payload,
                },
            }

        case types.SetId_Art_VentaDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    Id_Art_Venta: action.payload,
                },
            }

        case types.Setid_articulo_VDetalleActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    ...state.detalleArticuloActual,
                    id_articulo_V: action.payload,
                },
            }

        case types.SetAddDetalleRepayment:
            return {
                ...state,
                devolucion: {
                    ...state.devolucion,
                    detalle: [
                        ...state.devolucion.detalle,
                        action.payload
                    ]
                }
            }

        case types.SetIdBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        id: action.payload
                    }
                }
            }

        case types.SetNum_FacturaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        num_Factura: action.payload
                    }
                }
            }

        case types.SetFechaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        fecha: action.payload
                    }
                }
            }

        case types.SetNumeroCajaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        NumeroCaja: action.payload
                    }
                }
            }

        case types.SetTipoBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        tipo: action.payload
                    }
                }
            }

        case types.SetCod_ClienteBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        cod_Cliente: action.payload
                    }
                }
            }

        case types.SetNombre_ClienteBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        nombre_Cliente: action.payload
                    }
                }
            }

        case types.SetCod_MonedaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Cod_Moneda: action.payload
                    }
                }
            }
            
        case types.SetSubTotalGravadaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotalGravada: action.payload
                    }
                }
            }

        case types.SetSubTotalExentoBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotalExento: action.payload
                    }
                }
            }

        case types.SetSubTotalBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        SubTotal: action.payload
                    }
                }
            }

        case types.SetDescuentoBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Descuento: action.payload
                    }
                }
            }

        case types.SetImp_VentaBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Imp_Venta: action.payload
                    }
                }
            }

        case types.SetTotalBilling:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    encabezado: {
                        ...state.factura.encabezado,
                        Total: action.payload
                    }
                }
            }

        case types.SetAddDetalleFactura:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: [
                        ...state.factura.detalle,
                        action.payload
                    ]
                }
            }

        case types.CleanDetalleFactura:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: []
                }
            }

        case types.SetPosicionActualRepayment:
            return {
                ...state,
                PosicionActual: action.payload
            }

        case types.SetAddDetalleFacturaRepayment:
            return {
                ...state,
                detalleFacturaActual: action.payload,
            }

        case types.SetCurrentTabRepayment:
            return {
                ...state,
                currentTab: action.payload,
            }

        case types.SetDisableInputsRepayment:
            return {
                ...state,
                disableInputs: action.payload,
            }

        case types.SetActiveButtonSaveRepayment:
            return {
                ...state,
                activeButtonSaveRepayment: action.payload,
            }

        case types.SetActiveButtonSearchRepayment:
            return {
                ...state,
                activeButtonSearchRepayment: action.payload,
            }

        case types.SetActiveButtonRemoveRepayment:
            return {
                ...state,
                activeButtonRemoveRepayment: action.payload,
            }

        case types.SetClaveInternaRepayment:
            return {
                ...state,
                claveInterna: action.payload,
            }

        case types.SetVisiblePasswordRepayment:
            return {
                ...state,
                visiblePassword: action.payload,
            }

        case types.SetDisableInputUserRepayment:
            return {
                ...state,
                disableInputsUser: action.payload,
            }

        case types.SetNameUserRepayment:
            return {
                ...state,
                nameUser: action.payload,
            }

        case types.SetAllPersonalRepayment:
            return {
                ...state,
                allPersonal: action.payload,
            }

        case types.SetIsOpenSearchBillingModalRepayment:
            return {
                ...state,
                isOpenSearchBillingModal: action.payload,
            }

        case types.SetCheckTipoSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    Tipo: action.payload
                }
            }

        case types.SetCheckCajaSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    Caja: action.payload
                }
            }

        case types.SetCheckNombreClienteSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    Nombre: action.payload
                }
            }

        case types.SetCheckFechasSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    Fechas: action.payload
                }
            }

        case types.SetValueTipoSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    valueTipo: action.payload
                }
            }

        case types.SetValueCajaSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    valueCaja: action.payload
                }
            }

        case types.SetValueNombreClienteSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    valueNombreCliente: action.payload
                }
            }

        case types.SetValueFechasSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    ...state.optionsSearchBillingRepayment,
                    valueFecha: action.payload
                }
            }

        case types.SetResultSearchBillingModalRepayment:
            return {
                ...state,
                searchBillingRepayment: action.payload
            }

        case types.CleanStateSearchBillingModalRepayment:
            return {
                ...state,
                optionsSearchBillingRepayment: {
                    Tipo: true,
                    Caja: false,
                    Nombre: false,
                    Fechas: false,
                    valueTipo: 0,
                    valueCaja: 0,
                    valueNombreCliente: '',
                    valueFecha: ''
                },
                searchBillingRepayment: []
            }

        case types.SetDisableInputsBodyRepayment:
            return {
                ...state,
                disableInputsBody: action.payload
            }

        case types.SetIdVentaDetalleSelectedRepayment:
            return {
                ...state,
                idVentaDetalleSelected: action.payload
            }

        case types.SetShowMessageInfoRepayment:
            return {
                ...state,
                showMessageHelp: action.payload
            }

        case types.SetDeleteLineaArticuloRepayment:
            return {
                ...state,
                factura: {
                    ...state.factura,
                    detalle: state.factura.detalle.filter(linea => linea.id_venta_detalle != action.payload)
                }
            }

        case types.SetIsReturnAllArticulosRepayment:
            return {
                ...state,
                isReturnAllArticulos: action.payload
            }

        case types.SetIsShowSecondTabRepayment:
            return {
                ...state,
                isShowSecondTab: action.payload
            }

        case types.SetCleanDetalleArticuloActualRepayment:
            return {
                ...state,
                detalleArticuloActual: {
                    codFxArticulo: 0.00,
                    Descripcion: '',
                    CantidadOriginal: 0.00,
                    Cantidad: 0.00,
                    CantVet: 0.00,
                    CantBod: 0,
                    Precio_Costo: 0.00,
                    Precio_Base: 0,
                    Precio_Flete: 0,
                    Precio_Otros: 0,
                    Precio_Unit: 0.00,
                    Descuento: 0,
                    Monto_Descuento: 0,
                    Impuesto: 0.00,
                    Monto_Impuesto: 0.00,
                    SubtotalGravado: 0.00,
                    SubTotalExcento: 0,
                    SubTotal: 0.00,
                    Id_Art_Venta: 0.00,
                    id_articulo_V: 0.00
                }
            }

        case types.CleanFacturaRepayment:
            return {
                ...state,
                factura: {
                    encabezado: {
                        id: '',
                        num_Factura: '',
                        fecha: '',
                        NumeroCaja: '',
                        tipo: 2,
                        cod_Cliente: '',
                        nombre_Cliente: '',
                        Cod_Moneda: '1',
                        SubTotalGravada: 0,
                        SubTotalExento: 0,
                        SubTotal: 0,
                        Descuento: 0,
                        Imp_Venta: 0,
                        Total: 0,
                    },
                    detalle: []
                }
            }

        default:
            return state;
    }

}    