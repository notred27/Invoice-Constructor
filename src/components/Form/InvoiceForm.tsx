import { useState } from "react";
import { PartyForm } from "./PartyForm";
import type { InvoiceItem, Invoice } from "../../types/invoice.ts";
import { LineItem } from "./LineItem";
import InvoiceDocument from '../InvoiceDocument.tsx'
import InvoiceMetadata from "./InvoiceMetadata.tsx";
import InvoiceNotes from "./InvoiceNotes.tsx";


export default function InvoiceForm() {
	const [invoice, setInvoice] = useState<Invoice>({
		metadata: { invoiceNumber: "", issueDate: "", dueDate: "" },
		from: { name: "", email: "", address: "" },
		to: { name: "", email: "", address: "" },
		items: [],
		taxRate: 0.0625,
		notes: ""
	});



	function updateLineItem(index: Number, updatedItem: InvoiceItem) {
		setInvoice((prev) => ({
			...prev,
			items: prev.items.map((item, i) =>
				i === index ? updatedItem : item
			),
		}));
	}


	function AddLineItem() {

		const blankItem: InvoiceItem = {
			item: "",
			description: "",
			quantity: 0,
			unitPrice: 0,
		};


		setInvoice((prev) => ({
			...prev,
			items: [...prev.items, { ...blankItem }],
		}));
	}

	return (
		<div>
			<h1>Invoice Constructor</h1>

			<hr />

			<h3>Metadata</h3>
			<InvoiceMetadata
				value={invoice.metadata}
				onChange={(updatedMeta) =>
					setInvoice((prev) => ({
						...prev,
						metadata: updatedMeta,
					}))
				}
			/>

			<hr />

			<h3>Party Data</h3>

			<PartyForm
				label="From"
				value={invoice.from}
				onChange={(updatedFrom) =>
					setInvoice((prev) => ({
						...prev,
						from: updatedFrom,
					}))
				}
			/>

			<br />
			<PartyForm
				label="To"
				value={invoice.to}
				onChange={(updatedTo) =>
					setInvoice((prev) => ({
						...prev,
						to: updatedTo,
					}))
				}
			/>

			<hr />

			<div style={{ width: "100%" }}>
				<h3>Invoice Items</h3>
				{invoice.items.map((item, index) => (
					<>
						<LineItem
							key={index}
							value={item}
							onChange={(updatedItem) =>
								updateLineItem(index, updatedItem)
							}
						/>

						<br />
					</>
				))}

				<br />

				<button type="button" onClick={AddLineItem}>Add Item</button>

			</div>

			<hr />

			<InvoiceNotes
				value={invoice}
				onChange={(updatedInvoice) =>
					setInvoice((prev) => ({
						...prev,
						notes: updatedInvoice.notes,
					}))}
			/>


			<br />
			<hr />

			<h3>PDF Preview</h3>


			<InvoiceDocument value={invoice} />

		</div>
	);
}