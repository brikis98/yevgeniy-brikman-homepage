document.addEventListener('DOMContentLoaded', () => {
  const tableElement = document.getElementById('backup-comparison-table');

  const tickClass = 'fa-check';
  const crossClass = 'fa-times';
  const warningClass = 'fa-triangle-exclamation';

  const formatTickElement = (value) => {
    return `<i class='fa fa-fw ${tickClass} h4 green mr1'></i><span>${value}</span>`;
  };

  const formatCrossElement = (value) => {
    return `<i class='fa fa-fw ${crossClass} h4 red mr1'></i><span>${value}</span>`;
  };

  const formatWarningElement = (value) => {
    return `<i class='fa-solid fa-fw ${warningClass} h4 yellow mr1'></i><span>${value}</span>`;
  };

  const tickElement = formatTickElement('Yes');
  const crossElement = formatCrossElement('No');

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

  // Function to update URL hash with current filters
  const updateUrlHash = (table) => {
    const filters = table.getFilters();
    const params = new URLSearchParams();

    filters.forEach(filter => {
      if (filter.field) {
        if (Array.isArray(filter.value)) {
          // Multiple values (checkbox filters)
          params.set(filter.field, filter.value.join(','));
        } else {
          // Single value (slider filters)
          params.set(filter.field, filter.value);
        }
      }
    });

    const hash = params.toString();
    if (hash) {
      window.location.hash = hash;
    } else {
      // Clear hash if no filters
      history.replaceState(null, null, window.location.pathname);
    }
  };

  // Function to apply filters from URL hash
  const applyFiltersFromUrl = (table) => {
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const filtersToApply = [];

    params.forEach((value, field) => {
      if (field === 'launched' || field === 'price_tier') {
        // Slider filter
        filtersToApply.push({
          field: field,
          type: '<=',
          value: parseInt(value)
        });
      } else {
        // Checkbox filter (could be multiple values)
        const values = value.split(',');
        // Convert string values back to their original types
        const parsedValues = values.map(v => {
          if (v === 'true') return true;
          if (v === 'false') return false;
          if (!isNaN(v) && v !== '') return parseInt(v);
          return v;
        });
        filtersToApply.push({
          field: field,
          type: 'in',
          value: parsedValues
        });
      }
    });

    if (filtersToApply.length > 0) {
      table.setFilter(filtersToApply);
    }
  };

  // Create checkbox filter popup for a column
  const createFilterPopup = (column, values, field, table) => {
    // Remove any existing popups
    document.querySelectorAll('.filter-popup').forEach((popup) => popup.remove());

    const popup = document.createElement('div');
    popup.className = 'filter-popup';

    const container = document.createElement('div');
    container.className = 'filter-popup-content';

    // Add "Clear All" button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear All';
    clearBtn.className = 'filter-clear-btn';
    clearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const filter = field === 'launched' ? '<=' : 'in';
      table.removeFilter(field, filter);
      popup.remove();
    });
    container.appendChild(clearBtn);

    const popElements = createPopupElements(column, values, field, table);
    popElements.forEach(el => container.appendChild(el));

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

  const moneyFormatter = (value) => {
    return `$${value}`;
  }

  const createPopupElements = (column, values, field, table) => {
    switch (field) {
      case 'launched':
        return createSliderElements(column, values, field, table, 'Show providers founded in or before:');
      case 'price_tier':
        return createSliderElements(column, values, field, table, 'Show prices at or below:', moneyFormatter);
      default:
        return createCheckboxElements(column, values, field, table);
    }
  }

  const createCheckboxElements = (column, values, field, table) => {
    const valuesArray = Object.values(values);

    const currentFilters = table.getFilters().filter(f => f.field === field);
    const selectedValues = currentFilters.length > 0 && currentFilters[0].value
      ? currentFilters[0].value
      : [];

    const checkboxes = valuesArray.map((value) => {
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
        // Apply filter immediately - remove old filter for this field first, then add new one
        table.removeFilter(field, 'in');
        if (selectedValues.length > 0) {
          table.addFilter(field, 'in', selectedValues);
        }
      });

      const labelSpan = document.createElement('span');
      if (field === 'encryption') {
        labelSpan.innerHTML = formatEncryption(value);
      } else if (field === 'inactivity_limit') {
        labelSpan.innerHTML = formatInactivityLimit(value);
      } else if (field === 'versions_stored') {
        labelSpan.innerHTML = formatVersionsStored(value);
      } else if (field === 'versions_time_limit') {
        labelSpan.innerHTML = formatVersionsRetention(value);
      } else if (field === 'transparency') {
        labelSpan.innerHTML = formatTransparency(value);
      } else if (field === 'granularity') {
        labelSpan.innerHTML = formatGranularity(value);
      } else if (typeof value === 'boolean') {
        labelSpan.innerHTML = value ? tickElement : crossElement;
      } else {
        labelSpan.innerText = valueAsString;
      }

      const label = document.createElement('label');
      label.className = 'filter-checkbox-label';

      label.appendChild(checkbox);
      label.appendChild(labelSpan);

      return label;
    });

    // Sort values so the green tick is first, then the yellow warning, and then the red cross
    checkboxes.sort((left, right) => {
      const leftHtml = left.innerHTML;
      const rightHtml = right.innerHTML;

      if (leftHtml.includes(tickClass)) {
        return -1;
      }
      if (rightHtml.includes(tickClass)) {
        return 1;
      }
      if (leftHtml.includes(warningClass)) {
        return -1;
      }
      if (rightHtml.includes(warningClass)) {
        return 1;
      }
      return 0;
    });

    return checkboxes;
  };

  const createSliderElements = (column, values, field, table, label, formatter) => {
    const intValues = Object.keys(values).map(y => parseInt(y)).sort((a, b) => a - b);
    const minValue = intValues[0];
    const maxValue = intValues[intValues.length - 1];

    const filters = table.getFilters().filter(f => f.field === field);
    const currentValue = filters.length > 0 && filters[0].value
      ? filters[0].value
      : maxValue;

    const formattedCurrentValue = formatter ? formatter(currentValue) : currentValue;
    const formattedMinValue = formatter ? formatter(minValue) : minValue;
    const formattedMaxValue = formatter ? formatter(maxValue) : maxValue;

    const sliderLabel = document.createElement('div');
    sliderLabel.textContent = label;
    sliderLabel.style.marginBottom = '10px';
    sliderLabel.style.fontSize = '0.9rem';
    sliderLabel.style.color = '#333';

    const yearDisplay = document.createElement('div');
    yearDisplay.textContent = formattedCurrentValue;
    yearDisplay.style.fontSize = '1.4rem';
    yearDisplay.style.fontWeight = 'bold';
    yearDisplay.style.textAlign = 'center';
    yearDisplay.style.marginBottom = '15px';
    yearDisplay.style.color = '#0066cc';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = minValue;
    slider.max = maxValue;
    slider.value = currentValue;
    slider.step = 1;
    slider.style.width = '100%';
    slider.style.marginBottom = '10px';

    slider.addEventListener('input', (e) => {
      const selectedValue = parseInt(e.target.value);
      const formattedSelectedValue = formatter ? formatter(selectedValue) : selectedValue;
      yearDisplay.textContent = `${formattedSelectedValue}`;

      const currentFilters = table.getFilters();
      const filtersToKeep = [];

      currentFilters.forEach(filter => {
        if (filter.field === field) {
          return;
        }
        if (filter.field) {
          filtersToKeep.push({
            field: filter.field,
            type: filter.type,
            value: filter.value
          });
        }
      });

      if (selectedValue < maxValue) {
        filtersToKeep.push({
          field: field,
          type: '<=',
          value: selectedValue
        });
      }

      // Set all filters at once
      table.setFilter(filtersToKeep);
    });

    const rangeLabels = document.createElement('div');
    rangeLabels.style.display = 'flex';
    rangeLabels.style.justifyContent = 'space-between';
    rangeLabels.style.fontSize = '0.8rem';
    rangeLabels.style.color = '#666';
    rangeLabels.innerHTML = `<span>${formattedMinValue}</span><span>${formattedMaxValue}</span>`;

    return [sliderLabel, yearDisplay, slider, rangeLabels];
  };

  const formatEncryption = (value) => {
    switch (value) {
      case "Default":
        return formatTickElement(value);
      case "Available":
        return formatWarningElement(value);
      default:
        return formatCrossElement(value);
    }
  };

  const encryptionFormatter = (cell, formatterParams) => {
    return formatEncryption(cell.getValue());
  };

  const formatTransparency = (value) => {
    switch (value) {
      case "Open":
        return formatTickElement(value);
      case "Certified":
        return formatWarningElement(value);
      default:
        return formatCrossElement(value);
    }
  };

  const transparencyFormatter = (cell, formatterParams) => {
    return formatTransparency(cell.getValue());
  };

  const formatGranularity = (value) => {
    switch (value) {
      case "Folders":
        return formatTickElement(value);
      case "System":
        return formatWarningElement(value);
      default:
        return formatCrossElement(value);
    }
  };

  const granularityFormatter = (cell, formatterParams) => {
    return formatGranularity(cell.getValue());
  };

  const formatInactivityLimit = (value) => {
    switch (value) {
      case "Unlimited":
        return formatTickElement(value);
      default:
        return formatCrossElement(value);
    }
  };

  const inactivityLimitFormatter = (cell, formatterParams) => {
    return formatInactivityLimit(cell.getValue());
  };

  const formatVersionsStored = (value) => {
    switch (value) {
      case "Unlimited":
        return formatTickElement(value);
      case "None":
        return formatCrossElement(value);
      default:
        return formatWarningElement(value);
    }
  };

  const versionsStoredFormatter = (cell, formatterParams) => {
    return formatVersionsStored(cell.getValue());
  };

  const formatVersionsRetention = (value) => {
    switch (value) {
      case "Unlimited":
        return formatTickElement(value);
      case "None":
        return formatCrossElement(value);
      default:
        return formatWarningElement(value);
    }
  };

  const versionsRetentionFormatter = (cell, formatterParams) => {
    return formatVersionsRetention(cell.getValue());
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
        minWidth: 160,
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
        title: 'Created',
        field: 'launched',
        headerSort: false,
        formatter: 'text',
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'launched')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 100
      },
      {
        title: 'CS Encryption',
        field: 'encryption',
        headerSort: false,
        formatter: encryptionFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'encryption')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 150
      },
      {
        title: 'MFA',
        field: 'mfa_support',
        headerSort: false,
        formatter: "tickCross",
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
        title: 'Transparency',
        field: 'transparency',
        headerSort: false,
        formatter: transparencyFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'transparency')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'Web',
        field: 'web_access',
        headerSort: false,
        formatter: "tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'web_access')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 80
      },
      {
        title: 'Mobile',
        field: 'mobile_app',
        headerSort: false,
        formatter: "tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'mobile_app')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 80
      },
      {
        title: 'Versions',
        field: 'versions_stored',
        headerSort: false,
        formatter: versionsStoredFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'versions_stored')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'Version Retention',
        field: 'versions_time_limit',
        headerSort: false,
        formatter: versionsRetentionFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'versions_time_limit')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 170
      },
      {
        title: 'Inactivity Limit',
        field: 'inactivity_limit',
        headerSort: false,
        formatter: inactivityLimitFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'inactivity_limit')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 150
      },
      {
        title: 'Granularity',
        field: 'granularity',
        headerSort: false,
        formatter: granularityFormatter,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'granularity')
        },
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'Deduplication',
        field: 'deduplication',
        headerSort: false,
        formatter: "tickCross",
        formatterParams: tickCrossParams,
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'deduplication')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'Price (1TB/yr)',
        field: 'price_tier',
        headerSort: false,
        formatter: "money",
        formatterParams:{
          decimal: ".",
          thousand: ",",
          symbol: "$",
          precision: 0
        },
        titleFormatter: filterHeaderFormatter,
        titleFormatterParams: {
          values: getUniqueValues(backupProvidersData, 'price_tier')
        },
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 150
      }
    ]
  });

  // Flag to track initial load
  let initialLoadComplete = false;

  // Update URL hash whenever filters change (but not during initial load)
  tabulatorTable.on('dataFiltered', (filters, rows) => {
    if (initialLoadComplete) {
      updateUrlHash(tabulatorTable);
    }
  });

  // Apply filters from URL hash after table is fully built
  tabulatorTable.on('tableBuilt', () => {
    applyFiltersFromUrl(tabulatorTable);
    initialLoadComplete = true;
  });
});