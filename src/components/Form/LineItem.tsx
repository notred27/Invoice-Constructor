import type { InvoiceItem } from "../../types/invoice";

type LineItemProps = {
    value: InvoiceItem;
    onChange: (value: LineItemProps["value"]) => void;

}

export function LineItem({ value, onChange }: LineItemProps) {
    return (
        <div>
            <input
                placeholder="Item Name"
                value={value.item}
                onChange={(e) =>
                    onChange({ ...value, item: e.target.value })
                }
            />

            <textarea
                placeholder="Item Description"
                value={value.description}
                onChange={(e) =>
                    onChange({ ...value, description: e.target.value })
                }
            />

            <input
                type="number"
                placeholder="Quantity"
                value={value.quantity}
                onChange={(e) =>
                    onChange({ ...value, quantity: Number(e.target.value) })
                }
            />

            <input
                type="number"
                placeholder="Unit Price"
                value={value.unitPrice}
                onChange={(e) =>
                    onChange({ ...value, unitPrice: Number(e.target.value) })
                }
            />
        </div>
    )
}