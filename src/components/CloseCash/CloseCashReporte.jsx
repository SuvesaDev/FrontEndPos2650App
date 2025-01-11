import React from 'react';
import { Document, PDFViewer, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import imgSuvesa from '../../assets/ImgSUVESA.png'

export const CloseCashReporte = () => {
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
        textoT: {
            top: 15,
            fontSize: 10,
            fontWeight: 'extrabold',
        },
        blueLine: {
            borderBottom: '1px solid blue',
            margin: '1px 0',
        },

        blackLine: {
            borderBottom: '1px solid black',
            margin: '1px 0',
        },
        header: {
            margin: 6,
            color: 'blue',
            fontSize: 13,
            fontWeight: 'extrabold',
            textAlign: 'center',
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
        headerBlack: {
            margin: 10,
            color: 'black',
            fontSize: 13,
            fontWeight: 'extrabold',
            textAlign: 'center',
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
            margin: 2,
            fontSize: 10,
            marginLeft: 15,
            padding: 3,
        },
        sectionNPBox: {
            marginTop: -20.2,
            fontSize: 10,
            marginLeft: 210,
            padding: 3,
        },
        sectionCaja: {
            marginTop: -22.2,
            fontSize: 12,
            marginLeft: 480,
            padding: 5,
        },
        textRed: {
            color: 'red',
        },
        table: {
            padding: 2,
            textAlign: 'center',
            width: '100%', // Ajusta el ancho al 100%
        },
        tableRow: {
            flexDirection: 'row',
            justifyContent: 'space-between', // Espaciado equitativo entre celdas
            fontSize: 10,
        },
        cellGreen: {
            width: '20%',
            margin: 2,
            color: 'green',
        },
        cellRed: {
            width: '20%',
            margin: 2,
            color: 'red',
        },
        cellBlack: {
            width: '20%',
            margin: 2,
            color: 'black',
        },
        cellBlackStrong: {
            width: '20%',
            margin: 2,
            color: 'black',
        },
        containerRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 10,
            textAlign: 'center',
        },
        container: {
            flexDirection: 'column',
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            fontSize: 10,
            justifyContent: 'center',
            textAlign: 'center',
        },
        textBlock: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        textCajas: {
            fontSize: 11,
            borderBottom: '1px solid black',
            marginBottom: 5,
            textAlign: 'center',
        },

        containerTotals: {
            flexDirection: 'column',
            textAlign: 'center',
        },

        containerRowTotals: {
            flexDirection: 'row',
            fontSize: 10,
            justifyContent: 'space-around',
            textAlign: 'center',
        },
        textBlockTotals: {
            justifyContent: 'center',
            alignItems: 'center',
        },

        textCajasTotals: {
            fontSize: 11,
            borderBottom: '1px solid black',
            marginBottom: 5,
        },

        cellGreeTotals: {
            color: 'green',
        },
        cellRedTotals: {
            color: 'red',
        },

        tableDeposits: {
            padding: 2,
            textAlign: 'center',
            width: '100%', // Ajusta el ancho al 100%
        },
        tableRowDeposits: {
            flexDirection: 'row',
            justifyContent: 'space-between', // Espaciado equitativo entre celdas
            fontSize: 10,
            padding: 2,
        },

        textCajasDeposits: {
            fontSize: 11,
            borderBottom: '1px solid black',
            marginBottom: 5,
            marginTop: 4,
        },

    });
    return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document title={`Cierre Caja Nº 1100`}>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Image
                            style={styles.image}
                            src={imgSuvesa}
                            alt="Logo"
                        />
                        <View style={styles.sectionN}>
                            <Text>Empresa: GUANAVET, S.A.</Text>
                        </View>

                        <View style={styles.sectionNP}>
                            <Text>Cédula Jurídica: 3-101-696098</Text>
                        </View>

                        <View style={styles.sectionN}>
                            <Text>Teléfonos: 2666-9444</Text>
                        </View>

                        <View style={styles.sectionNP}>
                            <Text>Fax: clinica.proveeduria@suvesacr.com</Text>
                        </View>

                        <View style={styles.sectionN}>
                            <Text>Dirección: 100M NORTE DE LA PARADA MUNICIPAL, LIBERIA</Text>
                        </View>

                        <View style={styles.blueLine} />

                        <Text style={styles.header}>Reporte Cierre #1977 Fecha: 23/02/2024 08:29:37am</Text>

                        <View style={styles.blueBox}>

                            <View style={styles.sectionNBox}>
                                <Text>Código Cajero(a): 702410382</Text>
                            </View>

                            <View style={styles.sectionNPBox}>
                                <Text>Nombre Cajero(a): JOSE MENDEZ PRUEBAS</Text>
                            </View>

                            <View style={styles.sectionNBox}>
                                <Text>Número Apertura: 2014</Text>
                            </View>

                            <View style={styles.sectionNPBox}>
                                <Text>Fecha Apertura: 22/02/2024 08:48:25pm</Text>
                            </View>

                            <View style={styles.sectionNBox}>
                                <Text>Número Arqueo: 2037</Text>
                            </View>

                            <View style={styles.sectionNPBox}>
                                <Text>Fecha Arqueo: 22/02/2024 08:58:25pm</Text>
                            </View>

                            <View style={styles.sectionCaja}>
                                <Text>N° Caja:  <Text style={styles.textRed} >2.00</Text></Text>
                            </View>
                        </View>

                        <Text style={styles.header}>Totales del Dia</Text>

                        <View style={styles.blueBox}>
                            <View style={styles.table}>
                                <View style={styles.tableRow}>
                                    <Text style={styles.cellBlack}>Centro Costo</Text>
                                    <Text style={styles.cellBlack}>Ventas</Text>
                                    <Text style={styles.cellBlack}>Devoluciones</Text>
                                    <Text style={styles.cellBlack}>Abonos + Apa</Text>
                                    <Text style={styles.cellBlack}>Con. Firmado</Text>
                                    <Text style={styles.cellBlack}>Reintegro</Text>
                                    <Text style={styles.cellBlackStrong}>Totales</Text>
                                </View>
                                <View style={styles.blueLine} />
                                <View style={styles.tableRow}>
                                    <Text style={styles.cellBlack}>Agro</Text>
                                    <Text style={styles.cellGreen}>95 000,23</Text>
                                    <Text style={styles.cellRed}>0.00</Text>
                                    <Text style={styles.cellGreen}>0.00</Text>
                                    <Text style={styles.cellRed}>0.00</Text>
                                    <Text style={styles.cellGreen}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>95 000,23</Text>
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.cellBlack}>Taller</Text>
                                    <Text style={styles.cellGreen}>0.00</Text>
                                    <Text style={styles.cellRed}>0.00</Text>
                                    <Text style={styles.cellGreen}>0.00</Text>
                                    <Text style={styles.cellRed}>0.00</Text>
                                    <Text style={styles.cellGreen}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>0.00</Text>
                                </View>
                                <View style={styles.blueLine} />
                                <View style={styles.tableRow}>
                                    <Text style={styles.cellBlack}></Text>
                                    <Text style={styles.cellBlackStrong}>95 000,23</Text>
                                    <Text style={styles.cellBlackStrong}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>0.00</Text>
                                    <Text style={styles.cellBlackStrong}>95 000,23</Text>
                                </View>
                            </View>
                        </View>


                        <View style={styles.container}>
                            <View style={styles.containerRow}>
                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Apertura de Caja</Text>
                                        <Text>75,000.00</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Efectivo Colones</Text>
                                        <Text>75,000.00 | 0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Efectivo Dólares</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.containerRow}>
                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Tarjeta Colones</Text>
                                        <Text>57,938.00 | 57,937.88</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Cheques Colones</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Depositos Colones</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.containerRow}>
                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Depositos Dolares</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>


                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Anticipos</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Anticipos Aplicados</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.containerRow}>
                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Contado Firmado</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>

                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}>Contado Firmado Cancelado</Text>
                                        <Text>0.00 | 0.00</Text>
                                    </View>
                                </View>
                                <View style={styles.container}>
                                    <View style={styles.textBlock}>
                                        <Text style={styles.textCajas}          ></Text>
                                        <Text>                                  </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.blueBox}>
                            <View style={styles.containerTotals}>
                                <View style={styles.containerRowTotals}>
                                    <View style={styles.containerTotals}>
                                        <View style={styles.textBlockTotals}>
                                            <Text style={styles.textCajasTotals}>Total Cajero</Text>
                                            <Text style={styles.cellGreeTotals}>75,000.00</Text>
                                        </View>
                                    </View>

                                    <View style={styles.containerTotals}>
                                        <View style={styles.textBlockTotals}>
                                            <Text style={styles.textCajasTotals}>Total Sistema</Text>
                                            <Text style={styles.cellGreeTotals}>75,000.00</Text>
                                        </View>
                                    </View>

                                    <View style={styles.containerTotals}>
                                        <View style={styles.textBlockTotals}>
                                            <Text style={styles.textCajasTotals}>Diferencia</Text>
                                            <Text style={styles.cellRedTotals}>0.00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>


                        <Text style={styles.headerBlack}>Lista de Depositos</Text>
                        <View style={styles.blackBox}>
                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlack}>Banco</Text>
                                    <Text style={styles.cellBlack}>Cuenta</Text>
                                    <Text style={styles.cellBlack}>Moneda</Text>
                                    <Text style={styles.cellBlack}>Número Referencia</Text>
                                    <Text style={styles.cellBlackStrong}>Monto</Text>
                                </View>
                                <View style={styles.blackLine} />
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlack}>BANCO POPULAR</Text>
                                    <Text style={styles.cellBlack}>201-541144-4444</Text>
                                    <Text style={styles.cellBlack}>COLON</Text>
                                    <Text style={styles.cellBlack}>1288</Text>
                                    <Text style={styles.cellBlackStrong}>95 000,23</Text>
                                </View>
                            </View>

                            <View style={styles.blackLine} />


                            <View style={styles.containerTotals}>
                                <View style={styles.containerRowTotals}>
                                    <View style={styles.containerTotals}>
                                        <View style={styles.textBlockTotals}>
                                            <Text style={styles.textCajasDeposits}>Total Deposito(s) Colones</Text>
                                            <Text style={styles.cellGreeTotals}>75,000.00</Text>
                                        </View>
                                    </View>
                                    <View style={styles.containerTotals}>
                                        <View style={styles.textBlockTotals}>
                                            <Text style={styles.textCajasDeposits}>Total Deposito(s) Dólares</Text>
                                            <Text style={styles.cellGreeTotals}>0.00</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>







                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
};
