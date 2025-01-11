
export class CartaExoneracion {

    constructor( id, cedula, motivo, numeroDocumento, fechaEmision, fechaVence, porcentajeCompra, impuesto, nota, usuarioCreacion, usuarioModificacion ) {
        this.id                  = id;
        this.cedula              = cedula;
        this.motivo              = motivo;
        this.numeroDocumento     = numeroDocumento;
        this.fechaEmision        = fechaEmision;
        this.fechaVence          = fechaVence;
        this.porcentajeCompra    = porcentajeCompra;
        this.impuesto            = impuesto;
        this.nota                = nota;
        this.usuarioCreacion     = usuarioCreacion || '',
        this.usuarioModificacion = usuarioModificacion || ''
    }

    toJson() {
      return {
        id                  : this.id,
        cedula              : this.cedula,
        idTipoExoneracion   : this.motivo,
        numeroDocumento     : this.numeroDocumento,
        fechaEmision        : this.fechaEmision,
        fechaVence          : this.fechaVence,
        porcentajeCompra    : this.porcentajeCompra,
        impuesto            : this.impuesto,
        nota                : this.nota,
        idUsuarioCreacion     : this.usuarioCreacion,
        idusuarioModificacion : this.usuarioModificacion,
      }
    }
}

//Example Json
// {
//     "cedula": "305230586",
//     "idTipoExoneracion": 1,
//     "numeroDocumento": "345",
//     "fechaEmision": "2022-09-15T02:56:39.625Z",
//     "fechaVence": "2022-09-15T02:56:39.625Z",
//     "porcentajeCompra": 7,
//     "impuesto": 89,
//     "nota": "beto"
// }