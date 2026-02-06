/**
 * Backup Comparison Table
 *
 * Initializes Tabulator for the backup options comparison table.
 * Provides checkbox filtering and responsive behavior.
 *
 * Documentation: https://tabulator.info/docs/6.3
 */

document.addEventListener('DOMContentLoaded', () => {
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
    Object.keys(values).forEach((key) => {
      const label = document.createElement('label');
      label.className = 'filter-checkbox-label';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = key;
      checkbox.checked = selectedValues.includes(key);

      checkbox.addEventListener('change', (e) => {
        e.stopPropagation();
        if (checkbox.checked) {
          selectedValues.push(checkbox.value);
        } else {
          const index = selectedValues.indexOf(checkbox.value);
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

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${key}`));
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
    const title = cell.getValue();
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'space-between';
    container.style.width = '100%';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    titleSpan.style.flex = '1';

    const filterIcon = document.createElement('span');
    filterIcon.innerHTML = '&#9660;'; // Down arrow
    filterIcon.className = 'filter-icon';
    filterIcon.style.cursor = 'pointer';
    filterIcon.style.marginLeft = '5px';
    filterIcon.style.fontSize = '0.8em';
    filterIcon.style.opacity = '0.6';

    filterIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      const column = cell.getColumn();
      const table = cell.getTable();
      const field = column.getField();
      const values = formatterParams.values;
      createFilterPopup(column, values, field, table);
    });

    container.appendChild(titleSpan);
    container.appendChild(filterIcon);

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
        minWidth: 120,
        widthGrow: 1.5,
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
        title: 'Storage Location',
        field: 'storage_location',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'storage_location')
        },
        minWidth: 150,
        widthGrow: 1
      },
      {
        title: 'E2E Encrypt by Default',
        field: 'e2e_encrypt_default',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'e2e_encrypt_default')
        },
        minWidth: 210,
        widthGrow: 1.2
      },
      {
        title: 'E2E Encrypt Available',
        field: 'e2e_encrypt_available',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'e2e_encrypt_available')
        },
        minWidth: 190,
        widthGrow: 1.2
      },
      {
        title: 'Desktop App',
        field: 'desktop_app',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'desktop_app')
        },
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: 'Web Access',
        field: 'web_access',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'web_access')
        },
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: 'Mobile App',
        field: 'mobile_app',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'mobile_app')
        },
        minWidth: 120,
        widthGrow: 1
      },
      {
        title: 'Version History',
        field: 'version_history',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'version_history')
        },
        minWidth: 140,
        widthGrow: 1
      },
      {
        title: 'MFA Support',
        field: 'mfa_support',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'mfa_support')
        },
        minWidth: 130,
        widthGrow: 1
      },
      {
        title: 'Inactivity Deletion',
        field: 'inactivity_deletion',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'inactivity_deletion')
        },
        minWidth: 160,
        widthGrow: 1.1
      },
      {
        title: 'Deduplication',
        field: 'deduplication',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'deduplication')
        },
        minWidth: 140,
        widthGrow: 1
      },
      {
        title: 'Price Tier',
        field: 'price_tier',
        headerSort: false,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'price_tier')
        },
        minWidth: 110,
        widthGrow: 1
      }
    ]
  });
});
