import { types } from '../types/types';

const date = new Date();
const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T');

// const newData = [
//     {
//         id: 1708,
//         cliente: "MINOR STEVEN",
//         cedula: "504040273",
//         mascota: "ELI",
//         fecha: "2023-03-29",
//         subtotal: 63788.258,
//         subtotalOriginal: 63788.258,
//         descuento: 0,
//         impuesto: 0,
//         total: 63788.258,
//         responsable: "Dra. Maria Jose Ballestero ",
//         idQvet: 215021,
//         codCliente: null,
//         tipo: null,
//         idempresa: null,
//         idSucursal: null,
//         codMoneda: null,
//         numCaja: null
//     },
//     {
//         id: 1709,
//         cliente: "MINOR STEVEN",
//         cedula: "504040273",
//         mascota: "CLEO",
//         fecha: "2023-03-29",
//         subtotal: 26986.36,
//         subtotalOriginal: 26986.36,
//         descuento: 0,
//         impuesto: 0,
//         total: 26986.36,
//         responsable: "Dra. Ericka Leandro Chaves",
//         idQvet: 215565,
//         codCliente: null,
//         tipo: null,
//         idempresa: null,
//         idSucursal: null,
//         codMoneda: null,
//         numCaja: null
//     },
//     {
//         id: 1716,
//         cliente: "SURY DE LOS ANGELES",
//         cedula: "503550849",
//         mascota: "Shiska",
//         fecha: "2023-03-29",
//         subtotal: 12276.04,
//         subtotalOriginal: 12276.04,
//         descuento: 0,
//         impuesto: 0,
//         total: 12276.04,
//         responsable: "Dra. Ericka Leandro Chaves",
//         idQvet: 233694,
//         codCliente: null,
//         tipo: null,
//         idempresa: null,
//         idSucursal: null,
//         codMoneda: null,
//         numCaja: null,
//         extranjero: false
//     },
// ];

const initialState = {
    albaranes: [],
    albarnesTable: [],
    albaranesFacturar: [],
    facturasPendiente: [],
    albaranActual : {
        id: '',
        idQvet: '',
        cliente: '',
        mascota: '',
        fecha: '',
        total: '',
        listaLineas: [],
    },
    clienteConsultAlbaranes: {
        idTipoCliente: 0,
        cedula: '',
        nombre: '',
        telefono: '',
        email: '',
        direccion: ''
    },
    inventoryActual: {
        codigo: '',
        descripcion: '',
        cantidad: 1,
        precioUnit: '',
        precioSinIVA: '',
        iva: '',
        descuento: 0,
        total: ''
    },
    searchAlbaran: {
        cliente: '',
        mascota: '',
        fecha_desde: isoDateTime[0],
        fecha_hasta: isoDateTime[0],
    },
    openModalAgregarLinea: false,
    openModalGenerarFacturas: false,
    openModalSearchCustomerConsultAlbaranes: false,
    indexCustomerSeletedTable: null,
    checkMarcaTodos: false,
    checkExtrajerosTodos: false,
    isOpenModalSearchInventoryConsultAlbaranes: false,
    autoFocusDescConsultAlbaranes: false,
    autoFocusCantidadConsultAlbaranes: false,
    autoFocusCodigoConsultAlbaranes: false,
    disableInputs: true,
    userClaveInterna: '',
    nameUser: '',
    disableInputPassword: false,
    visiblePassword: false,
    isOpenModalAddCustomer: false,
    aumentoExtranjero: 0,
    cajas: [],
    tipos: [],
    empresas: [],
    bodegas: []
};

