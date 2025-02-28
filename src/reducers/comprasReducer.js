import { types } from "../types/types";

const initialState = {
  empresas: [],
  idEmpresa: 0,
  activeButtonSave: false,
  activeButtonSearch: false,
  activeButtonRemove: false,
  PosicionActual: -1.00,
  openSearchModal: false,
  isOpenSearchInventoryCompras: false,
  disableInputs: true,
  claveInterna: '',
  visiblePassword: false,
  disableInputsUser: false,
  cedulaUser: '',
  isOpenImportarXMLModal: false,
  startReadingXML: false,
  nameFileReadXML: '',
  disableInputDias: false,
  disableInputsDetalle: true,
  isOpenModalSearchCodigoCabys: false,
  valueSearchCodigoCabys: '',
  searchCodigoCabys: [],
  showMessageHelp: false,
  isDetalleActualEdit: false,
  hasCatalogosInternos: false,
  existProveedor: true,
  startOpeningCompras: false,
  isEditCompra: false,
  hasChargeFactura: false,
  getAllInventarios: [],
  getAllInventariosFilter: [],
  isOpenModalSearchInventario: false,
  valorBusquedaInventario: '',
  codigoInventarioSeleccionado: '',
  isOpenModalPrecioImportarFactura: false,
  isCostaPets: false,
  preciosImportarFactura: {
    nuevoCosto: 0,
    impuestoNeto: 0,
    priceSell: {
      tipo: 'A',
      utilidad: '',
      precio: '',
      precioIV: ''
    },
    selectedpriceSell: {
      tipo: 'A',
      utilidad: '',
      precio: '',
      precioIV: ''
    },
    pricesSellBuys: [],
    isEditPriceSell: false,
    hasChangeUtilidadPriceSell: false,
    hasChangePrecioPriceSell: false,
    hasChangePrecioIVPriceSell: false,
    codigoProSeleted: 0
  },
  detalleArticuloActual: {
    idArticuloComprados: 0,
    CodArticulo: '',
    codFxArticulo: 0,
    Descripcion: '',
    Cantidad: 1.00,
    Regalia: 0.00,
    Base: 0.00,
    Flete: 0.00,
    Otros: 0.00,
    Costo: 0.00,
    Descuento: 0.00,
    Monto_Descuento: '',
    Impuesto: 0.00,
    Monto_Impuesto: 0.00,
    SubtotalGravado: 0.00,
    SubTotalExcento: 0.00,
    SubTotal: 0.00,
    Total: 0.00,
    precio_A: 0.00,
    precio_B: 0.00,
    precio_C: 0.00,
    precio_D: 0.00,
    Cabys: '',
    idBodega: 0
  },
  compras: {
    encabezado: {
      Id_Compra: 0.00,
      Factura: '',
      CodigoProv: 0,
      Proveedor: '',
      CedulaProveedor: '',
      SubTotalGravado: 0.00,
      SubTotalExento: 0.00,
      Descuento: 0.00,
      Impuesto: 0.00,
      TotalFactura: 0.00,
      Fecha: '',
      Dias: 0,
      Vence: '',
      precio_A: 0.00,
      precio_B: 0.00,
      precio_C: 0.00,
      precio_D: 0.00,
      Compra: true,
      TipoCompra: '',
      idBodega: 0,
      Cod_MonedaCompra: 0,
      FacturaCancelado: false,
      TipoCambio: 0.00,
      CambioImpuesto: false,
    },
    detalle: []
  },
  searchCompras: [],
  valorfiltroProveedor: '',
  filterProveedorInventory: [],
  filterUbicacionInventory: [],
  isOpenModalSearchProveedor: false,
  isOpenModalAddProveedor: false,
  optionsSearchCompras: {
    ValorFiltro: '',
    Proveedor: true,
    Factura: false
  },
  proveedorAdd: {
    nombre: '',
    cedula: '',
    telefono1: '',
    fax1: '',
    email: '',
    direccion: '',
    observaciones: '',
    contacto: '',
    telefonoCont: '',
  },
  billingImportXML: {
    clave: '',
    codigoActividad: '',
    numeroConsecutivo: '',
    fechaEmision: '',
    emisor: {
      nombre: '',
      identificacion: {
        tipo: '',
        numero: ''
      },
      nombreComercial: '',
      ubicacion: {
        provincia: '',
        canton: '',
        distrito: '',
        barrio: '',
        otrasSenas: '',
      },
      telefono: {
        codigoPais: '',
        numTelefono: '',
      },
      fax: {
        codigoPais: '',
        numTelefono: '',
      },
      correoElectronico: ''
    },
    receptor: {
      nombre: '',
      identificacion: {
        tipo: '',
        numero: '',
      },
      nombreComercial: '',
      ubicacion: {
        provincia: '',
        canton: '',
        distrito: '',
        barrio: '',
        otrasSenas: '',
      },
      telefono: {
        codigoPais: '',
        numTelefono: '',
      },
      correoElectronico: ''
    },
    condicionVenta: '',
    plazoCredito: '',
    medioPago: '',
    detalleServicio: [],
    detalleServicioTable: [],
    resumenFactura: {
      codigoTipoMoneda: {
        codigoMoneda: '',
        tipoCambio: '',
      },
      totalServGravados: '',
      totalServExentos: '',
      totalServExonerado: '',
      totalMercanciasGravadas: '',
      totalMercanciasExentas: '',
      totalMercExonerada: '',
      totalGravado: '',
      totalExento: '',
      totalExonerado: '',
      totalVenta: '',
      totalDescuentos: '',
      totalVentaNeta: '',
      totalImpuesto: '',
      totalIVADevuelto: '',
      totalComprobante: '',
    }
  }
};

