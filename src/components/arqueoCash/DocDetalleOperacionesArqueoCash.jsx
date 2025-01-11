import React from 'react';
import { useSelector } from 'react-redux';

import nothingImage from '../../assets/NothingImage.png';

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

export const DocDetalleOperacionesArqueoCash = ({ tableData }) => {

    const styles = StyleSheet.create({
        rowView: {
            display: 'flex', 
            flexDirection: 'row', 
            borderTop: '1px solid #EEE', 
            paddingTop: 8, 
            paddingBottom: 8, 
            textAlign: "center",
            fontSize: "10px",
        },
        rowTitleView: {
            display: 'flex', 
            flexDirection: 'row', 
            borderTop: '1px solid #EEE', 
            paddingTop: 8, 
            paddingBottom: 8, 
            textAlign: "center",
            fontSize: "20px",
            height: "100px"
        },
        rowTitlePrincipalView: {
            display: 'flex', 
            flexDirection: 'colum', 
            borderTop: '1px solid #EEE', 
            textAlign: "center",
            fontSize: "20px",
            width: "170px",
        },
        rowTitleTextView: {
            display: 'flex', 
            flexDirection: 'colum', 
            borderTop: '1px solid #EEE', 
            textAlign: "center",
            fontSize: "20px",
            width: "100px",
        },
        table: {
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          marginBottom: "10px"
        },
        row: {
          width: "100px",
          maxwidth: "100px",
        }
    });

    return (
        <Document>

            <Page
                style={{
                    width: "500px",
                    maxWidth: "500px",
                    height: "30px",
                    maxHeight: "500px"
                }}
            >
                <View>

                    <View style={styles.rowTitleView}>

                        <Image
                            src={ nothingImage }
                            style={{
                                width: "80px",
                                left: "10px",

                                // top: "30px"
                            }}
                        />

                        <View style={{
                            width: "100px"
                        }}>

                        </View>

                        <View style={styles.rowTitlePrincipalView}>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                    marginTop: "8px",
                                }}
                            >
                                Detalle Operaciones 
                            </Text>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "13px",
                                }}
                            >
                                Numero Apertura: 15 
                            </Text>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "13px",
                                }}
                            >
                                Cajero: Carlos Pereira Coto Coto 
                            </Text>

                        </View>

                        <View style={{
                            width: "100px"
                        }}>

                        </View>

                        <View style={styles.rowTitleTextView}>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "10px",
                                    marginTop: "20px",
                                    marginBottom: "2px"
                                }}
                            >
                                Suvesa
                            </Text>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "10px",
                                    marginBottom: "2px"
                                }}
                            >
                                Guanacaste, Costa Rica
                            </Text>

                            <Text
                                style={{
                                    textAlign: "center",
                                    alignContent: "center",
                                    fontSize: "10px",
                                    marginBottom: "2px"
                                }}
                            >
                                23/08/2017 08:22 a.m.
                            </Text>

                        </View>

                    </View>
  
                    <View style={styles.table}>
  
                        <View style={styles.rowView}>
                        {
                            tableData["column"].map((c) => 
                                <Text style={ styles.row }>
                                    {
                                        c === 'FormaPago'
                                            ? 'Forma Pago'
                                            : c
                                    }   
                                </Text>
                            )
                        }
                        </View>
  
                        {tableData["data"].map((rowData) => <>
                            <View style={styles.rowView}>
                                {
                                    tableData["column"].map((c) =>
                                        <Text style={ styles.row }>
                                            {rowData[c]}
                                        </Text>
                                    ) 
                                }
                            </View>
                        </>)}
  
                    </View>  
  
                    <Text
                        style={{
                            textAlign: "center",
                            alignContent: "center",
                            fontSize: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        --- Fin de Linea ---
                    </Text>

                </View>

            </Page>

        </Document>
    )
}
