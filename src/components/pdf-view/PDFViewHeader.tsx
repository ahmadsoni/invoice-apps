import { styles } from "@/assets/styles/pdfStyles";
import { formatDate } from "@/lib/formater";
import { InvoiceData } from "@/types/invoice";
import { View, Text, Image } from "@react-pdf/renderer";


export const PDFHeader = ({ data }: { data: InvoiceData }) => (
  <View style={styles.head}>
    <Image src={'/src/assets/logo-company.png'} style={styles.logo} />
    <View style={styles.headRight}>
      <View style={styles.headRightUp}>
        <Text style={styles.headInfoTitle}>{data.company?.name}</Text>
        <Text style={styles.headInfoInvoiceId}>Invoice #{data.invoice?.number}</Text>
      </View>
      <View style={styles.headRightBottom}>
        <View style={styles.partInfo}>
          <Text style={styles.headInfoAddress}>
            {data.company?.address}
          </Text>
          <Text style={styles.headInfoPhone}>{data.company?.phone}</Text>
        </View>
        <View style={styles.partDate}>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableHeader1}>
              <Text style={styles.textTableHeader}>Date</Text>
            </View>
            <View style={styles.tableHeader2}>
              <Text style={styles.textTableHeader}>:</Text>
            </View>
            <View style={styles.tableHeader3}>
              <Text style={styles.textTableHeader}>
                {formatDate(data.invoice?.date)}
              </Text>
            </View>
          </View>
          <View style={styles.tableHeaderRow}>
            <View style={styles.tableHeader1}>
              <Text style={styles.textTableHeader}>Due Date</Text>
            </View>
            <View style={styles.tableHeader2}>
              <Text style={styles.textTableHeader}>:</Text>
            </View>
            <View style={styles.tableHeader3}>
              <Text style={styles.textTableHeaderRight}>
                {formatDate(data.invoice?.dueDate)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

