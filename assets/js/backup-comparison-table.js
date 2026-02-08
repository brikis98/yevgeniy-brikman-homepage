document.addEventListener('DOMContentLoaded', () => {
  const tableElement = document.getElementById('backup-comparison-table');

  const tickElement = `<i class='fa fa-check h4 green mr1'></i><span>Yes</span>`;
  const crossElement = `<i class='fa fa-times h4 red mr1'></i><span>No</span>`;
  const tickCrossParams = {
    allowEmpty: true,
    allowTruthy: true,
    tickElement: tickElement,
    crossElement: crossElement
  };

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

  // Helper function to get unique values from a field
  const getUniqueValues = (data, field) => {
    const values = {};
    data.forEach((row) => {
      const value = row[field];
      if (value !== null && value !== undefined && value !== '') {
        values[value] = value;
      }
    });
    return values;
  };

  // Create checkbox filter popup for a column
  const createFilterPopup = (column, values, field, table) => {
    // Remove any existing popups
    document.querySelectorAll('.filter-popup').forEach((popup) => popup.remove());

    const popup = document.createElement('div');
    popup.className = 'filter-popup';

    const container = document.createElement('div');
    container.className = 'filter-popup-content';

    // Get current filters for this field
    const currentFilters = table.getFilters().filter(f => f.field === field);
    const selectedValues = currentFilters.length > 0 && currentFilters[0].value
      ? currentFilters[0].value
      : [];

    // Add "Clear All" button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All';
    clearBtn.className = 'filter-clear-btn';
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      table.removeFilter(field, 'in');
      popup.remove();
    });
    container.appendChild(clearBtn);

    // Add checkboxes for each value
    Object.values(values).forEach((value) => {
      const valueAsString = `${value}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = valueAsString;
      checkbox.checked = selectedValues.includes(value);

      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        if (checkbox.checked) {
          selectedValues.push(value);
        } else {
          const index = selectedValues.indexOf(value);
          if (index > -1) {
            selectedValues.splice(index, 1);
          }
        }
        // Apply filter immediately
        if (selectedValues.length > 0) {
          table.setFilter(field, 'in', selectedValues);
        } else {
          table.removeFilter(field, 'in');
        }
      });

      const labelSpan = document.createElement('span');
      if (typeof value === 'boolean') {
        labelSpan.innerHTML = value ? tickElement : crossElement;
      } else {
        labelSpan.innerText = valueAsString;
      }

      const label = document.createElement('label');
      label.className = 'filter-checkbox-label';

      label.appendChild(checkbox);
      label.appendChild(labelSpan);

      container.appendChild(label);
    });

    popup.appendChild(container);

    // Position and show popup
    document.body.appendChild(popup);

    // Position relative to the column header
    const headerElement = column.getElement();
    const rect = headerElement.getBoundingClientRect();
    popup.style.position = 'absolute';
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.zIndex = '1000';

    // Close popup when clicking outside
    setTimeout(() => {
      const closePopup = (e) => {
        if (!popup.contains(e.target)) {
          popup.remove();
          document.removeEventListener('click', closePopup);
        }
      };
      document.addEventListener('click', closePopup);
    }, 0);

    return popup;
  };

  // Custom title formatter to add filter icon
  const filterHeaderFormatter = (cell, formatterParams) => {
    const titleSpan = document.createElement('span');
    titleSpan.innerText = cell.getValue();

    const filterSpan = document.createElement('span');
    filterSpan.innerHTML = `<i class="fas fa-filter filter-icon"></i>`;
    filterSpan.style.cursor = 'pointer';
    filterSpan.style.marginLeft = '5px';
    filterSpan.style.fontSize = '0.8em';
    filterSpan.style.opacity = '0.6';

    filterSpan.addEventListener('click', (e) => {
      e.stopPropagation();
      const column = cell.getColumn();
      const table = cell.getTable();
      const field = column.getField();
      const values = formatterParams.values;
      createFilterPopup(column, values, field, table);
    });

    const container = document.createElement('div');

    container.appendChild(titleSpan);
    container.appendChild(filterSpan);

    return container;
  };

  // Initialize Tabulator with data loaded from JavaScript
  const tabulatorTable = new Tabulator('#backup-comparison-table', {
    data: backupProvidersData,
    height: 'auto',
    layout: 'fitColumns',
    responsiveLayout: false,
    pagination: false,
    persistence: false,
    rowHeight: 90,
    placeholder: 'No backup providers match your filters',
    initialSort: [
      { column: 'provider', dir: 'asc' }
    ],

    // Explicitly define columns for better control
    columns: [
      {
        title: 'Provider',
        field: 'provider',
        headerSort: false,
        headerFilter: false,
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 120,
        frozen: true,
        formatter: (cell) => {
          const data = cell.getRow().getData();
          const name = data.provider;
          const url = data.provider_url;
          const logo = data.logo;

          return `
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="provider-link">
              <img src="/assets/img/${logo}" alt="${name}" class="provider-logo" />
              <div class="provider-name">${name}</div>
            </a>
          `;
        }
      },
      {
        title: 'E2E Encryption',
        field: 'e2e_encrypt_available',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'e2e_encrypt_available')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 150
      },
      {
        title: 'Web Access',
        field: 'web_access',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'web_access')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 130
      },
      {
        title: 'Desktop App',
        field: 'desktop_app',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'desktop_app')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 120
      },
      {
        title: 'Mobile App',
        field: 'mobile_app',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'mobile_app')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 130
      },
      {
        title: 'Version History',
        field: 'version_history',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'version_history')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 150
      },
      {
        title: 'MFA',
        field: 'mfa_support',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'mfa_support')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 80
      },
      {
        title: 'Inactivity Deletion',
        field: 'inactivity_deletion',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'inactivity_deletion')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 170
      },
      {
        title: 'Deduplication',
        field: 'deduplication',
        headerSort: false,
        formatter:"tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'deduplication')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 120
      },
      {
        title: 'Price Tier',
        field: 'price_tier',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'price_tier')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 120
      }
    ]
  });
});