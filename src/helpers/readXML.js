
const typesXML = {
    clave                 : 'Clave',
    codigoActividad       : 'CodigoActividad',
    numeroConsecutivo     : 'NumeroConsecutivo',
    fechaEmision          : 'FechaEmision',
    emisor                : 'Emisor',
    nombre                : 'Nombre',
    identificacion        : 'Identificacion',
    tipo                  : 'Tipo',
    numero                : 'Numero',
    nombreComercial       : 'NombreComercial',
    ubicacion             : 'Ubicacion',
    provincia             : 'Provincia',
    canton                : 'Canton',
    distrito              : 'Distrito',
    barrio                : 'Barrio',
    otrasSenas            : 'OtrasSenas',
    telefono              : 'Telefono',
    codigoPais            : 'CodigoPais',
    numTelefono           : 'NumTelefono',
    fax                   : 'Fax',
    correoElectronico     : 'CorreoElectronico',
    receptor              : 'Receptor',
    condicionVenta        : 'CondicionVenta',
    plazoCredito          : 'PlazoCredito',
    medioPago             : 'MedioPago',
    detalleServicio       : 'DetalleServicio',
    numeroLinea           : 'NumeroLinea',
    codigo                : 'Codigo',
    codigoComercial       : 'CodigoComercial',
    cantidad              : 'Cantidad',
    unidadMedida          : 'UnidadMedida',
    unidadMedidaComercial : 'UnidadMedidaComercial',
    detalle               : 'Detalle',
    precioUnitario        : 'PrecioUnitario',
    montoTotal            : 'MontoTotal',
    subTotal              : 'SubTotal',
    impuesto              : 'Impuesto',
    codigoTarifa          : 'CodigoTarifa',
    tarifa                : 'Tarifa',
    monto                 : 'Monto',
    impuestoNeto          : 'ImpuestoNeto',
    montoTotalLinea       : 'MontoTotalLinea',

    resumenFactura          : 'ResumenFactura',
    codigoTipoMoneda        : 'CodigoTipoMoneda',
    codigoMoneda            : 'CodigoMoneda',
    tipoCambio              : 'TipoCambio',
    totalServGravados       : 'TotalServGravados',
    totalServExentos        : 'TotalServExentos',
    totalServExonerado      : 'TotalServExonerado',
    totalMercanciasGravadas : 'TotalMercanciasGravadas',
    totalMercanciasExentas  : 'TotalMercanciasExentas',
    totalMercExonerada      : 'TotalMercExonerada',
    totalGravado            : 'TotalGravado',
    totalExento             : 'TotalExento',
    totalExonerado          : 'TotalExonerado',
    totalVenta              : 'TotalVenta',
    totalDescuentos         : 'TotalDescuentos',
    totalVentaNeta          : 'TotalVentaNeta',
    totalImpuesto           : 'TotalImpuesto',
    totalIVADevuelto        : 'TotalIVADevuelto',
    totalComprobante        : 'TotalComprobante',
}

