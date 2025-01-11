import React from 'react';
import { Document, PDFViewer, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

export const ChargeTiqueteCaja = ({ data }) => {
  const { codMoneda, subTotalExento, subTotalGravada, total, descuento, impVenta, detalle, numCaja, id } = data
  let formattedImpVenta;
  let formattedSubExento;
  let formattedSubGravado;
  let formattedTotal;
  let formattedDescuento;

  if (codMoneda === "1") {
    formattedImpVenta = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(impVenta);
    formattedSubExento = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(subTotalExento);
    formattedSubGravado = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(subTotalGravada);
    formattedTotal = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(total);
    formattedDescuento = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(descuento);
  } else {
    formattedImpVenta = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(impVenta);
    formattedSubExento = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subTotalExento);
    formattedSubGravado = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subTotalGravada);
    formattedTotal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
    formattedDescuento = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(descuento);
  }

  function number_format(number, decimals, codMoneda) {
    if (codMoneda === "1") {
      return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
    } else {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    }
  }

  function number_quantity(number, decimals) {
    return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
  }

  const getLetraImpuesto = (impuesto) => {
    switch (impuesto) {
      case 13:
        return 'Y';
      case 1:
        return 'Z';
      case 2:
        return 'X';
      case 0:
        return 'E';
      default:
        return '';
    }
  };


  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: '#F5F5F5',
    },
    section: {
      margin: 2,
      paddingTop: 2,
      paddingBottom: 2,
      flexGrow: 1,
    },
    sectionHeader: {
      flexGrow: 1,
      marginLeft: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
      fontSize: 4,
    },
    totalRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
      fontSize: 5,
    },
    label: {
      marginLeft: 5,
      fontSize: 4,
    },
    value: {
      fontWeight: 'bold',
      marginRight: 5,
      fontSize: 4,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      fontSize: 4,
    },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
      fontSize: 4,
    },
    productDescription: {
      fontWeight: 'black',
      fontSize: 4,
      marginBottom: 2,
      marginLeft: 5,
    },
    productCell: {
      fontSize: 4,
      marginLeft: 4,
      marginRight: 5,
      textAlign: 'center',
      alignContent: 'center'
    },

    productCellTipoI: {
      fontSize: 4,
      marginLeft: 2,
    },
    emptySpace: {
      marginBottom: 2,
    },
    multiCell: {
      marginBottom: 2,
      textAlign: 'center',
      fontSize: 4,
    },
    boldText: {
      marginTop: 1,
      fontWeight: 'extrabold',
      fontSize: 8,
      textAlign: 'center',
    },
  });
  return (
    <PDFViewer style={{ width: '100%', height: '55vh' }}>
      <Document title={`Factura Nº${id}`}>
        <Page size={[100, 245]} style={styles.page}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 6,
                  fontWeight: 'extrabold',
                  marginBottom: 3,
                }}
              >
                {data.sucursal}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 4,
                  fontWeight: 'normal',
                  marginBottom: 3,
                }}
              >
                Cédula: {data.cedulaJ}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 4,
                  fontWeight: 'normal',
                  marginBottom: 2,
                }}
              >
                Teléfono: {data.telefono}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 4,
                  fontWeight: 'normal',
                  marginBottom: 2,
                }}
              >
                {"-------------------------------------------------"}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 4,
                  fontWeight: 'normal',
                  marginBottom: 2,
                }}
              >
                Tiquete Electrónico: {data.tipoFacturaDescripcion}

              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 6,
                  fontWeight: 'extrabold',
                  marginBottom: 2,
                }}
              >
                {data.numFactura}
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 4,
                  fontWeight: 'extrabold',
                  marginBottom: 1,
                }}
              >
                Consecutivo
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 3.4,
                  fontWeight: 'extrabold',
                  marginBottom: 3,
                }}
              >
                {(data.consecutivo) ? data.consecutivo : "No Aplica."}
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 4,
                  fontWeight: 'extrabold',
                  marginBottom: 1,
                }}
              >
                Clave
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 3.4,
                  fontWeight: 'extrabold',
                  marginBottom: 3,
                }}
              >
                {(data.clave) ? data.clave : "No Aplica."}
              </Text>


              <Text
                style={{
                  textAlign: "left",
                  fontSize: 4,
                  fontWeight: 'extrabold',
                  marginBottom: 3,
                }}
              >
                Fecha: {data.fecha}
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 4,
                  fontWeight: 'extrabold',
                  marginBottom: 3,
                }}
              >
                Cliente: {data.nombreCliente}
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  fontSize: 4,
                  fontWeight: 'extrabold',
                  marginBottom: 2,
                }}
              >
                Correo: {(data.correoCliente) ? data.correoCliente : "Sin Registrar."}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: 4,
                  fontWeight: 'normal',
                  marginBottom: 1,
                }}
              >
                {"-------------------------------------------------"}
              </Text>
            </View>

            <Text style={{ textAlign: "center", fontSize: 5, fontWeight: 'extrabold', marginBottom: 3 }}>
              Desgloce de Compra
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Sub Total Exento:</Text>
              <Text style={styles.value}>{formattedSubExento}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Sub Total Gravado:</Text>
              <Text style={styles.value}>{formattedSubGravado}</Text>
            </View>


            <View style={styles.row}>
              <Text style={styles.label}>Descuento:</Text>
              <Text style={styles.value}>{formattedDescuento}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>IVA: </Text>
              <Text style={styles.value}>{formattedImpVenta}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={[styles.label, { flex: 1 }, { fontSize: 5 }, { fontWeight: 'extrabold' }]}>Total:</Text>
              <Text style={[styles.value, { fontSize: 5 }, { fontWeight: 'extrabold' }]}>{formattedTotal}</Text>
            </View>

            <View style={{ marginTop: 2 }}>
              <Text style={{ fontSize: 4, textAlign: 'center' }}>
                Nota: Z=1% X=2% Y=13% E=0%
              </Text>
            </View>

            <Text style={{ fontSize: 4, }}>
              {"--------------------------------------------------------------------------"}
            </Text>
            <Text style={{ textAlign: "center", fontSize: 4, fontWeight: 'extrabold', margin: 1, }}>
              Descripción Producto
            </Text>
            <Text style={{ fontSize: 4, }}>
              {"--------------------------------------------------------------------------"}
            </Text>


            <View style={styles.headerRow}>
              <Text>Cantidad</Text>
              <Text>Precio Unitario</Text>
              <Text>SubTotal</Text>
            </View>

            <View style={styles.separator}>
              <Text style={{ fontSize: 4, marginBottom: 2, }}>
                {"--------------------------------------------------------------------------"}
              </Text>

            </View>

            {detalle.map((producto, index) => (
              <React.Fragment key={index}>
                <Text style={styles.productDescription}>{producto.descripcion}</Text>
                <View style={styles.productRow}>
                  <Text style={styles.productCellTipoI}>{getLetraImpuesto(producto.impuesto)}</Text>
                  <Text style={styles.productCell}>{number_quantity(producto.cantidad, 2) + " "}</Text>
                  <Text style={styles.productCell}>{number_format(producto.precioUnit, 2, codMoneda)}</Text>
                  <Text style={styles.productCell}>{number_format(producto.subTotal, 2, codMoneda)}</Text>
                </View>
                <View style={styles.emptySpace} />
              </React.Fragment>
            ))}


            <Text
              style={{
                textAlign: "center",
                fontSize: 4,
                fontWeight: 'normal',
                marginBottom: 2,
              }}
            >
              {"-------------------------------------------------"}
            </Text>

            <Text style={styles.multiCell}>{`Atendido por: ${data.cajero}`}</Text>
            <Text style={styles.multiCell}>{`Nº Caja: ${numCaja}`}</Text>
            <Text style={styles.multiCell}>{`Autorizado mediante resolución`}</Text>
            <Text style={styles.multiCell}>{`DGT-R-033-2019 de la fecha 20/06/2019`}</Text>
            <Text style={styles.boldText}>{`*${id}*`}</Text>

          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
