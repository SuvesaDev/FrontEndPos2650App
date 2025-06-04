

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font
} from '@react-pdf/renderer';

import costaPetsImage from '../../assets/costaPets.png';
import logoInstagramImage from '../../assets/logoInstagram.png';
import logoFacebookImage from '../../assets/logoFacebook.png';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // regular
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' } // bold
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: 100,
    height: 35,
    marginBottom: 5,
  },
  logoFooter: {
    width: 40,
    height: 30,
    marginBottom: 5,
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colEnd: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  bold: {
    fontWeight: 700,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderBottom: '1 solid #000',
    padding: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '0.5 solid #ccc',
    padding: 4,
  },
  line: {
    height: 1.5,                // Grosor de la línea
    backgroundColor: 'black', // Color de la línea
    marginVertical: 10,       // Espacio arriba y abajo
  },
  colCodigo: { flex: 1, fontSize: 9 },
  colCant: { flex: 1, fontSize: 9 },
  colPres: { flex: 1, fontSize: 9 },
  colDesc: { flex: 2.5, fontSize: 9 },
  colPrecioUni: { flex: 1.5, fontSize: 9 },
  colDescuento: { flex: 1.5, fontSize: 9 },
  colLote: { flex: 1.5, fontSize: 9 },
  colSub: { flex: 1.5, fontSize: 9 },
  colImp: { flex: 1.5, fontSize: 9 },
  totalBox: {
    border: '1 solid #000',
    padding: 3,
    alignSelf: 'flex-end',
    marginTop: 2,
    width: '40%',
    height: '90%',
    backgroundColor: 'black',
    color: 'white'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    fontSize: 10,
    color: '#666',
    flexDirection: 'row',
    gap: 10
  },
});

