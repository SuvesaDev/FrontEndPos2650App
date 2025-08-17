import Swal from 'sweetalert2';
import { types } from '../types/types';

import { suvesaApi } from '../api';

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions


// Normal Actions
export const SetDisableInputsHeaderConsignment = (value) => ({
    type: types.SetDisableInputsHeaderConsignment,
    payload: value
})

export const SetIsEnableActiveCreditoConsignment = (value) => ({
    type: types.SetIsEnableActiveCreditoConsignment,
    payload: value
})

export const SetSearchFichaConsignment = (value) => ({
    type: types.SetSearchFichaConsignment,
    payload: value
})

export const SetIDFacturaConsignment = (value) => ({
    type: types.SetIDFacturaConsignment,
    payload: value
})

export const Setnum_FacturaConsignment = (value) => ({
    type: types.Setnum_FacturaConsignment,
    payload: value
})

export const SetfechaConsignment = (value) => ({
    type: types.SetfechaConsignment,
    payload: value
})

export const SetNumeroCajaConsignment = (value) => ({
    type: types.SetNumeroCajaConsignment,
    payload: value
})

export const SettipoConsignment = (value) => ({
    type: types.SettipoConsignment,
    payload: value
})

export const Setcod_ClienteConsignment = (value) => ({
    type: types.Setcod_ClienteConsignment,
    payload: value
})

export const SetidTipoClienteConsignment = (value) => ({
    type: types.SetidTipoClienteConsignment,
    payload: value
})

export const Setnombre_ClienteConsignment = (value) => ({
    type: types.Setnombre_ClienteConsignment,
    payload: value
})

export const Setcedula_UsuarioConsignment = (value) => ({
    type: types.Setcedula_UsuarioConsignment,
    payload: value
})

export const SetdireccionConsignment = (value) => ({
    type: types.SetdireccionConsignment,
    payload: value
})

export const SettelefonoConsignment = (value) => ({
    type: types.SettelefonoConsignment,
    payload: value
})

export const SetobservacionesConsignment = (value) => ({
    type: types.SetobservacionesConsignment,
    payload: value
})

export const SetempresaConsignment = (value) => ({
    type: types.SetempresaConsignment,
    payload: value
})

export const SetcorreoComprobantesConsignment = (value) => ({
    type: types.SetcorreoComprobantesConsignment,
    payload: value
})

export const SetCod_MonedaConsignment = (value) => ({
    type: types.SetCod_MonedaConsignment,
    payload: value
})

export const SetOrdenConsignment = (value) => ({
    type: types.SetOrdenConsignment,
    payload: value
})

export const SetSubTotalGravadaConsignment = (value) => ({
    type: types.SetSubTotalGravadaConsignment,
    payload: value
})

export const SetSubTotalExentoConsignment = (value) => ({
    type: types.SetSubTotalExentoConsignment,
    payload: value
})

export const SetSubTotalConsignment = (value) => ({
    type: types.SetSubTotalConsignment,
    payload: value
})

export const SetDescuentoConsignment = (value) => ({
    type: types.SetDescuentoConsignment,
    payload: value
})

export const SetImp_VentaConsignment = (value) => ({
    type: types.SetImp_VentaConsignment,
    payload: value
})

export const SetTotalConsignment = (value) => ({
    type: types.SetTotalConsignment,
    payload: value
})

export const SetmagConsignment = (value) => ({
    type: types.SetmagConsignment,
    payload: value
})

export const SetfallecidoConsignment = (value) => ({
    type: types.SetfallecidoConsignment,
    payload: value
})

export const SetactualizadoConsignment = (value) => ({
    type: types.SetactualizadoConsignment,
    payload: value
})

export const Setcliente_MorosoConsignment = (value) => ({
    type: types.Setcliente_MorosoConsignment,
    payload: value
})

export const SetordenCompraConsignment = (value) => ({
    type: types.SetordenCompraConsignment,
    payload: value
})

export const SetsinrestriccionConsignment = (value) => ({
    type: types.SetsinrestriccionConsignment,
    payload: value
})

export const SetfichaConsignment = (value) => ({
    type: types.SetfichaConsignment,
    payload: value
})

export const SetpreventaConsignment = (value) => ({
    type: types.SetpreventaConsignment,
    payload: value
})

export const SetusuarioConsignment = (value) => ({
    type: types.SetusuarioConsignment,
    payload: value
})

export const SetidDatoFacturacionConsignment = (value) => ({
    type: types.SetidDatoFacturacionConsignment,
    payload: value
})

export const SetCodArticuloDetalleConsignment = (value) => ({
    type: types.SetCodArticuloDetalleConsignment,
    payload: value
})

export const SetcodFxArticuloDetalleConsignment = (value) => ({
    type: types.SetcodFxArticuloDetalleConsignment,
    payload: value
})

export const SetDescripcionDetalleConsignment = (value) => ({
    type: types.SetDescripcionDetalleConsignment,
    payload: value
})

export const SetCantidadDetalleConsignment = (value) => ({
    type: types.SetCantidadDetalleConsignment,
    payload: value
})

export const SetPrecio_UnitDetalleConsignment = (value) => ({
    type: types.SetPrecio_UnitDetalleConsignment,
    payload: value
})

export const SetDescuentoDetalleConsignment = (value) => ({
    type: types.SetDescuentoDetalleConsignment,
    payload: value
})

export const SetMonto_DescuentoDetalleConsignment = (value) => ({
    type: types.SetMonto_DescuentoDetalleConsignment,
    payload: value
})

export const SetImpuestoDetalleConsignment = (value) => ({
    type: types.SetImpuestoDetalleConsignment,
    payload: value
})

export const SetMonto_ImpuestoDetalleConsignment = (value) => ({
    type: types.SetMonto_ImpuestoDetalleConsignment,
    payload: value
})

export const SetExistenciasDetalleConsignment = (value) => ({
    type: types.SetExistenciasDetalleConsignment,
    payload: value
})

export const SetSubtotalGravadoDetalleConsignment = (value) => ({
    type: types.SetSubtotalGravadoDetalleConsignment,
    payload: value
})

export const SetSubTotalExcentoDetalleConsignment = (value) => ({
    type: types.SetSubTotalExcentoDetalleConsignment,
    payload: value
})

export const SetSubTotalDetalleConsignment = (value) => ({
    type: types.SetSubTotalDetalleConsignment,
    payload: value
})

export const Setprecio_ADetalleConsignment = (value) => ({
    type: types.Setprecio_ADetalleConsignment,
    payload: value
})

export const Setprecio_BDetalleConsignment = (value) => ({
    type: types.Setprecio_BDetalleConsignment,
    payload: value
})

export const Setprecio_CDetalleConsignment = (value) => ({
    type: types.Setprecio_CDetalleConsignment,
    payload: value
})

export const Setprecio_DDetalleConsignment = (value) => ({
    type: types.Setprecio_DDetalleConsignment,
    payload: value
})

export const Setprecio_PromoDetalleConsignment = (value) => ({
    type: types.Setprecio_PromoDetalleConsignment,
    payload: value
})

export const SetPrecio_UnitOriginalDetalleConsignment = (value) => ({
    type: types.SetPrecio_UnitOriginalDetalleConsignment,
    payload: value
})

export const SetidLoteDetalleConsignment = (value) => ({
    type: types.SetidLoteDetalleConsignment,
    payload: value
})

export const SetnombreLoteDetalleConsignment = (value) => ({
    type: types.SetnombreLoteDetalleConsignment,
    payload: value
})