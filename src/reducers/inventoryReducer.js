import { types } from '../types/types';

const initialState = {
    currentTabInventory: 'UltimoCosto',
    activeButtonNew: true,
    activeButtonSearch: true,
    activeButtonSave: false,
    activeButtonRemove: false,
    disableInputs: true,
    hasRebajaOtroArt: false,
    isNewInventory: false,
    isEditInventory: false,
    isInventoryDisable: false,
    isOpenSearchModalRebaja: false,
    isOpenSearchModalRelacionados: false,
    pricesSellInventory: [],
    wasFullPricesSell: false,
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
    isEditPriceSell: false,
    hasChangeUtilidadPriceSell: false,
    hasChangePrecioPriceSell: false,
    hasChangePrecioIVPriceSell: false,
    openSearchModal: false,
    optionsSearchInventory: {
        valorfiltro: null,
        tipofiltro: 1,
        descripcion: true,
        ubicacion: false,
        barras: false,
        codigo: false,
        coincidir: 2,
        inicioCampo: false,
        cualquierparte: true,
        mostrarInhabilitados: false,
        mostrarimpuestos: false
    },
    searchInventory: [],
    relatedArticles: {
        codigo: '',
        cod_Articulo: '',
        descripcion: '',
        cantidad: 0,
    },
    seletedrelatedArticles: {
        id: 0,
        codigo: '',
        cod_Articulo: '',
        descripcion: '',
        cantidad: 0,
    },
    isSeletedRelatedArticles: false,
    relatedArticlesInventory: [],
    descripcionRebajaOtro: '',
    filterPresentacionInventory: [],
    filterFamiliasInventory: [],
    filterUbicacionInventory: [],
    filterProveedorInventory: [],
    filterBodegaInventory: [],
    valorfiltroPresentacion: '',
    valorfiltroFamilias: '',
    valorfiltroUbicacion: '',
    valorfiltroProveedor: '',
    valorfiltroBodega: '',
    isOpenModalSearchPresentacion: false,
    isOpenModalSearchFamilias: false,
    isOpenModalSearchUbicacion: false,
    isOpenModalSearchProveedor: false,
    isOpenModalSearchBodega: false,
    categoriaActual: 0,
    isCategoriaEdit: false,
    indexCategoria: null,
    isOpenModalCreateCategory: false,
    codigoBarrasActual: {
        descripcion: '',
        codigoBarras: '',
        tarifa: ''
    },
    isCodigoBarrasEdit: false,
    indexCodigoBarras: null,
    isShowTabCodigoBarras: false,
    isOpenModalSearchCodigoCabys: false,
    valorfiltroCodigoCabys: '',
    filterCodigoCabysInventory: [],
    tiposArticulos: [
        {
            id: 1,
            nombre: "Normal",
        },
        {
            id: 2,
            nombre: "Padre",
        },
        {
            id: 3,
            nombre: "Hijo",
        }
    ],
    idTipoArticuloSelected: 0,
    idBodegaSelectedConvertidor: 0,
    cantidadDisponibleConvertidor: 0,
    calculoRealizadoConvertidor: false,
    cantidadConvertirConvertidor: 0,
    disableInputBodegaConvertidor: false,
    allProductsPadres: [],
    formulaArticles: {
        codigo: '',
        cod_Articulo: '',
        descripcion: '',
        cantidad: 0,
    },
    isSeletedFormulaArticles: false,
    formulaArticlesInventory: [],
    isOpenSearchModalFormula: false,
    codigoPadreSelected: 0,
    isDisableInputStock: true,
    lastStockUpdated: 0,
    isArticleRelated: false,
    lotes: {
        id: 0,
        lote: '',
        vencimiento: '',
        existencia: 0
    },
    isSeletedLotes: false,
    LotesInventory: [],
    formulaLotes: {
        idArticuloFormula: 0,
        idLote: 0,
        idBodega: 0
    },
    lotesByArticleFormula: [],
    disableInputsLotesFormula: false,
    lotesFormula: [],
    showDivConvertir: false,
    cantidadDisponibleConvertidorLotes: 0,
    cantidadConvertirConvertidorLotes: 0,
    inventory: {
        codigo: null,
        cod_Articulo: null,
        barras: null,
        descripcion: null,
        presentaCant: null,
        codPresentacion: null,
        codMarca: null,
        subFamilia: null,
        minima: null,
        puntoMedio: null,
        maxima: null,
        existencia: 0,
        subUbicacion: null,
        observaciones: null,
        monedaCosto: null,
        precioBase: null,
        fletes: null,
        otrosCargos: null,
        costo: 0,
        monedaVenta: null,
        iVenta: null,
        precio_A: null,
        precio_B: null,
        precio_C: null,
        precio_D: null,
        precio_Promo: null,
        promo_Activa: false,
        promo_Inicio: null,
        promo_Finaliza: null,
        max_Comision: null,
        max_Descuento: null,
        servicio: false,
        inhabilitado: false,
        proveedor: null,
        precio_Sugerido: null,
        sugeridoIV: null,
        preguntaPrecio: false,
        lote: false,
        consignacion: false,
        id_Bodega: null,
        existenciaBodega: null,
        maX_Inventario: null,
        maX_Bodega: null,
        cantidadDescarga: null,
        codigoDescarga: null,
        descargaOtro: false,
        cod_PresentOtro: null,
        cantidadPresentOtro: null,
        existenciaForzada: null,
        bloqueado: false,
        // pantalla: false,
        // clinica: false,
        // mascotas: false,
        // receta: false,
        // peces: false,
        // taller: false,
        // barras2: null,
        // barras3: null,
        apartado: null,
        promo3x1: false,
        orden: false,
        bonificado: false,
        encargado: null,
        serie: null,
        armamento: false,
        tienda: false,
        prestamo: null,
        maquinaria: false,
        productos_organicos: false,
        rifa: null,
        promoCON: false,
        promoCRE: false,
        costoReal: 0,
        validaExistencia: false,
        actualizado: false,
        id_Impuesto: null,
        activarBodega2: false,
        existenciaBodega2: null,
        enToma: false,
        usaGalon: false,
        apicarDescuentoTarjeta: false,
        soloContado: false,
        soloConExistencia: false,
        mag: false,
        sinDecimal: false,
        codcabys: null,
        codigoPrestamo: null,
        muestra: false,
        web: false,
        soloUsoInterno: false,
        categorias : [],
        codigoBarras: [],
        idCodigoInternoQvet: '',
        codigoProveedor: '',
        descripcionProveedor: '',
        estado: null,
        idUsuarioCreacion: null,
        idUsuarioModificacion: null,
        esPadre: false,
        codigoPadre: 0,
        stock: 0
    },
    detalleArticuloBodega: {
        idBodega: 0.00,
        descripcion: "",
        existencia: 0.00
    },
    detalle: []
};

