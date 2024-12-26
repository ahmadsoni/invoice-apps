import {
	PDFDownloadLink,
	Document,
	Page,
	Text,
	View,
	StyleSheet,
	Image,
	Font,
} from "@react-pdf/renderer";
// import { DocumentDownload, Eye } from "iconsax-react";
import dayjs from "dayjs";
import { DataPriceInvoiceInterface, DataProductInvoiceInterface, InvoicePdfInterface } from "@/types/invoice";

Font.register({
	family: "Inter",
	fonts: [
		{ src: "/src/assets/font/Inter/Inter-Regular.ttf", fontWeight: "normal" },
		{ src: "/src/assets/font/Inter/Inter-Medium.ttf", fontWeight: "medium" },
		{ src: "/src/assets/font/Inter/Inter-Bold.ttf", fontWeight: "bold" },
	],
});

// Define styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFF",
		fontFamily: "Inter",
	},
	head: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		padding: "4.36vw 3.36vw",
	},
	headRight: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		gap: "6pt",
		flex: 1,
	},
	headRightUp: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	headRightBottom: {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		gap: "6pt",
	},
	partInfo: {
		width: "278pt",
	},
	partDate: {
		width: "139pt",
	},
	logo: {
		width: 77.25,
		height: 77.25,
		marginRight: "8pt",
		objectFit: "contain",
	},
	headInfo: {
		width: "42vw",
		justifyContent: "center",
		alignItems: "flex-start",
		marginRight: "18pt",
	},
	headInfoTitle: {
		fontFamily: "Inter",
		fontSize: "16pt",
		fontWeight: 700,
		letterSpacing: 0.1,
		color: "#333333",
		lineHeight: 1.5,
	},
	headInfoInvoiceId: {
		fontFamily: "Inter",
		fontSize: "12pt",
		fontWeight: 400,
		letterSpacing: 0.1,
		color: "#333333",
	},
	headInfoAddress: {
		fontSize: "10pt",
		fontWeight: 400,
		letterSpacing: 0.1,
		color: "#656565",
		lineHeight: 1.8,
		marginTop: "4pt",
		marginBottom: "4pt",
	},
	headInfoPhone: {
		fontFamily: "Inter",
		fontSize: "12pt",
		fontWeight: 400,
		letterSpacing: 0.1,
		color: "#656565",
		lineHeight: 1.5,
	},
	tableHeader: {
		width: "32%",
	},
	tableHeaderRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: "139pt",
		gap: "4px",
	},
	tableHeader1: {
		width: "80pt",
		height: "22px",
	},
	tableHeader2: {
		width: "4pt",
		height: "22px",
		margin: "0 4pt",
	},
	tableHeader3: {
		width: "80pt",
		height: "22px",
	},
	tableHeader3Bold: {
		width: "80pt",
		height: "22px",
	},
	textTableHeader: {
		fontSize: "10pt",
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: 0.1,
		color: "#656565",
	},
	textTableHeaderRight: {
		fontSize: "12pt",
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: 0.1,
		color: "#656565",
		textAlign: "right",
	},
	textBoldTableHeader: {
		fontFamily: "Inter",
		fontSize: "12pt",
		fontWeight: 900,
		lineHeight: 1.5,
		letterSpacing: 0.1,
		color: "#656565",
	},
	textBoldTableHeaderRight: {
		fontFamily: "Inter",
		fontSize: "12pt",
		fontWeight: 900,
		lineHeight: 1.5,
		letterSpacing: 0.1,
		color: "#656565",
		textAlign: "right",
	},
	headerLine: {
		width: "93.2%",
		height: "1pt",
		backgroundColor: "#000000",
		margin: "-8pt 3.36vw 0",
	},
	body: {
		width: "90.2%",
		padding: "0 4.9vw",
	},
	bodyInfo: {
		flexDirection: "column",
		justifyContent: "center",
		gap: "4pt",
		margin: "16pt 0",
	},
	bodyInfoData: {
		flexDirection: "column",
		justifyContent: "center",
	},
	bodyInfoDataTitle: {
		fontFamily: "Inter",
		fontWeight: "bold",
		fontSize: "12pt",
		lineHeight: 1.5,
		color: "#656565",
	},
	bodyInfoDataContent: {
		fontWeight: "normal",
		fontSize: "12pt",
		lineHeight: 1.5,
		color: "#656565",
	},
	bodyTable: {
		flexDirection: "row",
		width: "100vw",
	},
  bodyTableRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
  },
	bodyTableRowTop: {
		backgroundColor: "#DADAF2",
		padding: "4pt 4px",
		borderTop: "0.5pt solid #656565",
		borderRight: "0.25pt solid #656565",
		borderBottom: "0.25pt solid #656565",
		borderLeft: "0.5pt solid #656565",
	},
	bodyTableRowBottom: {
		padding: "4pt 5px",
		borderTop: "0.25pt solid #656565",
		borderRight: "0.25pt solid #656565",
		borderBottom: "0.5pt solid #656565",
		borderLeft: "0.5pt solid #656565",
	},
	bodyTableTextHeader: {
		fontWeight: "medium",
		fontSize: "6pt",
		lineHeight: 1.5,
		color: "#333333",
	},
	bodyTableTextDetail: {
		fontWeight: "normal",
		fontSize: "5pt",
		lineHeight: 1.5,
		color: "#656565",
	},
	bodyTableTextDetailRight: {
		fontWeight: "normal",
		fontSize: "7pt",
		lineHeight: 1.5,
		color: "#656565",
		textAlign: "right",
	},
	bodyTableTextDetailRightRed: {
		fontWeight: "normal",
		fontSize: "7pt",
		lineHeight: 1.5,
		color: "#DF6262",
		textAlign: "right",
	},
	netPayment: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: "4pt",
		marginBottom: "4pt"
	},
	netPaymentText1: {
		fontWeight: "normal",
		fontSize: "12pt",
		lineHeight: 1.5,
		color: "#656565",
		width: "20vw",
	},
	netPaymentText2: {
		fontWeight: "normal",
		fontSize: "12pt",
		lineHeight: 1.5,
		color: "#656565",
	},
	netPaymentText3: {
		fontFamily: "Inter",
		fontSize: "12pt",
		fontWeight: 700,
		lineHeight: 1.5,
		color: "#656565",
		width: "20vw",
	},
  invoiceFooter: {
    display: "flex",
		flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
		gap: "24pt",
		marginTop: "36pt",
  },
  invoiceFooterLeft: {},
  invoiceFooterRight: {}
});