export const parseXML = ( xml ) => {
        
    // Objeto donde se carga el XML
    let xmlUpload = {};

    // Se obtiene los children del objeto FacturaElectronica
    const { children } = xml;

    // Se recorren los children
    children.forEach( ( element ) => {

        switch ( element.name ) {

            case typesXML.clave:
                return xmlUpload = {
                    ...xmlUpload,
                    clave: element.value
                }

            case typesXML.codigoActividad:
                return xmlUpload = {
                    ...xmlUpload,
                    codigoActividad: element.value
                }

            case typesXML.numeroConsecutivo:
                return xmlUpload = {
                    ...xmlUpload,
                    numeroConsecutivo: element.value
                }

            case typesXML.fechaEmision:
                return xmlUpload = {
                    ...xmlUpload,
                    fechaEmision: element.value
                }

            case typesXML.emisor:
                return xmlUpload = {
                    ...xmlUpload,
                    emisor: readEmisorXML( element )
                }

            case typesXML.receptor:
                return xmlUpload = {
                    ...xmlUpload,
                    receptor: readReceptorXML( element )
                }

            case typesXML.condicionVenta:
                return xmlUpload = {
                    ...xmlUpload,
                    condicionVenta: element.value
                }

            case typesXML.plazoCredito:
                return xmlUpload = {
                    ...xmlUpload,
                    plazoCredito: element.value
                }

            case typesXML.medioPago:
                return xmlUpload = {
                    ...xmlUpload,
                    medioPago: element.value
                }

            case typesXML.detalleServicio:
                return xmlUpload = {
                    ...xmlUpload,
                    detalleServicio: readDetalleServicioXML( element )
                }

            case typesXML.resumenFactura:
                return xmlUpload = {
                    ...xmlUpload,
                    resumenFactura: readResumenFacturaXML( element )
                }

            default:
                break;
        }

    });

    // Se crea el listado de costos
    xmlUpload = {
        ...xmlUpload,
        detalleServicio: xmlUpload.detalleServicio.map( detalle => {
            return {
                ...detalle,
                costos: []
            }
        })
    };
    
    // Crear el detalleServicioTable
    let idDetalleServicioTable = 0;
    return xmlUpload = {
        ...xmlUpload,
        detalleServicioTable: xmlUpload.detalleServicio.map( detalle => {
            idDetalleServicioTable++;
            return {
                id: idDetalleServicioTable,
                codigoPro : detalle.codigoComercial.codigo,
                descripcionPro : detalle.detalle,
                codigoInt : '',
                descripcionInt : '',
                presentacion : detalle.unidadMedida,
                cantidad : detalle.cantidad,
                regalia: 0,
                nuevoCosto: 0,
                precioUnitario: detalle.precioUnitario,
                impuestoNeto: (detalle.impuestoNeto !== undefined) ? detalle.impuestoNeto : detalle.impuesto.monto,
                costos: [],
                estado: false
            }
            
        })
    };
}

const readEmisorXML = ( element ) => {

    let emisor = {};

    // Se obtiene los children de Emisor
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.nombre:
                return emisor = {
                    ...emisor,
                    nombre: element.value
                }

            case typesXML.identificacion:
                return emisor = {
                    ...emisor,
                    identificacion: readIdentificacion( element )
                }

            case typesXML.nombreComercial:
                return emisor = {
                    ...emisor,
                    nombreComercial: element.value
                }

            case typesXML.ubicacion:
                return emisor = {
                    ...emisor,
                    ubicacion: readUbicacion( element )
                }

            case typesXML.telefono:
                return emisor = {
                    ...emisor,
                    telefono: readTelefono( element )
                }

            case typesXML.fax:
                return emisor = {
                    ...emisor,
                    fax: readFax( element )
                }

            case typesXML.correoElectronico:
                return emisor = {
                    ...emisor,
                    correoElectronico: element.value
                }
                
            default:
                break;
        }

    });

    return emisor;
}

const readReceptorXML = ( element ) => {

    let receptor = {};

    // Se obtiene los children de receptor
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.nombre:
                return receptor = {
                    ...receptor,
                    nombre: element.value
                }

            case typesXML.identificacion:
                return receptor = {
                    ...receptor,
                    identificacion: readIdentificacion( element )
                }

            case typesXML.nombreComercial:
                return receptor = {
                    ...receptor,
                    nombreComercial: element.value
                }

            case typesXML.ubicacion:
                return receptor = {
                    ...receptor,
                    ubicacion: readUbicacion( element )
                }

            case typesXML.telefono:
                return receptor = {
                    ...receptor,
                    telefono: readTelefono( element )
                }

            case typesXML.fax:
                return receptor = {
                    ...receptor,
                    fax: readFax( element )
                }

            case typesXML.correoElectronico:
                return receptor = {
                    ...receptor,
                    correoElectronico: element.value
                }
                
            default:
                break;
        }

    });
    
    return receptor;
}

const readIdentificacion = ( element ) =>  {

    let identificacion = {};

    // Se obtiene los children de Identificacion
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.tipo:
                return identificacion = {
                    ...identificacion,
                    tipo: element.value
                }

            case typesXML.numero:
                return identificacion = {
                    ...identificacion,
                    numero: element.value
                }
        
            default:
                break;
        }
    });

    return identificacion;

}

