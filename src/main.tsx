import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InvoiceForm from './components/Form/InvoiceForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <InvoiceForm />

  </StrictMode>,
)
