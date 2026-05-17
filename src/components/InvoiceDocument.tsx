
import { PDFViewer } from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { Invoice } from '../types/invoice';

type InvoiceDocumentProps = {
    value: Invoice;
}


export default function InvoiceDocument({ value }: InvoiceDocumentProps) {

    const colors = {
        important: "#2c0050",
        background: "#e0e0e0",
        headerTextColor: "#000000"
    }


    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            color: '#262626',
            fontSize: '12px',
            padding: '30px 50px',
            fontFamily: 'Helvetica'
        },
        title: {
            fontSize: '30px',
            marginBottom: 10,
            fontWeight: 'bold',
            color: colors.important
        },
        partyHeader: {
            flexDirection: 'row',
        },
        partySection: {
            borderLeftWidth: 4,
            borderLeftColor: colors.important,
            paddingLeft: '10px',
            minWidth: '50%',
            marginBottom: 30
        },
        metadataSection: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 30

        },
        metadataItem: {
            width: '32%',
            backgroundColor: colors.background,
            color: colors.headerTextColor,
            padding: '6px',
            textAlign: 'left',
            marginRight: '2px'
        },
        bold: {
            fontWeight: 'bold',
        },
        lineItemRow: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingTop: '10px',
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
            paddingBottom: '4px'
        },
        lineItemHeaderRow: {
            fontWeight: 'bold',
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            paddingBottom: '4px',
            color: colors.headerTextColor,

        },
        lineItem: {
            width: '20%'
        },
        LineItemDescription: {
            width: '46%'
        },
        lineItemNumber: {
            width: '12%',
            textAlign: 'right',
            paddingRight: '4px'
        },
        lineItemHeader: {
            backgroundColor: colors.background,
            padding: '4px',
        },
        totalItem: {
            width: '116px',
            textAlign: 'right',
            padding: "6px"
        },
        totalSection: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 'auto',
            borderWidth: 1,
            borderColor: colors.important
        },

        grandTotal: {
            color: 'white',
            backgroundColor: colors.important,
            fontWeight: 'bold',
            width: '120px',
            textAlign: 'right',
            padding: "6px"
        },
        importantCell: {
            color: 'white',
            backgroundColor: colors.important,
            fontWeight: 'bold',
        },
        finalSection: {
            marginTop: 30,

            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between"
        }
    });


    const subtotal = value.items.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0
    );


    const formatDate = (dateStr: string) =>
        new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).format(new Date(dateStr));



    const tax = subtotal * value.taxRate;
    const total = subtotal + tax;

    const money = (n: number) => n.toFixed(2);


    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>INVOICE</Text>


                <View style={styles.metadataSection}>
                    <Text style={styles.metadataItem}><Text style={styles.bold}>Invoice No:</Text> {value.metadata.invoiceNumber}</Text>

                    <Text style={styles.metadataItem}><Text style={styles.bold}>Issue Date:</Text> {formatDate(value.metadata.issueDate)}</Text>
                    <Text style={[styles.metadataItem, styles.importantCell]}>Due Date: {formatDate(value.metadata.dueDate)}</Text>
                </View>



                <View style={styles.partyHeader}>


                    <View style={styles.partySection}>
                        <Text style={styles.bold}>FROM</Text>

                        <Text>{value.from.name}</Text>
                        <Text>{value.from.email}</Text>
                        <Text>{value.from.address}</Text>

                    </View>

                    <View style={styles.partySection}>
                        <Text style={styles.bold}>BILL TO</Text>

                        <Text>{value.to.name}</Text>
                        <Text>{value.to.email}</Text>
                        <Text>{value.to.address}</Text>
                    </View>


                </View>


                <View>
                    <View style={styles.lineItemHeaderRow}>


                        <Text style={[styles.lineItem, styles.lineItemHeader]}>Item</Text>
                        <Text style={[styles.LineItemDescription, styles.lineItemHeader]}>Description</Text>
                        <Text style={[styles.lineItemNumber, styles.lineItemHeader]}>Quantity</Text>
                        <Text style={[styles.lineItemNumber, styles.lineItemHeader]}>Unit</Text>
                        <Text style={[styles.lineItemNumber, styles.lineItemHeader]}>Total</Text>



                    </View>

                    {value.items.map((item, index) => (
                        <View style={styles.lineItemRow}>


                            <Text style={styles.lineItem}>{item.item}</Text>
                            <Text style={styles.LineItemDescription}>{item.description}</Text>
                            <Text style={styles.lineItemNumber}>{item.quantity}</Text>
                            <Text style={styles.lineItemNumber}>${money(item.unitPrice)}</Text>
                            <Text style={styles.lineItemNumber}>${money(item.quantity * item.unitPrice)}</Text>



                        </View>
                    ))}
                </View>

                <View style={styles.finalSection}>


                    <View>
                        <Text style={styles.bold}>Additional Notes:</Text>
                        <Text>{value.notes}</Text>
                    </View>


                    <View style={styles.totalSection}>
                        <View>
                            <Text style={styles.totalItem}>Subtotal: </Text>
                            <Text style={styles.totalItem}>Sales Tax ({value.taxRate * 100}%): </Text>
                            <Text style={[styles.grandTotal, styles.bold]}>Balance Due: </Text>
                        </View>

                        <View>
                            <Text style={styles.totalItem}>${money(subtotal)}</Text>
                            <Text style={styles.totalItem}>${money(tax)}</Text>
                            <Text style={[styles.grandTotal, styles.bold]}>${money(total)}</Text>
                        </View>

                    </View>
                </View>

            </Page>
        </Document>
    );


    return (
        <PDFViewer style={{ width: "100%", height: "800px" }}>

            <MyDocument />

        </PDFViewer>

    )
}