export const ConsultAlbaranesReducer = (state = initialState, action) => {

    switch ( action.type ) {

        case types.setAlbaranesConsultAlbaranes:
            return {
                ...state,
                albaranes : action.payload,
                albarnesTable : action.payload,
            }

        case types.openModalConsultAlbaranes:
            return {
                ...state,
                openModalAgregarLinea : action.payload
            }

        case types.checkMarcaTodosConsultAlbaranes:
            return {
                ...state,
                checkMarcaTodos: action.payload
            }

        case types.checkExtranjeroTodosConsultAlbaranes:
            return {
                ...state,
                checkExtrajerosTodos: action.payload
            }

        case types.setAlbaranActualConsultAlbaranes:
            return {
                ...state,
                albaranActual: action.payload
            }

        case types.CleanAlbaranActualConsultAlbaranes:
            return {
                ...state,
                albaranActual: {
                    id: '',
                    idQvet: '',
                    cliente: '',
                    mascota: '',
                    fecha: '',
                    total: '',
                    listaLineas: [],
                },
                inventoryActual: {
                    codigo: '',
                    descripcion: '',
                    cantidad: 1,
                    precioUnit: '',
                    precioSinIVA: '',
                    iva: '',
                    descuento: 0,
                    total: ''
                },
            }

        case types.setOpenModalSearchInventoryConsultAlbaranes:
            return {
                ...state,
                isOpenModalSearchInventoryConsultAlbaranes: action.payload
            }

        case types.setInventoryActualModalConsultAlbaranes:
            return {
                ...state,
                inventoryActual: {
                    ...state.inventoryActual,
                    codigo: action.payload.codigo,
                    descripcion: action.payload.descripcion,
                    precioUnit: action.payload.precioUnit,
                    precioSinIVA: action.payload.precioSinIVA,
                    iva: action.payload.iva,
                    total: action.payload.total
                }
            }

        case types.setCantidadInventoryActualConsultAlbaranes:
            return {
                ...state,
                inventoryActual: {
                    ...state.inventoryActual,
                    cantidad: action.payload
                }
            }
            
        case types.setDescuentoInventoryActualConsultAlbaranes:
            return {
                ...state,
                inventoryActual: {
                    ...state.inventoryActual,
                    descuento: action.payload
                }
            }

        case types.setTotalInventoryActualConsultAlbaranes:
            return {
                ...state,
                inventoryActual: {
                    ...state.inventoryActual,
                    total: action.payload
                }
            }

        case types.setautoFocusDescConsultAlbaranes:
            return {
                ...state,
                autoFocusDescConsultAlbaranes: action.payload
            }

        case types.setautoFocusCantidadConsultAlbaranes:
            return {
                ...state,
                autoFocusCantidadConsultAlbaranes: action.payload
            }

        case types.setautoFocusCodigoConsultAlbaranes:
            return {
                ...state,
                autoFocusCodigoConsultAlbaranes: action.payload
            }

        case types.setAddInventarioListaLineasConsultAlbaranes:
            return {
                ...state,
                albaranActual : {
                    ...state.albaranActual,
                    listaLineas: [
                        ...state.albaranActual.listaLineas,
                        action.payload
                    ],
                },
            }

        case types.setDeleteInventarioListaLineasConsultAlbaranes:
            return {
                ...state,
                albaranActual : {
                    ...state.albaranActual,
                    listaLineas: state.albaranActual.listaLineas.filter(
                        linea => linea.id != action.payload
                    )
                }
            }

        case types.CleanInventarioActualConsultAlbaranes:
            return {
                ...state,
                inventoryActual: {
                    codigo: '',
                    descripcion: '',
                    cantidad: 1,
                    precioUnit: '',
                    precioSinIVA: '',
                    iva: '',
                    descuento: 0,
                    total: ''
                },
            }

        case types.SetTotalAlbaranConsultAlbaranes:
            return {
                ...state,
                albaranActual : {
                    ...state.albaranActual,
                    total: action.payload.total
                },
                albaranes: state.albaranes.map(
                        (albaran) => albaran.id === action.payload.id
                            ? {
                                ...albaran,
                                total: action.payload.total,
                            }
                            : albaran),
                albarnesTable : state.albarnesTable.map(
                        (albaran) => albaran.id === action.payload.id
                            ? {
                                ...albaran,
                                total: action.payload.total,
                            }
                            : albaran),
                albaranesFacturar :  state.albaranesFacturar.map(
                        (albaran) => albaran.id === action.payload.id
                            ? {
                                ...albaran,
                                total: action.payload.total,
                            }
                            : albaran)
            }

        case types.SetclienteConsultAlbaranes:
            return {
                ...state,
                searchAlbaran: {
                    ...state.searchAlbaran,
                    cliente: action.payload
                }
            }

        case types.SetmascotaConsultAlbaranes:
            return {
                ...state,
                searchAlbaran: {
                    ...state.searchAlbaran,
                    mascota: action.payload
                }
            }

        case types.Setfecha_desdeConsultAlbaranes:
            return {
                ...state,
                searchAlbaran: {
                    ...state.searchAlbaran,
                    fecha_desde: action.payload
                }
            }

        case types.Setfecha_hastaConsultAlbaranes:
            return {
                ...state,
                searchAlbaran: {
                    ...state.searchAlbaran,
                    fecha_hasta: action.payload
                }
            }

        case types.SetSearchAlbaranesConsultAlbaranes:
            return {
                ...state,
                albarnesTable: action.payload
            }

        case types.SetMostrarTodosAlbaranesConsultAlbaranes:
            return {
                ...state,
                albarnesTable: state.albaranes
            }

        case types.SetOpenModalGenerarFacturasConsultAlbaranes:
            return {
                ...state,
                openModalGenerarFacturas: action.payload
            }

        case types.SetAddAlbaranFacturarConsultAlbaranes:
            return {
                ...state,
                albaranesFacturar: [
                    ...state.albaranesFacturar,
                    action.payload
                ]
            }

        case types.SetRemoveAlbaranFacturarConsultAlbaranes:
            return {
                ...state,
                albaranesFacturar : state.albaranesFacturar.filter(
                    linea => linea.id != action.payload
                )
            }
        
        case types.SetAddAllAlbaranesFacturarConsultAlbaranes:
            return {
                ...state,
                albaranesFacturar : action.payload
            }

        case types.SetRemoveAllAlbaranesFacturarConsultAlbaranes:
            return {
                ...state,
                albaranesFacturar : []
            }

        case types.SetAddAllFacturasPendientesConsultAlbaranes:
            return {
                ...state,
                facturasPendiente : action.payload
            }

        case types.SetRemoveAllFacturasPendientesConsultAlbaranes:
            return {
                ...state,
                facturasPendiente : []
            }

        case types.SetOpenModalSearchCustomerConsultAlbaranes:
            return {
                ...state,
                openModalSearchCustomerConsultAlbaranes : action.payload
            }

        case types.SetIndexCustomerSeletedTableConsultAlbaranes:
            return {
                ...state,
                indexCustomerSeletedTable : action.payload
            }

        case types.SetUpdateCustomerFacturasPendientesConsultAlbaranes:
            return {
                ...state,
                facturasPendiente : state.facturasPendiente.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            cliente: action.payload.cliente,
                        }
                        : factura)
            }

        case types.SetDisableInputsConsultAlbaranes:
            return {
                ...state,
                disableInputs : action.payload
            }

        case types.SetUserClaveInternaConsultAlbaranes:
            return {
                ...state,
                userClaveInterna : action.payload
            }

        case types.SetNameUserConsultAlbaranes:
            return {
                ...state,
                nameUser : action.payload
            }

        case types.SetDisableInputPasswordConsultAlbaranes:
            return {
                ...state,
                disableInputPassword : action.payload
            }

        case types.SetVisablePasswordConsultAlbaranes:
            return {
                ...state,
                visiblePassword : action.payload
            }

        case types.SetOpenModalAddCustomerConsultAlbaranes:
            return {
                ...state,
                isOpenModalAddCustomer : action.payload
            }

        case types.SetIdTipoClienteCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    idTipoCliente: action.payload
                }
            }

        case types.SetCedulaCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    cedula: action.payload
                }
            }

        case types.SetNombreCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    nombre: action.payload
                }
            }

        case types.SetTelefonoCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    telefono: action.payload
                }
            }

        case types.SetEmailCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    email: action.payload
                }
            }

        case types.SetDireccionCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    ...state.clienteConsultAlbaranes,
                    direccion: action.payload
                }
            }

        case types.SetCleanStateCustomerConsultAlbaranes:
            return {
                ...state,
                clienteConsultAlbaranes: {
                    idTipoCliente: 0,
                    cedula: '',
                    nombre: '',
                    telefono: '',
                    email: '',
                    direccion: ''
                }
            }

        case types.SetAumentoExtranjeroConsultAlbaranes:
            return {
                ...state,
                aumentoExtranjero: action.payload
            }

        case types.SetEditLineaAlbaranConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            subtotal: action.payload.linea.subtotal,
                            total: action.payload.linea.total,
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            subtotal: action.payload.linea.subtotal,
                            total: action.payload.linea.total,
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            subtotal: action.payload.linea.subtotal,
                            total: action.payload.linea.total,
                        }
                        : factura)
            }

        case types.SetEditExtranjeroConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            extranjero: action.payload.extranjero
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            extranjero: action.payload.extranjero
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => i === action.payload.index
                        ? {
                            ...factura,
                            extranjero: action.payload.extranjero
                        }
                        : factura)
            }

        case types.SetEditExisteUsuarioConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            existeUsuario: action.payload.existeUsuario
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            existeUsuario: action.payload.existeUsuario
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            existeUsuario: action.payload.existeUsuario
                        }
                        : factura)
            }

        case types.SetEditCodClienteConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            codCliente: action.payload.codCliente
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            codCliente: action.payload.codCliente
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            codCliente: action.payload.codCliente
                        }
                        : factura)
            }

        case types.SetEditCajaConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            numCaja: action.payload.numCaja
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            numCaja: action.payload.numCaja
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            numCaja: action.payload.numCaja
                        }
                        : factura)
            }

        case types.SetEditTipoConsultaAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            tipo: action.payload.tipo
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            tipo: action.payload.tipo
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            tipo: action.payload.tipo
                        }
                        : factura)
            }

        case types.SetInsertCajasConsultAlbaranes:
            return {
                ...state,
                cajas: action.payload
            }

        case types.SetInsertTiposConsultAlbaranes:
            return {
                ...state,
                tipos: action.payload
            }

        case types.SetEditIdEmpresaConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            idEmpresa: action.payload.idEmpresa
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            idEmpresa: action.payload.idEmpresa
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            idEmpresa: action.payload.idEmpresa
                        }
                        : factura)
            }

        case types.SetInsertEmpresasConsultAlbaranes:
            return {
                ...state,
                empresas: action.payload
            }

        case types.SetEditBodegaConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albarnesTable.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            bodega: action.payload.bodega
                        }
                        : factura),
                albaranes :  state.albaranes.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            bodega: action.payload.bodega
                        }
                        : factura),
                albaranesFacturar :  state.albaranesFacturar.map(
                    (factura, i) => factura.cedula === action.payload.cedula
                        ? {
                            ...factura,
                            bodega: action.payload.bodega
                        }
                        : factura)
            }

        case types.SetInsertBodegasConsultAlbaranes:
            return {
                ...state,
                bodegas: action.payload
            }

        case types.SetInitialStateAlbaranesTableConsultAlbaranes:
            return {
                ...state,
                albarnesTable : state.albaranes
            }

        case types.SetDeleteAlbaranesFacturasConsultAlbaranes:
            return {
                ...state,
                albaranes : state.albaranes.filter( albaran => !action.payload.includes(albaran.id) ),
            }

        case types.CleanStateConsultAlbaranes:
            return {
                albaranes: [],
                albarnesTable: [],
                albaranesFacturar: [],
                facturasPendiente: [],
                albaranActual : {
                    id: '',
                    idQvet: '',
                    cliente: '',
                    mascota: '',
                    fecha: '',
                    total: '',
                    listaLineas: [],
                },
                clienteConsultAlbaranes: {
                    idTipoCliente: 0,
                    cedula: '',
                    nombre: '',
                    telefono: '',
                    email: '',
                    direccion: ''
                },
                inventoryActual: {
                    codigo: '',
                    descripcion: '',
                    cantidad: 1,
                    precioUnit: '',
                    precioSinIVA: '',
                    iva: '',
                    descuento: 0,
                    total: ''
                },
                searchAlbaran: {
                    cliente: '',
                    mascota: '',
                    fecha_desde: isoDateTime[0],
                    fecha_hasta: isoDateTime[0],
                },
                openModalAgregarLinea: false,
                openModalGenerarFacturas: false,
                openModalSearchCustomerConsultAlbaranes: false,
                indexCustomerSeletedTable: null,
                checkMarcaTodos: false,
                checkExtrajerosTodos: false,
                isOpenModalSearchInventoryConsultAlbaranes: false,
                autoFocusDescConsultAlbaranes: false,
                autoFocusCantidadConsultAlbaranes: false,
                autoFocusCodigoConsultAlbaranes: false,
                disableInputs: true,
                userClaveInterna: '',
                nameUser: '',
                disableInputPassword: false,
                visiblePassword: false,
                isOpenModalAddCustomer: false,
                aumentoExtranjero: 0,
                cajas: [],
                tipos: [],
                empresas: [],
                bodegas: []
            }

        default:
            return state;
    }

}