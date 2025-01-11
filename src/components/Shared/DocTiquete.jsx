import React from 'react';
import { useSelector } from 'react-redux';

import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

export const DocTiquete = ({ tableData }) => {

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
        table: {
          borderTop: "1px solid black",
          borderBottom: "1px solid black",
          marginBottom: "10px"
        },
        rowProducto: {
          width: "75px",
          maxwidth: "75px"
        },
        rowCantidad: {
          width: "40px",
          maxwidth: "40px"
        },
        rowPrecio: {
          width: "40px",
          maxwidth: "40px"
        }
    });

    return (
        <Document>

            <Page
                style={{
                    width: "155px",
                    maxWidth: "155px",
                    // height: "500px",
                    // maxHeight: "500px"
                }}
            >
                <View>

                    <Image
                        src="https://yt3.ggpht.com/-3BKTe8YFlbA/AAAAAAAAAAI/AAAAAAAAAAA/ad0jqQ4IkGE/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
                        alt="random image"
                    />

                    <Text
                        style={{
                            textAlign: "center",
                            alignContent: "center",
                            fontSize: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        Suvesa
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            alignContent: "center",
                            fontSize: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        Guanacaste, Costa Rica
                    </Text>

                    <Text
                        style={{
                            textAlign: "center",
                            alignContent: "center",
                            fontSize: "10px",
                            marginBottom: "10px"
                        }}
                    >
                        23/08/2017 08:22 a.m.
                    </Text>
  
  
                    <View style={styles.table}>
  
                        <View style={styles.rowView}>
                        {
                            tableData["column"].map((c) => 
                            <Text 
                                style={
                                (c === 'CANT')
                                    ? styles.rowCantidad
                                    : (c === 'PRODUCTO')
                                    ? styles.rowProducto
                                    : styles.rowPrecio
                                }>
                                {c}
                            </Text>
                            )
                        }
                        </View>
  
                        {tableData["data"].map((rowData) => <>
                            <View style={styles.rowView}>
                                {
                                tableData["column"].map((c) =>
                                    <Text 
                                    style={
                                        (c === 'CANT')
                                        ? styles.rowCantidad
                                        : (c === 'PRODUCTO')
                                            ? styles.rowProducto
                                            : styles.rowPrecio
                                    }>
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
                        ¡GRACIAS POR SU COMPRA!
                    </Text>

                </View>

            </Page>

        </Document>
    )
}
