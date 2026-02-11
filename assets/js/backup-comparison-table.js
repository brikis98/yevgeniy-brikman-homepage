document.addEventListener('DOMContentLoaded', () => {
  const tableElement = document.getElementById('backup-comparison-table');
  const showingStatusElement = document.getElementById('backup-comparison-showing');
  const selectedFiltersElement = document.getElementById('backup-comparison-filters');
  const selectedFilterCountElement = document.getElementById('backup-comparison-filter-count');
  const clearFiltersButton = document.getElementById('backup-comparison-clear-filters');

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

  const getMaxNumericValue = (field) => {
    return backupProvidersData.reduce((max, row) => {
      const value = parseInt(row[field], 10);
      return Number.isNaN(value) ? max : Math.max(max, value);
    }, Number.NEGATIVE_INFINITY);
  };

  const maxNumericHeaderFilterValues = {
    launched: getMaxNumericValue('launched'),
    price_tier: getMaxNumericValue('price_tier')
  };

  // Helper function to get unique values from a field for header filters
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

  // Helper function to create multi-select list filter params
  const createMultiSelectFilter = (field) => {
    return {
      values: getUniqueValues(backupProvidersData, field),
      multiselect: true,
      clearable: true
    };
  };

  // Custom filter function for multiselect to handle arrays properly
  const multiselectFilterFunc = (headerValue, rowValue, rowData, filterParams) => {
    // If no filter selected, show all
    if (!headerValue || headerValue.length === 0) {
      return true;
    }
    // Check if the row value is in the selected values
    return headerValue.includes(rowValue);
  };

  const escapeHtml = (value) => {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const parseNumericSortValue = (value) => {
    if (typeof value === 'boolean') {
      return value ? 1 : 0;
    }

    const stringValue = String(value);
    if (/unlimited/i.test(stringValue)) {
      return Number.POSITIVE_INFINITY;
    }
    if (/none/i.test(stringValue)) {
      return Number.NEGATIVE_INFINITY;
    }

    const match = stringValue.match(/-?\d[\d,]*(?:\.\d+)?/);
    if (!match) {
      return null;
    }

    const normalized = match[0].replace(/,/g, '');
    const parsed = Number.parseFloat(normalized);
    return Number.isNaN(parsed) ? null : parsed;
  };

  // Custom slider editor for year/number filters
  const customSliderEditor = function(cell, onRendered, success, cancel, editorParams){
    const container = document.createElement("div");
    container.style.width = "100%";
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.whiteSpace = "nowrap";

    // Get min/max values
    const values = editorParams.values || {};
    const numbers = Object.keys(values).map(n => parseInt(n)).sort((a, b) => a - b);
    const minValue = numbers[0];
    const maxValue = numbers[numbers.length - 1];

    // Check if this is a price field (has dollar formatting)
    const field = cell.getColumn().getField();
    const isPrice = field === 'price_tier';
    row.style.gap = isPrice ? "4px" : "6px";
    const formatValue = (val) => isPrice ? `$${val}` : val;

    // Get initial value
    const initialValue = cell.getValue();
    const currentValue = initialValue || maxValue;

    // Create display for current value (shown to the right of the slider)
    const display = document.createElement("div");
    display.textContent = formatValue(currentValue);
    display.style.textAlign = "left";
    display.style.fontSize = "0.85rem";
    display.style.fontWeight = "bold";
    display.style.color = "#0066cc";
    display.style.minWidth = isPrice ? "44px" : "40px";
    display.style.flexShrink = "0";

    // Create slider
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = minValue;
    slider.max = maxValue;
    slider.step = 1;
    slider.value = currentValue;
    if (isPrice) {
      slider.style.flex = "1 1 auto";
    } else {
      slider.style.flex = "0 0 auto";
      slider.style.width = "calc(100% - 46px)";
    }
    slider.style.minWidth = "0";
    slider.style.cursor = "pointer";

    // Update on input
    slider.addEventListener("input", (e) => {
      const selectedValue = parseInt(e.target.value);
      display.textContent = formatValue(selectedValue);
      // Apply filter immediately and keep max as an explicit value so the handle can stay at the far right.
      success(selectedValue);
    });

    row.appendChild(slider);
    row.appendChild(display);
    container.appendChild(row);

    return container;
  };

  const filterLabelHtml = (text) => {
    return `<i class="fa-solid fa-filter gray"></i> ${text}`;;
  }

  // Custom header filter editor that applies changes immediately with dropdown UI
  const customMultiselectEditor = function(cell, onRendered, success, cancel, editorParams){
    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.width = "100%";
    const field = cell.getColumn().getField();

    // Create dropdown button
    const button = document.createElement("button");
    button.style.width = "100%";
    button.style.padding = "4px 8px";
    button.style.border = "1px solid #ccc";
    button.style.borderRadius = "3px";
    button.style.backgroundColor = "#fff";
    button.style.cursor = "pointer";
    button.style.textAlign = "left";
    button.style.display = "flex";
    button.style.justifyContent = "space-between";
    button.style.alignItems = "center";

    const buttonText = document.createElement("span");
    buttonText.innerHTML = filterLabelHtml('Filter');
    buttonText.style.fontWeight = 'normal';
    button.appendChild(buttonText);

    const clearX = document.createElement("span");
    clearX.textContent = "✕";
    clearX.style.display = "none";
    clearX.style.padding = "0 4px";
    clearX.style.cursor = "pointer";
    clearX.style.color = "#999";
    clearX.style.fontWeight = "bold";
    clearX.addEventListener("mouseenter", () => {
      clearX.style.color = "#333";
    });
    clearX.addEventListener("mouseleave", () => {
      clearX.style.color = "#999";
    });
    clearX.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      // Clear selected values
      selectedValues.length = 0;

      // Update button text
      updateButtonText();

      // Regenerate dropdown content with all checkboxes unchecked
      populateDropdown();

      // Always show the dropdown after clearing (user clicked X, so they're interacting with it)
      dropdown.style.display = "block";
      document.body.appendChild(dropdown);
      positionDropdown();

      // Apply empty filter
      success([]);
    });
    button.appendChild(clearX);

    // Create dropdown menu - append to body for proper z-index
    const dropdown = document.createElement("div");
    dropdown.style.position = "fixed";
    dropdown.style.minWidth = "200px";
    dropdown.style.maxHeight = "250px";
    dropdown.style.overflowY = "auto";
    dropdown.style.padding = "8px 0";
    dropdown.style.backgroundColor = "#fff";
    dropdown.style.border = "1px solid #ccc";
    dropdown.style.borderRadius = "3px";
    dropdown.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
    dropdown.style.zIndex = "10000";
    dropdown.style.display = "none";

    const values = editorParams.values || {};
    const initialValue = cell.getValue() || [];
    const selectedValues = Array.isArray(initialValue) ? [...initialValue] : [];

    // Update button text based on selections
    const updateButtonText = () => {
      if (selectedValues.length === 0) {
        buttonText.innerHTML = filterLabelHtml('Filter');
        clearX.style.display = "none";
      } else {
        buttonText.innerHTML = filterLabelHtml(`${selectedValues.length} selected`);
        clearX.style.display = "inline";
      }
    };

    // Function to populate dropdown with checkboxes
    const populateDropdown = () => {
      dropdown.innerHTML = ''; // Clear existing content

      const sortedOptions = Object.keys(values)
        .map((key) => {
          const typedValue = key === 'true' ? true : key === 'false' ? false : key;
          const displayValue = values[key];
          return {
            key,
            typedValue,
            displayValue
          };
        })
        .sort((a, b) => {
          const categoryDiff = getFilterOptionCategoryRank(field, a.typedValue) - getFilterOptionCategoryRank(field, b.typedValue);
          if (categoryDiff !== 0) {
            return categoryDiff;
          }

          const numericA = parseNumericSortValue(a.displayValue);
          const numericB = parseNumericSortValue(b.displayValue);
          if (numericA !== null && numericB !== null && numericA !== numericB) {
            return numericB - numericA;
          }

          if (numericA !== null && numericB === null) {
            return -1;
          }
          if (numericA === null && numericB !== null) {
            return 1;
          }

          return String(b.displayValue).localeCompare(String(a.displayValue));
        });

      sortedOptions.forEach(({ key, typedValue, displayValue }) => {
        const label = document.createElement("label");
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "6px";
        label.style.padding = "2px 10px";
        label.style.cursor = "pointer";
        label.style.userSelect = "none";

        label.addEventListener("mouseenter", () => {
          label.style.backgroundColor = "#f0f0f0";
        });
        label.addEventListener("mouseleave", () => {
          label.style.backgroundColor = "";
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight = "0";
        checkbox.value = key;

        const shouldBeChecked = selectedValues.includes(typedValue);
        checkbox.checked = shouldBeChecked;

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            selectedValues.push(typedValue);
          } else {
            const index = selectedValues.indexOf(typedValue);
            if (index > -1) {
              selectedValues.splice(index, 1);
            }
          }
          updateButtonText();
          // Apply filter immediately - pass a new array to ensure change detection
          success(selectedValues.length > 0 ? [...selectedValues] : []);
        });

        label.appendChild(checkbox);
        const valueElement = document.createElement("span");
        valueElement.innerHTML = getFormattedFilterOptionHtml(field, typedValue, displayValue);
        label.appendChild(valueElement);
        dropdown.appendChild(label);
      });
    };

    // Position dropdown relative to button
    const positionDropdown = () => {
      const rect = button.getBoundingClientRect();
      dropdown.style.left = `${rect.left}px`;
      dropdown.style.top = `${rect.bottom}px`;
      dropdown.style.width = `${rect.width}px`;
    };

    // Initial population of dropdown
    populateDropdown();

    // Toggle dropdown
    button.addEventListener("click", (e) => {
      // Don't toggle if clicking the clear X or a checkbox
      if (e.target === clearX || clearX.contains(e.target)) {
        return;
      }

      // Don't toggle if this is a checkbox click (shouldn't happen, but be safe)
      if (e.target.type === 'checkbox') {
        return;
      }

      e.stopPropagation();
      if (dropdown.style.display === "none") {
        positionDropdown();
        dropdown.style.display = "block";
        document.body.appendChild(dropdown);
      } else {
        dropdown.style.display = "none";
        if (dropdown.parentNode) {
          dropdown.parentNode.removeChild(dropdown);
        }
      }
    });

    // Close dropdown when clicking outside
    const closeDropdown = (e) => {
      // Check if click is on a checkbox or label (even if removed from dropdown by populateDropdown)
      const isCheckboxClick = e.target.type === 'checkbox' ||
                              e.target.tagName === 'LABEL' ||
                              (e.target.parentElement && e.target.parentElement.tagName === 'LABEL');

      // Don't close if clicking on container, dropdown, or any checkbox/label
      if (!container.contains(e.target) && !dropdown.contains(e.target) && !isCheckboxClick) {
        // Only close if the dropdown is actually open
        if (dropdown.style.display === "block") {
          dropdown.style.display = "none";
          if (dropdown.parentNode) {
            dropdown.parentNode.removeChild(dropdown);
          }
        }
      }
    };
    document.addEventListener("click", closeDropdown);

    // Reposition on scroll
    window.addEventListener("scroll", () => {
      if (dropdown.style.display === "block") {
        positionDropdown();
      }
    });

    updateButtonText();
    container.appendChild(button);

    return container;
  };

  // Function to update URL hash with current filters
  const updateUrlHash = (table) => {
    const params = new URLSearchParams();

    // Get header filter values directly from each column
    table.getColumns().forEach(column => {
      const field = column.getField();
      if (field && field !== 'provider') { // Skip provider column
        const filterValue = table.getHeaderFilterValue(field);
        if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
          if (
            Object.prototype.hasOwnProperty.call(maxNumericHeaderFilterValues, field) &&
            parseInt(filterValue, 10) === maxNumericHeaderFilterValues[field]
          ) {
            return;
          }

          if (Array.isArray(filterValue) && filterValue.length > 0) {
            // Multiple values (checkbox filters)
            params.set(field, filterValue.join(','));
          } else if (!Array.isArray(filterValue)) {
            // Single value (slider filters)
            params.set(field, filterValue);
          }
        }
      }
    });

    const hash = params.toString();
    const url = new URL(window.location.href);
    url.hash = hash ? `#${hash}` : '';
    // Use replaceState so live slider updates don't trigger hashchange and rebuild filters mid-drag.
    history.replaceState(null, null, `${url.pathname}${url.search}${url.hash}`);
  };

  // Function to apply filters from URL hash
  const applyFiltersFromUrl = (table) => {
    // Always reset existing filters first so switching to a hash with fewer params
    // removes filters that are no longer present.
    table.clearHeaderFilter();

    const hash = window.location.hash.substring(1); // Remove the '#'
    if (!hash) return;

    const params = new URLSearchParams(hash);

    params.forEach((value, field) => {
      if (field === 'launched' || field === 'price_tier') {
        // Number filter - set the value directly
        const parsedValue = parseInt(value, 10);
        if (!Number.isNaN(parsedValue)) {
          table.setHeaderFilterValue(field, parsedValue);
        }
      } else {
        // Multi-select list filter (could be multiple values)
        const values = value.split(',').filter(v => v !== '');
        // Convert string values back to their original types - only booleans, keep strings as-is
        const parsedValues = values.map(v => {
          if (v === 'true') return true;
          if (v === 'false') return false;
          return v; // Keep as string
        });
        // For multiselect, set the array of selected values
        if (parsedValues.length > 0) {
          table.setHeaderFilterValue(field, parsedValues);
        }
      }
    });
  };

  const isHeaderFilterSelected = (field, filterValue) => {
    if (filterValue === null || filterValue === undefined || filterValue === '') {
      return false;
    }

    if (Array.isArray(filterValue)) {
      return filterValue.length > 0;
    }

    if (Object.prototype.hasOwnProperty.call(maxNumericHeaderFilterValues, field)) {
      return parseInt(filterValue, 10) !== maxNumericHeaderFilterValues[field];
    }

    return true;
  };

  const getSelectedFilterCount = (table) => {
    let count = 0;

    table.getColumns().forEach((column) => {
      const field = column.getField();
      if (!field || field === 'provider') {
        return;
      }

      const filterValue = table.getHeaderFilterValue(field);
      if (isHeaderFilterSelected(field, filterValue)) {
        count += 1;
      }
    });

    return count;
  };

  const getVisibleProviderCount = (table) => {
    if (typeof table.getDataCount === 'function') {
      return table.getDataCount('active');
    }

    return table.getRows('active').length;
  };

  const updateStatusDisplay = (table) => {
    if (!showingStatusElement || !selectedFiltersElement || !selectedFilterCountElement) {
      return;
    }

    const visibleProviderCount = getVisibleProviderCount(table);
    showingStatusElement.innerHTML = `Showing <span class="backup-comparison-status-number">${visibleProviderCount}/${backupProvidersData.length}</span> providers`;

    const selectedFilterCount = getSelectedFilterCount(table);
    if (selectedFilterCount > 0) {
      selectedFilterCountElement.innerHTML = `<span class="backup-comparison-status-number">${selectedFilterCount}</span> filter${selectedFilterCount === 1 ? '' : 's'} selected`;
      selectedFiltersElement.style.display = 'inline-flex';
    } else {
      selectedFiltersElement.style.display = 'none';
    }
  };

  // Create checkbox filter popup for a column
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

  const getFormattedFilterOptionHtml = (field, typedValue, rawValue) => {
    switch (field) {
      case 'encryption':
        return formatEncryption(typedValue);
      case 'transparency':
        return formatTransparency(typedValue);
      case 'versions_stored':
        return formatVersionsStored(typedValue);
      case 'versions_time_limit':
        return formatVersionsRetention(typedValue);
      case 'inactivity_limit':
        return formatInactivityLimit(typedValue);
      case 'granularity':
        return formatGranularity(typedValue);
      case 'mfa_support':
      case 'deduplication':
        return typedValue ? formatTickElement('Yes') : formatCrossElement('No');
      default:
        return escapeHtml(rawValue);
    }
  };

  const getFilterOptionCategoryRank = (field, typedValue) => {
    switch (field) {
      case 'encryption':
        if (typedValue === 'Default') return 0;
        if (typedValue === 'Available') return 1;
        return 2;
      case 'transparency':
        if (typedValue === 'Open') return 0;
        if (typedValue === 'Certified') return 1;
        return 2;
      case 'versions_stored':
      case 'versions_time_limit':
        if (typedValue === 'Unlimited') return 0;
        if (typedValue === 'None') return 2;
        return 1;
      case 'inactivity_limit':
        return typedValue === 'Unlimited' ? 0 : 2;
      case 'granularity':
        if (typedValue === 'Folders') return 0;
        if (typedValue === 'System') return 1;
        return 2;
      case 'mfa_support':
      case 'deduplication':
        return typedValue ? 0 : 2;
      default:
        return 1;
    }
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
        headerFilter: customSliderEditor,
        headerFilterFunc: "<=",
        headerFilterParams: {
          values: getUniqueValues(backupProvidersData, 'launched')
        },
        headerFilterLiveFilter: true,
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'CS Encryption',
        field: 'encryption',
        headerSort: false,
        formatter: encryptionFormatter,
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('encryption'),
        headerFilterPlaceholder: "Filter...",
        headerFilterLiveFilter: true,
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('mfa_support'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('transparency'),
        headerFilterPlaceholder: "Filter...",
        vertAlign: "middle",
        hozAlign: "left",
        headerHozAlign: "center",
        minWidth: 140
      },
      {
        title: 'Versions',
        field: 'versions_stored',
        headerSort: false,
        formatter: versionsStoredFormatter,
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('versions_stored'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('versions_time_limit'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('inactivity_limit'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('granularity'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customMultiselectEditor,
        headerFilterFunc: multiselectFilterFunc,
        headerFilterParams: createMultiSelectFilter('deduplication'),
        headerFilterPlaceholder: "Filter...",
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
        headerFilter: customSliderEditor,
        headerFilterFunc: "<=",
        headerFilterParams: {
          values: getUniqueValues(backupProvidersData, 'price_tier')
        },
        headerFilterLiveFilter: true,
        vertAlign: "middle",
        hozAlign: "center",
        headerHozAlign: "center",
        minWidth: 150
      }
    ]
  });

  // Flags to track state
  let initialLoadComplete = false;
  let applyingFromHash = false;

  // Update URL hash whenever filters change (but not during initial load or when applying from hash)
  tabulatorTable.on('dataFiltered', (filters, rows) => {
    if (initialLoadComplete && !applyingFromHash) {
      updateUrlHash(tabulatorTable);
    }

    updateStatusDisplay(tabulatorTable);
  });

  // Apply filters from URL hash after table is fully built
  tabulatorTable.on('tableBuilt', () => {
    applyFiltersFromUrl(tabulatorTable);
    initialLoadComplete = true;
    updateStatusDisplay(tabulatorTable);
  });

  // Listen for hash changes (e.g., browser back/forward, manual URL edits)
  window.addEventListener('hashchange', () => {
    if (!applyingFromHash && initialLoadComplete) {
      applyingFromHash = true;
      applyFiltersFromUrl(tabulatorTable);
      // Reset flag after a short delay to allow dataFiltered event to complete
      setTimeout(() => {
        applyingFromHash = false;
        updateStatusDisplay(tabulatorTable);
      }, 100);
    }
  });

  if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', () => {
      tabulatorTable.clearHeaderFilter();
      updateStatusDisplay(tabulatorTable);
    });
  }
});
