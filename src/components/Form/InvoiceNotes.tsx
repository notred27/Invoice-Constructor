import type { Invoice } from "../../types/invoice";

type InvoiceNotesProps = {
    value: Invoice;
    onChange: (value: InvoiceNotesProps["value"]) => void;

}

export default function InvoiceNotes({ value, onChange }: InvoiceNotesProps) {
    return (<>
        <h3>Additional Notes</h3>
        <textarea
            placeholder="Notes"
            value={value.notes}
            onChange={(e) =>
                onChange({ ...value, notes: e.target.value })
            }
        />
    </>
    )
}