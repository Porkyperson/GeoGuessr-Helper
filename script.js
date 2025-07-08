let countryLayer;
let countryData;

const defaultStyle = {
  color: 'gray',
  fillColor: 'lightgray',
  weight: 1,
  fillOpacity: 0.4
};

const highlightStyle = {
  color: '#006600',
  fillColor: '#66FF66',
  weight: 2,
  fillOpacity: 0.8
};

const dimStyle = {
  color: 'gray',
  fillColor: 'lightgray',
  weight: 1,
  fillOpacity: 0.1
};

const licensePlateColors = {
  "Botswana": "black",
  "Bangladesh": "black",
  "Albania": "white with blue strip",
  "Canada": "white",
  "American Samoa": "white",
  "Argentina": "white with blue strip",
  "Eswatini": "yellow",
  "Bhutan": "black",
  "Andorra": "white with blue strip",
  "Curaçao": "yellow",
  "Australia": "white",
  "Bolivia": "white",
  "Ghana": "yellow",
  "Cambodia": "white",
  "Austria": "white with red and blue strip",
  "Dominican Republic": "white",
  "Guam": "white",
  "Brazil": "white with blue strip",
  "Kenya": "yellow",
  "Christmas Island": "white",
  "Belgium": "white with red text",
  "Greenland": "white",
  "New Zealand": "blue",
  "Chile": "white",
  "Lesotho": "white",
  "India": "black",
  "Bulgaria": "white with blue strip",
  "Guatemala": "white",
  "Northern Mariana Islands": "white",
  "Colombia": "yellow",
  "Madagascar": "white",
  "Indonesia": "black",
  "Croatia": "white with blue and red strip",
  "Mexico": "white",
  "Ecuador": "white",
  "Nigeria": "white with green",
  "Israel": "yellow",
  "Czech Republic": "white with blue strip",
  "Puerto Rico": "white",
  "Peru": "white",
  "Rwanda": "yellow",
  "Japan": "white",
  "Denmark": "white with red strip",
  "United States": "white",
  "Uruguay": "white",
  "Senegal": "white",
  "Jordan": "white",
  "Estonia": "white with blue strip",
  "US Virgin Islands": "white",
  "South Africa": "white",
  "Kyrgyzstan": "white",
  "Faroe Islands": "white with blue strip",
  "Tunisia": "white",
  "Laos": "white",
  "Finland": "white with blue strip",
  "Uganda": "yellow",
  "Malaysia": "white",
  "France": "white with blue strip",
  "Mongolia": "white",
  "Germany": "white with blue strip",
  "Philippines": "white",
  "Gibraltar": "white",
  "Russia": "white with blue strip",
  "Greece": "white with blue strip",
  "Singapore": "white",
  "Hungary": "white with blue strip",
  "South Korea": "white",
  "Iceland": "white with blue strip",
  "Sri Lanka": "white",
  "Ireland": "white with blue strip",
  "Taiwan": "white",
  "Isle of Man": "white",
  "Thailand": "white",
  "Italy": "white with blue strip",
  "United Arab Emirates": "white",
  "Jersey": "white",
  "Vietnam": "white",
  "Latvia": "white with blue strip",
  "Lithuania": "white with blue strip",
  "Luxembourg": "white with blue strip",
  "Malta": "white with blue strip",
  "Monaco": "white",
  "Montenegro": "white with blue strip",
  "Netherlands": "yellow",
  "North Macedonia": "white",
  "Norway": "white with blue strip",
  "Poland": "white with blue strip",
  "Portugal": "white with blue strip",
  "Romania": "white with blue strip",
  "San Marino": "white",
  "Serbia": "white with blue strip",
  "Slovakia": "white with blue strip",
  "Slovenia": "white with blue strip",
  "Spain": "white with blue strip",
  "Sweden": "white with blue strip",
  "Switzerland": "white",
  "Turkey": "white",
  "Ukraine": "white",
  "United Kingdom": "white and yellow",
  "Kazakhstan": "white with blue strip",
  "Lebanon": "white with blue strip",
  "Panama": "white",
  "Qatar": "white with maroon",
  "São Tomé and Principe": "black"
};

