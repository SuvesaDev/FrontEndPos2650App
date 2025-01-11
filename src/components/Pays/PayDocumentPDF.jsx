

import React, { useState, useEffect } from 'react';
import { Document, PDFViewer, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import imgSuvesa from '../../assets/ImgSUVESA.png'
import { differenceInDays, parse } from 'date-fns';
import { count } from 'node-fpdf/src/PHP_CoreFunctions';

export const PayDocumentPDF = (data) => {
    const datos = data.data
    const { datosSucursal, datosAbonoPago } = datos;
    const { documento, tipoDocumento, cuentaBancaria,
        codigoBanco, saldoCuenta, monto, saldoActual, fecha,
        recibo, cedulaUsuario, codProveedor, usuario,
        detalle, nombreProveedor, codMoneda, montoLetras, cuentaDestino, observaciones, saldoAnterior } = datosAbonoPago;


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
            fontSize: 11,
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
            padding: 1,
        },
        tableRowDepositsSubs: {
            flexDirection: 'column', // Corregir el typo en 'colum' a 'column'
            fontSize: 11,
            marginRight: 180,
        },
        tableRowDepositsSubsVal: {
            flexDirection: 'column', // Corregir el typo en 'colum' a 'column'
            fontSize: 11,
            marginTop: -88,
            marginLeft: 140,
        },
        cellLeft: {
            width: '100%', // O el ancho deseado
            padding: 5,
            color: '#000000',
        },
        headerPrincipal: {
            flexDirection: 'row',
            margin: 5,
            fontSize: 11,
            fontWeight: 'extrabold',
            justifyContent: 'space-between',
            textAlign: 'center'
        },
    });
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document title={`Abono Pagar Nº${documento}`}>
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
                        <View style={styles.headerSection}>
                            <View style={styles.headerSubSection}>
                                <Text>Abono Cuenta por Pagar # {documento}</Text>
                            </View>
                            <View style={styles.headerSubSection}>
                                <Text>{nombreProveedor}</Text>
                            </View>
                        </View>


                        <View style={styles.headerPrincipal}>
                            <Text>Recibo # {recibo}</Text>
                            <Text>Fecha: {fecha}</Text>
                            <Text>Cuenta: {cuentaDestino}</Text>
                            <Text>{tipoDocumento} # {documento}</Text>
                        </View>

                        <Text style={styles.headerBlack}>Detalle de Facturas</Text>
                        <View style={styles.blackBox}>
                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlue}>Nº Factura</Text>
                                    <Text style={styles.cellBlue}>Monto Factura</Text>
                                    <Text style={styles.cellBlue}>Saldo Anterior</Text>
                                    <Text style={styles.cellBlue}>Abono</Text>
                                    <Text style={styles.cellBlue}>Saldo Actual</Text>
                                </View>
                                <View style={styles.blackLine} />
                                {detalle.map((facturaIndividual, index) => {
                                    return (
                                        <View key={index} style={styles.tableRowDeposits}>
                                            <Text style={styles.cellBlackLine}>{facturaIndividual.factura}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(facturaIndividual.montoFactura, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(facturaIndividual.saldoAnt, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(facturaIndividual.abono, 2, codMoneda)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(facturaIndividual.saldoActual, 2, codMoneda)}</Text>
                                        </View>
                                    );
                                })}
                            </View>
                            <View style={styles.blackLine} />
                        </View>

                        <View style={styles.header}>
                            <View style={styles.containerColum}>
                                <Text style={styles.cellBlack}>
                                    <Text style={styles.textBlue}>Usuario: </Text>
                                    {usuario}
                                    {"               "}
                                    <Text style={styles.textBlue}>Observaciones: </Text>
                                    {observaciones}
                                </Text>
                            </View>

                            <View style={styles.sectionTotal}>
                                <View style={styles.tableDepositsSubs}>
                                    <View style={styles.tableRowDepositsSubs}>
                                        <Text style={styles.cellLeft}>Cantidad Facturas:</Text>
                                        <Text style={styles.cellLeft}>Saldo General Anterior:</Text>
                                        <Text style={styles.cellLeft}>Monto Abono:</Text>
                                        <Text style={styles.cellLeft}>Saldo General Actual:</Text>
                                    </View>
                                    <View style={styles.tableRowDepositsSubsVal}>
                                        <Text style={styles.cellBlackLine}>{number_quantity(count(detalle), 2) + ""}</Text>
                                        <Text style={styles.cellLeft}>{number_format(saldoCuenta, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(monto, 2, codMoneda)}</Text>
                                        <Text style={styles.cellLeft}>{number_format(saldoActual, 2, codMoneda)}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer >
    );
};