const readUbicacion = ( element ) =>  {

    let ubicacion = {};

    // Se obtiene los children de Ubicacion
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.provincia:
                return ubicacion = {
                    ...ubicacion,
                    provincia: element.value
                }

            case typesXML.canton:
                return ubicacion = {
                    ...ubicacion,
                    canton: element.value
                }

            case typesXML.distrito:
                return ubicacion = {
                    ...ubicacion,
                    distrito: element.value
                }

            case typesXML.barrio:
                return ubicacion = {
                    ...ubicacion,
                    barrio: element.value
                }

            case typesXML.otrasSenas:
                return ubicacion = {
                    ...ubicacion,
                    otrasSenas: element.value
                }

            default:
                break;
        }
    });

    return ubicacion;

}

const readTelefono = ( element ) =>  {

    let telefono = {};

    // Se obtiene los children de Telefono
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.codigoPais:
                return telefono = {
                    ...telefono,
                    codigoPais: element.value
                }

            case typesXML.numTelefono:
                return telefono = {
                    ...telefono,
                    numTelefono: element.value
                }

            default:
                break;
        }
    });

    return telefono;

}

const readFax = ( element ) =>  {

    let fax = {};

    // Se obtiene los children de Fax
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.codigoPais:
                return fax = {
                    ...fax,
                    codigoPais: element.value
                }

            case typesXML.numTelefono:
                return fax = {
                    ...fax,
                    numTelefono: element.value
                }

            default:
                break;
        }
    });

    return fax;

}

const readDetalleServicioXML = ( element ) =>  {

    let detalleServicio = [];

    // Se obtiene los children de detalleServicio
    const { children } = element;

    children.forEach( element => {
        
        return detalleServicio = [
                ...detalleServicio,
                readLineaDetalle(element)
            ]

    });
    
    return detalleServicio;

}

const readLineaDetalle = ( element ) =>  {

    let lineaDetalle = {};

    // Se obtiene los children de Linea Detalle
    const { children } = element;

    children.forEach( element => {
        
        switch ( element.name ) {

            case typesXML.numeroLinea:
                return lineaDetalle = {
                    ...lineaDetalle,
                    numeroLinea: element.value
                }

            case typesXML.codigo:
                return lineaDetalle = {
                    ...lineaDetalle,
                    codigo: element.value
                }

            case typesXML.codigoComercial:
                return lineaDetalle = {
                    ...lineaDetalle,
                    codigoComercial: readCodigoComercial( element )
                }

            case typesXML.cantidad:
                return lineaDetalle = {
                    ...lineaDetalle,
                    cantidad: 0,
                    cantidadOriginal: element.value
                }

            case typesXML.unidadMedida:
                return lineaDetalle = {
                    ...lineaDetalle,
                    unidadMedida: element.value
                }

            case typesXML.unidadMedidaComercial:
                return lineaDetalle = {
                    ...lineaDetalle,
                    unidadMedidaComercial: element.value
                }

            case typesXML.detalle:
                return lineaDetalle = {
                    ...lineaDetalle,
                    detalle: element.value
                }

            case typesXML.precioUnitario:
                return lineaDetalle = {
                    ...lineaDetalle,
                    precioUnitario: element.value,
                    nuevoCosto: 0
                }

            case typesXML.montoTotal:
                return lineaDetalle = {
                    ...lineaDetalle,
                    montoTotal: element.value
                }

            case typesXML.subTotal:
                return lineaDetalle = {
                    ...lineaDetalle,
                    subTotal: element.value
                }

            case typesXML.impuesto:
                return lineaDetalle = {
                    ...lineaDetalle,
                    impuesto: readImpuesto( element )
                }

            case typesXML.impuestoNeto:
                return lineaDetalle = {
                    ...lineaDetalle,
                    impuestoNeto: element.value
                }

            case typesXML.montoTotalLinea:
                return lineaDetalle = {
                    ...lineaDetalle,
                    montoTotalLinea: element.value
                }

            default:
                break;
        }
    });
    
    return lineaDetalle;

}