// interface PdfExportDocument {
// 	data: InvoicePdfInterface;
//   totalColumns: number;
// }

interface PdfExport {
	data: InvoicePdfInterface;
}

interface PdfInterface {
	data: InvoicePdfInterface;
	isPreview: boolean;
}

const defaultTableData: DataProductInvoiceInterface[][] = [
	[
		{
			data: "Product",
			type: "header",
			dataType: "string"
		},
		{
			data: "Unit Type",
			type: "header",
			dataType: "string"
		},
		{
			data: "Quantity",
			type: "header",
			dataType: "string"
		},
		{
			data: "Price",
			type: "header",
			dataType: "string"
		},
		{
			data: "Discount Price",
			type: "header",
			dataType: "string"
		},
		{
			data: "Net Price",
			type: "header",
			dataType: "string"
		},
		{
			data: "Sub Total",
			type: "header",
			dataType: "string"
		},
		{
			data: "Product Discount",
			type: "header",
			dataType: "string"
		},
		{
			data: "Total",
			type: "header",
			dataType: "string"
		}
	],
	[
		{
			data: "",
			type: "data",
			dataType: "string"
		},
		{
			data: "",
			type: "data",
			dataType: "string"
		},
		{
			data: "",
			type: "data",
			dataType: "number"
		},
		{
			data: "",
			type: "data",
			dataType: "price"
		},
		{
			data: "",
			type: "data",
			dataType: "discount"
		},
		{
			data: "",
			type: "data",
			dataType: "price"
		},
		{
			data: "",
			type: "data",
			dataType: "price"
		},
		{
			data: "",
			type: "data",
			dataType: "discount"
		},
		{
			data: "",
			type: "data",
			dataType: "price"
		}
	]
]

// const getColumnWidth = (index: number, totalColumns: number, priorityWidth = 30) => {
//   const remainingWidth = 100 - priorityWidth;
//   return index === 0
//     ? `${priorityWidth}%`
//     : `${remainingWidth / (totalColumns - 1)}%`;
// };

