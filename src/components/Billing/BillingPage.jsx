import { createRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BillingConditions } from './BillingConditions'
import { BillingFooter } from './BillingFooter'
import { BillingHeader } from './BillingHeader'
import { BillingHeaderCustomer } from './BillingHeaderCustomer'
import { BillingItems } from './BillingItems'
import { BillingTotals } from './BillingTotals'

import { SetAddArrayStateBilling } from '../../actions/billing'

export const BillingPage = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    var textInputPrecioUnit = createRef(null);
    var textInputDescuento = createRef(null);
    var textInputCantidad = createRef(null);
    var textInputCodigo = createRef(null);

    const {
        autoFocusPrecioUnit,
        autoFocusDesc,
        autoFocusCantidad,
        autoFocusCodigo,
        billings
    } = useSelector(state => state.billing);

    const {
        currentTab,
        tabs
    } = useSelector(state => state.tabs);

    const initialStateBilling = {
        activeButtonSave: false,
        modalAddCustomerOpen: false,
        modalEditCustomerOpen: false,
        modalMAGCustomerOpen: false,
        modalAddCorreosOpen: false,
        modalEditCartaExoneracionOpen: false,
        cedulaBuscar: '',
        openSearchCustomerBilling: false,
        hasCustomerBilling: false,
        disableInputsHeader: true,
        visiblePassword: false,
        disableInputsUser: false,
        extranjero: false,
        enableItems: false,
        startOpening: false,
        usuarioFacturacion: {
            id: 0,
            claveInterna: ''
        },
        clienteFacturacion: {
            idTipoCliente: 0,
            cedula: '',
            nombre: '',
            telefono: '',
            email: '',
            direccion: ''
        },
        clienteFacturacionEdit: {
            identificacion: 0,
            idTipoCliente: 0,
            telefono: null,
            email: null,
            direccion: null,
            correocuentas: null,
            correoFacturacion: null,
            agente: null,
            sinAgente: false,
            actualizado: false,
            fallecido: false,
            enviaRecibo: false,
            correoRecibo: null,
            tipoPrecio: null,
            descuentoEspcial: null,
            inactivo: false,
            mag: false,
            abierto: false
        },
        correoComprobanteActual: '',
        correosComprobantes: [],
        isCorreosComprobanteEdit: false,
        seletedCorreosComprobanteEdit: null,
        isOpenSearchInventoryBilling: false,
        autoFocusPrecioUnit: false,
        autoFocusDesc: false,
        autoFocusCantidad: false,
        autoFocusCodigo: false,
        isEnableActiveCredito: false,
        isEditDetalleActual: false,
        isDeleteDetalleActual: false,
        changeDetalle: false,
        detalleArticuloActual: {
            CodArticulo: '',
            codFxArticulo: 0,
            Descripcion: '',
            Cantidad: 1.00,
            Precio_Unit: 0.00,
            Descuento: 0.00,
            Monto_Descuento: 0.00,
            Impuesto: 0.00,
            Monto_Impuesto: 0.00,
            Existencias: 0,
            SubtotalGravado: 0.00,
            SubTotalExcento: 0.00,
            SubTotal: 0.00,
            precio_A: 0.00,
            precio_B: 0.00,
            precio_C: 0.00,
            precio_D: 0.00,
            precio_Promo: 0.00,
            promo_Activa: false,
            promo_Inicio: null,
            promo_Finaliza: null,
            max_Descuento: 0.00,
            Mag: false,
            sinDecimal: false,
            soloContado: false,
            receta: false,
            ImpuestoOriginal: 0.00,
            Consignacion: 0.00,
            Id_Bodega: 0,
            ExistenciaBodega: 0.00,
            CantVet: 0.00,
            CantBod: 0.00,
            Precio_UnitOriginal: 0.00,
            idLote: 0,
            nombreLote: ''
        },
        detalleArticuloDelete: {
            Precio_Unit: 0.00,
            Cantidad: 1.00,
            Monto_Impuesto: 0.00,
            Impuesto: 0.00,
            Monto_Descuento: 0.00,
            precio_A: 0.00,
            precio_B: 0.00,
            precio_C: 0.00,
            precio_D: 0.00,
            precio_Promo: 0.00,
            promo_Activa: false,
            promo_Inicio: null,
            promo_Finaliza: null,
            max_Descuento: 0.00,
            Mag: false,
            sinDecimal: false,
            soloContado: false,
            receta: false,
            ImpuestoOriginal: 0.00,
            Consignacion: 0.00,
            Id_Bodega: 0,
            ExistenciaBodega: 0.00,
            CantVet: 0.00,
            CantBod: 0.00,
            idLote: 0,
            nombreLote: ''
        },
        cartaBilling: {
            id: null,
            cedula: null,
            motivo: null,
            numeroDocumento: null,
            fechaEmision: null,
            fechaVence: null,
            porcentajeCompra: 0,
            impuesto: 0,
            nota: null,
            estado: null
        },
        HasCartaExoneracionBilling: false,
        isCostaPets: true,
        factura: {
            encabezado: {
                id: '',
                num_Factura: '',
                fecha: '',
                NumeroCaja: '',
                tipo: 0,
                cod_Cliente: '',
                idTipoCliente: 0,
                nombre_Cliente: '',
                cedula_Usuario: '',
                direccion: '',
                telefono: '',
                observaciones: '',
                empresa: '',
                correoComprobantes: '',
                Cod_Moneda: '',
                Orden: '0',
                Taller: '',
                Mascotas: '',
                agente: false,
                cod_agente: 0,
                PD: false,
                SubTotalGravada: 0,
                SubTotalExento: 0,
                SubTotal: 0,
                Descuento: 0,
                Imp_Venta: 0,
                MontoCupon: '',
                Exonerar: '',
                Total: 0,
                mag: false,
                fallecido: false,
                actualizado: false,
                cliente_Moroso: false,
                ordenCompra: false,
                sinrestriccion: false,
                ficha: 0,
                preventa: true,
                usuario: ''
            },
            detalle: []
        },
        hasHeader: false,
        descuentoGeneral: 0.00,
        AplicaDescuento: false,
        ActualizoCarta: false,
        PosicionActual: 0.00,
        ClienteMAG: {
            nombre: '',
            estado: false,
            fechabaja: ''
        },
        searchFicha: '',
        isPreventaEdit: false,
        startEditing: false,
        lotesByArticulo: []
    }

    useEffect(() => {

        if (autoFocusPrecioUnit) {
            textInputPrecioUnit.current.focus();
        }

        if (autoFocusDesc) {
            textInputDescuento.current.focus();
        }

        if (autoFocusCantidad) {
            textInputCantidad.current.focus();
        }

        if (autoFocusCodigo) {
            textInputCodigo.current.focus();
        }

    }, [autoFocusPrecioUnit, autoFocusDesc, autoFocusCantidad, autoFocusCodigo]);

    useEffect(() => {

        // Se obtiene la cantidad de tabs de Ventas
        const size = tabs.filter(tab => tab.name.includes("Venta")).length;

        // Se valida si es necesario crear un state de billing
        if (billings.length < size) {
            dispatch(SetAddArrayStateBilling({
                idBilling: size,
                ...initialStateBilling,
            }));
        }

    }, [currentTab])

    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    return (

        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <BillingHeader />
                    </div>

                    <div className="card-body">

                        <div className="row mb-2 text-center" >
                            <div className="col-md-8 mb-1">
                                <BillingHeaderCustomer />
                            </div>
                            <div className="col-md-4 mb-1">
                                <BillingConditions />
                            </div>
                        </div>

                        <hr />

                        {
                            (billings[numberScreen] !== undefined) 
                                ? (!billings[numberScreen].isCostaPets)
                                    ?   <div className="row mb-2 text-center" >
                                            <div className="col-md-9 mb-3">
                                                <div className='billing_items'>
                                                    <BillingItems
                                                        inputRefPrecioUnit={textInputPrecioUnit}
                                                        inputRefDescuento={textInputDescuento}
                                                        inputRefCantidad={textInputCantidad}
                                                        inputRefCodigo={textInputCodigo}
                                                    />
                                                </div>
                
                                            </div>
                
                                            <div className="col-md-3 mb-1">
                                                <BillingTotals />
                                            </div>
                
                                        </div>
                                    : null
                                : null
                        }                        

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-12 mb-3 text-center" : "col-md-12 d-none" :  "col-md-12 d-none"}>
                            <div className='billing_items'>
                                <BillingItems
                                    inputRefPrecioUnit={textInputPrecioUnit}
                                    inputRefDescuento={textInputDescuento}
                                    inputRefCantidad={textInputCantidad}
                                    inputRefCodigo={textInputCodigo}
                                />
                            </div>
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-4 ms-auto mb-1 text-center" : "col-md-12 d-none" :  "col-md-12 d-none"}>
                            <BillingTotals />
                        </div>

                    </div>

                    <div className="card-footer cartaP">
                        <BillingFooter />
                    </div>
                </div>
                <br />
            </div>


        </>

    )
}