let map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('data/countries.geojson')
  .then(res => res.json())
  .then(data => {
    countryData = data;

    const euCountries = [
      "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
      "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary",
      "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands",
      "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"
    ];

    const drivesOnMap = {
      left: ["United Kingdom", "Australia", "India", "Japan", "South Africa", "New Zealand", "Thailand", "Malaysia", "Kenya", "Indonesia", "Ireland", "Cyprus", "Malta"],
      right: []
    };

    const crosswalkCountsMap = {
      "0": ["Belgium", "Greece", "Austria"],
      "1": ["Poland"],
      "2": [],
      "3": ["Russia", "Estonia", "Latvia", "Lithuania", "Ukraine"],
      "4": ["Iceland", "Bulgaria", "Sweden", "Romania", "Norway"],
      "5": ["Albania", "Bulgaria", "Croatia", "Denmark", "Finland", "France", "Germany", "Hungary", "Monaco", "Italy", "Latvia", "Luxembourg", "Norway", "Montenegro", "Netherlands", "North Macedonia", "Portugal", "Romania", "San Marino", "Slovakia", "Slovenia", "Turkey"],
      "6": [],
      "7": ["Switzerland"],
      "8": ["Spain", "Andorra"]
    };

    const chevronArrowColors = {
      "#FFFFFF": ["Albania", "Andorra", "Australia", "Austria", "Bangladesh", "Bermuda", "Estonia", "France", "Greece", "Hungary", "Israel", "Italy", "Kyrgyzstan", "Lithuania", "Mongolia", "Qatar", "Russia", "Senegal", "Spain", "Switzerland", "Tunisia", "Ukraine", "United Kingdom", "Vietnam"],
      "#FF0000": ["Argentina", "Belgium", "Botswana", "Bulgaria", "Croatia", "Curacao", "Czech Republic", "Denmark", "Eswatini", "Germany", "Jordan", "Lesotho", "Netherlands", "North Macedonia", "Poland", "Philippines", "Romania", "Rwanda", "Slovakia", "Slovenia", "South Africa", "Sri Lanka", "Turkey", "United Arab Emirates"],
      "#FFFF00": ["Brazil", "Cambodia", "Finland", "Ghana", "Iceland", "Ireland", "Luxembourg", "Nigeria", "Norway", "Portugal", "Sweden"],
      "#0000FF": [""],
      "#000000": ["Bolivia", "Canada", "Chile", "Colombia", "Dominican Republic", "Ecuador", "Gibraltar", "Guam", "Guatemala", "India", "Indonesia", "Japan", "Kenya", "Laos", "Malaysia", "Mexico", "Montenegro", "New Zealand", "Peru", "Puerto Rico", "Serbia", "Singapore", "South Korea", "Taiwan", "Thailand", "Uganda", "United States", "Uruguay"]
    };

    const chevronBgColors = {
      "#FF0000": ["Austria", "Estonia", "Hungary", "Kyrgyzstan", "Lithuania", "Mongolia", "Russia", "Ukraine", "Vietnam"],
      "#FFFF00": ["Bolivia", "Canada", "Chile", "Colombia", "Dominican Republic", "Ecuador", "Guam", "Guatemala", "India", "Indonesia", "Japan", "Kenya", "Laos", "Malaysia", "Mexico", "New Zealand", "Peru", "Puerto Rico", "Singapore", "South Korea", "Taiwan", "Thailand", "United States", "Uruguay"],
      "#FFFFFF": ["Argentina", "Belgium", "Botswana", "Bulgaria", "Croatia", "Czech Republic", "Denmark", "Eswatini", "Germany", "Greenland", "Jordan", "Lesotho", "Latvia", "Monaco", "Netherlands", "North Macedonia", "Philippines", "Poland", "Romania", "Rwanda", "Serbia", "Slovakia", "Slovenia", "South Africa", "Sri Lanka", "Turkey", "Uganda", "United Arab Emirates"],
      "#0000FF": ["Andorra", "France", "Qatar", "Senegal", "Sweden", "Tunisia"],
      "#000000": ["Albania", "Australia", "Bangladesh", "Bermuda", "Brazil", "Cambodia", "Finland", "Ghana", "Greece", "Iceland", "Ireland", "Israel", "Italy", "Luxembourg", "Nigeria", "Norway", "Portugal", "Spain", "Switzerland", "United Kingdom"]
    };

    countryData.features.forEach(feature => {
      const name = feature.properties.name;
      feature.properties.in_eu = euCountries.includes(name);
      feature.properties.drives_on = drivesOnMap.left.includes(name) ? 'left' : 'right';
      feature.properties.crosswalk_lines = Object.entries(crosswalkCountsMap).find(([_, list]) => list.includes(name))?.[0] || "";
      feature.properties.chevron_arrow_color = Object.entries(chevronArrowColors).find(([_, list]) => list.includes(name))?.[0] || "";
      feature.properties.chevron_bg_color = Object.entries(chevronBgColors).find(([_, list]) => list.includes(name))?.[0] || "";
      feature.properties.plate_color = licensePlateColors[name] || "";
    });

    countryLayer = L.geoJSON(countryData, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name);
        feature.layerRef = layer;
      }
    }).addTo(map);

    ['rightDrive', 'leftDrive', 'filter-inEU', 'crosswalkCount', 'chevronArrowColor', 'chevronBgColor', 'plateColor']
      .forEach(id => document.getElementById(id)?.addEventListener('change', updateMap));
  });

