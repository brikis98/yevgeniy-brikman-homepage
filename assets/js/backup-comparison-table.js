document.addEventListener('DOMContentLoaded', function() {
  const tableElement = document.getElementById('backup-comparison-table');

  if (!tableElement) {
    console.error('Table element not found');
    return;
  }

  if (typeof backupProvidersData === 'undefined') {
    console.error('Backup providers data not found');
    return;
  }

  if (!Array.isArray(backupProvidersData) || backupProvidersData.length === 0) {
    console.error('Backup providers data is empty or invalid');
    return;
  }

  function getUniqueValues(data, field) {
    const values = {};
    data.forEach(function(row) {
      const value = row[field];
      if (value !== null && value !== undefined && value !== '') {
        values[value] = value;
      }
    });
    return values;
  }

  function createFilterPopup(column, values, field) {
    const existingPopups = document.querySelectorAll('.filter-popup');
    existingPopups.forEach(function(popup) {
      popup.remove();
    });

    const popup = document.createElement("div");
    popup.className = "filter-popup";

    const container = document.createElement("div");
    container.className = "filter-popup-content";

    const filterValue = column.getHeaderFilterValue();
    const selectedValues = Array.isArray(filterValue) ? filterValue : [];

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear All";
    clearBtn.className = "filter-clear-btn";
    clearBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      column.setHeaderFilterValue(undefined);
      popup.remove();
    });
    container.appendChild(clearBtn);

    Object.keys(values).forEach(function(key) {
      const label = document.createElement("label");
      label.className = "filter-checkbox-label";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = key;
      checkbox.checked = selectedValues.indexOf(key) !== -1;

      checkbox.addEventListener("change", function(e) {
        e.stopPropagation();
        if (this.checked) {
          selectedValues.push(this.value);
        } else {
          const index = selectedValues.indexOf(this.value);
          if (index > -1) {
            selectedValues.splice(index, 1);
          }
        }
        // Apply filter immediately
        column.setHeaderFilterValue(selectedValues.length > 0 ? selectedValues : undefined);
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + key));
      container.appendChild(label);
    });

    popup.appendChild(container);

    // Position and show popup
    document.body.appendChild(popup);

    // Position relative to the column header
    const headerElement = column.getElement();
    const rect = headerElement.getBoundingClientRect();
    popup.style.position = "absolute";
    popup.style.left = rect.left + "px";
    popup.style.top = (rect.bottom + window.scrollY) + "px";
    popup.style.zIndex = "1000";

    // Close popup when clicking outside
    setTimeout(function() {
      document.addEventListener("click", function closePopup(e) {
        if (!popup.contains(e.target)) {
          popup.remove();
          document.removeEventListener("click", closePopup);
        }
      });
    }, 0);

    return popup;
  }

  function filterHeaderFormatter(cell, formatterParams) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "space-between";
    container.style.width = "100%";

    const titleSpan = document.createElement("span");
    titleSpan.textContent = cell.getValue();
    titleSpan.style.flex = "1";

    const filterIcon = document.createElement("span");
    filterIcon.innerHTML = "&#9660;"; // Down arrow
    filterIcon.className = "filter-icon";
    filterIcon.style.cursor = "pointer";
    filterIcon.style.marginLeft = "5px";
    filterIcon.style.fontSize = "0.8em";
    filterIcon.style.opacity = "0.6";

    filterIcon.addEventListener("click", function(e) {
      e.stopPropagation();
      const column = cell.getColumn();
      const field = column.getField();
      const values = formatterParams.values;
      createFilterPopup(column, values, field);
    });

    container.appendChild(titleSpan);
    container.appendChild(filterIcon);

    return container;
  }

  const tabulatorTable = new Tabulator("#backup-comparison-table", {
    data: backupProvidersData, // Load data from the JavaScript array
    height: "auto", // Let table expand to fit content
    layout: "fitColumns", // Fit columns to fill the table width exactly
    responsiveLayout: false, // Disable responsive column collapsing
    pagination: false, // Show all rows
    persistence: false, // No need for local storage
    placeholder: "No backup providers match your filters",
    initialSort: [
      {column: "provider", dir: "asc"}
    ],

    // Explicitly define columns for better control
    columns: [
      {
        title: "Provider",
        field: "provider",
        headerSort: false,
        headerFilter: false,
        minWidth: 120,
        widthGrow: 1.5,
        formatter: function (cell) {
          return "<strong>" + cell.getValue() + "</strong>";
        }
      },
      {
        title: "Storage Location",
        field: "storage_location",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "storage_location")
        },
        headerFilterFunc: "in",
        minWidth: 150,
        widthGrow: 1
      },
      {
        title: "E2E Encrypt by Default",
        field: "e2e_encrypt_default",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "e2e_encrypt_default")
        },
        headerFilterFunc: "in",
        minWidth: 210,
        widthGrow: 1.2
      },
      {
        title: "E2E Encrypt Available",
        field: "e2e_encrypt_available",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "e2e_encrypt_available")
        },
        headerFilterFunc: "in",
        minWidth: 190,
        widthGrow: 1.2
      },
      {
        title: "Desktop App",
        field: "desktop_app",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "desktop_app")
        },
        headerFilterFunc: "in",
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: "Web Access",
        field: "web_access",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "web_access")
        },
        headerFilterFunc: "in",
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: "Mobile App",
        field: "mobile_app",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "mobile_app")
        },
        headerFilterFunc: "in",
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: "Version History",
        field: "version_history",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "version_history")
        },
        headerFilterFunc: "in",
        minWidth: 140,
        widthGrow: 1
      },
      {
        title: "MFA Support",
        field: "mfa_support",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "mfa_support")
        },
        headerFilterFunc: "in",
        minWidth: 130,
        widthGrow: 1
      },
      {
        title: "Inactivity Deletion",
        field: "inactivity_deletion",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "inactivity_deletion")
        },
        headerFilterFunc: "in",
        minWidth: 160,
        widthGrow: 1.1
      },
      {
        title: "Deduplication",
        field: "deduplication",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "deduplication")
        },
        headerFilterFunc: "in",
        minWidth: 140,
        widthGrow: 1
      },
      {
        title: "Price Tier",
        field: "price_tier",
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, "price_tier")
        },
        headerFilterFunc: "in",
        minWidth: 110,
        widthGrow: 1
      }
    ]
  });
});
