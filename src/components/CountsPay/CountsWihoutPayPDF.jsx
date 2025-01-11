
import React, { useState, useEffect } from 'react';
import { Document, PDFViewer, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import imgSuvesa from '../../assets/ImgSUVESA.png'
import { differenceInDays, parse } from 'date-fns';

export const CountsWihoutPayPDF = (data) => {
    const datos = data.data
    const { datosProveedor, facturas, datosSucursal } = datos

    function number_format(number, decimals) {
        return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
    }
    const [totalActuales, setTotalActuales] = useState(0);
    const [totalTotales, setTotalTotales] = useState(0);
    const [saldoVencido, setSaldoVencido] = useState(0);
    const [saldoPorVencer, setSaldoPorVencer] = useState(0);

    useEffect(() => {
        let sumaActuales = 0;
        let sumaTotales = 0;
        facturas.forEach((factura) => {
            sumaActuales += factura.saldoActual;
            sumaTotales += factura.totalFactura;
        });
        setTotalActuales(sumaActuales);
        setTotalTotales(sumaTotales);
    }, [facturas]);

    useEffect(() => {
        let sumaVencido = 0;
        let sumaPorVencer = 0;
        facturas.forEach((factura) => {
            const fechaFactura = parse(factura.fechaFactura, 'dd/MM/yyyy', new Date());
            const diferenciaDias = differenceInDays(new Date(), fechaFactura);
            const saldoActual = factura.saldoActual;

            if (diferenciaDias >= datosProveedor.plazodiasProveedor) {
                sumaVencido += saldoActual;
            } else {
                sumaPorVencer += saldoActual;
            }
        });

        setSaldoVencido(sumaVencido);
        setSaldoPorVencer(sumaPorVencer);
    }, [facturas, datosProveedor]);

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
        header: {
            margin: 3,
            fontSize: 12,
            fontWeight: 'extrabold',
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
            padding: 2,
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
        sectionCaja: {
            marginTop: -34,
            fontSize: 10,
            marginLeft: 465,
            padding: 3,
            paddingBottom: 5,
        },
        SubsectionCaja: {
            marginTop: -5,
            fontSize: 10,
            marginLeft: 465,
            padding: 5,
        },
        textRed: {
            color: 'red',
        },
        textBlue: {
            color: 'blue',
        },
        textGreen: {
            color: 'green',
        },
        textBlueSaldos: {
            color: 'blue',
        },
        cellBlack: {
            width: '50%',
            margin: 2,
            color: 'black',
        },
        cellBlackLine: {
            width: '100%',
            margin: 5,
            color: 'black',
        },
        cellBlackLineSaldos: {
            width: '100%',
            margin: 3,
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
            alignContent: 'center',
        },
        tableDeposits: {
            padding: 1,
            textAlign: 'center',
        },
        tableRowDeposits: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 9,
        },
        tableRowDepositsTotales: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 10.5,
        },
        tableRowDepositsTotalesSaldos: {
            flexDirection: 'row',
            justifyContent: 'center',
            fontSize: 10.5,
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
            flexDirection: 'column',
            fontSize: 11,
            marginRight: 180,
        },
        tableRowDepositsSubsVal: {
            flexDirection: 'column',
            fontSize: 11,
            marginTop: -133,
            marginLeft: 130,
        },
        cellLeft: {
            width: '100%',
            padding: 5,
        },
    });
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document title={`Reporte cuentas por pagar proveedor: ` + datosProveedor.cedulaProveedor}>
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
                            <View style={styles.header}>
                                <Text>ESTADOS DE CUENTA POR PAGAR</Text>
                            </View>

                            <View style={styles.header}>
                                <Text style={styles.textBlue}>Facturación por proveedor</Text>
                            </View>

                            <View style={styles.header}>
                                <Text>{datos.fechaActual}</Text>
                            </View>
                        </View>



                        <View style={styles.blueBox}>
                            <View style={styles.sectionNBox}>
                                <Text>Proveedor: {datosProveedor.nombreProveedor}</Text>
                            </View>

                            <View style={styles.sectionNBox}>
                                {
                                    datosProveedor.direccionProveedor ? (
                                        <Text>Dirección: {datosProveedor.direccionProveedor}</Text>
                                    ) : (
                                        <Text>Dirección: <Text style={styles.textRed}>Sin registrar</Text></Text>
                                    )
                                }
                            </View>

                            <View style={styles.sectionCaja}>
                                {
                                    datosProveedor.telefonoProveedor ? (
                                        <Text>Teléfono: {datosProveedor.telefonoProveedor}</Text>
                                    ) : (
                                        <Text>Teléfono: <Text style={styles.textRed}>Sin registrar</Text></Text>
                                    )
                                }
                            </View>

                            <View style={styles.SubsectionCaja}>
                                <Text>Plazo Días: <Text style={styles.textBlue}>{datosProveedor.plazodiasProveedor}</Text></Text>
                            </View>
                        </View>


                        <Text style={styles.headerBlack}>Detalle de Facturas</Text>
                        <View style={styles.blackBox}>
                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlack}>Factura</Text>
                                    <Text style={styles.cellBlack}>Fecha</Text>
                                    <Text style={styles.cellBlack}>Días</Text>
                                    <Text style={styles.cellBlack}>Total</Text>
                                    <Text style={styles.cellBlack}>Abonos</Text>
                                    <Text style={styles.cellBlack}>Notas CRE</Text>
                                    <Text style={styles.cellBlack}>Notas DEB</Text>
                                    <Text style={styles.cellBlack}>Devolución</Text>
                                    <Text style={styles.cellBlack}>Saldo Actual</Text>
                                </View>
                                <View style={styles.blackLine} />

                                {facturas.map((factura, index) => {
                                    const fechaFactura = parse(factura.fechaFactura, 'dd/MM/yyyy', new Date());
                                    const diferenciaDias = differenceInDays(new Date(), fechaFactura);
                                    const saldoActual = factura.saldoActual;
                                    const isVencido = diferenciaDias >= datosProveedor.plazodiasProveedor;

                                    return (
                                        <View key={index} style={styles.tableRowDeposits}>
                                            <Text style={styles.cellBlackLine}>{`${factura.numeroFactura} ${factura.tipoFactura}`}</Text>
                                            <Text style={styles.cellBlackLine}>{fechaFactura.toLocaleDateString()}</Text>
                                            <Text style={styles.cellBlackLine}>{diferenciaDias}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(factura.totalFactura, 2)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(factura.abonosFactura, 2)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(factura.notasCredito, 2)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(factura.notasDebito, 2)}</Text>
                                            <Text style={styles.cellBlackLine}>{number_format(factura.devolucion, 2)}</Text>
                                            <Text style={styles.cellBlackLine}>
                                                <Text style={isVencido ? styles.textRed : styles.textBlue}>
                                                    {number_format(saldoActual, 2)}
                                                </Text>
                                            </Text>
                                        </View>
                                    );
                                })}

                                <View style={styles.blackLine} />
                                <View style={styles.tableRowDepositsTotales}>
                                    <Text style={styles.cellBlackLine}> </Text>
                                    <Text style={styles.cellBlackLine}><Text style={styles.textBlue}>Totales: </Text></Text>
                                    <Text style={styles.cellBlackLine}> </Text>
                                    <Text style={styles.cellBlackLine}>{number_format(totalTotales, 2)}</Text>
                                    <Text style={styles.cellBlackLine}>0.00</Text>
                                    <Text style={styles.cellBlackLine}>0.00</Text>
                                    <Text style={styles.cellBlackLine}>0.00</Text>
                                    <Text style={styles.cellBlackLine}>0.00</Text>
                                    <Text style={styles.cellBlackLine}>{number_format(totalActuales, 2)}</Text>
                                </View>

                                <View style={styles.tableRowDepositsTotalesSaldos}>
                                    <Text style={styles.cellBlackLineSaldos}><Text style={styles.textBlueSaldos}>Saldo Vencido: </Text><Text style={styles.textRed}>{number_format(saldoVencido, 2)}</Text></Text>
                                    <Text style={styles.cellBlackLineSaldos}><Text style={styles.textBlueSaldos}>Saldo Por Vencer: </Text><Text style={styles.textGreen}>{number_format(saldoPorVencer, 2)}</Text></Text>
                                </View>
                            </View>
                        </View>



                    </View>
                </Page>
            </Document>
        </PDFViewer >
    );
};
