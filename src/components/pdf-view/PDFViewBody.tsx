import { styles } from "@/assets/styles/pdfStyles";
import { formatCurrency } from "@/lib/formater";
import { InvoiceData } from "@/types/invoice";
import { CartItem } from "@/types/product";
import { View, Text } from "@react-pdf/renderer";


export const PDFBody = ({ data }: { data: InvoiceData }) => (
  <View style={styles.body}>
    <View style={styles.bodyInfo}>
      <View style={styles.bodyInfoData}>
        <Text style={styles.bodyInfoDataTitle}>Bill To:</Text>
        <Text style={styles.bodyInfoDataContent}>{data.billing?.billTo}</Text>
      </View>
      <View style={styles.bodyInfoData}>
        <Text style={styles.bodyInfoDataTitle}>Address:</Text>
        <Text style={styles.bodyInfoDataContent}>{data.billing?.billToAddress}</Text>
      </View>
    </View>
    <View style={styles.bodyTable}>
      <TableHeader />
      {data.cart?.map((item, index) => (
        <TableRow key={index} item={item} />
      ))}
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.bodyTableRow}>
    <View style={styles.bodyTableRowTop}>
      <Text style={styles.bodyTableTextHeader}>Product</Text>
    </View>
    <View style={styles.bodyTableRowTop}>
      <Text style={styles.bodyTableTextHeader}>Quantity</Text>
    </View>
    <View style={styles.bodyTableRowTop}>
      <Text style={styles.bodyTableTextHeader}>Price</Text>
    </View>
    <View style={styles.bodyTableRowTop}>
      <Text style={styles.bodyTableTextHeader}>Total</Text>
    </View>
  </View>
);

const TableRow = ({ item }: { item: CartItem }) => (
  <View style={styles.bodyTableRow}>
    <View style={styles.bodyTableRowBottom}>
      <Text style={styles.bodyTableTextDetail}>{item.selectedVariant?.flavor || ""}</Text>
    </View>
    <View style={styles.bodyTableRowBottom}>
      <Text style={styles.bodyTableTextDetailRight}>{item.quantity}</Text>
    </View>
    <View style={styles.bodyTableRowBottom}>
      <Text style={styles.bodyTableTextDetailRight}>{formatCurrency(item.basePrice)}</Text>
    </View>
    <View style={styles.bodyTableRowBottom}>
      <Text style={styles.bodyTableTextDetailRight}>{formatCurrency(item.basePrice * item.quantity)}</Text>
    </View>
  </View>
);