// Define your PDF component
const MyDocument = ({ data }: PdfExport) => {
  const widthColumn = [13.45, 7, 6.7, 9.4, 10.75, 10.75, 10.75, 10.75, 10.75]
  
  const widthColumn1 = data.indexHide.length > 0 
    ? widthColumn[0] + data.indexHide.reduce((acc, item) => acc + widthColumn[item], 0)
    : widthColumn[0];

  const dataHeader = defaultTableData[0]
  const dataBody = defaultTableData.splice(1, 2)

  return (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.head}>
				<Image src={data.invoiceLogoUrl} style={styles.logo} />
				<View style={styles.headRight}>
					<View style={styles.headRightUp}>
						<Text style={styles.headInfoTitle}>{data.companyName}</Text>
						<Text style={styles.headInfoInvoiceId}>Invoice #{data.invoiceId}</Text>
					</View>
					<View style={styles.headRightBottom}>
						<View style={styles.partInfo}>
							<Text style={styles.headInfoAddress}>
								{data.companyAddress}
							</Text>
							<Text style={styles.headInfoPhone}>{data.companyPhone}</Text>
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
                    {/* TODO: payment date */}
										{dayjs().format("DD/MM/YYYY")}
									</Text>
								</View>
							</View>
							<View style={styles.tableHeaderRow}>
								<View style={styles.tableHeader1}>
									<Text style={styles.textTableHeader}>Akhir Bayar</Text>
								</View>
								<View style={styles.tableHeader2}>
									<Text style={styles.textTableHeader}>:</Text>
								</View>
								<View style={styles.tableHeader3}>
									<Text style={styles.textTableHeaderRight}>-</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
			<View style={styles.headerLine}></View>
			<View style={styles.body}>
				<View style={styles.bodyInfo}>
					<View style={styles.bodyInfoData}>
						<Text style={styles.bodyInfoDataTitle}>Ditujukan kepada:</Text>
						<Text style={styles.bodyInfoDataContent}>{data.companyName}</Text>
					</View>
					<View style={styles.bodyInfoData}>
						<Text style={styles.bodyInfoDataTitle}>Alamat:</Text>
						<Text style={styles.bodyInfoDataContent}>{data.companyAddress}</Text>
					</View>
				</View>
        <View style={styles.bodyTable}>
          {!data.indexHide.includes(0) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn1}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[0].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn1-${index}`}>
                    <Text style={styles.bodyTableTextDetail}>
                      {item[0].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(1) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[1]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[1].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColum2-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[1].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(2) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[2]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[2].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn3-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[2].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(3) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[3]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[3].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn4-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[3].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(4) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[4]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[4].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn5-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[4].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(5) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[5]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[5].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn6-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[5].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(6) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[6]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[6].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn7-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[6].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(7) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[7]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[7].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn8-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[7].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
          {!data.indexHide.includes(8) && (
            <View 
              style={[styles.bodyTableRow, { width: `${widthColumn[8]}vw` }]}
            >
              <View style={styles.bodyTableRowTop}>
                <Text style={styles.bodyTableTextHeader}>{dataHeader[8].data || ''}</Text>
              </View>
              {dataBody.map((item: DataProductInvoiceInterface[], index: number) => {
                return (
                  <View style={styles.bodyTableRowBottom} key={`dataColumn9-${index}`}>
                    <Text style={styles.bodyTableTextDetailRight}>
                      {item[8].data}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
			</View>
      <View style={styles.invoiceFooter}>
				{data.invoiceUsepayment && (
					<View style={[styles.invoiceFooterLeft, { width: `49.4vw` }]}>
						<Text style={styles.netPaymentText2}>Payment Link:</Text>
						<Text style={styles.netPaymentText2}>www.xendit-payment-link.id</Text>
					</View>
				)}
				<View style={[styles.invoiceFooterRight, { width: data.invoiceUsepayment ? `49.4vw` : `98.8vw` }]}>
					{data.invoiceFooterPrice1.map((item: DataPriceInvoiceInterface, index: number) => {
						return (
							<View style={styles.netPayment} key={`footerInvoice1-${index}`}>
								<Text style={styles.netPaymentText1}>{item.dataName}</Text>
								<Text style={styles.netPaymentText2}>:</Text>
								<Text style={styles.netPaymentText3}>{item.data}</Text>
							</View>
						)
					})}
					{data.invoiceFooterPrice2.map((item: DataPriceInvoiceInterface, index: number) => {
						return (
							<View style={styles.netPayment} key={`footerInvoice2-${index}`}>
								<Text style={styles.netPaymentText1}>{item.dataName}</Text>
								<Text style={styles.netPaymentText2}>:</Text>
								<Text style={styles.netPaymentText3}>{item.data}</Text>
							</View>
						)
					})}
					<View style={styles.netPayment}>
						<Text style={styles.netPaymentText1}>{data.dataTotalFooterPrice.dataName}</Text>
						<Text style={styles.netPaymentText2}>:</Text>
						<Text style={styles.netPaymentText3}>{data.dataTotalFooterPrice.data}</Text>
					</View>
				</View>
      </View>
		</Page>
	</Document>
)};

// Define your PDF generator component
const PDFInvoice = ({ data }: PdfInterface) => {
//   const loadingContent = <span>Loading document...</span>;
//   const previewContent = (
//     <div className="buttonPdf">
//       <Eye size="24" color="#6562DF" />
//       <p className="button_default">Preview</p>
//     </div>
//   );
//   const downloadContent = (
//     <div className="buttonPdf">
//       <DocumentDownload size="24" color="#333333" />
//       <p className="button_default">Download</p>
//     </div>
//   );

  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument data={data} />}
        fileName={`invoice-${data.id}.pdf`}
      >
         download
      </PDFDownloadLink>
    </div>
  );
};

export {
	PDFInvoice,
	MyDocument
};
