

import React, { useState, useEffect } from 'react';
import { Document, PDFViewer, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import imgSuvesa from '../../assets/ImgSUVESA.png'
import { differenceInDays, parse } from 'date-fns';

export const ProformaPDF = (data) => {
    const datos = data.data
    const { datosSucursal, datosProforma } = datos;
    const { fechaReporte ,codMoneda, detalle, descuento, impVenta, subTotal, subTotalExento, subTotalGravada, total, transporte, idFactura, quienCotiza } = datosProforma;

    let tipoFactura = "";
    if (datosProforma.contado === true) {
        tipoFactura = "CONTADO"
    } else if (datosProforma.credito === true) {
        tipoFactura = "CRÉDITO"
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
        headerSection: {
            textAlign: 'center',
            justifyContent: 'center',
        },
        headerSubSection: {
            margin: 3,
            fontSize: 12,
            fontWeight: 'extrabold',
        },
        header: {
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'space-between',
        },
        Subheader: {
            flexDirection: 'row',
            margin: 8,
            fontSize: 10,
            fontWeight: 'extrabold',
            justifyContent: 'space-evenly',
            textAlign: 'center'
        },
        blueBox: {
            backgroundColor: '#fff',
            margin: 5,
            borderRadius: 5,
            border: 1,
            borderColor: 'black',
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
        textGray: {
            color: 'gray',
        },
        cellBlack: {
            width: '50%',
            margin: 2,
            color: 'black',
        },
        cellBlackAuth: {
            width: '50%',
            margin: 2,
            color: 'black',
        },
        cellBlue: {
            width: '50%',
            margin: 2,
            color: 'blue',
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
            flexDirection: 'row',
            fontSize: 9,
        },
        containerColumAuth: {
            flexDirection: 'row',
            fontSize: 11,
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
            color: 'red',
            fontSize: 8,
            textAlign: 'center',
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
            padding: 5,
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
            color: '#000000',
        },
        headerPrincipal: {
            flexDirection: 'row',
            margin: 5,
            fontSize: 12,
            fontWeight: 'extrabold',
            justifyContent: 'space-between',
            textAlign: 'center'
        },
    });
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document title={`Cotización Nº${idFactura}`}>
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
                        <View style={styles.blueBox}>
                            <View style={styles.headerSection}>
                                <View style={styles.headerSubSection}>
                                    <Text>Cotización # {datosProforma.idFactura}</Text>
                                </View>
                                <View style={styles.headerSubSection}>
                                    <Text>{fechaReporte}</Text>
                                </View>
                            </View>

                            <View style={styles.blackLine} />

                            <View style={styles.headerPrincipal}>
                                <Text style={styles.textBlue}>*Validez: {datosProforma.validez} Día(s) </Text>
                                <Text>Tiempo Entrega: {datosProforma.tiempoEntrega} Día(s) </Text>
                                <Text>Moneda: {datosProforma.monedaNombre}</Text>
                                <Text>Tipo: {tipoFactura}</Text>
                            </View>

                            <View style={styles.Subheader}>
                                <Text>Cliente: {datosProforma.nombreCliente}</Text>
                                <Text>Teléfono: {datosProforma.telefono}</Text>
                                <Text>Correo: {datosProforma.contacto}</Text>
                            </View>

                        </View>

                        <Text style={styles.headerBlack}>Detalle de Productos</Text>
                        <View style={styles.blackBox}>
                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlue}>Código</Text>
                                    <Text style={styles.cellBlue}>CABYS</Text>
                                    <Text style={styles.cellBlue}>Descripción</Text>
                                    <Text style={styles.cellBlue}>Descuento</Text>
                                    <Text style={styles.cellBlue}>IVA</Text>
                                    <Text style={styles.cellBlue}>Precio Unitario</Text>
                                    <Text style={styles.cellBlue}>Cantidad</Text>
                                    <Text style={styles.cellBlue}>SubTotal</Text>
                                </View>
                                <View style={styles.blackLine} />
                                {detalle.map((producto, index) => {
                                    return (
                                        <View key={index} style={styles.tableRowDeposits}>
                                            <Text style={styles.cellBlackLine}>{producto.Codigo}</Text>
                                            {
                                                producto.Cabys !== "0" ? (
                                                    <Text style={styles.cellBlackLine}>{producto.Cabys}</Text>
                                                ) : (
                                                    <Text style={styles.cellBlackLine}><Text style={styles.textRed}>Sin Registro</Text></Text>
                                                )
                                            }
                                            <Text style={styles.cellBlackLine}>{producto.Descripcion}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.MontoDescuento, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_quantity(producto.Impuesto, 2) + " "}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.PrecioUnit, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_quantity(producto.Cantidad, 2) + " "}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(producto.SubTotal, 2, codMoneda)}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            <View style={styles.blackLine} />
                        </View>

                        <View style={styles.header}>
                            <View style={styles.containerColum}>
                                <Text style={styles.cellBlack}>
                                    <Text style={styles.textBlue}>Observaciones:</Text> Este Documento no tiene ningún valor, no es una Factura de Venta, ni Recibo
                                    de Dinero. Solo sirve para detallar los precios actuales de la mercadería que nos ha
                                    solicitado. Los precios incluídos en esta proforma podrán variar sin previo aviso. La entrega será
                                    según la existencia al momento de la venta.
                                    Estos precios son válidos si se factura toda la orden.

                                </Text>
                            </View>


                            <View style={styles.sectionTotal}>
                                <View style={styles.tableDepositsSubs}>
                                    <View style={styles.tableRowDepositsSubs}>
                                        <Text style={styles.cellLeft}>Sub Total Gravado:</Text>
                                        <Text style={styles.cellLeft}>Sub Total Excento:</Text>
                                        <Text style={styles.cellLeft}>Sub Total:</Text>
                                        <Text style={styles.cellLeft}>Transporte:</Text>
                                        <Text style={styles.cellLeft}>Monto Descuento:</Text>
                                        <Text style={styles.cellLeft}>IVA:</Text>
                                        <Text style={styles.cellLeft}>Total:</Text>
                                    </View>
                                    <View style={styles.tableRowDepositsSubsVal}>
                                        <Text style={styles.cellLeft}>{number_format(subTotalGravada, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(subTotalExento, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(subTotal, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(transporte, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(descuento, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(impVenta, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(total, 2, codMoneda)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>



                        <View style={styles.Subheader}>
                            <View style={styles.containerColumAuth}>
                                <Text style={styles.cellBlackAuth}>
                                    {`${quienCotiza} ________________________________________        Cotizado por:`}
                                </Text>
                            </View>

                            <View style={styles.containerColumAuth}>
                                <Text style={styles.cellBlackAuth}>
                                    {`${quienCotiza} ________________________________________         Autorizado por:`}
                                </Text>
                            </View>
                        </View>



                        <Text style={styles.headerBlackJU}>
                            SEÑORES PRODUCTORES AGROPECUARIOS
                            TENDRÁN DERECHO DE ADQUIRIR LA TARIFA REDUCIDA DEL 1% DEL IMPUESTO SOBRE EL VALOR AGREGADO (IVA) DE LOS
                            BIENES Y SERVICIOS CONTENIDOS EN LOS ANEXOS 1 Y 2 DEL PRESENTE REGLAMENTO.
                            ÚNICAMENTE LAS PERSONAS FÍSICAS O JURÍDICAS QUE SE ENCUENTREN INSCRITAS ANTE EL MINISTERIO DE
                            AGRICULTURA Y GANADERÍA (MAG) COMO PRODUCTOR AGROPECUARIO Y SEAN CONTRIBUYENTES DEL IMPUESTO
                            SOBRE EL VALOR AGREGADO (IVA) ANTE LA DIRECCIÓN GENERAL TRIBUTARIA.
                            DECRETO Nº 41824-H-MAG
                        </Text>

                    </View>
                </Page>
            </Document>
        </PDFViewer >
    );
};