export const comprasReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SetEmpresasCompras:
      return {
        ...state,
        empresas: action.payload,
      }

    case types.SetOpenSearchInventoryCompras:
      return {
        ...state,
        isOpenSearchInventoryCompras: action.payload,
      }

    case types.SetId_CompraCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Id_Compra: action.payload
          }
        }
      }

    case types.SetIdBodegaCompraCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            idBodega: action.payload
          }
        }
      }


    case types.SetFacturaCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Factura: action.payload
          }
        }
      }

    case types.SetCodigoProvCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            CodigoProv: action.payload
          }
        }
      }

    case types.SetProveedorCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Proveedor: action.payload
          }
        }
      }

    case types.SetCedulaProveedorCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            CedulaProveedor: action.payload
          }
        }
      }

    case types.SetSubTotalGravadaCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            SubTotalGravado: action.payload
          }
        }
      }

    case types.SetSubTotalExentoCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            SubTotalExento: action.payload
          }
        }
      }

    case types.SetDescuentoCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Descuento: action.payload
          }
        }
      }

    case types.SetImpuestoCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Impuesto: action.payload
          }
        }
      }

    case types.SetTotalFacturaCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            TotalFactura: action.payload
          }
        }
      }

    case types.SetFechaCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Fecha: action.payload
          }
        }
      }

    case types.SetVenceCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Vence: action.payload
          }
        }
      }

    case types.SetTipoCompraCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            TipoCompra: action.payload
          }
        }
      }

    case types.SetCod_MonedaCompraCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Cod_MonedaCompra: action.payload
          }
        }
      }

    case types.SetTipoCambioCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            TipoCambio: action.payload
          }
        }
      }

    case types.SetCambioImpuestoCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            CambioImpuesto: action.payload
          }
        }
      }

      
      case types.SetIdEmpresaCompras:
        return {
          ...state,
          idEmpresa: action.payload,
        }

    case types.SetopenSearchModal:
      return {
        ...state,
        openSearchModal: action.payload,
      }

    case types.SetValorFiltroSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          valorfiltro: action.payload
        }
      }

    case types.SetProveedorSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          Proveedor: action.payload
        }
      }

    case types.SetFacturaSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          Factura: action.payload
        }
      }

    case types.SetFechasSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          Fechas: action.payload
        }
      }

    case types.SetDesdeSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          Desde: action.payload
        }
      }

    case types.SetHastaSearchModalCompras:
      return {
        ...state,
        optionsSearchCompras: {
          ...state.optionsSearchCompras,
          Hasta: action.payload
        }
      }

    case types.SetidArticuloCompradosDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          idArticuloComprados: action.payload,
        },
      }

    case types.SetCodArticuloDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          CodArticulo: action.payload,
        },
      }

    case types.SetCodigoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          codFxArticulo: action.payload,
        },
      }

    case types.SetDescripcionDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Descripcion: action.payload,
        },
      }

    case types.SetCantidadDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Cantidad: action.payload,
        },
      }

    case types.SetRegaliaDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Regalia: action.payload,
        },
      }

    case types.SetBaseDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Base: action.payload,
        },
      }

    case types.SetFleteDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Flete: action.payload,
        },
      }

    case types.SetOtrosDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Otros: action.payload,
        },
      }

    case types.SetCostoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Costo: action.payload,
        },
      }

    case types.SetDescuentoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Descuento: action.payload,
        },
      }

    case types.SetMonto_DescuentoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Monto_Descuento: action.payload,
        },
      }

    case types.SetImpuestoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Impuesto: action.payload,
        },
      }

    case types.SetMonto_ImpuestoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Monto_Impuesto: action.payload,
        },
      }

    case types.SetSubtotalGravadoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          SubtotalGravado: action.payload,
        },
      }

    case types.SetSubTotalExcentoDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          SubTotalExcento: action.payload,
        },
      }

    case types.SetSubTotalDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          SubTotal: action.payload,
        },
      }

    case types.SetTotalDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Total: action.payload,
        },
      }

    case types.SetPrecioADetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          precio_A: action.payload,
        },
      }

    case types.SetPrecioBDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          precio_B: action.payload,
        },
      }

    case types.SetPrecioCDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          precio_C: action.payload,
        },
      }

    case types.SetPrecioDDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          precio_D: action.payload,
        },
      }

    case types.SetCabysDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          Cabys: action.payload,
        },
      }

    case types.SetIdBodegaDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          ...state.detalleArticuloActual,
          id_Bodega: action.payload,
        },
      }

    case types.CleanDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: {
          idArticuloComprados: 0,
          CodArticulo: 0,
          codFxArticulo: 0,
          Descripcion: '',
          Cantidad: 1.00,
          Regalia: 0.00,
          Base: 0.00,
          Flete: 0.00,
          Otros: 0.00,
          Costo: 0.00,
          Descuento: 0.00,
          Monto_Descuento: 0.00,
          Impuesto: 0.00,
          Monto_Impuesto: 0.00,
          SubtotalGravado: 0.00,
          SubTotalExcento: 0.00,
          SubTotal: 0.00,
          Total: 0.00,
          precio_A: 0.00,
          precio_B: 0.00,
          precio_C: 0.00,
          precio_D: 0.00,
          Cabys: '',
        },
      }

    case types.SetAddDetalleCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          detalle: [
            ...state.compras.detalle,
            action.payload
          ]
        }
      }

    case types.SetsearchCompras:
      return {
        ...state,
        searchCompras: action.payload
      }

    case types.CleanValorFiltroProveedorCompras:
      return {
        ...state,
        valorfiltroProveedor: ''
      }

    case types.SetDefaultProveedorFilterCompras:
      return {
        ...state,
        filterProveedorInventory: action.payload
      }

    case types.SetDefaultUbicacionFilterCompras:
      return {
        ...state,
        filterUbicacionInventory: action.payload
      }

    case types.SetOpenModalSearchProveedorCompras:
      return {
        ...state,
        isOpenModalSearchProveedor: action.payload
      }

    case types.SetSearchProveedorFilterCompras:
      return {
        ...state,
        filterProveedorInventory: action.payload.proveedoresInventory.filter(family => family.descripcion.includes(action.payload.valorfiltroProveedor.toUpperCase()))
      }

    case types.SetValorFiltroProveedorCompras:
      return {
        ...state,
        valorfiltroProveedor: action.payload
      }

    case types.SetAddDetalleActualCompras:
      return {
        ...state,
        detalleArticuloActual: action.payload,
      }

    case types.SetPosicionActualCompra:
      return {
        ...state,
        PosicionActual: action.payload
      }

    case types.SetEditDetalleCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          detalle: state.compras.detalle.map(
            (linea, i) => i === action.payload.index
              ? action.payload.detalle
              : linea)
        }
      }

    case types.SetDeleteDetalleCompra:
      return {
        ...state,
        compras: {
          ...state.compras,
          detalle: state.compras.detalle.filter(linea => linea != action.payload)
        }
      }

    case types.isOpenModalAddProveedorCompras:
      return {
        ...state,
        isOpenModalAddProveedor: action.payload
      }

    case types.SetnombreProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          nombre: action.payload
        }
      }

    case types.SetcedulaProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          cedula: action.payload
        }
      }

    case types.Settelefono1ProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          telefono1: action.payload
        }
      }

    case types.Setfax1ProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          fax1: action.payload
        }
      }

    case types.SetemailProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          email: action.payload
        }
      }

    case types.SetdireccionProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          direccion: action.payload
        }
      }

    case types.SetobservacionesProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          observaciones: action.payload
        }
      }

    case types.SetcontactoProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          contacto: action.payload
        }
      }

    case types.SettelefonoContProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          ...state.proveedorAdd,
          telefonoCont: action.payload
        }
      }

    case types.CleanProveedorAddCompras:
      return {
        ...state,
        proveedorAdd: {
          nombre: '',
          cedula: '',
          telefono1: '',
          fax1: '',
          email: '',
          direccion: '',
          observaciones: '',
          contacto: '',
          telefonoCont: '',
        }
      }

    case types.SetDisableInputsCompras:
      return {
        ...state,
        disableInputs: action.payload
      }

    case types.SetActiveButtonSaveCompras:
      return {
        ...state,
        activeButtonSave: action.payload
      }

    case types.SetActiveButtonSearchCompras:
      return {
        ...state,
        activeButtonSearch: action.payload
      }

    case types.SetActiveButtonRemoveCompras:
      return {
        ...state,
        activeButtonRemove: action.payload
      }

    case types.SetClaveInternaCompras:
      return {
        ...state,
        claveInterna: action.payload
      }

    case types.SetVisiblePasswordCompras:
      return {
        ...state,
        visiblePassword: action.payload
      }

    case types.SetDisableInputsUserCompras:
      return {
        ...state,
        disableInputsUser: action.payload
      }

    case types.SetIsOpenImportarXMLModalCompras:
      return {
        ...state,
        isOpenImportarXMLModal: action.payload
      }

    case types.SetStartReadingXMLCompras:
      return {
        ...state,
        startReadingXML: action.payload
      }

    case types.SetNameFileReadXMLCompras:
      return {
        ...state,
        nameFileReadXML: action.payload
      }

    case types.SetBillingImportXMLCompras:
      return {
        ...state,
        billingImportXML: action.payload
      }

    case types.SetCodigoInternoDetalleCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                codigoInt: action.payload.codigoInt,
                estado: (action.payload.codigoInt !== "") ? true : false
              }
              : detalle
          )
        }
      }

    case types.SetDescripcionInternoDetalleCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                descripcionInt: action.payload.descripcionInt
              }
              : detalle
          )
        }
      }

    case types.SetCantidadInternoDetalleCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                cantidad: action.payload.cantidad
              }
              : detalle
          )
        }
      }

    case types.SetRegaliaInternoDetalleCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                regalia: action.payload.regalia
              }
              : detalle
          )
        }
      }

    case types.SetNuevoCostoInternoDetalleCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                nuevoCosto: action.payload.nuevoCosto
              }
              : detalle
          )
        }
      }

    case types.SetCleanBillingImportXMLCompras:
      return {
        ...state,
        billingImportXML: {
          clave: '',
          codigoActividad: '',
          numeroConsecutivo: '',
          fechaEmision: '',
          emisor: {
            nombre: '',
            identificacion: {
              tipo: '',
              numero: ''
            },
            nombreComercial: '',
            ubicacion: {
              provincia: '',
              canton: '',
              distrito: '',
              barrio: '',
              otrasSenas: '',
            },
            telefono: {
              codigoPais: '',
              numTelefono: '',
            },
            fax: {
              codigoPais: '',
              numTelefono: '',
            },
            correoElectronico: ''
          },
          receptor: {
            nombre: '',
            identificacion: {
              tipo: '',
              numero: '',
            },
            nombreComercial: '',
            ubicacion: {
              provincia: '',
              canton: '',
              distrito: '',
              barrio: '',
              otrasSenas: '',
            },
            telefono: {
              codigoPais: '',
              numTelefono: '',
            },
            correoElectronico: ''
          },
          condicionVenta: '',
          plazoCredito: '',
          medioPago: '',
          detalleServicio: [],
          detalleServicioTable: [],
          resumenFactura: {
            codigoTipoMoneda: {
              codigoMoneda: '',
              tipoCambio: '',
            },
            totalServGravados: '',
            totalServExentos: '',
            totalServExonerado: '',
            totalMercanciasGravadas: '',
            totalMercanciasExentas: '',
            totalMercExonerada: '',
            totalGravado: '',
            totalExento: '',
            totalExonerado: '',
            totalVenta: '',
            totalDescuentos: '',
            totalVentaNeta: '',
            totalImpuesto: '',
            totalIVADevuelto: '',
            totalComprobante: '',
          }
        }
      }

    case types.SetDisableInputsDiasCompras:
      return {
        ...state,
        disableInputDias: action.payload
      }

    case types.SetDiasCompras:
      return {
        ...state,
        compras: {
          ...state.compras,
          encabezado: {
            ...state.compras.encabezado,
            Dias: action.payload
          }
        }
      }

    case types.SetDisableInputsDetalleCompras:
      return {
        ...state,
        disableInputsDetalle: action.payload
      }

    case types.SetIsOpenModalSearchCodigoCabysCompras:
      return {
        ...state,
        isOpenModalSearchCodigoCabys: action.payload
      }

    case types.SetValueSearchCodigoCabysCompras:
      return {
        ...state,
        valueSearchCodigoCabys: action.payload
      }

    case types.SetSearchCodigoCabysCompras:
      return {
        ...state,
        searchCodigoCabys: action.payload
      }

    case types.CleanSearchCodigoCabysCompras:
      return {
        ...state,
        isOpenModalSearchCodigoCabys: false,
        valueSearchCodigoCabys: '',
        searchCodigoCabys: [],
      }

    case types.SetShowMessageHelpCompras:
      return {
        ...state,
        showMessageHelp: action.payload
      }

    case types.SetIsDetalleActualEditCompras:
      return {
        ...state,
        isDetalleActualEdit: action.payload
      }

    case types.SetCedulaUserCompras:
      return {
        ...state,
        cedulaUser: action.payload
      }

    case types.SetHasCatalogosInternos:
      return {
        ...state,
        hasCatalogosInternos: action.payload
      }

    case types.SetExistProveedorCompras:
      return {
        ...state,
        existProveedor: action.payload
      }

    case types.CleanFacturaCompras:
      return {
        ...state,
        compras: {
          encabezado: {
            Id_Compra: 0.00,
            Factura: '',
            CodigoProv: 0,
            Proveedor: '',
            CedulaProveedor: '',
            SubTotalGravado: 0.00,
            SubTotalExento: 0.00,
            Descuento: 0.00,
            Impuesto: 0.00,
            TotalFactura: 0.00,
            Fecha: '',
            Dias: 0,
            Vence: '',
            Compra: true,
            TipoCompra: '',
            Cod_MonedaCompra: 0,
            FacturaCancelado: false,
            TipoCambio: 0.00,
            CambioImpuesto: false,
          },
          detalle: []
        },
      }

    case types.SetStartOpeningCompras:
      return {
        ...state,
        startOpeningCompras: action.payload
      }

    case types.SetIsEditCompras:
      return {
        ...state,
        isEditCompra: action.payload
      }

    case types.SetHasChargeFacturaCompras:
      return {
        ...state,
        hasChargeFactura: action.payload
      }

    case types.SetAllInventariosCompras:
      return {
        ...state,
        getAllInventarios: action.payload,
        getAllInventariosFilter: action.payload
      }

    case types.SetIsOpenModalSearchInventarioModalCompras:
      return {
        ...state,
        isOpenModalSearchInventario: action.payload
      }

    case types.SetValorBusquedaInventariosCompras:
      return {
        ...state,
        valorBusquedaInventario: action.payload
      }

    case types.SetSearchInventarioCompras:
      return {
        ...state,
        getAllInventariosFilter: state.getAllInventarios.filter(inventario => inventario.cod_Articulo.includes(action.payload) || inventario.descripcion.includes(action.payload))
      }

    case types.SetDefaultSearchInventarioCompras:
      return {
        ...state,
        getAllInventariosFilter: state.getAllInventarios
      }

    case types.SetCodigoInventarioSeleccionadoCompras:
      return {
        ...state,
        codigoInventarioSeleccionado: action.payload
      }

    case types.CleanStateSearchInventarioCompras:
      return {
        ...state,
        valorBusquedaInventario: '',
        codigoInventarioSeleccionado: '',
        getAllInventariosFilter: state.getAllInventarios
      }

    case types.SetCodigoInternoDetalleManualCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                codigoInt: action.payload.codigoInt,
                estado: false
              }
              : detalle
          )
        }
      }

    case types.SetDescripcionInternoDetalleManualCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                descripcionInt: action.payload.descripcionInt
              }
              : detalle
          )
        }
      }

    case types.SetUpdateStateInventarioCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload
              ? {
                ...detalle,
                estado: true
              }
              : detalle
          )
        }
      }

    case types.SetIsOpenModalPrecioImportarFacturaCompras:
      return {
        ...state,
        isOpenModalPrecioImportarFactura: action.payload
      }

    case types.SetIsCostaPetsCompras:
      return {
        ...state,
        isCostaPets: action.payload
      }

    case types.SetNuevoCostoPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          nuevoCosto: action.payload,
        },
      }

    case types.SetCodigoProSeletedPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          codigoProSeleted: action.payload,
        },
      }

    case types.SetImpuestoNetoPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          impuestoNeto: action.payload,
        },
      }

    case types.SetTipoPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: {
            ...state.preciosImportarFactura.priceSell,
            tipo: action.payload,
          },
        },
      }

    case types.SetUtilidadPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: {
            ...state.preciosImportarFactura.priceSell,
            utilidad: action.payload,
          },
        },
      }

    case types.SetPrecioPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: {
            ...state.preciosImportarFactura.priceSell,
            precio: action.payload,
          },
        },
      }

    case types.SetPrecioIVPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: {
            ...state.preciosImportarFactura.priceSell,
            precioIV: action.payload,
          },
        },
      }

    case types.SetSelectedPricesPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: action.payload,
          selectedpriceSell: action.payload
        },
      }

    case types.SetOnePrecioPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          pricesSellBuys: [
            ...state.preciosImportarFactura.pricesSellBuys,
            action.payload
          ]
        },
      }

    case types.SetAllPrecioPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          pricesSellBuys: action.payload
        },
      }

    case types.SetIsEditPriceSellPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          isEditPriceSell: action.payload
        },
      }

    case types.SetChangeUtilidadPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          hasChangeUtilidadPriceSell: action.payload
        },
      }

    case types.SetChangePrecioPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          hasChangePrecioPriceSell: action.payload
        },
      }

    case types.SetChangePrecioIVPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          hasChangePrecioIVPriceSell: action.payload
        },
      }

    case types.CleanStatePricesSellPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          priceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
          selectedpriceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
        },
      }

    case types.SetEditPricesSellPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          pricesSellBuys: state.preciosImportarFactura.pricesSellBuys.map(
            (price, i) => i === action.payload.index
              ? {
                ...price,
                tipo: action.payload.tipo,
                utilidad: action.payload.utilidad,
                precio: action.payload.precio,
                precioIV: action.payload.precioIV
              }
              : price)
        }
      }

    case types.SetRemovePricesSellPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          ...state.preciosImportarFactura,
          pricesSellBuys: state.preciosImportarFactura.pricesSellBuys.filter(price => price.tipo !== action.payload)
        }
      }

    case types.SetNuevosCostosArticuloImportarFacturaCompras:
      return {
        ...state,
        billingImportXML: {
          ...state.billingImportXML,
          detalleServicio: state.billingImportXML.detalleServicio.map(
            (detalle, i) => detalle.codigoComercial.codigo === action.payload.codigoPro
              ? {
                ...detalle,
                costos: action.payload.costos
              }
              : detalle),
          detalleServicioTable: state.billingImportXML.detalleServicioTable.map(
            (detalle, i) => detalle.codigoPro === action.payload.codigoPro
              ? {
                ...detalle,
                costos: action.payload.costos
              }
              : detalle)
        }
      }

    case types.CleanPreciosImportarFacturaCompras:
      return {
        ...state,
        preciosImportarFactura: {
          nuevoCosto: 0,
          impuestoNeto: 0,
          priceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
          selectedpriceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
          pricesSellBuys: [],
          isEditPriceSell: false,
          hasChangeUtilidadPriceSell: false,
          hasChangePrecioPriceSell: false,
          hasChangePrecioIVPriceSell: false,
          codigoProSeleted: 0
        }
      }

    case types.CleanCompras:
      return {
        ...state,
        empresas: [],
        idEmpresa: 0,
        activeButtonSave: false,
        activeButtonSearch: false,
        activeButtonRemove: false,
        PosicionActual: -1.00,
        openSearchModal: false,
        isOpenSearchInventoryCompras: false,
        disableInputs: true,
        claveInterna: '',
        visiblePassword: false,
        disableInputsUser: false,
        cedulaUser: '',
        isOpenImportarXMLModal: false,
        startReadingXML: false,
        nameFileReadXML: '',
        disableInputDias: false,
        disableInputsDetalle: true,
        isOpenModalSearchCodigoCabys: false,
        valueSearchCodigoCabys: '',
        searchCodigoCabys: [],
        showMessageHelp: false,
        isDetalleActualEdit: false,
        hasCatalogosInternos: false,
        existProveedor: true,
        startOpeningCompras: false,
        isEditCompra: false,
        hasChargeFactura: false,
        getAllInventarios: [],
        getAllInventariosFilter: [],
        isOpenModalSearchInventario: false,
        valorBusquedaInventario: '',
        codigoInventarioSeleccionado: '',
        isOpenModalPrecioImportarFactura: false,
        isCostaPets: false,
        preciosImportarFactura: {
          nuevoCosto: 0,
          impuestoNeto: 0,
          priceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
          selectedpriceSell: {
            tipo: 'A',
            utilidad: '',
            precio: '',
            precioIV: ''
          },
          pricesSellBuys: [],
          isEditPriceSell: false,
          hasChangeUtilidadPriceSell: false,
          hasChangePrecioPriceSell: false,
          hasChangePrecioIVPriceSell: false,
          codigoProSeleted: 0
        },
        detalleArticuloActual: {
          idArticuloComprados: 0,
          CodArticulo: '',
          codFxArticulo: 0,
          Descripcion: '',
          Cantidad: 1.00,
          Regalia: 0.00,
          Base: 0.00,
          Flete: 0.00,
          Otros: 0.00,
          Costo: 0.00,
          Descuento: 0.00,
          Monto_Descuento: '',
          Impuesto: 0.00,
          Monto_Impuesto: 0.00,
          SubtotalGravado: 0.00,
          SubTotalExcento: 0.00,
          SubTotal: 0.00,
          Total: 0.00,
          precio_A: 0.00,
          precio_B: 0.00,
          precio_C: 0.00,
          precio_D: 0.00,
          Cabys: '',
          idBodega: 0
        },
        compras: {
          encabezado: {
            Id_Compra: 0.00,
            Factura: '',
            CodigoProv: 0,
            Proveedor: '',
            CedulaProveedor: '',
            SubTotalGravado: 0.00,
            SubTotalExento: 0.00,
            Descuento: 0.00,
            Impuesto: 0.00,
            TotalFactura: 0.00,
            Fecha: '',
            Dias: 0,
            Vence: '',
            Compra: true,
            TipoCompra: '',
            Cod_MonedaCompra: 0,
            FacturaCancelado: false,
            TipoCambio: 0.00,
            CambioImpuesto: false,
            idBodega: 0,
          },
          detalle: []
        },
        searchCompras: [],
        valorfiltroProveedor: '',
        filterProveedorInventory: [],
        filterUbicacionInventory: [],
        isOpenModalSearchProveedor: false,
        isOpenModalAddProveedor: false,
        optionsSearchCompras: {
          ValorFiltro: '',
          Proveedor: true,
          Factura: false
        },
        proveedorAdd: {
          nombre: '',
          cedula: '',
          telefono1: '',
          fax1: '',
          email: '',
          direccion: '',
          observaciones: '',
          contacto: '',
          telefonoCont: '',
        },
        billingImportXML: {
          clave: '',
          codigoActividad: '',
          numeroConsecutivo: '',
          fechaEmision: '',
          emisor: {
            nombre: '',
            identificacion: {
              tipo: '',
              numero: ''
            },
            nombreComercial: '',
            ubicacion: {
              provincia: '',
              canton: '',
              distrito: '',
              barrio: '',
              otrasSenas: '',
            },
            telefono: {
              codigoPais: '',
              numTelefono: '',
            },
            fax: {
              codigoPais: '',
              numTelefono: '',
            },
            correoElectronico: ''
          },
          receptor: {
            nombre: '',
            identificacion: {
              tipo: '',
              numero: '',
            },
            nombreComercial: '',
            ubicacion: {
              provincia: '',
              canton: '',
              distrito: '',
              barrio: '',
              otrasSenas: '',
            },
            telefono: {
              codigoPais: '',
              numTelefono: '',
            },
            correoElectronico: ''
          },
          condicionVenta: '',
          plazoCredito: '',
          medioPago: '',
          detalleServicio: [],
          detalleServicioTable: [],
          resumenFactura: {
            codigoTipoMoneda: {
              codigoMoneda: '',
              tipoCambio: '',
            },
            totalServGravados: '',
            totalServExentos: '',
            totalServExonerado: '',
            totalMercanciasGravadas: '',
            totalMercanciasExentas: '',
            totalMercExonerada: '',
            totalGravado: '',
            totalExento: '',
            totalExonerado: '',
            totalVenta: '',
            totalDescuentos: '',
            totalVentaNeta: '',
            totalImpuesto: '',
            totalIVADevuelto: '',
            totalComprobante: '',
          }
        }
      }

    default:
      return state;
  }
};