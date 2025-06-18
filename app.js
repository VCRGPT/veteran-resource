const resultsContainer = document.getElementById('resultsContainer');
const searchInput = document.getElementById('searchInput');

let data = [];

fetch('veterans_community_resource.json')
  .then(res => res.json())
  .then(jsonData => {
    data = jsonData;
    renderResults(data);
  })
  .catch(() => {
    resultsContainer.textContent = 'Error loading data.';
  });

searchInput.addEventListener('input', () => {
  const filter = searchInput.value.trim();
  const filtered = data.filter(item => matchesFilter(item, filter));
  renderResults(filtered);
  resultsContainer.scrollTop = 0;
});

function matchesFilter(item, filter) {
  if (!filter) return true;
  filter = filter.toLowerCase();
  return (
    item['Organization Name'].toLowerCase().includes(filter) ||
    item['Types of Assistance'].toLowerCase().includes(filter)
  );
}

function appendField(container, title, content, options = {}) {
  if (!content) return; // Hide empty fields completely

  const { isItalic = false, isLink = false, linkHref = '', spacingClass = 'spacing-3' } = options;

  const fieldWrapper = document.createElement('div');
  fieldWrapper.classList.add('field-wrapper', spacingClass);

  const titleElem = document.createElement('div');
  titleElem.classList.add('field-title');
  titleElem.textContent = title + ' –';

  const contentElem = document.createElement('div');
  contentElem.classList.add('field-content');
  if (isItalic) contentElem.classList.add('veteran-resources-content');

  if (isLink) {
    const link = document.createElement('a');
    link.href = linkHref;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = content;
    contentElem.appendChild(link);
  } else {
    contentElem.textContent = content;
  }

  fieldWrapper.appendChild(titleElem);
  fieldWrapper.appendChild(contentElem);

  container.appendChild(fieldWrapper);
}

function renderResults(items) {
  resultsContainer.innerHTML = '';

  if (items.length === 0) {
    resultsContainer.textContent = 'No results found.';
    return;
  }

  items.forEach(item => {
    const card = document.createElement('div');
    card.style.marginBottom = '40px'; // Space between cards

    // Organization Name (bold, 24pt, centered, uppercase)
    const orgName = document.createElement('div');
    orgName.classList.add('org-name');
    orgName.textContent = item['Organization Name'];
    card.appendChild(orgName);

    // Veteran Resources (5 lines space after)
    appendField(card, 'Veteran Resources', item['Veteran Resources'], {
      isItalic: true,
      spacingClass: 'spacing-5'
    });

    // Types of Assistance (5 lines space after)
    appendField(card, 'Types of Assistance', item['Types of Assistance'], {
      spacingClass: 'spacing-5'
    });

    // Website
    appendField(card, 'Website', item['Website'], {
      isLink: true,
      linkHref: item['Website']
    });

    // Email
    appendField(card, 'Email', item['Email'], {
      isLink: true,
      linkHref: `mailto:${item['Email']}`
    });

    // Phone
    appendField(card, 'Phone', item['Phone'], {
      isLink: true,
      linkHref: `tel:${item['Phone']}`
    });

    // Contact Name
    appendField(card, 'Contact Name', item['Contact Name']);

    // Contact Title
    appendField(card, 'Contact Title', item['Contact Title']);

    // Contact Email
    appendField(card, 'Contact Email', item['Contact Email'], {
      isLink: true,
      linkHref: `mailto:${item['Contact Email']}`
    });

    // Contact Phone (5 lines space after)
    appendField(card, 'Contact Phone', item['Contact Phone'], {
      isLink: true,
      linkHref: `tel:${item['Contact Phone']}`,
      spacingClass: 'spacing-5'
    });

    // Eligibility Requirements
    appendField(card, 'Eligibility Requirements', item['Eligibility Requirements']);

    // Application Process
    appendField(card, 'Application Process', item['Application Process']);

    // Documents Required
    appendField(card, 'Documents Required', item['Documents Required']);

    // Notes
    appendField(card, 'Notes', item['Notes']);

    // Distance from 34470 (mi)
    appendField(card, 'Distance from 34470 (mi)', item['Distance from 34470 (mi)']);

    // Address (link to Google Maps)
    if (item['Address']) {
      const encodedAddress = encodeURIComponent(item['Address']);
      appendField(card, 'Address', item['Address'], {
        isLink: true,
        linkHref: `https://maps.google.com/?q=${encodedAddress}`
      });
    }

    // Operating Hours
    appendField(card, 'Operating Hours', item['Operating Hours']);

    resultsContainer.appendChild(card);
  });
}
