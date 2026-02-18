export function printInvoice({ treatment, procedureTotal, medicineTotal, grandTotal }) {
    const invoiceNumber = `INV-${treatment.id}-${Date.now().toString().slice(-6)}`;

    const procedureRows = treatment.procedures
        .map(
            (proc, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${proc.name || "—"}</td>
                <td style="text-align:center">${proc.tooth || "—"}</td>
                <td>${proc.findings || "—"}</td>
                <td style="text-align:right">₱${Number(proc.cost || 0).toFixed(2)}</td>
            </tr>`
        )
        .join("");

    const prescriptionRows = treatment.prescription
        .map(
            (med, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${med.name || "—"}</td>
                <td>${med.dosage || "—"}</td>
                <td style="text-align:right">₱${Number(med.price || 0).toFixed(2)}</td>
            </tr>`
        )
        .join("");

    const notesSection =
        Object.values(treatment.notes).some((v) => v.trim())
            ? `<div class="section">
                <h2>Clinical Notes</h2>
                ${treatment.notes.chiefComplaint ? `<div class="note-block"><span class="note-label">Chief Complaint:</span> ${treatment.notes.chiefComplaint}</div>` : ""}
                ${treatment.notes.clinicalFindings ? `<div class="note-block"><span class="note-label">Clinical Findings:</span> ${treatment.notes.clinicalFindings}</div>` : ""}
                ${treatment.notes.diagnosis ? `<div class="note-block"><span class="note-label">Diagnosis:</span> ${treatment.notes.diagnosis}</div>` : ""}
                ${treatment.notes.plan ? `<div class="note-block"><span class="note-label">Treatment Plan:</span> ${treatment.notes.plan}</div>` : ""}
                ${treatment.notes.followUp ? `<div class="note-block"><span class="note-label">Follow-up Instructions:</span> ${treatment.notes.followUp}</div>` : ""}
            </div>`
            : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Invoice — ${treatment.patient.fullName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            color: #1a1a1a;
            background: #fff;
            padding: 40px 48px;
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #111;
            padding-bottom: 20px;
            margin-bottom: 24px;
        }

        .clinic-name {
            font-size: 22px;
            font-weight: 700;
            letter-spacing: -0.5px;
            color: #111;
        }

        .clinic-sub {
            font-size: 11px;
            color: #666;
            margin-top: 3px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
        }

        .invoice-meta { text-align: right; }

        .invoice-title {
            font-size: 20px;
            font-weight: 700;
            color: #111;
            letter-spacing: -0.3px;
        }

        .invoice-number {
            font-size: 11px;
            color: #888;
            margin-top: 3px;
            font-family: monospace;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            margin-bottom: 28px;
        }

        .info-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #999;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .info-value { font-size: 13px; font-weight: 600; color: #111; }
        .info-value.secondary { font-weight: 400; color: #444; }

        .badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.3px;
        }

        .badge-unpaid { background: #fee2e2; color: #dc2626; }
        .badge-paid   { background: #dcfce7; color: #16a34a; }

        .section { margin-bottom: 24px; }

        .section h2 {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            color: #999;
            font-weight: 600;
            margin-bottom: 10px;
            padding-bottom: 6px;
            border-bottom: 1px solid #e5e5e5;
        }

        table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
        thead tr { background: #f4f4f5; }

        th {
            padding: 8px 10px;
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.6px;
            color: #666;
            font-weight: 600;
        }

        td {
            padding: 8px 10px;
            border-bottom: 1px solid #f0f0f0;
            color: #333;
            vertical-align: top;
        }

        tbody tr:last-child td { border-bottom: none; }

        .totals-wrapper { display: flex; justify-content: flex-end; margin-top: 16px; }

        .totals-table { width: 240px; border-collapse: collapse; }
        .totals-table td { padding: 5px 0; border-bottom: none; font-size: 12.5px; }
        .totals-table td:last-child { text-align: right; font-weight: 500; }

        .totals-table .grand-row td {
            border-top: 2px solid #111;
            padding-top: 10px;
            font-size: 14px;
            font-weight: 700;
            color: #111;
        }

        .note-block { margin-bottom: 8px; line-height: 1.6; }
        .note-label { font-weight: 600; color: #333; }

        .footer {
            margin-top: 40px;
            border-top: 1px solid #e5e5e5;
            padding-top: 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .footer-note { font-size: 11px; color: #aaa; line-height: 1.6; }

        .signature-line { width: 180px; border-top: 1px solid #333; margin-bottom: 4px; }
        .signature-name { font-size: 12px; font-weight: 600; color: #333; }
        .signature-title { font-size: 10px; color: #999; }

        @media print {
            body { padding: 24px 32px; }
            @page { margin: 0; }
        }
    </style>
</head>
<body>

    <div class="header">
        <div>
            <div class="clinic-name">Dental Clinic</div>
            <div class="clinic-sub">Official Invoice / Statement of Account</div>
        </div>
        <div class="invoice-meta">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-number">${invoiceNumber}</div>
        </div>
    </div>

    <div class="info-grid">
        <div>
            <div class="info-label">Patient</div>
            <div class="info-value">${treatment.patient.fullName}</div>
        </div>
        <div>
            <div class="info-label">Date</div>
            <div class="info-value secondary">${treatment.date}</div>
        </div>
        <div>
            <div class="info-label">Attending Dentist</div>
            <div class="info-value secondary">${treatment.dentist}</div>
        </div>
        <div>
            <div class="info-label">Payment Status</div>
            <div class="info-value">
                <span class="badge ${treatment.paymentStatus.toLowerCase() === "paid" ? "badge-paid" : "badge-unpaid"}">
                    ${treatment.paymentStatus}
                </span>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Procedures Performed</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:30px">#</th>
                    <th>Procedure</th>
                    <th style="width:70px; text-align:center">Tooth</th>
                    <th>Findings</th>
                    <th style="width:90px; text-align:right">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${procedureRows || '<tr><td colspan="5" style="color:#aaa; text-align:center">No procedures recorded</td></tr>'}
            </tbody>
        </table>
        <div class="totals-wrapper">
            <table class="totals-table">
                <tr>
                    <td style="color:#777">Procedures Subtotal</td>
                    <td>₱${procedureTotal.toFixed(2)}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="section">
        <h2>Medicines / Prescription</h2>
        <table>
            <thead>
                <tr>
                    <th style="width:30px">#</th>
                    <th>Medicine</th>
                    <th>Dosage</th>
                    <th style="width:90px; text-align:right">Price</th>
                </tr>
            </thead>
            <tbody>
                ${prescriptionRows || '<tr><td colspan="4" style="color:#aaa; text-align:center">No prescription recorded</td></tr>'}
            </tbody>
        </table>
        <div class="totals-wrapper">
            <table class="totals-table">
                <tr>
                    <td style="color:#777">Medicines Subtotal</td>
                    <td>₱${medicineTotal.toFixed(2)}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="totals-wrapper" style="margin-top:0">
        <table class="totals-table">
            <tr class="grand-row">
                <td>Grand Total</td>
                <td>₱${grandTotal.toFixed(2)}</td>
            </tr>
        </table>
    </div>

    ${notesSection}

    <div class="footer">
        <div class="footer-note">
            Thank you for trusting us with your dental care.<br />
            This invoice is system-generated and valid without signature unless noted.
        </div>
    </div>

    <script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=860,height=700");
    printWindow.document.write(html);
    printWindow.document.close();
}