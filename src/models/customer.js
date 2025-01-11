
export class Customer {

    constructor(
        identificacion,
        nombre, 
        tipoCliente,
        cedula, 
        observaciones, 
        telefono,
        fax,
        direccion,
        correocuentas,
        correoFacturacion,
        agente,
        actualizado,
        fallecido,
        enviaRecibo,
        correoRecibo,
        tipoPrecio,
        descuentoEspecial,
        inactivo,
        mag,
        abierto,
        codMonedaCredito,
        plazoCredito,
        maxCredito,
        descuento,
        empresa,
        sinrestriccion,
        clienteMoroso,
        ordenCompra,
        idProvincia,
        idCanton,
        idDistrito,
        usuarioCreacion,
        usuarioModificacion
      ) {
        this.identificacion = identificacion || 0,
        this.nombre = nombre;
        this.tipoCliente = tipoCliente || 2,
        this.cedula = cedula;
        this.observaciones = observaciones || null;
        this.telefono = telefono || null,
        this.fax = fax || null,
        this.direccion = direccion || '',
        this.correocuentas = correocuentas || null,
        this.correoFacturacion = correoFacturacion || null,
        this.agente = agente || null,
        this.actualizado = actualizado || false,
        this.fallecido = fallecido || false,
        this.enviaRecibo = enviaRecibo || false,
        this.correoRecibo = correoRecibo || null,
        this.tipoPrecio = tipoPrecio || 1,
        this.descuentoEspecial = descuentoEspecial || 0,
        this.inactivo = inactivo || false,
        this.mag = mag || false,
        this.abierto = (abierto === "1" ) ? true : false || false,
        this.codMonedaCredito = codMonedaCredito || 1,
        this.plazoCredito = plazoCredito || 0,
        this.maxCredito = maxCredito || 0,
        this.descuento = descuento || 0,
        this.empresa = empresa || false,
        this.sinrestriccion = sinrestriccion || false,
        this.clienteMoroso = clienteMoroso || false,
        this.ordenCompra = ordenCompra || false,
        this.idProvincia = idProvincia || 0,
        this.idCanton = idCanton || 0,
        this.idDistrito = idDistrito || 0,
        this.usuarioCreacion = usuarioCreacion || '',
        this.usuarioModificacion = usuarioModificacion || ''
    }

    toJson() {
      return {
        identificacion        : this.identificacion,
        cedula                : this.cedula,
        idTipoIdentificacion  : this.tipoCliente,
        nombre                : this.nombre,
        observaciones         : this.observaciones,
        telefono01            : this.telefono,
        eMail                 : this.correocuentas,
        fax01                 : this.fax,
        direccion             : this.direccion,
        tipoprecio            : this.tipoPrecio,
        agente                : this.agente,
        anulado               : this.inactivo,
        correoComprobante     : this.correoFacturacion,
        actualizado           : this.actualizado,
        relacionados          : true,
        descuentoEspecial     : this.descuentoEspecial,
        mag                   : this.mag,
        enviarRecibo          : this.enviaRecibo,
        correoRecibo          : this.correoRecibo,
        usoInterno            : false,
        fallecido             : this.fallecido,
        abierto               : this.abierto,
        codMonedaCredito      : this.codMonedaCredito,
        plazoCredito          : Number(this.plazoCredito),
        maxCredito            : Number(this.maxCredito),
        descuento             : Number(this.descuento),
        empresa               : this.empresa,
        sinrestriccion        : this.sinrestriccion,
        clienteMoroso         : this.clienteMoroso,
        ordenCompra           : this.ordenCompra,
        idSurcusal            : 0,
        idProvincia           : this.idProvincia,
        idCanton              : this.idCanton,
        idDistrito            : this.idDistrito,
        idUsuarioCreacion     : this.usuarioCreacion,
        idUsuarioModificacion : this.usuarioModificacion
      }
    }
}

// {
//   "cedula": null, 
//   "idTipoIdentificacion": 2,
//   "nombre": "Carlos",
//   "observaciones": "test",
//   "telefono01": "89885718",
//   "eMail": "carlos@gmail.com",
//   "direccion": "test",
//   "tipoprecio": 0,
//   "agente": "test",
//   "anulado": true,
//   "correoComprobante": "carlos@gmail.com",
//   "actualizado": true,
//   "relacionados": true,
//   "descuentoEspecial": 0,
//   "mag": true,
//   "enviarRecibo": true,
//   "correoRecibo": "test",
//   "usoInterno": true,
//   "fallecido": true,

//   "abierto": "SI",
//   "codMonedaCredito": 1,
//   "plazoCredito": 0,
//   "maxCredito": 0,
//   "descuento": 0,
//   "empresa": "test",
//   "sinrestriccion": "test",
//   "clienteMoroso": true,
//   "ordenCompra": true,

//   "idSucursal": 0,
//   "idUsuarioCreacion": "test"
// }