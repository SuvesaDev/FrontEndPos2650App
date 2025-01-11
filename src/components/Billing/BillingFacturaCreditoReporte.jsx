
import React from 'react';
import { Document, PDFViewer, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import imgSuvesa from '../../assets/ImgSUVESA.png'
import { count } from 'node-fpdf/src/PHP_CoreFunctions';

export const BillingFacturaCreditoReporte = ({ data }) => {

    const { numFactura, datosSucursal, datosCliente, datosFactura } = data;
    const {
        Cod_agente,
        agente,
        codCliente,
        codMoneda,
        descuento,
        detalle,
        exonerar,
        fecha,
        ficha,
        idEmpresa,
        idSucursal,
        impVenta,
        numApertura,
        numCaja,
        observaciones,
        orden,
        preventa,
        subTotal,
        subTotalExento,
        subTotalGravada,
        taller,
        tipo,
        total,
    } = datosFactura;
    console.log(data)

    function number_format(number, decimals, codMoneda) {
        if (codMoneda == "1" || codMoneda == 1) {
            return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
        } else {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
        }
    }

    function number_quantity(number, decimals) {
        const formattedNumber = new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
        const formattedNumberWithPoint = formattedNumber.replace(',', '.');
        return formattedNumberWithPoint;
    }


    const fechaF = new Date(fecha);
    let fechaSeparada = {};
    if (fechaF instanceof Date && !isNaN(fechaF)) {
        fechaSeparada = {
            fechaF: fechaF.toISOString().split('T')[0],
            horaF: fechaF.toISOString().split('T')[1].split('.')[0],
        };
        console.log(fechaSeparada);
    } else {
        console.error("La cadena de fecha no es válida.");
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#FFF',
        },
        section: {
            margin: 5,
            padding: 5,
            flexGrow: 1,
        },
        sectionN: {
            margin: 10,
            fontSize: 10,
            marginLeft: 170,
        },
        sectionNP: {
            fontSize: 10,
            marginTop: -22,
            marginLeft: 370,
        },
        image: {
            position: 'absolute',
            top: -10,
            left: 10,
            width: 150,
            height: 80,
        },
        blueLine: {
            borderBottom: '1px solid blue',
            margin: '1px 0',
        },
        header: {
            flexDirection: 'row',
            margin: 10,
            fontSize: 12,
            fontWeight: 'extrabold',
            justifyContent: 'space-between',
            textAlign: 'center'
        },
        Subheader: {
            flexDirection: 'row',
            margin: 10,
            fontSize: 10,
            fontWeight: 'extrabold',
            justifyContent: 'space-evenly',
            textAlign: 'center'
        },
        blueBox: {
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 5,
            border: 1,
            borderColor: 'blue',
            color: '#000',
            fontSize: 10,
        },
        blackBox: {
            backgroundColor: '#fff',
            padding: 5,
            borderRadius: 5,
            border: 1,
            borderColor: 'black',
            color: '#000',
            fontSize: 10,
        },
        sectionNBox: {
            fontSize: 10,
            marginLeft: 10,
            padding: 3,
        },
        sectionNPBox: {
            fontSize: 10,
            marginLeft: 10,
            padding: 3,
            paddingBottom: 10,
        },
        sectionCaja: {
            marginTop: -55,
            fontSize: 11,
            marginLeft: 400,
            padding: 5,
            paddingBottom: 5,
        },
        SubsectionCaja: {
            marginTop: -7,
            fontSize: 11,
            marginLeft: 400,
            padding: 5,
            paddingBottom: 15,
        },
        textRed: {
            color: 'red',
        },
        textBlue: {
            color: 'blue',
        },
        cellBlack: {
            width: '50%',
            margin: 2,
            color: 'black',
        },
        cellBlackObservaciones: {
            margin: 2,
            marginTop: -120,
            marginLeft: -4,
            color: 'black',
            textAlign: 'left',
            marginBottom: 100,
            fontSize: 10,
        },
        cellBlackLine: {
            width: '100%',
            margin: 5,
            color: 'black',
        },
        containerRow: {
            flexDirection: 'row',
            fontSize: 8,
        },
        containerColum: {
            flexDirection: 'colum',
            fontSize: 11,
            marginTop: 120,
        },
        textBlock: {
            alignSelf: 'center',
            marginLeft: -100,
        },
        tableDeposits: {
            padding: 2,
            textAlign: 'center',
        },
        tableRowDeposits: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 9,
        },
        blackLine: {
            borderBottom: '1px solid black',
            marginBottom: 5,
        },
        headerBlack: {
            margin: 5,
            marginTop: 10,
            color: 'black',
            fontSize: 13,
            fontWeight: 'extrabold',
            textAlign: 'center',
            justifyContent: 'space-between',
        },

        headerBlackJU: {
            margin: 5,
            color: 'black',
            fontSize: 8,
            fontWeight: 'light',
            textAlign: 'left',
        },


        autorizadoPor: {
            width: '50%',
            textAlign: 'center',
            marginTop: 10,
            borderBottom: '1px solid black',
        },

        sectionTotal: {
            border: '1px solid black',
            paddingRight: 25,
            borderRadius: 5,
            textAlign: 'left',
            justifyContent: 'space-around',
        },
        tableDepositsSubs: {
            padding: 2,
        },
        tableRowDepositsSubs: {
            flexDirection: 'column', // Corregir el typo en 'colum' a 'column'
            fontSize: 11,
            marginRight: 180,
        },
        tableRowDepositsSubsVal: {
            flexDirection: 'column', // Corregir el typo en 'colum' a 'column'
            fontSize: 11,
            marginTop: -155,
            marginLeft: 130,
        },
        cellLeft: {
            width: '100%', // O el ancho deseado
            padding: 5,
        },
    });
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document title={`Factura Crédito Nº${numFactura}`}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Image
                            style={styles.image}
                            src={imgSuvesa}
                            alt="Logo"
                        />
                        <View style={styles.sectionN}>
                            <Text>Empresa: {datosSucursal.nombreComercial}</Text>
                        </View>

                        <View style={styles.sectionNP}>
                            <Text>Cédula Jurídica: {datosSucursal.numeroDocumento}</Text>
                        </View>

                        <View style={styles.sectionN}>
                            <Text>Teléfonos: {datosSucursal.telefono}</Text>
                        </View>

                        <View style={styles.sectionNP}>
                            <Text>Correo: {datosSucursal.email}</Text>
                        </View>

                        <View style={styles.sectionN}>
                            {
                                datosSucursal.direccion ? (
                                    <Text>Dirección: {datosSucursal.direccion}</Text>
                                ) : (
                                    <Text>Dirección: <Text style={styles.textRed}>Sin registrar</Text></Text>
                                )
                            }
                        </View>


                        <View style={styles.blackLine} />

                        <View style={styles.header}>
                            <Text>Factura Crédito <Text style={styles.textRed}>N°{numFactura}</Text></Text>
                            <Text>Fecha: {fechaSeparada.fechaF}</Text>
                            <Text>Hora: {fechaSeparada.horaF}</Text>
                            <Text>N° Caja: <Text style={styles.textRed}>{number_quantity(parseInt(numCaja), 2, "")}</Text></Text>
                        </View>

                        <View style={styles.Subheader}>
                            <Text><Text style={styles.textBlue}>Vendedor:</Text> {datosCliente.vendedorEncargado}</Text>
                            <Text><Text style={styles.textBlue}>Encargado de Compra:</Text> {datosCliente.vendedorEncargado}</Text>
                        </View>

                        <View style={styles.blueBox}>
                            <View style={styles.sectionNBox}>
                                <Text>Cliente: {datosCliente.nombreCliente} ({datosCliente.cedulaCliente})</Text>
                            </View>

                            <View style={styles.sectionNBox}>
                                <Text>Dirección: {datosCliente.direccion}</Text>
                            </View>

                            <View style={styles.sectionNPBox}>
                                {
                                    observaciones ? (
                                        <Text>Observaciones: {observaciones}</Text>
                                    ) : (
                                        <Text>Observaciones: <Text style={styles.textRed}>Sin anotaciones.</Text></Text>
                                    )
                                }
                            </View>

                            <View style={styles.sectionCaja}>
                                {
                                    !orden || orden === "0" ? (
                                        <Text>Orden #: <Text style={styles.textRed}>Sin orden</Text></Text>
                                    ) : (
                                        <Text>Orden #: <Text style={styles.textRed}>{orden}</Text></Text>
                                    )
                                }
                            </View>


                            <View style={styles.SubsectionCaja}>
                                <Text>Vencimiento: <Text style={styles.textRed}>Sin vencimiento</Text></Text>
                            </View>
                        </View>


                        <Text style={styles.headerBlack}>Detalle de Productos</Text>
                        <View style={styles.blackBox}>
                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlack}>Descripción Producto</Text>
                                    <Text style={styles.cellBlack}>Código Producto</Text>
                                    <Text style={styles.cellBlack}>Cantidad</Text>
                                    <Text style={styles.cellBlack}>Precio Unitario</Text>
                                    <Text style={styles.cellBlack}>SubTotal Exento</Text>
                                    <Text style={styles.cellBlack}>SubTotal Gravado</Text>
                                </View>
                                <View style={styles.blackLine} />
                                {detalle.map((producto, index) => {
                                    const excentoP = producto.impuesto;
                                    return (
                                        <View key={index} style={styles.tableRowDeposits}>
                                            {
                                                excentoP === 0 ? (
                                                    <Text style={styles.cellBlackLine}><Text style={styles.textBlue}>(*) </Text>{producto.descripcion}</Text>
                                                ) : (
                                                    <Text style={styles.cellBlackLine}>{producto.descripcion}</Text>
                                                )
                                            }
                                            <Text style={styles.cellBlackLine}>{producto.codArticulo}</Text>
                                            <Text style={styles.cellBlackLine}>{number_quantity(producto.cantidad, 2) + ""}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.precioUnit, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.subTotalExcento, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.subtotalGravado, 2, codMoneda)}</Text>
                                        </View>
                                    );
                                })}
                            </View>

                            <View style={styles.blackLine} />
                            <View style={styles.containerRow}>
                                <Text style={styles.cellBlack} ><Text style={styles.textBlue}>(*) Excento</Text></Text>
                                <View style={styles.textBlock}>
                                    <Text style={styles.cellBlack} >{"= = = = = = = = = > Ultima Línea < = = = = = = = = ="}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.header}>
                            <View style={styles.containerColum}>
                                <Text style={styles.cellBlackObservaciones}>
                                    {
                                        observaciones ? (
                                            <Text><Text style={styles.textBlue}>Observaciones:</Text> Daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa{'\n'}{observaciones}</Text>
                                        ) : (
                                            <Text>Observaciones: <Text style={styles.textRed}>Sin anotaciones.</Text></Text>
                                        )
                                    }
                                </Text>
                                <Text style={styles.cellBlack}>
                                    {datosCliente.vendedorEncargado}
                                    ________________________________________________
                                </Text>
                                <Text style={styles.cellBlack}>
                                    <Text style={styles.textBlue}>Autorizado por:</Text>
                                </Text>
                            </View>
                            <View style={styles.sectionTotal}>
                                <View style={styles.tableDepositsSubs}>
                                    <View style={styles.tableRowDepositsSubs}>
                                        <Text style={styles.cellLeft}>Cantidad Productos:</Text>
                                        <Text style={styles.cellLeft}>Subtotal Exento:</Text>
                                        <Text style={styles.cellLeft}>Subtotal Gravado:</Text>
                                        <Text style={styles.cellLeft}>Subtotal Total:</Text>
                                        <Text style={styles.cellLeft}>Descuento:</Text>
                                        <Text style={styles.cellLeft}>Impuesto:</Text>
                                        <Text style={styles.cellLeft}>Total:</Text>
                                    </View>
                                    <View style={styles.tableRowDepositsSubsVal}>
                                        <Text style={styles.cellLeft}>{number_quantity(count(detalle), 2) + ""}</Text>
                                        <Text style={styles.cellLeft}>{number_format(subTotalExento, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(subTotalGravada, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(subTotal, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(descuento, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(impVenta, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(total, 2, codMoneda)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <Text style={styles.headerBlackJU}>Autorizada mediante resolución 11-97 de la fecha 05/09/1997, gaceta N° 171. Esta factura constituye un título ejecutivo y se rige por el artículo 460 del Código de Comercio apartir de su vencimiento devengara intereses del 3.5% mensual.</Text>

                    </View>
                </Page>
            </Document>
        </PDFViewer >
    );
};