const BillingPrintPDF = ({ factura }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Header */}
      <view style={styles.section}>
        <View style={styles.row}>
          <Image src={costaPetsImage} style={styles.logo} />
          <Text></Text>
          <View style={styles.colEnd}>
            <Text style={{ fontFamily: 'Roboto', fontSize: 9 }}> 
              <Text style={styles.bold}>Dirección:</Text> 1K ESTE Y 100M SUR DEL SERVICENTRO PACAYAS.
            </Text>
            <Text style={{ fontFamily: 'Roboto', fontSize: 9}}> 
              <Text style={styles.bold}>Teléfono:</Text> +(506) 8834-2842
            </Text>
            <Text style={{ fontFamily: 'Roboto', fontSize: 9}}> 
              <Text style={styles.bold}>Fax:</Text> +(506) 0
            </Text>
            <Text style={{ fontFamily: 'Roboto', fontSize: 9}}> 
              <Text style={styles.bold}>Correo:</Text> ticofoodster@gmail.com
            </Text>
          </View>
        </View>
       
      </view>

      {/* Header cliente */}
      <View style={styles.section}>

        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9, marginBottom: 10 }}>
              <Text style={styles.bold}>TICOFOODSTER CREATIONS MD SR</Text>
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Factura Electrónica N° </Text> {factura.numero}
            </Text>
          </Text>

        </View>

        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Ident. Jurídica:</Text> 3-102-886777
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9}}>
              <Text style={styles.bold }>Clave Numérica:</Text> {factura.clave}
            </Text>
          </Text>

        </View>

        <View style={styles.line} />

        <View style={styles.row}>
        
          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Receptor:</Text> {factura.cliente}
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Fecha de Emisión: </Text> {factura.fecha}
            </Text>
          </Text>

        </View>
        
        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Ident. Física: {factura.Identificacion}</Text> 
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Fecha de Vencimiento: </Text> {factura.fecha}
            </Text>
          </Text>

        </View>
        
        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Teléfono:</Text> +(506) {factura.telefono}
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Condición Venta: </Text> {factura.condiccionVenta}
            </Text>
          </Text>

        </View>

        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Correo:</Text> {factura.email}
            </Text>
          </Text>    

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Días de Crédito: </Text> {factura.diasCredito}
            </Text>
          </Text>    

        </View>

        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Dirección: </Text> {factura.direccion}
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Medio de Pago: </Text> {factura.medioPago}
            </Text>
          </Text>
          

        </View>
        
      </View>

      <View style={styles.section}>

        <View style={styles.tableHeader}>
          <Text style={styles.colCodigo}>Codigo</Text>
          <Text style={styles.colCant}>Cant</Text>
          <Text style={styles.colPres}>Pres</Text>
          <Text style={styles.colDesc}>Descripción</Text>
          <Text style={styles.colPrecioUni}>Precio Unit</Text>
          <Text style={styles.colDescuento}>Descuento</Text>
          <Text style={styles.colLote}>Lote</Text>
          <Text style={styles.colSub}>SubTotal</Text>
          <Text style={styles.colImp}>Impuesto</Text>
        </View>

        {factura.detalles.map((item, idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.colCodigo}>{item.codigo}</Text>
            <Text style={styles.colCant}>{item.cantidad}</Text>
            <Text style={styles.colPres}>{item.presentacion}</Text>
            <Text style={styles.colDesc}>{item.descripcion}</Text>
            <Text style={styles.colPrecioUni}>{item.precioUnitario}</Text>
            <Text style={styles.colDescuento}>{item.descuento}</Text>
            <Text style={styles.colLote}>{item.lote}</Text>
            <Text style={styles.colSub}>{item.subTotal}</Text>
            <Text style={styles.colImp}>{item.impuesto}</Text>
          </View>
        ))}

      </View>

      <View style={styles.line} />

      <View style={styles.section}>

        <View style={styles.row}>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              <Text style={styles.bold}>Notas: </Text> TRANSFERENCIAS:
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              Subtotal Neto
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              ¢ {factura.subTotal}
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              BAC           
            </Text>
          </Text>

          <Text></Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              Total Impuesto
            </Text>
          </Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              ¢ {factura.totalImpuesto}
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <View style={styles.col}>

            <Text style={{ fontFamily: 'Roboto' }}>
              <Text style={{ fontSize: 9 }}>
                CUENTA: 959101981           
              </Text>
            </Text>

            <Text style={{ fontFamily: 'Roboto' }}>
              <Text style={{ fontSize: 9 }}>
                IBAN CR13010200009591019818          
              </Text>
            </Text>

          </View>

          <View style={styles.totalBox}>

            <View style={styles.row}>

              <Text style={{ fontFamily: 'Roboto' }}>
                <Text style={{ fontSize: 12 }}>
                  Total Factura:           
                </Text>
              </Text>

              <Text style={{ fontFamily: 'Roboto' }}>
                <Text style={{ fontSize: 12 }}>
                  ¢ {factura.total}         
                </Text>
              </Text>
              
            </View>

          </View>

        </View>

        <View style={styles.row}>
          
          <Text></Text>

          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              sesenta y siete mil cuatrocientos once COLONES con 58/100
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}>
              SINPE MOVIL:
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}> 
              60876751
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto' }}>
            <Text style={{ fontSize: 9 }}> 
              A NOMBRE DE TICOFOODSTER CREATIONS MD SRL
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto', marginTop: '8' }}>
            <Text style={{ fontSize: 9 }}> 
              NOTIFICAR TRANSFERENCIAS:
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto'}}>
            <Text style={{ fontSize: 9 }}> 
              ticofoodster@gmail.com
            </Text>
          </Text>

        </View>

        <View style={styles.row}>
          
          <Text style={{ fontFamily: 'Roboto', marginTop: '8'}}>
            <Text style={{ fontSize: 9 }}> 
              IMPORTANTE: NO SE ACEPTAN RECLAMOS
              DEL PRODUCTO DESPUES DE 48 HORAS DE
              LA ENTREGA.
            </Text>
          </Text>

        </View>
                
      </View>

      <View style={styles.footer}>

        <Image src={costaPetsImage} style={styles.logoFooter} />
        <Text style={{marginTop: '10'}}>www.costapets.com</Text>

        <Image src={logoInstagramImage} style={styles.logoFooter} />
        <Text style={{marginTop: '10'}}>@costapetscr</Text>

        <Image src={logoFacebookImage} style={styles.logoFooter} />
        <Text style={{marginTop: '10'}}>Costa Pets</Text>

      </View>

    </Page>

  </Document>
);

export default BillingPrintPDF;
