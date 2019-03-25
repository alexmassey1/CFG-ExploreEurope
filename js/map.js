const countries = {
  uk: { name: "United Kingdom", selected: false },
  al: { name: "Albania", selected: false },
  at: { name: "Austria", selected: false },
  az: { name: "Azerbaijan", selected: false },
  by: { name: "Belarus", selected: false },
  be: { name: "Belgium", selected: false },
  ba: { name: "Bonsnia and Herzegovina", selected: false },
  bg: { name: "Bulgaria", selected: false },
  hr: { name: "Croatia", selected: false },
  cy: { name: "Cyprus", selected: false },
  cz: { name: "Czech Republic", selected: false },
  dk: { name: "Denmark", selected: false },
  ee: { name: "Estonia", selected: false },
  fi: { name: "Finland", selected: false },
  fr: { name: "France", selected: false },
  ge: { name: "Georgia", selected: false },
  de: { name: "Germany", selected: false },
  gr: { name: "Greece", selected: false },
  hu: { name: "Hungary", selected: false },
  is: { name: "Iceland", selected: false },
  ie: { name: "Ireland", selected: false },
  it: { name: "Italy", selected: false },
  kz: { name: "Kazakhstan", selected: false },
  xk: { name: "Kosovo", selected: false },
  lv: { name: "Latvia", selected: false },
  li: { name: "Liechtenstein", selected: false },
  lt: { name: "Lithuania", selected: false },
  lu: { name: "Luxembourg", selected: false },
  mk: { name: "Macedonia", selected: false },
  mt: { name: "Malta", selected: false },
  md: { name: "Moldova", selected: false },
  mc: { name: "Monaco", selected: false },
  me: { name: "Montenegro", selected: false },
  nl: { name: "Netherlands", selected: false },
  no: { name: "Norway", selected: false },
  pl: { name: "Poland", selected: false },
  pt: { name: "Portugal", selected: false },
  ro: { name: "Romania", selected: false },
  rs: { name: "Russia", selected: false },
  sm: { name: "San Marino", selected: false },
  rs: { name: "Serbia", selected: false },
  sk: { name: "Slovakia", selected: false },
  si: { name: "Slovenia", selected: false },
  es: { name: "Spain", selected: false },
  se: { name: "Sweden", selected: false },
  ch: { name: "Switzerland", selected: false },
  tr: { name: "Turkey", selected: false },
  ua: { name: "Ukraine", selected: false },
  va: { name: "Vatican City", selected: false },
  gl: { name: "Greenland", selected: false }
};

const TOTAL_COUNTRIES = 37;
let selected = 0;

const hover_label = $("#c_hover");
const numExplored = $("#c_explored");

const color_grey = "#c0c0c0";
const color_light_blue = "#9eb1ff";
const color_dark_blue = "#6683ff";
const color_disabled = "#ededed";

// When the document has loaded everything (map etc...)
window.onload = function() {
  // Select the object holder.
  let mapObj = document.getElementById("map");
  let svgContent = mapObj.contentDocument;
  let outlines = svgContent.getElementById("outlines");
  // changed to europe to only get european countries
  outlines.querySelectorAll("path").forEach(addEventListenerToCountry);
};

function addEventListenerToCountry(country) {
  if (!$(country).hasClass("europe")) {
    $(country).css("fill", color_disabled);
    return;
  }

  $(country)
    .on("mouseenter", handleCountryHoverStart)
    .on("mouseleave", handleCountryHoverEnd)
    .on("click", handleCountryHoverClick);
}

function handleCountryHoverStart(event) {
  let countryID = $(event.target).attr("id");
  const countryInfo = countries[countryID];

  hover_label.text(countryInfo.name);
  if (!countryInfo.selected) event.target.style.fill = color_light_blue;
}

function handleCountryHoverEnd(event) {
  let countryID = $(event.target).attr("id");
  const countryInfo = countries[countryID];

  hover_label.text("");
  if (!countryInfo.selected) event.target.style.fill = color_grey;
}

function handleCountryHoverClick(event) {
  let countryID = $(event.target).attr("id");
  const countryInfo = countries[countryID];

  if (countryInfo.selected) {
    // already highlighted
    event.target.style.fill = color_grey;
    countries[countryID].selected = false;
    selected--;
  } else {
    // not highlighted
    event.target.style.fill = color_dark_blue;
    countries[countryID].selected = true;
    selected++;
  }

  $("#c_explored").text(selected);
  $("#c_percent").text(Math.floor((selected / TOTAL_COUNTRIES) * 100) + "%");
}
