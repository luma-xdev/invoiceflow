/* =========================================
   INVOICEFLOW
   Freelance Invoice Generator
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const businessName = document.getElementById("businessName");
    const businessEmail = document.getElementById("businessEmail");
    const businessPhone = document.getElementById("businessPhone");
    const businessAddress = document.getElementById("businessAddress");

    const clientName = document.getElementById("clientName");
    const clientEmail = document.getElementById("clientEmail");
    const clientPhone = document.getElementById("clientPhone");
    const clientAddress = document.getElementById("clientAddress");

    const invoiceNumber = document.getElementById("invoiceNumber");
    const invoiceCurrency = document.getElementById("invoiceCurrency");
    const invoiceDate = document.getElementById("invoiceDate");
    const dueDate = document.getElementById("dueDate");

    const taxRate = document.getElementById("taxRate");
    const discountRate = document.getElementById("discountRate");

    const invoiceNotes = document.getElementById("invoiceNotes");

    const itemsContainer =
        document.getElementById("itemsContainer");

    const addItemButton =
        document.getElementById("addItemButton");

    const clearButton =
        document.getElementById("clearButton");

    const printButton =
        document.getElementById("printButton");

    const themeToggle =
        document.getElementById("themeToggle");


    /* =========================================
       PREVIEW ELEMENTS
    ========================================= */

    const previewBusinessName =
        document.getElementById("previewBusinessName");

    const previewBusinessContact =
        document.getElementById("previewBusinessContact");

    const previewBusinessPhone =
        document.getElementById("previewBusinessPhone");

    const previewBusinessAddress =
        document.getElementById("previewBusinessAddress");

    const previewClientName =
        document.getElementById("previewClientName");

    const previewClientEmail =
        document.getElementById("previewClientEmail");

    const previewClientPhone =
        document.getElementById("previewClientPhone");

    const previewClientAddress =
        document.getElementById("previewClientAddress");

    const previewInvoiceNumber =
        document.getElementById("previewInvoiceNumber");

    const previewInvoiceDate =
        document.getElementById("previewInvoiceDate");

    const previewDueDate =
        document.getElementById("previewDueDate");

    const previewItems =
        document.getElementById("previewItems");

    const previewSubtotal =
        document.getElementById("previewSubtotal");

    const previewTax =
        document.getElementById("previewTax");

    const previewDiscount =
        document.getElementById("previewDiscount");

    const previewGrandTotal =
        document.getElementById("previewGrandTotal");

    const previewNotes =
        document.getElementById("previewNotes");


    /* =========================================
       DEFAULT VALUES
    ========================================= */

    const today = new Date();

    const formattedToday =
        today.toISOString().split("T")[0];

    invoiceDate.value = formattedToday;

    const defaultDueDate = new Date(today);

    defaultDueDate.setDate(
        defaultDueDate.getDate() + 7
    );

    dueDate.value =
        defaultDueDate.toISOString().split("T")[0];

    invoiceNumber.value =
        generateInvoiceNumber();


    /* =========================================
       HELPERS
    ========================================= */

    function generateInvoiceNumber() {

        const randomNumber =
            Math.floor(1000 + Math.random() * 9000);

        return `INV-${randomNumber}`;
    }


    function getCurrency() {

        return invoiceCurrency.value || "₹";

    }


    function formatMoney(amount) {

        const currency = getCurrency();

        return `${currency}${Number(amount).toFixed(2)}`;

    }


    function formatDate(dateValue) {

        if (!dateValue) {
            return "—";
        }

        const date = new Date(
            `${dateValue}T00:00:00`
        );

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function getInputValue(element, fallback) {

        const value =
            element.value.trim();

        return value || fallback;

    }


    /* =========================================
       UPDATE BASIC PREVIEW
    ========================================= */

    function updateBasicPreview() {

        previewBusinessName.textContent =
            getInputValue(
                businessName,
                "Your Business"
            );

        previewBusinessContact.textContent =
            getInputValue(
                businessEmail,
                "hello@example.com"
            );

        previewBusinessPhone.textContent =
            getInputValue(
                businessPhone,
                "+91 00000 00000"
            );

        previewBusinessAddress.textContent =
            getInputValue(
                businessAddress,
                "Your business address"
            );

        previewClientName.textContent =
            getInputValue(
                clientName,
                "Client Name"
            );

        previewClientEmail.textContent =
            getInputValue(
                clientEmail,
                "client@example.com"
            );

        previewClientPhone.textContent =
            getInputValue(
                clientPhone,
                "+91 00000 00000"
            );

        previewClientAddress.textContent =
            getInputValue(
                clientAddress,
                "Client address"
            );

        previewInvoiceNumber.textContent =
            `#${getInputValue(
                invoiceNumber,
                "INV-001"
            )}`;

        previewInvoiceDate.textContent =
            formatDate(invoiceDate.value);

        previewDueDate.textContent =
            formatDate(dueDate.value);

        previewNotes.textContent =
            getInputValue(
                invoiceNotes,
                "Thank you for your business."
            );

    }


    /* =========================================
       CALCULATE INVOICE
    ========================================= */

    function calculateInvoice() {

        const items =
            document.querySelectorAll(
                ".invoice-item"
            );

        let subtotal = 0;

        const previewData = [];

        items.forEach(item => {

            const descriptionInput =
                item.querySelector(
                    ".item-description"
                );

            const quantityInput =
                item.querySelector(
                    ".item-quantity"
                );

            const rateInput =
                item.querySelector(
                    ".item-rate"
                );

            const totalElement =
                item.querySelector(
                    ".item-total"
                );


            const description =
                descriptionInput.value.trim()
                || "Service";

            const quantity =
                Math.max(
                    Number(quantityInput.value) || 0,
                    0
                );

            const rate =
                Math.max(
                    Number(rateInput.value) || 0,
                    0
                );

            const total =
                quantity * rate;

            subtotal += total;


            totalElement.textContent =
                formatMoney(total);


            previewData.push({
                description,
                quantity,
                rate,
                total
            });

        });


        const tax =
            Math.max(
                Number(taxRate.value) || 0,
                0
            );

        const discount =
            Math.max(
                Number(discountRate.value) || 0,
                0
            );


        const taxAmount =
            subtotal * (tax / 100);

        const discountAmount =
            subtotal * (discount / 100);


        const grandTotal =
            subtotal +
            taxAmount -
            discountAmount;


        updatePreviewItems(
            previewData
        );


        previewSubtotal.textContent =
            formatMoney(subtotal);

        previewTax.textContent =
            formatMoney(taxAmount);

        previewDiscount.textContent =
            formatMoney(discountAmount);

        previewGrandTotal.textContent =
            formatMoney(
                Math.max(grandTotal, 0)
            );

    }


    /* =========================================
       UPDATE PREVIEW ITEMS
    ========================================= */

    function updatePreviewItems(items) {

        previewItems.innerHTML = "";

        if (items.length === 0) {

            const emptyItem =
                document.createElement("div");

            emptyItem.className =
                "preview-item";

            emptyItem.innerHTML = `
                <span>No services added</span>
                <span>—</span>
                <span>—</span>
                <strong>${formatMoney(0)}</strong>
            `;

            previewItems.appendChild(
                emptyItem
            );

            return;
        }


        items.forEach(item => {

            const row =
                document.createElement("div");

            row.className =
                "preview-item";

            row.innerHTML = `
                <span>${escapeHTML(item.description)}</span>
                <span>${item.quantity}</span>
                <span>${formatMoney(item.rate)}</span>
                <strong>${formatMoney(item.total)}</strong>
            `;

            previewItems.appendChild(row);

        });

    }


    /* =========================================
       ESCAPE HTML
    ========================================= */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }


    /* =========================================
       ADD ITEM
    ========================================= */

    function addItem() {

        const item =
            document.createElement("div");

        item.className =
            "invoice-item";

        item.innerHTML = `
            <input
                type="text"
                class="item-description"
                placeholder="Service description"
            >

            <input
                type="number"
                class="item-quantity"
                value="1"
                min="1"
            >

            <input
                type="number"
                class="item-rate"
                value="0"
                min="0"
                step="0.01"
            >

            <span class="item-total">
                ${formatMoney(0)}
            </span>

            <button
                type="button"
                class="remove-item"
                aria-label="Remove item"
            >
                ×
            </button>
        `;

        itemsContainer.appendChild(item);

        attachItemEvents(item);

        calculateInvoice();

    }


    /* =========================================
       ITEM EVENTS
    ========================================= */

    function attachItemEvents(item) {

        const inputs =
            item.querySelectorAll("input");

        inputs.forEach(input => {

            input.addEventListener(
                "input",
                () => {

                    calculateInvoice();

                }
            );

        });


        const removeButton =
            item.querySelector(
                ".remove-item"
            );

        removeButton.addEventListener(
            "click",
            () => {

                const allItems =
                    document.querySelectorAll(
                        ".invoice-item"
                    );

                if (allItems.length === 1) {

                    item.querySelector(
                        ".item-description"
                    ).value = "";

                    item.querySelector(
                        ".item-quantity"
                    ).value = 1;

                    item.querySelector(
                        ".item-rate"
                    ).value = 0;

                } else {

                    item.remove();

                }

                calculateInvoice();

            }
        );

    }


    /* =========================================
       INITIAL ITEM EVENTS
    ========================================= */

    document
        .querySelectorAll(".invoice-item")
        .forEach(item => {

            attachItemEvents(item);

        });


    /* =========================================
       LIVE FORM EVENTS
    ========================================= */

    const formInputs =
        document.querySelectorAll(
            "input, textarea, select"
        );

    formInputs.forEach(input => {

        input.addEventListener(
            "input",
            () => {

                updateBasicPreview();
                calculateInvoice();

            }
        );

        input.addEventListener(
            "change",
            () => {

                updateBasicPreview();
                calculateInvoice();

            }
        );

    });


    /* =========================================
       ADD ITEM BUTTON
    ========================================= */

    addItemButton.addEventListener(
        "click",
        addItem
    );


    /* =========================================
       PRINT
    ========================================= */

    printButton.addEventListener(
        "click",
        () => {

            window.print();

        }
    );


    /* =========================================
       CLEAR FORM
    ========================================= */

    clearButton.addEventListener(
        "click",
        () => {

            const confirmed =
                window.confirm(
                    "Clear all invoice information?"
                );

            if (!confirmed) {
                return;
            }


            document
                .querySelectorAll(
                    "input, textarea"
                )
                .forEach(input => {

                    if (
                        input.type !== "button" &&
                        input.type !== "submit"
                    ) {
                        input.value = "";
                    }

                });


            invoiceCurrency.value = "₹";

            taxRate.value = 0;

            discountRate.value = 0;

            invoiceNumber.value =
                generateInvoiceNumber();

            invoiceDate.value =
                formattedToday;

            dueDate.value =
                defaultDueDate
                    .toISOString()
                    .split("T")[0];


            itemsContainer.innerHTML = `
                <div class="invoice-item">

                    <input
                        type="text"
                        class="item-description"
                        placeholder="Website design"
                    >

                    <input
                        type="number"
                        class="item-quantity"
                        value="1"
                        min="1"
                    >

                    <input
                        type="number"
                        class="item-rate"
                        value="0"
                        min="0"
                        step="0.01"
                    >

                    <span class="item-total">
                        ${formatMoney(0)}
                    </span>

                    <button
                        type="button"
                        class="remove-item"
                        aria-label="Remove item"
                    >
                        ×
                    </button>

                </div>
            `;


            const newItem =
                itemsContainer.querySelector(
                    ".invoice-item"
                );

            attachItemEvents(newItem);

            updateBasicPreview();

            calculateInvoice();

        }
    );


    /* =========================================
       THEME TOGGLE
    ========================================= */

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-theme"
            );


            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            themeToggle.textContent =
                isLight ? "☀" : "◐";

        }
    );


    /* =========================================
       INITIAL RENDER
    ========================================= */

    updateBasicPreview();

    calculateInvoice();

});
