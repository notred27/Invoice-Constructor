
type InvoiceMetadataProps = {
    value: {
        invoiceNumber: string;
        issueDate: string;
        dueDate: string;
    };

    onChange: (value: InvoiceMetadataProps["value"]) => void;
}


export default function InvoiceMetadata({ value, onChange }: InvoiceMetadataProps) {

    return (

        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <div>
                <p>Issue Date</p>

                <input
                    type="date"
                    value={value.issueDate}
                    onChange={(e) =>
                        onChange({ ...value, issueDate: e.target.value })
                    }
                />
            </div>

            <div>
                <p>Due Date</p>

                <input
                    type="date"
                    value={value.dueDate}
                    onChange={(e) =>
                        onChange({ ...value, dueDate: e.target.value })
                    }
                />
            </div>

            <div>
                <p>Invoice ID</p>

                <input
                    placeholder="Invoice ID"
                    value={value.invoiceNumber}
                    onChange={(e) =>
                        onChange({ ...value, invoiceNumber: e.target.value })
                    }
                />
            </div>
        </div>
    )
}