export const InventoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SelectTabInventory:
            return {
                ...state,
                currentTabInventory: action.payload.nameTab,
            }

        case types.SetCodigoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigo: action.payload
                }
            }

        case types.SetCod_ArticuloInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    cod_Articulo: action.payload
                }
            }

        case types.SetBarrasInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    barras: action.payload
                }
            }

        case types.SetDescripcionInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    descripcion: action.payload
                }
            }

        case types.SetPresentaCantInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    presentaCant: action.payload
                }
            }

        case types.SetCodPresentacionInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codPresentacion: action.payload
                }
            }

        case types.SetCodMarcaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codMarca: action.payload
                }
            }

        case types.SetSubFamiliaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    subFamilia: action.payload
                }
            }

        case types.SetMinimaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    minima: action.payload
                }
            }

        case types.SetPuntoMedioInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    puntoMedio: action.payload
                }
            }

        case types.SetMaximaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    maxima: action.payload
                }
            }

        case types.SetMaximaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    maxima: action.payload
                }
            }

        case types.SetExistenciaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    existencia: action.payload
                }
            }

        case types.SetSubUbicacionInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    subUbicacion: action.payload
                }
            }

        case types.SetObservacionesInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    observaciones: action.payload
                }
            }

        case types.SetMonedaCostoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    monedaCosto: action.payload
                }
            }

        case types.SetPrecioBaseInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precioBase: action.payload
                }
            }

        case types.SetFletesInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    fletes: action.payload
                }
            }

        case types.SetOtrosCargosInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    otrosCargos: action.payload
                }
            }

        case types.SetCostoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    costo: action.payload
                }
            }

        case types.SetMonedaVentaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    monedaVenta: action.payload
                }
            }

        case types.SetIVentaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    iVenta: action.payload
                }
            }

        case types.SetPrecio_AInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precio_A: action.payload
                }
            }

        case types.SetPrecio_BInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precio_B: action.payload
                }
            }

        case types.SetPrecio_CInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precio_C: action.payload
                }
            }

        case types.SetPrecio_DInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precio_D: action.payload
                }
            }

        case types.SetPrecio_PromoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    precio_Promo: action.payload
                }
            }

        case types.SetPromo_ActivaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promo_Activa: action.payload
                }
            }

        case types.SetPromo_InicioInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promo_Inicio: action.payload
                }
            }

        case types.SetPromo_FinalizaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promo_Finaliza: action.payload
                }
            }

        case types.SetMax_ComisionInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    max_Comision: action.payload
                }
            }

        case types.SetMax_DescuentoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    max_Descuento: action.payload
                }
            }

        case types.SetServicioInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    servicio: action.payload
                }
            }

        case types.SetInhabilitadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    inhabilitado: action.payload
                }
            }

        case types.SetProveedorInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    proveedor: action.payload
                }
            }

        case types.SetSugeridoIVInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    sugeridoIV: action.payload
                }
            }

        case types.SetPreguntaPrecioInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    preguntaPrecio: action.payload
                }
            }

        case types.SetLoteInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    lote: action.payload
                }
            }

        case types.SetConsignacionInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    consignacion: action.payload
                }
            }

        case types.SetId_BodegaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    id_Bodega: action.payload
                }
            }

        case types.SetExistenciaBodegaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    existenciaBodega: action.payload
                }
            }

        case types.SetMaX_InventarioInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    maX_Inventario: action.payload
                }
            }

        case types.SetMaX_BodegaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    maX_Bodega: action.payload
                }
            }

        case types.SetCantidadDescargaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    cantidadDescarga: action.payload
                }
            }

        case types.SetCodigoDescargaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoDescarga: action.payload
                }
            }

        case types.SetDescargaOtroInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    descargaOtro: action.payload
                }
            }

        case types.SetCod_PresentOtroInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    cod_PresentOtro: action.payload
                }
            }

        case types.SetCantidadPresentOtroInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    cantidadPresentOtro: action.payload
                }
            }

        case types.SetExistenciaForzadaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    existenciaForzada: action.payload
                }
            }

        case types.SetBloqueadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    bloqueado: action.payload
                }
            }

        // case types.SetPantallaInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             pantalla: action.payload
        //         }
        //     }

        // case types.SetClinicaInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             clinica: action.payload
        //         }
        //     }

        // case types.SetMascotasInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             mascotas: action.payload
        //         }
        //     }

        // case types.SetRecetaInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             receta: action.payload
        //         }
        //     }

        // case types.SetPecesInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             peces: action.payload
        //         }
        //     }

        // case types.SetTallerInventory:
        //     return {
        //         ...state,
        //         inventory: {
        //             ...state.inventory,
        //             taller: action.payload
        //         }
        //     }

        case types.SetBarras2Inventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    barras2: action.payload
                }
            }

        case types.SetBarras3Inventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    barras3: action.payload
                }
            }

        case types.SetApartadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    apartado: action.payload
                }
            }

        case types.SetPromo3x1Inventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promo3x1: action.payload
                }
            }

        case types.SetOrdenInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    orden: action.payload
                }
            }

        case types.SetBonificadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    bonificado: action.payload
                }
            }

        case types.SetEncargadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    encargado: action.payload
                }
            }

        case types.SetSerieInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    serie: action.payload
                }
            }

        case types.SetArmamentoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    armamento: action.payload
                }
            }

        case types.SetTiendaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    tienda: action.payload
                }
            }

        case types.SetPrestamoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    prestamo: action.payload
                }
            }

        case types.SetMaquinariaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    maquinaria: action.payload
                }
            }

        case types.SetProductos_organicosInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    productos_organicos: action.payload
                }
            }

        case types.SetRifaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    rifa: action.payload
                }
            }

        case types.SetPromoCONInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promoCON: action.payload
                }
            }

        case types.SetPromoCREInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    promoCRE: action.payload
                }
            }

        case types.SetCostoRealInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    costoReal: action.payload
                }
            }

        case types.SetValidaExistenciaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    validaExistencia: action.payload
                }
            }

        case types.SetActualizadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    actualizado: action.payload
                }
            }

        case types.SetId_ImpuestoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    id_Impuesto: action.payload
                }
            }

        case types.SetActivarBodega2Inventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    activarBodega2: action.payload
                }
            }

        case types.SetExistenciaBodega2Inventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    existenciaBodega2: action.payload
                }
            }

        case types.SetEnTomaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    enToma: action.payload
                }
            }

        case types.SetUsaGalonInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    usaGalon: action.payload
                }
            }

        case types.SetApicarDescuentoTarjetaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    apicarDescuentoTarjeta: action.payload
                }
            }

        case types.SetSoloContadoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    soloContado: action.payload
                }
            }

        case types.SetSoloConExistenciaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    soloConExistencia: action.payload
                }
            }

        case types.SetMagInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    mag: action.payload
                }
            }

        case types.SetSinDecimalInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    sinDecimal: action.payload
                }
            }

        case types.SetCodcabysInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codcabys: action.payload
                }
            }

        case types.SetCodigoPrestamoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoPrestamo: action.payload
                }
            }

        case types.SetMuestraInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    muestra: action.payload
                }
            }

        case types.SetWebInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    web: action.payload
                }
            }

        case types.SetSoloUsoInternoInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    soloUsoInterno: action.payload
                }
            }

        case types.SetCodigoIntQVETInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    idCodigoInternoQvet: action.payload
                }
            }

        case types.SetCodigoProInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoProveedor: action.payload
                }
            }

        case types.SetDescripcionProInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    descripcionProveedor: action.payload
                }
            }

        case types.SetEsPadreInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    esPadre: action.payload
                }
            }

        case types.ActiveButtonNewInventory:
            return {
                ...state,
                activeButtonNew: action.payload
            }

        case types.ActiveButtonSearchInventory:
            return {
                ...state,
                activeButtonSearch: action.payload
            }

        case types.ActiveButtonSaveInventory:
            return {
                ...state,
                activeButtonSave: action.payload
            }

        case types.ActiveButtonRemoveInventory:
            return {
                ...state,
                activeButtonRemove: action.payload
            }

        case types.SetDefaultButtonsInventory:
            return {
                ...state,
                // activeCredito : false,
                activeButtonNew: true,
                activeButtonSearch: true,
                activeButtonSave: false,
                activeButtonRemove: false
            }

        case types.DisableInputsInventory:
            return {
                ...state,
                disableInputs: action.payload
            }

        case types.SetHasRebajaOtroArt:
            return {
                ...state,
                hasRebajaOtroArt: action.payload
            }

        case types.CleanStateInventory:
            return {
                ...state,
                inventory: {
                    codigo: "",
                    cod_Articulo: "",
                    barras: "",
                    descripcion: "",
                    presentaCant: "",
                    codPresentacion: "",
                    codMarca: "",
                    minima: "",
                    puntoMedio: "",
                    maxima: "",
                    existencia: 0,
                    subUbicacion: "",
                    observaciones: "",
                    monedaCosto: "",
                    precioBase: "",
                    fletes: "",
                    otrosCargos: "",
                    costo: 0,
                    monedaVenta: "",
                    iVenta: "",
                    precio_A: "",
                    precio_B: "",
                    precio_C: "",
                    precio_D: "",
                    precio_Promo: "",
                    promo_Activa: false,
                    promo_Inicio: "",
                    promo_Finaliza: "",
                    max_Comision: "",
                    max_Descuento: "",
                    servicio: false,
                    inhabilitado: false,
                    proveedor: "",
                    precio_Sugerido: "",
                    sugeridoIV: "",
                    preguntaPrecio: false,
                    lote: false,
                    consignacion: false,
                    id_Bodega: "",
                    existenciaBodega: "",
                    maX_Inventario: "",
                    maX_Bodega: "",
                    cantidadDescarga: "",
                    codigoDescarga: "",
                    descargaOtro: false,
                    cod_PresentOtro: "",
                    cantidadPresentOtro: "",
                    existenciaForzada: "",
                    bloqueado: false,
                    pantalla: false,
                    clinica: false,
                    mascotas: false,
                    receta: false,
                    peces: false,
                    taller: false,
                    barras2: "",
                    barras3: "",
                    apartado: "",
                    promo3x1: false,
                    orden: false,
                    bonificado: false,
                    encargado: "",
                    serie: "",
                    armamento: false,
                    tienda: false,
                    prestamo: "",
                    maquinaria: false,
                    productos_organicos: false,
                    rifa: "",
                    promoCON: false,
                    promoCRE: false,
                    costoReal: 0,
                    validaExistencia: false,
                    actualizado: false,
                    id_Impuesto: "",
                    activarBodega2: false,
                    existenciaBodega2: "",
                    enToma: false,
                    usaGalon: false,
                    apicarDescuentoTarjeta: false,
                    soloContado: false,
                    soloConExistencia: false,
                    mag: false,
                    sinDecimal: false,
                    codcabys: "",
                    codigoPrestamo: "",
                    muestra: false,
                    web: false,
                    soloUsoInterno: false,
                    categorias: [],
                    codigoBarras: [],
                    idCodigoInternoQvet: '',
                    codigoProveedor: '',
                    descripcionProveedor: '',
                    estado: "",
                    idUsuarioCreacion: "",
                    idUsuarioModificacion: "",
                    esPadre: false,
                    codigoPadre: 0,
                    stock: 0
                },
                isShowTabCodigoBarras : false,
                tiposArticulos: [
                    {
                        id: 1,
                        nombre: "Normal",
                    },
                    {
                        id: 2,
                        nombre: "Padre",
                    },
                    {
                        id: 3,
                        nombre: "Hijo",
                    }
                ],
                idTipoArticuloSelected: 1,
                idBodegaSelectedConvertidor: 0,
                cantidadDisponibleConvertidor: 0,
                calculoRealizadoConvertidor: false,
                cantidadConvertirConvertidor: 0,
                disableInputBodegaConvertidor: false,
                allProductsPadres: [],
                formulaArticles: {
                    codigo: '',
                    cod_Articulo: '',
                    descripcion: '',
                    cantidad: 0,
                },
                isSeletedFormulaArticles: false,
                formulaArticlesInventory: [],
                isOpenSearchModalFormula: false,
                codigoPadreSelected: 0,
                isDisableInputStock: true,
                lastStockUpdated: 0,
                lotes: {
                    id: 0,
                    lote: '',
                    vencimiento: '',
                    existencia: 0
                },
                isSeletedLotes: false,
                LotesInventory: [],
                formulaLotes: {
                    idArticuloFormula: 0,
                    idLote: 0,
                    idBodega: 0
                },
                lotesByArticleFormula: [],
                disableInputsLotesFormula: false,
                lotesFormula: [],
                showDivConvertir: false,
                cantidadDisponibleConvertidorLotes: 0,
                cantidadConvertirConvertidorLotes: 0,
                relatedArticles: {
                    codigo: '',
                    cod_Articulo: '',
                    descripcion: '',
                    cantidad: 0,
                },
            }

        case types.IsNewInventory:
            return {
                ...state,
                isNewInventory: action.payload
            }

        case types.SetPreciosVentaInventory:
            return {
                ...state,
                pricesSellInventory: [
                    ...state.pricesSellInventory,
                    action.payload
                ]
            }

        case types.SetWasFullPricesSellInventory:
            return {
                ...state,
                wasFullPricesSell: action.payload
            }

        case types.SelectedPricesSellInventory:
            return {
                ...state,
                priceSell: action.payload,
                selectedpriceSell: action.payload
            }

        case types.SetTipoPricesSellInventory:
            return {
                ...state,
                priceSell: {
                    ...state.priceSell,
                    tipo: action.payload
                }
            }

        case types.SetUtilidadPricesSellInventory:
            return {
                ...state,
                priceSell: {
                    ...state.priceSell,
                    utilidad: action.payload
                }
            }

        case types.SetPrecioPricesSellInventory:
            return {
                ...state,
                priceSell: {
                    ...state.priceSell,
                    precio: action.payload
                }
            }

        case types.SetPrecioIVPricesSellInventory:
            return {
                ...state,
                priceSell: {
                    ...state.priceSell,
                    precioIV: action.payload
                }
            }

        case types.CleanStatePricesSellInventory:
            return {
                ...state,
                priceSell: {
                    tipo: 'A',
                    utilidad: '',
                    precio: '',
                    precioIV: ''
                }
            }

        case types.CleanArrayStatePricesSellInventory:
            return {
                ...state,
                pricesSellInventory: []
            }

        case types.IsEditPricesSellInventory:
            return {
                ...state,
                isEditPriceSell: action.payload
            }

        case types.EditPricesSellInventory:
            return {
                ...state,
                pricesSellInventory: state.pricesSellInventory.map(
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

        case types.RemovePricesSellInventory:
            return {
                ...state,
                pricesSellInventory: state.pricesSellInventory.filter(price => price.tipo !== action.payload)
            }

        case types.SetHasChangeUtilidadPricesSellInventory:
            return {
                ...state,
                hasChangeUtilidadPriceSell: action.payload
            }

        case types.SetHasChangePrecioPricesSellInventory:
            return {
                ...state,
                hasChangePrecioPriceSell: action.payload
            }

        case types.SetHasChangePrecioIVPricesSellInventory:
            return {
                ...state,
                hasChangePrecioIVPriceSell: action.payload
            }

        case types.OpenSearchModalInventory:
            return {
                ...state,
                openSearchModal: true
            }

        case types.CloseSearchModalInventory:
            return {
                ...state,
                openSearchModal: false
            }

        case types.SetValorFiltroSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    valorfiltro: action.payload
                }
            }

        case types.SetDescripcionSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    descripcion: action.payload,
                    ubicacion: false,
                    barras: false,
                    codigo: false,
                    tipofiltro: 1
                }
            }

        case types.SetUbicacionSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    ubicacion: action.payload,
                    descripcion: false,
                    barras: false,
                    codigo: false,
                    tipofiltro: 2
                }
            }

        case types.SetBarrasSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    barras: action.payload,
                    descripcion: false,
                    ubicacion: false,
                    codigo: false,
                    tipofiltro: 3
                }
            }

        case types.SetCodigoSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    codigo: action.payload,
                    descripcion: false,
                    ubicacion: false,
                    barras: false,
                    tipofiltro: 4
                }
            }

        case types.SetInicioCampoSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    inicioCampo: action.payload,
                    cualquierparte: false,
                    coincidir: 1,
                }
            }

        case types.SetCualquierParteSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    cualquierparte: action.payload,
                    inicioCampo: false,
                    coincidir: 2,
                }
            }

        case types.SetMostrarInhabilitadosSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    mostrarInhabilitados: action.payload
                }
            }

        case types.SetMostrarImpuestosSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    ...state.optionsSearchInventory,
                    mostrarimpuestos: action.payload
                }
            }

        case types.CleanOptionsSearchModalInventory:
            return {
                ...state,
                optionsSearchInventory: {
                    valorfiltro: "",
                    tipofiltro: 1,
                    descripcion: true,
                    ubicacion: false,
                    barras: false,
                    codigo: false,
                    coincidir: 2,
                    inicioCampo: false,
                    cualquierparte: true,
                    mostrarInhabilitados: false,
                    mostrarimpuestos: false
                }
            }

        case types.SetSearchInventory:
            return {
                ...state,
                searchInventory: action.payload
            }

        case types.CleanSearchInventory:
            return {
                ...state,
                searchInventory: []
            }

        case types.SelectedSearchInventory:
            return {
                ...state,
                inventory: action.payload
            }

        case types.SetCodigoRelatedArticleInventory:
            return {
                ...state,
                relatedArticles: {
                    ...state.relatedArticles,
                    codigo: action.payload
                }
            }

        case types.SetCodigoArtRelatedArticleInventory:
            return {
                ...state,
                relatedArticles: {
                    ...state.relatedArticles,
                    cod_Articulo: action.payload
                }
            }

        case types.SetDescripcionRelatedArticleInventory:
            return {
                ...state,
                relatedArticles: {
                    ...state.relatedArticles,
                    descripcion: action.payload
                }
            }

        case types.SetCantidadRelatedArticleInventory:
            return {
                ...state,
                relatedArticles: {
                    ...state.relatedArticles,
                    cantidad: action.payload,
                },
            }

        case types.SetRelatedArticleInventory:
            return {
                ...state,
                relatedArticlesInventory: [
                    ...state.relatedArticlesInventory,
                    action.payload
                ]
            }

        case types.SetEditRelatedArticleInventory:
            return {
                ...state,
                relatedArticlesInventory: state.relatedArticlesInventory.map(
                    (related, i) => related.codigo == action.payload.codigo
                        ? {
                            ...related,
                            cantidad : action.payload.cantidad
                        } 
                        : related
                )
            }

        case types.CleanInputsRelatedArticleInventory:
            return {
                ...state,
                relatedArticles: {
                    codigo: '',
                    cod_Articulo: '',
                    descripcion: '',
                    cantidad: 0,
                },
            }

        case types.SelectedRelatedArticleInventory:
            return {
                ...state,
                seletedrelatedArticles: action.payload
            }

        case types.IsSelectedRelatedArticleInventory:
            return {
                ...state,
                isSeletedRelatedArticles: action.payload
            }

        case types.RemoveRelatedArticleInventory:
            return {
                ...state,
                relatedArticlesInventory: state.relatedArticlesInventory.filter(
                    article => article.codigo !== action.payload)
            }

        case types.SetArrayRelatedArticleInventory:
            return {
                ...state,
                relatedArticlesInventory: action.payload
            }

        case types.CleanRelatedArticleInventory:
            return {
                ...state,
                relatedArticlesInventory: []
            }

        case types.IsEditInventory:
            return {
                ...state,
                isEditInventory: action.payload
            }

        case types.IsInventoryDisable:
            return {
                ...state,
                isInventoryDisable: action.payload
            }

        case types.IsOpenSearchModalRebaja:
            return {
                ...state,
                isOpenSearchModalRebaja: action.payload
            }

        case types.SetDescripcionRebajaOtro:
            return {
                ...state,
                descripcionRebajaOtro: action.payload
            }

        case types.IsOpenSearchModalRelacionados:
            return {
                ...state,
                isOpenSearchModalRelacionados: action.payload
            }

        case types.SetDefaultPresentacionFilterInventory:
            return {
                ...state,
                filterPresentacionInventory: action.payload
            }

        case types.SetSearchPresentacionFilterInventory:
            return {
                ...state,
                filterPresentacionInventory: action.payload.presentacionesInventory.filter(presentation => presentation.presentaciones.includes(action.payload.valorfiltroPresentacion.toUpperCase()))
            }

        case types.SetValorFiltroPresentacionInventory:
            return {
                ...state,
                valorfiltroPresentacion: action.payload
            }

        case types.SetOpenModalSearchPresentacionInventory:
            return {
                ...state,
                isOpenModalSearchPresentacion: action.payload
            }

        case types.CleanValorFiltroPresentacionInventory:
            return {
                ...state,
                valorfiltroPresentacion: ''
            }

        case types.SetDefaultFamiliasFilterInventory:
            return {
                ...state,
                filterFamiliasInventory: action.payload
            }

        case types.SetSearchFamiliasFilterInventory:
            return {
                ...state,
                filterFamiliasInventory: action.payload.subFamiliasInventory.filter(family => family.descripcion.includes(action.payload.valorfiltroFamilias.toUpperCase()))
            }

        case types.SetValorFiltroFamiliasInventory:
            return {
                ...state,
                valorfiltroFamilias: action.payload
            }

        case types.SetOpenModalSearchFamiliasInventory:
            return {
                ...state,
                isOpenModalSearchFamilias: action.payload
            }

        case types.CleanValorFiltroFamiliasInventory:
            return {
                ...state,
                valorfiltroFamilias: ''
            }

        case types.SetDefaultUbicacionFilterInventory:
            return {
                ...state,
                filterUbicacionInventory: action.payload
            }

        case types.SetSearchUbicacionFilterInventory:
            return {
                ...state,
                filterUbicacionInventory: action.payload.subUbicacionesInventory.filter(family => family.descripcion.includes(action.payload.valorfiltroUbicacion.toUpperCase()))
            }

        case types.SetValorFiltroUbicacionInventory:
            return {
                ...state,
                valorfiltroUbicacion: action.payload
            }

        case types.SetOpenModalSearchUbicacionInventory:
            return {
                ...state,
                isOpenModalSearchUbicacion: action.payload
            }

        case types.CleanValorFiltroUbicacionInventory:
            return {
                ...state,
                valorfiltroUbicacion: ''
            }

        case types.SetDefaultProveedorFilterInventory:
            return {
                ...state,
                filterProveedorInventory: action.payload
            }

        case types.SetSearchProveedorFilterInventory:
            return {
                ...state,
                filterProveedorInventory: action.payload.proveedoresInventory.filter(family => family.descripcion.includes(action.payload.valorfiltroProveedor.toUpperCase()))
            }

        case types.SetValorFiltroProveedorInventory:
            return {
                ...state,
                valorfiltroProveedor: action.payload
            }

        case types.SetOpenModalSearchProveedorInventory:
            return {
                ...state,
                isOpenModalSearchProveedor: action.payload
            }

        case types.CleanValorFiltroProveedorInventory:
            return {
                ...state,
                valorfiltroProveedor: ''
            }

        case types.SetDefaultBodegaFilterInventory:
            return {
                ...state,
                filterBodegaInventory: action.payload
            }

        case types.SetSearchBodegaFilterInventory:
            return {
                ...state,
                filterBodegaInventory: action.payload.bodegasInventory.filter(bodega => bodega.nombreBodega.includes(action.payload.valorfiltroBodega.toUpperCase()))
            }

        case types.SetValorFiltroBodegaInventory:
            return {
                ...state,
                valorfiltroBodega: action.payload
            }

        case types.SetOpenModalSearchBodegaInventory:
            return {
                ...state,
                isOpenModalSearchBodega: action.payload
            }

        case types.CleanValorFiltroBodegaInventory:
            return {
                ...state,
                valorfiltroBodega: ''
            }

        case types.SetIdBodegaDetalleArticuloBodega:
            return {
                ...state,
                detalleArticuloBodega: {
                    ...state.detalleArticuloBodega,
                    idBodega: action.payload,
                },
            }

        case types.SetDescripcionDetalleArticuloBodega:
            return {
                ...state,
                detalleArticuloBodega: {
                    ...state.detalleArticuloBodega,
                    descripcion: action.payload,
                },
            }

        case types.SetExistenciaDetalleArticuloBodega:
            return {
                ...state,
                detalleArticuloBodega: {
                    ...state.detalleArticuloBodega,
                    existencia: action.payload,
                },
            }

        case types.SetAddDetalleArticuloBodega:
            return {
                ...state,
                detalle: [
                    ...state.detalle,
                    action.payload
                ]
            }

        case types.SetAddCategoriaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    categorias: [
                        ...state.inventory.categorias,
                        action.payload
                    ]
                }
            }

        case types.SetCategoriaActualInventory:
            return {
                ...state,
                categoriaActual : action.payload
            }

        case types.CleanCategoriaActualInventory:
            return {
                ...state,
                categoriaActual : 0
            }

        case types.IsCategoriaEditInventory:
            return {
                ...state,
                isCategoriaEdit : action.payload
            }

        case types.SetIndexCategoriaInventory:
            return {
                ...state,
                indexCategoria : action.payload
            }

        case types.SetEditCategoriaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    categorias: state.inventory.categorias.map(
                        (category, i) => i === action.payload.index
                            ? {
                                ...category,
                                id: action.payload.id,
                                descripcion: action.payload.descripcion
                            }
                            : category)
                }
            }

        case types.SetDeleteCategoriaInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    categorias: state.inventory.categorias.filter(
                        category => category.id !== action.payload.id
                            && category.descripcion !== action.payload.descripcion)
                }
            }

        case types.IsOpenModalCreateCategoriaInventory:
            return {
                ...state,
                isOpenModalCreateCategory : action.payload
            }

        case types.SetAddCodigoBarrasInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoBarras: [
                        ...state.inventory.codigoBarras,
                        action.payload
                    ]
                }
            }

        case types.SetDescripcionCodigoBarrasActualInventory:
            return {
                ...state,
                codigoBarrasActual : {
                    ...state.codigoBarrasActual,
                    descripcion: action.payload
                }
            }

        case types.SetCodigoCodigoBarrasActualInventory:
            return {
                ...state,
                codigoBarrasActual : {
                    ...state.codigoBarrasActual,
                    codigoBarras: action.payload
                }
            }

        case types.SetTarifaCodigoBarrasActualInventory:
            return {
                ...state,
                codigoBarrasActual : {
                    ...state.codigoBarrasActual,
                    tarifa: action.payload
                }
            }

        case types.CleanCodigoBarrasActualInventory:
            return {
                ...state,
                codigoBarrasActual : {
                    descripcion: '',
                    codigoBarras: '',
                    tarifa: ''
                }
            }

        case types.IsCodigoBarrasEditInventory:
            return {
                ...state,
                isCodigoBarrasEdit : action.payload
            }

        case types.SetEditCodigoBarrasInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoBarras: state.inventory.codigoBarras.map(
                        (codigo, i) => i === action.payload.index
                            ? {
                                ...codigo,
                                descripcion: action.payload.descripcion,
                                codigoBarras: action.payload.codigoBarras,
                                tarifa: action.payload.tarifa,
                            }
                            : codigo)
                }
            }

        case types.SetIndexCodigoBarrasInventory:
            return {
                ...state,
                indexCodigoBarras : action.payload
            }

        case types.SetDeleteCodigoBarrasInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoBarras: state.inventory.codigoBarras.filter(
                        codigo => codigo.descripcion !== action.payload.descripcion
                            && codigo.codigoBarras !== action.payload.codigoBarras
                            && codigo.tarifa !== action.payload.tarifa)
                }
            }

        case types.IsShowTabCodigoBarrasInventory:
            return {
                ...state,
                isShowTabCodigoBarras : action.payload
            }

        case types.SelectCategoriasSearchInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    categorias: action.payload
                }
            }

        case types.SelectCodigoBarrasSearchInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    codigoBarras: action.payload
                }
            }

        case types.SetOpenModalSearchCodigoCabysInventory:
            return {
                ...state,
                isOpenModalSearchCodigoCabys: action.payload
            }

        case types.SetValorFiltroCodigoCabysInventory:
            return {
                ...state,
                valorfiltroCodigoCabys: action.payload
            }

        case types.SetFilterCodigoCabysIntentory:
            return {
                ...state,
                filterCodigoCabysInventory: action.payload
            }

        case types.CleanStateSearchCodigoCabysInventory:
            return {
                ...state,
                valorfiltroCodigoCabys: '',
                filterCodigoCabysInventory: [],
            }

        case types.SetIdTipoArticuloSelectedIntentory:
            return {
                ...state,
                idTipoArticuloSelected: action.payload
            }

        case types.SetIdBodegaSelectedConvertidorIntentory:
            return {
                ...state,
                idBodegaSelectedConvertidor: action.payload
            }

        case types.SetCantidadDisponiblesConvertidorIntentory:
            return {
                ...state,
                cantidadDisponibleConvertidor: action.payload
            }

        case types.SetCalculoRealizadoConvertidorIntentory:
            return {
                ...state,
                calculoRealizadoConvertidor: action.payload
            }

        case types.SetCantidadConvertirConvertidorIntentory:
            return {
                ...state,
                cantidadConvertirConvertidor: action.payload
            }

        case types.SetDisableInputBodegaConvertidorIntentory:
            return {
                ...state,
                disableInputBodegaConvertidor: action.payload
            }

        case types.SetAllProductsPadreIntentory:
            return {
                ...state,
                allProductsPadres: action.payload
            }

        case types.SetCodigoFormulaArticleInventory:
            return {
                ...state,
                formulaArticles: {
                    ...state.formulaArticles,
                    codigo: action.payload
                }
            }

        case types.SetCodigoArtFormulaArticleInventory:
            return {
                ...state,
                formulaArticles: {
                    ...state.formulaArticles,
                    cod_Articulo: action.payload
                }
            }

        case types.SetDescripcionFormulaArticleInventory:
            return {
                ...state,
                formulaArticles: {
                    ...state.formulaArticles,
                    descripcion: action.payload
                }
            }

        case types.SetCantidadFormulaArticleInventory:
            return {
                ...state,
                formulaArticles: {
                    ...state.formulaArticles,
                    cantidad: action.payload,
                },
            }

        case types.SetIsSelectedFormulaArticleInventory:
            return {
                ...state,
                isSeletedFormulaArticles: action.payload
            }

        case types.SetFormulaArticleInventory:
            return {
                ...state,
                formulaArticlesInventory: [
                    ...state.formulaArticlesInventory,
                    action.payload
                ]
            }

        case types.SetEditFormulaArticleInventory:
            return {
                ...state,
                formulaArticlesInventory: state.formulaArticlesInventory.map(
                    (formula, i) => formula.codigo == action.payload.codigo
                        ? {
                            ...formula,
                            cantidad : action.payload.cantidad
                        } 
                        : formula
                )
            }

        case types.RemoveFormulaArticleInventory:
            return {
                ...state,
                formulaArticlesInventory: state.formulaArticlesInventory.filter(
                    article => article.codigo != action.payload)
            }

        case types.CleanInputsFormulaArticleInventory:
            return {
                ...state,
                formulaArticles: {
                    codigo: '',
                    cod_Articulo: '',
                    descripcion: '',
                    cantidad: 0,
                },
            }

        case types.IsOpenSearchModalFormulaInventory:
            return {
                ...state,
                isOpenSearchModalFormula: action.payload
            }

        case types.SetCodigoPadreSelectedInventory:
            return {
                ...state,
                codigoPadreSelected: action.payload
            }
            

        case types.SetIsDisableInputStockInventory:
            return {
                ...state,
                isDisableInputStock: action.payload
            }

        case types.SetStockInventory:
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    stock: action.payload
                }
            }

        case types.SetLastStockUpdateInventory:
            return {
                ...state,
                lastStockUpdated: action.payload
            }

        case types.SetArrayFormulaArticleInventory:
            return {
                ...state,
                formulaArticlesInventory: action.payload
            }

        case types.SetIsArticleRelatedInventory:
            return {
                ...state,
                isArticleRelated: action.payload
            }

        case types.SetIdLotesInventory:
            return {
                ...state,
                lotes: {
                    ...state.lotes,
                    id: action.payload
                },
            }

        case types.SetNumLoteLotesInventory:
            return {
                ...state,
                lotes: {
                    ...state.lotes,
                    lote: action.payload
                },
            }

        case types.SetVencimientoLotesInventory:
            return {
                ...state,
                lotes: {
                    ...state.lotes,
                    vencimiento: action.payload
                },
            }

        case types.SetExistenciaLotesInventory:
            return {
                ...state,
                lotes: {
                    ...state.lotes,
                    existencia: action.payload
                },
            }

        case types.SetIsSelectedLoteInventory:
            return {
                ...state,
                isSeletedLotes: action.payload
            }

        case types.SetLotesInventory:
            return {
                ...state,
                LotesInventory: [
                    ...state.LotesInventory,
                    action.payload
                ]
            }

        case types.SetArrayLotesInventory:
            return {
                ...state,
                LotesInventory: action.payload
            }

        case types.SetEditLotesInventory:
            return {
                ...state,
                LotesInventory: state.LotesInventory.map(
                    (lote, i) => lote.id == action.payload.id
                        ? {
                            ...lote,
                            lote: action.payload.lote,
                            vencimiento: action.payload.vencimiento,
                            existencia : action.payload.existencia
                        } 
                        : lote
                )
            }

        case types.RemoveLotesInventory:
            return {
                ...state,
                LotesInventory: state.LotesInventory.filter(
                    lote => lote.id != action.payload)
            }

        case types.CleanInputsLotesInventory:
            return {
                ...state,
                lotes: {
                    lote: '',
                    vencimiento: '',
                    existencia: 0
                }
            }

        case types.SetIdArticuloFormulaLotesInventory:
            return {
                ...state,
                formulaLotes: {
                    ...state.formulaLotes,
                    idArticuloFormula: action.payload
                }
            }

        case types.SetIdLoteFormulaLotesInventory:
            return {
                ...state,
                formulaLotes: {
                    ...state.formulaLotes,
                    idLote: action.payload
                }
            }

        case types.SetIdBodegaFormulaLotesInventory:
            return {
                ...state,
                formulaLotes: {
                    ...state.formulaLotes,
                    idBodega: action.payload
                }
            }

        case types.CleanInputsFormulaLotesInventory:
            return {
                ...state,
                formulaLotes: {
                    idArticuloFormula: 0,
                    idLote: 0,
                    idBodega: 0
                }
            }

        case types.SetLotesByArticleFormulaInventory:
            return {
                ...state,
                lotesByArticleFormula: action.payload
            }

        case types.SetDisableInputsLotesFormulaInventory:
            return {
                ...state,
                disableInputsLotesFormula: action.payload
            }

        case types.SetLotesFormulaInventory:
            return {
                ...state,
                lotesFormula: [
                    ...state.lotesFormula,
                    action.payload
                ]
            }

        case types.SetShowDivConvertirLotesFormulaInventory:
            return {
                ...state,
                showDivConvertir: action.payload
            }

        case types.SetCantidadDisponiblesConvertidorLotesIntentory:
            return {
                ...state,
                cantidadDisponibleConvertidorLotes: action.payload
            }

        case types.SetCantidadConvertirConvertidorLotesIntentory:
            return {
                ...state,
                cantidadConvertirConvertidorLotes: action.payload
            }
            

        default:
            return state;
    }

}