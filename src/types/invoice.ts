export type InvoiceItem = {
  item: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type Invoice = {

  metadata: {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
  }


  from: {
    name: string;
    email: string;
    address: string;
  };

  to: {
    name: string;
    email: string;
    address: string;
  };

  items: InvoiceItem[];

  taxRate: number; // e.g. 0.1 for 10%
  notes?: string;
};