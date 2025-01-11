
export class RelatedArticles {

    constructor( id, codigoPrincipal, codigo, codArticulo, descripcion, cantidad, estado, usuarioCreacion, isNewEdit) {
        this.id              = id;
        this.codigoPrincipal = codigoPrincipal;
        this.codigo          = codigo;
        this.codArticulo     = codArticulo;
        this.descripcion     = descripcion;
        this.cantidad        = cantidad;
        this.estado          = estado;
        this.usuarioCreacion = usuarioCreacion || '';
        this.isNewEdit       = isNewEdit || false;
    }

    toJson() {
      return {
        id                : this.id,
        codigoPrincipal   : this.codigoPrincipal,
        codigo            : this.codigo,
        codArticulo       : this.codArticulo,
        descripcion       : this.descripcion,
        cantidad          : this.cantidad,
        estado            : this.estado,
        idUsuarioCreacion : this.usuarioCreacion
      }
    }
}

//Example Json
// {
//    "codigoPrincipal": 124,
//    "codigo": 1245,
//    "codArticulo": "3434",
//    "descripcion": "Test",
//    "cantidad": 1,
//    "estado": true,
//    "idUsuarioCreacion": "testPostman"
// }