function updateMap() {
  const drivesRight = document.getElementById('rightDrive')?.checked;
  const drivesLeft = document.getElementById('leftDrive')?.checked;
  const inEU = document.getElementById('filter-inEU')?.checked;
  const crosswalkValue = document.getElementById('crosswalkCount')?.value;
  const selectedArrowColor = document.getElementById('chevronArrowColor')?.value;
  const selectedBgColor = document.getElementById('chevronBgColor')?.value;
  const selectedPlateColor = document.getElementById('plateColor')?.value;

  const filtersActive = drivesRight || drivesLeft || inEU || crosswalkValue || selectedArrowColor || selectedBgColor || selectedPlateColor;

  if (!countryLayer) return;

  countryLayer.eachLayer(layer => {
    const p = layer.feature.properties;

    const matches =
      (!drivesRight || p.drives_on === 'right') &&
      (!drivesLeft || p.drives_on === 'left') &&
      (!inEU || p.in_eu === true) &&
      (crosswalkValue === "" || p.crosswalk_lines === crosswalkValue) &&
      (selectedArrowColor === "" || p.chevron_arrow_color === selectedArrowColor) &&
      (selectedBgColor === "" || p.chevron_bg_color === selectedBgColor) &&
      (selectedPlateColor === "" || p.plate_color === selectedPlateColor);

    if (!filtersActive) {
      layer.setStyle(defaultStyle);
    } else if (matches) {
      layer.setStyle(highlightStyle);
    } else {
      layer.setStyle(dimStyle);
    }
  });
}
document.getElementById('clearFilters')?.addEventListener('click', () => {
  // Clear checkboxes
  document.getElementById('rightDrive').checked = false;
  document.getElementById('leftDrive').checked = false;
  document.getElementById('filter-inEU').checked = false;

  // Clear dropdowns
  document.getElementById('crosswalkCount').value = "";
  document.getElementById('chevronArrowColor').value = "";
  document.getElementById('chevronBgColor').value = "";
  document.getElementById('plateColor').value = "";

  // Refresh map
  updateMap();
});
