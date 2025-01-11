import React from 'react';
import { Document, PDFViewer, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

export const ChargeTiqueteAbono = ({ data }) => {


    console.log(data)
    const { codmoneda, saldo, monto, saldo_actual } = data
    let formattedSaldo;
    let formattedMonto;
    let formattedSaldoActual;

    if (codmoneda === 1) {
        formattedSaldo = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(saldo);
        formattedMonto = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(monto);
        formattedSaldoActual = new Intl.NumberFormat('es-CR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(saldo_actual);
    } else {
        formattedSaldo = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(saldo);
        formattedMonto = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monto);
        formattedSaldoActual = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(saldo_actual);

    }

    function number_format(number, decimals, codmoneda) {
        if (codmoneda === "1") {
            return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
        } else {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
        }
    }

    function number_quantity(number, decimals) {
        return new Intl.NumberFormat('es-CR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(number);
    }


    const fechaObjeto = new Date(data.fecha);
    const fechaFormateada = format(fechaObjeto, 'dd/MM/yyyy HH:mm:ss');
    console.log(fechaFormateada);

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
        sectionTotals: {
            flexGrow: 1,
            marginTop: 4,
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
            marginBottom: 0,
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

        tableDeposits: {
            textAlign: 'center',
        },
        tableRowDeposits: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 3.4,
            margin: 0
        },
        tableRowDepositsUnit: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: 3.4,
            margin: 2
        },
        cellBlack: {
            width: '100%',
            margin: 0.3,
            color: 'black',
        },
        containerRow: {
            flexDirection: 'row',
            fontSize: 3.4,
        },
        textBlock: {
            alignSelf: 'center',
            marginLeft: -100,
        },
        cellBlackLine: {
            width: '100%',
            margin: 0.3,
            color: 'black',
        },
    });
    return (
        <PDFViewer style={{ width: '100%', height: '55vh' }}>
            <Document title={`Abono Crédito Nº${data.numero}`}>
                <Page size={[100, 165]} style={styles.page}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={{ textAlign: "center", fontSize: 6, fontWeight: 'extrabold', marginBottom: 3, }}>
                                {/* {data.sucursal} */}
                                {"Super Veterinaria Santa Cruz"}
                            </Text>
                            <Text style={{ textAlign: "center", fontSize: 4, fontWeight: 'normal', marginBottom: 3, }}>
                                Cédula: {"0000000000"}
                                {/* {data.cedulaJ} */}
                            </Text>

                            <Text style={{ textAlign: "center", fontSize: 4, fontWeight: 'normal', marginBottom: 2, }}>
                                Teléfono: {"0000000000"}
                                {/* {data.telefono} */}
                            </Text>
                        </View>

                        <Text style={{ textAlign: "center", fontSize: 4, fontWeight: 'normal', marginBottom: 1, }}>
                            {"-------------------------------------------------"}
                        </Text>

                        <View style={styles.sectionHeader}>
                            <Text style={{ textAlign: "center", fontSize: 5, fontWeight: 'normal', marginBottom: 2, }}>
                                Abono Crédito  Nº: {data.numero}
                            </Text>

                            <Text style={{ textAlign: "left", fontSize: 4, fontWeight: 'extrabold', marginBottom: 3, }}>
                                Fecha: {fechaFormateada}
                            </Text>

                            <Text style={{ textAlign: "left", fontSize: 4, fontWeight: 'extrabold', marginBottom: 3, }}>
                                Cliente: {data.nombre}
                            </Text>
                        </View>

                        <Text style={{ fontSize: 4, textAlign: 'center' }}>
                            {"-------------------------------------------------"}
                        </Text>

                        <View style={styles.sectionTotals}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Saldo Anterior:</Text>
                                <Text style={styles.value}>
                                    {formattedSaldo}
                                </Text>
                            </View>

                            <View style={styles.row}>
                                <Text style={styles.label}>Total Abono:</Text>
                                <Text style={styles.value}>
                                    {formattedMonto}
                                </Text>
                            </View>

                            <View style={styles.totalRow}>
                                <Text style={[styles.label, { flex: 1 }, { fontSize: 5 }, { fontWeight: 'extrabold' }]}>Saldo Actual:</Text>
                                <Text style={[styles.value, { fontSize: 5 }, { fontWeight: 'extrabold' }]}>{formattedSaldoActual}</Text>
                            </View>
                        </View>


                        <View style={styles.sectionTotals}>
                            <Text style={{ fontSize: 4, }}>
                                {"--------------------------------------------------------------------------"}
                            </Text>
                            <Text style={{ textAlign: "center", fontSize: 4, fontWeight: 'extrabold', margin: 0, }}>
                                Documentos Afectados
                            </Text>
                            <Text style={{ fontSize: 4, }}>
                                {"--------------------------------------------------------------------------"}
                            </Text>


                            <View style={styles.tableDeposits}>
                                <View style={styles.tableRowDeposits}>
                                    <Text style={styles.cellBlack}>Nº Factura</Text>
                                    <Text style={styles.cellBlack}>Fecha</Text>
                                    <Text style={styles.cellBlack}>Monto</Text>
                                    <Text style={styles.cellBlack}>Estado</Text>
                                </View>

                                <Text style={{ fontSize: 4 }}>
                                    {"--------------------------------------------------------------------------"}
                                </Text>

                                <View style={styles.tableRowDepositsUnit}>
                                    <Text style={styles.cellBlackLine}>Por Cargar</Text>
                                    <Text style={styles.cellBlackLine}>Por Cargar</Text>
                                    <Text style={styles.cellBlackLine}>Por Cargar</Text>
                                    <Text style={styles.cellBlackLine}>Por Cargar</Text>
                                </View>
                            </View>


                            <Text style={{ fontSize: 4, }}>
                                {"--------------------------------------------------------------------------"}
                            </Text>

                            <View style={styles.containerRow}>
                                <Text style={styles.cellBlack} >Cantidad de Documentos: {"1"}</Text>
                            </View>

                            <Text style={{ fontSize: 4, textAlign: 'center' }}>
                                {"-------------------------------------------------"}
                            </Text>

                        </View>

                        <View style={styles.separator}>
                            <Text style={styles.multiCell}>{`Atendido por: ${data.cedulaUsuario}`}</Text>
                            <Text style={styles.multiCell}>{`Nº Caja: ${data.numCaja}`}</Text>
                            <Text style={styles.boldText}>{`*${data.numero}*`}</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer >
    );
};