const readCodigoComercial = ( element ) =>  {

    let codigoComercial = {};

    // Se obtiene los children de Codigo Comercial
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.tipo:
                return codigoComercial = {
                    ...codigoComercial,
                    tipo: element.value
                }

            case typesXML.codigo:
                return codigoComercial = {
                    ...codigoComercial,
                    codigo: element.value
                }

            default:
                break;
        }
    });

    return codigoComercial;

}

const readImpuesto = ( element ) =>  {

    let impuesto = {};

    // Se obtiene los children de Impuesto
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.codigo:
                return impuesto = {
                    ...impuesto,
                    codigo: element.value
                }

            case typesXML.codigoTarifa:
                return impuesto = {
                    ...impuesto,
                    codigoTarifa: element.value
                }

            case typesXML.tarifa:
                return impuesto = {
                    ...impuesto,
                    tarifa: element.value
                }

            case typesXML.monto:
                return impuesto = {
                    ...impuesto,
                    monto: element.value
                }

            default:
                break;
        }
    });

    return impuesto;

}

const readResumenFacturaXML = ( element ) =>  {

    let resumenFactura = {};

    // Se obtiene los children de Resumen Factura
    const { children } = element;

    children.forEach( element => {
        
        switch ( element.name ) {

            case typesXML.codigoTipoMoneda:
                return resumenFactura = {
                    ...resumenFactura,
                    codigoTipoMoneda: readCodigoTipoMoneda( element )
                }

            case typesXML.totalServGravados:
                return resumenFactura = {
                    ...resumenFactura,
                    totalServGravados: element.value
                }

            case typesXML.totalServExentos:
                return resumenFactura = {
                    ...resumenFactura,
                    totalServExentos: element.value
                }

            case typesXML.totalServExonerado:
                return resumenFactura = {
                    ...resumenFactura,
                    totalServExonerado: element.value
                }

            case typesXML.totalMercanciasGravadas:
                return resumenFactura = {
                    ...resumenFactura,
                    totalMercanciasGravadas: element.value
                }

            case typesXML.totalMercanciasExentas:
                return resumenFactura = {
                    ...resumenFactura,
                    totalMercanciasExentas: element.value
                }

            case typesXML.totalMercExonerada:
                return resumenFactura = {
                    ...resumenFactura,
                    totalMercExonerada: element.value
                }

            case typesXML.totalGravado:
                return resumenFactura = {
                    ...resumenFactura,
                    totalGravado: element.value
                }

            case typesXML.totalExento:
                return resumenFactura = {
                    ...resumenFactura,
                    totalExento: element.value
                }

            case typesXML.totalExonerado:
                return resumenFactura = {
                    ...resumenFactura,
                    totalExonerado: element.value
                }

            case typesXML.totalVenta:
                return resumenFactura = {
                    ...resumenFactura,
                    totalVenta: element.value
                }

            case typesXML.totalDescuentos:
                return resumenFactura = {
                    ...resumenFactura,
                    totalDescuentos: element.value
                }

            case typesXML.totalVentaNeta:
                return resumenFactura = {
                    ...resumenFactura,
                    totalVentaNeta: element.value
                }

            case typesXML.totalImpuesto:
                return resumenFactura = {
                    ...resumenFactura,
                    totalImpuesto: element.value
                }

            case typesXML.totalIVADevuelto:
                return resumenFactura = {
                    ...resumenFactura,
                    totalIVADevuelto: element.value
                }

            case typesXML.totalComprobante:
                return resumenFactura = {
                    ...resumenFactura,
                    totalComprobante: element.value
                }

            default:
                break;
        }

    });

    return resumenFactura;

}

const readCodigoTipoMoneda = ( element ) =>  {

    let codigoTipoMoneda = {};

    // Se obtiene los children de Codigo Tipo Moneda
    const { children } = element;

    children.forEach( element => {

        switch ( element.name ) {

            case typesXML.codigoMoneda:
                return codigoTipoMoneda = {
                    ...codigoTipoMoneda,
                    codigoMoneda: element.value
                }

            case typesXML.tipoCambio:
                return codigoTipoMoneda = {
                    ...codigoTipoMoneda,
                    tipoCambio: element.value
                }

            default:
                break;
        }
    });

    return codigoTipoMoneda;

}