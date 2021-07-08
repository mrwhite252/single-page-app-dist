// All vehicle information

const vehicleInfo = [
  {
    categoryId: 1,
    id: 1,
    name: "Motorbike",
    img: "../images/motorbike.png",
    discription: "Suzuki V-Strom or similar",
    gear: "6-speed manual",
    fuel: "Petrol",
    passenger: "1 Passenger",
    doors: "N/A",
    bags1: "1",
    bags2: "0",
    fuelConsumption: 3.7,
    price: 109,
    additional1:
      "+ 12V DC outlet for powering a satellite navigation system or for charging your phone.",
    additional2: "+ Large 20L fuel tank.",
    Additional3: "",
    Additional4: "",

    notice1: "For 1 passenger only.",
    notice2: "min 1 day, max 5 days.",
    notice3: "Motorbike driver license required.",
    notice4: "T&Cs applies.",
    minDate: 1,
    maxDate: 5,
    minPeople: 1,
    maxPeople: 1,
  },
  {
    categoryId: 2,
    id: 2,
    name: "Small Car",
    img: "../images/small-car.png",
    discription: "Toyota Corolla or similar",
    gear: "5-speed automatic",
    fuel: "Petrol",
    passenger: "1-2 Passenger",
    doors: "5 Doors",
    bags1: "1",
    bags2: "1",
    fuelConsumption: 8.5,
    price: 129,
    additional1: "+ Air conditioning",
    additional2: "+USB port",
    Additional3: "+AUX port",
    Additional4: "+Bluetooth",
    notice1: "Can only fit 1 child seat.",
    notice2: "min 1 day, max 10 days.",
    notice3: "All our rental cars are smoking free.",
    notice4: "T&Cs applies.",
    minDate: 1,
    maxDate: 10,
    minPeople: 1,
    maxPeople: 2,
  },
  {
    categoryId: 3,
    id: 3,
    name: "Large Car",
    img: "../images/large-car.png",
    discription: "Toyota Rav4 or similar",
    gear: "6-speed automatic",
    fuel: "Petrol",
    passenger: "1-4 Passenger",
    doors: "5 Doors",
    bags1: "2",
    bags2: "2",
    fuelConsumption: 9.7,
    price: 144,
    additional1: "+ Air conditioning",
    additional2: "+USB port",
    Additional3: "+AUX port",
    Additional4: "+Bluetooth",
    notice1: "Can fit 2 child seats.",
    notice2: "min 3 day, max 10 days.",
    notice3: "All our rental cars are smoking free.",
    notice4: "T&Cs applies.",
    minDate: 3,
    maxDate: 10,
    minPeople: 1,
    maxPeople: 4,
  },
  {
    categoryId: 4,
    id: 4,
    name: "Motor Home",
    img: "../images/motorhome.png",
    discription: "Discovery - 4 Berth",
    gear: "6-speed automatic",
    fuel: "Diesel",
    passenger: "2-6 Passenger",
    doors: "6 Doors",
    bags1: "3",
    bags2: "5",
    fuelConsumption: 17,
    price: 200,
    additional1: "+ Air conditioning",
    additional2: "+USB port",
    Additional3: "+AUX port",
    Additional4: "+Bluetooth",
    notice1: "Self-contained motor home.",
    notice2: "min 2 day, max 15 days.",
    notice3: "All our rental cars are smoking free.",
    notice4: "T&Cs applies.",
    minDate: 2,
    maxDate: 15,
    minPeople: 2,
    maxPeople: 6,
  },
];

// Initialize functions

function init() {
  pageSwitching();
  interactiveMap();
  changeQuantityNumber();
  displayVehicle(vehicleInfo);
  InputValidation();
}

init();

// Landing view hide:

$(".right-btn").click(() => {
  $(".landing-view").hide();
  $(".home-view").show();
});

// Switch from home view to select car view:

function pageSwitching() {
  $(".button-1").click(() => {
    const target_top = $(".select-car-view").offset().top;

    $("html,body").animate({ scrollTop: target_top }, 1000);
    $("html,body").scrollTop(target_top);

    SelectViewUpdate();
    $(".booking-btn").click(selectVehicle);
  });
}

// Interactive map settings:

function interactiveMap() {
  const map = L.map("map1").setView([-43.532, 172.6306], 4),
    mapItineraryView = L.map("map2").setView([-43.532, 172.6306], 4);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ).addTo(map);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }
  ).addTo(mapItineraryView);

  // Add two depots location on the map when selected

  const chcDepot = [-43.477002, 172.55427],
    zqnDepot = [-45.024246, 168.736876],
    vehicleIcon = L.icon({
      iconUrl: "../svg/marker.svg",

      iconSize: [30, 30],
    }),
    selectedCoords = [];

  $("#pick-up-location").change(addIconToMap);

  $("#return-location").change(addIconToMap);

  // Add icon to the map, show the route and calculate the total milsage

  function addIconToMap(e) {
    if (e.target.value === "Christchurch") {
      L.marker(chcDepot, { icon: vehicleIcon })
        .addTo(map)
        .bindPopup("Christchurch Airport Depot");
      selectedCoords.push(chcDepot);
      L.marker(chcDepot, { icon: vehicleIcon })
        .addTo(mapItineraryView)
        .bindPopup("Christchurch Airport Depot");
    }

    if (e.target.value === "Queenstown") {
      L.marker(zqnDepot, { icon: vehicleIcon })
        .addTo(map)
        .bindPopup("Queenstown  Airport Depot");
      selectedCoords.push(zqnDepot);
      L.marker(zqnDepot, { icon: vehicleIcon })
        .addTo(mapItineraryView)
        .bindPopup("Queenstown  Airport Depot");
    }

    if (selectedCoords.length === 2) {
      getRouteInfo();
    }
  }

  // Get the distance when select two depots and update the total mileage

  function getRouteInfo() {
    let html = "";

    route = L.Routing.control({
      waypoints: selectedCoords,
    })
      .addTo(map)
      .on("routesfound", (e) => {
        const distance = e.routes[0].summary.totalDistance,
          km = (distance / 1000).toFixed(1);

        html = `Total Mileage: <span id="total-mileage">${km}</span><span>km</span>`;

        $(".milesage").html(html);
      });

    route = L.Routing.control({
      waypoints: selectedCoords,
    }).addTo(mapItineraryView);
  }
}

// Settings of the date picker

$("#date-selector-1").flatpickr({
  mode: "range",
  ariaDateFormat: "D j M Y H:i k",
  dateFormat: "D j M Y H:i k",
  minDate: "today",
  maxDate: new Date().fp_incr(14),
  enableTime: true,
  minTime: "07:00",
  maxTime: "19:00",

  onChange(selectedDates) {
    const thisObj = this,
      dateArr = selectedDates.map((date) =>
        thisObj.formatDate(date, "D j M Y H:i K")
      );

    $("#date-selector-1").val(dateArr[0]);
    $("#date-selector-2").val(dateArr[1]);
  },

  onClose(date) {
    let startDay = flatpickr.formatDate(date[0], "m/d/Y"),
      endDay = flatpickr.formatDate(date[1], "m/d/Y"),
      newStartDate = new Date(startDay).getTime(),
      newEndDate = new Date(endDay).getTime();

    newStartDate = eval(newStartDate / 1000 + 3600); // For GMT+1 I had to add 3600 (seconds) [1 hour]
    newEndDate = eval(newEndDate / 1000 + 3600); // For GMT+1 I had to add 3600 (seconds) [1 hour]

    const countDays = eval(newEndDate - newStartDate),
      Days = eval(countDays / 86400 + 1),
      html = `Choose return date & time: (in <span id="travelling-dates"> ${Days} </span> Days)`;

    $("#return-date").html(html);
  },
});

// Change the number of travller

function changeQuantityNumber() {
  // When clicking plus button, increase number
  $(".fa-user-plus,.fa-plus").click(function () {
    const num = parseInt($(this).prev().val()),
      addNum = num + 1;

    $(this).prev().val(addNum);
  });

  // When clicking on minus button, decrease number
  $(".fa-user-minus,.fa-minus").click(function () {
    const num = parseInt($(this).next().val()),
      minusNum = num - 1;

    $(this).next().val(minusNum);
  });
}

// Display all types of vehicles

function displayVehicle(vehicleArray) {
  let html = "";

  for (const vehicle of vehicleArray) {
    html += `
  
  <div class="vehicle-thumbnail-container" data-id="${vehicle.categoryId}" id="${vehicle.id}">
  <h5 class="thumbnail-title">Vehicle Details</h5>
  <div class="vehicle-thumbnail">
    <div class="car-basic-info-container">
      <img class="main-img" src="${vehicle.img}" />
      <div class="car-detail">
        <div class="car-name">
          <h2 class="car-type">${vehicle.name}</h2>
          <h3 class="car-discription">${vehicle.discription}</h3>
        </div>
        <div class="car-basic-info">
          <div class="car-basic-info-content gear">
            <img class="icon-img" src="../SVG/gear.svg" />
            <p>${vehicle.gear}</p>
          </div>
          <div class="car-basic-info-content fuel">
            <img class="icon-img" src="../SVG/fuel.svg" />
            <p>${vehicle.fuel}</p>
          </div>
          <div class="car-basic-info-content passenger">
            <img class="icon-img" src="../SVG/passenger.svg" />
            <p>${vehicle.passenger}</p>
          </div>
          <div class="car-basic-info-content doors">
            <img class="icon-img" src="../SVG/doors.svg" />
            <p>${vehicle.doors}</p>
          </div>
          <div class="car-basic-info-content bags">
            <img class="icon-img" src="../SVG/bag.svg" />
            <p>
              <span>${vehicle.bags1}</span> big bag <br />
              <span>${vehicle.bags2}</span> small bag
            </p>
          </div>
          <div class="car-basic-info-content fuel-consumption">
            <img class="icon-img" src="../SVG/milsage.svg" />
            <p><span>${vehicle.fuelConsumption}</span>L/100KM</p>
          </div>
          <div class="price-container">
            <p><span>$</span><span>${vehicle.price} </span>NZD/day</p>
          </div>
          <p class="more-info-btn">+more information</p>
        </div>
      </div>
    </div>
    <div class="car-additional-info">
      <div class="car-additional-info-content-1">
        <h5>Additional Features:</h5>
        <p>${vehicle.additional1}</p>
        <p>${vehicle.additional2}</p>
        <p>${vehicle.Additional3}</p>
        <p>${vehicle.Additional4}</p>
      </div>
      <div class="car-additional-info-content-2">
        <h5>Notice:</h5>
        <p>${vehicle.notice1}</p>
        <p>${vehicle.notice2}</p>
        <p>${vehicle.notice3}</p>
        <p>${vehicle.notice4}</p>
      </div>
    </div>
    <div class="car-price-info">
      <p class="price-holder">
        <span>$</span><span></span>NZD total
      </p>
      <p>
        Total price calculated based on the milsage and hiring
        time.
        <br />
        Taxes and surcharges included.
      </p>
    </div>
    <div class="booking-btn">
      <h3>Book Now</h3>
    </div>
  </div>
</div>    
  `;

    $(".vehicle-total-container").html(html);
  }

  $(".car-additional-info").hide();

  $(".more-info-btn").click(() => {
    $(".car-additional-info").toggle();
  });
}

// Filtering the type of vehicle based on the selected dates & travel dates, and calculate rental price on the basis + fuel consumption;

function SelectViewUpdate() {
  const filteredVehicle = [],
    travelDates = parseInt($("#travelling-dates").text()),
    numOfTraveller = parseInt($("#number-input").val()),
    totalMilsage = parseFloat($("#total-mileage").text());

  // Filtering the type of vehicle based on the selected dates

  switch (numOfTraveller) {
    case 1:
      if (travelDates >= 1 && travelDates <= 5) {
        filteredVehicle.push(vehicleInfo[0]);
      }
      if (travelDates >= 1 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[1]);
      }
      if (travelDates >= 3 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[2]);
      }

      break;

    case 2:
      if (travelDates >= 1 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[1]);
      }
      if (travelDates >= 3 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[2]);
      }

      if (travelDates >= 2 && travelDates <= 15) {
        filteredVehicle.push(vehicleInfo[3]);
      }

      break;

    case 3:
      if (travelDates >= 3 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[2]);
      }

      if (travelDates >= 2 && travelDates <= 15) {
        filteredVehicle.push(vehicleInfo[3]);
      }

      break;

    case 4:
      if (travelDates >= 3 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[2]);
      }

      if (travelDates >= 2 && travelDates <= 15) {
        filteredVehicle.push(vehicleInfo[3]);
      }

      break;

    case 5:
      if (travelDates >= 3 && travelDates <= 10) {
        filteredVehicle.push(vehicleInfo[2]);
      }

      if (travelDates >= 2 && travelDates <= 15) {
        filteredVehicle.push(vehicleInfo[3]);
      }
      break;

    case 6:
      if (travelDates >= 2 && travelDates <= 15) {
        filteredVehicle.push(vehicleInfo[3]);
      }

      break;
  }

  // Calculate rental price

  function calcRentalPrice(filteredVehicle) {
    const priceContent = document.querySelectorAll(".price-holder"),
      html = [],
      totalPrice = [];

    for (let i = 0; i < filteredVehicle.length; i++) {
      totalPrice[i] = (
        filteredVehicle[i].price * travelDates +
        filteredVehicle[i].fuelConsumption * (totalMilsage / 100)
      ).toFixed(2);

      html.push(`<span>$</span><span>${totalPrice[i]} </span>NZD total`);
      priceContent[i].innerHTML = html[i];
    }
  }

  // Update itinerary card information

  function updateItinerary() {
    const pickUpLocation = $("#pick-up-location option:selected").text(),
      returnLocation = $("#return-location option:selected").text(),
      age = $("#age-selector option:selected").text(),
      license = $("#license-selector option:selected").text(),
      pickUpDate = $("#date-selector-1").val(),
      returnDate = $("#date-selector-2").val(),
      html = `
  
  <div class="itinerary-thumbnail">
  <div class="content-wrapper pick-up">
    <h6>Pick Up:</h6>
    <p>${pickUpLocation}</p>
    <p>
   ${pickUpDate}
    </p>
  </div>
  <div class="content-wrapper return">
 <h6>Return: (in <span></span>${travelDates} days)</h6>
    <p>${returnLocation}</p>
    <p>
    ${returnDate}
    </p>
  </div>
  <div class="content-wrapper age">
    <h6>Renter Age:</h6>
    <p>${age}</p>
  </div>
  <div class="content-wrapper license">
    <h6>Driver License:</h6>
    <p>${license}</p>
  </div>
  <div class="content-wrapper number">
    <h6>Total Travllers:</h6>
    <p>${numOfTraveller}</p>
  </div>
  <div class="content-wrapper milsage">
    <h6>Total Milsage:</h6>
    <p>${totalMilsage}<span>km</span></p>
  </div>
</div>
  
  `;

    $(".itinerary-thumbnail").html(html);

    const htmlFinalView = `
  
  <div class="content-wrapper pick-up">
              <h6>Pick Up:</h6>
              <p>${pickUpLocation}</p>
              <p>
              ${pickUpDate}
              </p>
            </div>
            <div class="content-wrapper return">
              <h6>Return: (in <span> ${travelDates} </span> days)</h6>
              <p>${returnLocation}</p>
              <p>
              ${returnDate}
              </p>
            </div>
  `;

    $(".final-view-itinerary").html(htmlFinalView);
  }

  displayVehicle(filteredVehicle);
  calcRentalPrice(filteredVehicle);
  updateItinerary();
}

// Select vehicle when press booking botton, and update the details

function selectVehicle() {
  const target_top = $(".add-extra-view").offset().top;

  $("html,body").animate({ scrollTop: target_top }, 200);
  $("html,body").scrollTop(target_top);

  const selectVehicleId = $(this)
      .parents(".vehicle-thumbnail-container")
      .attr("data-id"),
    selectedVehicle = vehicleInfo.find(
      (vehicle) => selectVehicleId == vehicle.categoryId
    ),
    html = `
  <h5 class="thumbnail-title">Vehicle Details</h5>
  <div class="vehicle-thumbnail">
  <img class="main-img" src=${selectedVehicle.img} />
  <div class="car-detail">
    <div class="car-name">
      <h2 class="car-type">${selectedVehicle.name}</h2>
      <h3 class="car-discription">${selectedVehicle.discription}</h3>
    </div>
    <div class="car-basic-info">
      <div class="car-basic-info-content fuel">
        <img class="icon-img" src="../SVG/fuel.svg" />
        <p>${selectedVehicle.fuel}</p>
      </div>
      <div class="car-basic-info-content passenger">
        <img class="icon-img" src="../SVG/passenger.svg" />
        <p>${selectedVehicle.passenger}</p>
      </div>
      <div class="car-basic-info-content bags">
        <img class="icon-img" src="../SVG/bag.svg" />
        <p>
          <span>${selectedVehicle.bags1}</span> big bag <br />
          <span>${selectedVehicle.bags2}</span> small bag
        </p>
      </div>
      <div class="car-basic-info-content fuel-consumption">
        <img class="icon-img" src="../SVG/milsage.svg" />
        <p><span>${selectedVehicle.fuelConsumption}</span>L/100KM</p>
      </div>
      <div class="price-container">
        <p><span>$</span><span>${selectedVehicle.price} </span>/day</p>
      </div>
    </div>
  </div>
</div>
  `;

  $(".vehicle-thumbnail-container").html(html);

  const htmlFinalView = `
<div class="thumbnail-title">
            <h5>Vehicle Details</h5>
            <div class="edit-btn">
              <i class="fas fa-user-edit"></i>
              <h5>Edit</h5>
            </div>
          </div>
          <div class="vehicle-thumbnail final-view-vehicle">
           <img class="main-img" src=${selectedVehicle.img} />
            <div class="car-name">
              <h2 class="car-type">${selectedVehicle.name}</h2>
              <h3 class="car-discription">${selectedVehicle.discription}</h3>
            </div>
            <div class="car-detail">
              <div class="car-basic-info">
                <div class="car-basic-info-content fuel">
                  <img class="icon-img" src="../SVG/fuel.svg" />
                  <p>${selectedVehicle.fuel}</p>
                </div>
                <div class="car-basic-info-content passenger">
                  <img class="icon-img" src="../SVG/passenger.svg" />
                  <p>${selectedVehicle.passenger}</p>
                </div>
                <div class="car-basic-info-content bags">
                  <img class="icon-img" src="../SVG/bag.svg" />
                  <p>
                    <span>${selectedVehicle.bags1}</span> big bag <br />
                    <span>${selectedVehicle.bags2}</span> small bag
                  </p>
                </div>
                <div class="car-basic-info-content gear">
                  <img class="icon-img" src="../SVG/milsage.svg" />
                  <p><span>${selectedVehicle.fuelConsumption}</span>L/100KM</p>
                </div>
              </div>
            </div>
            </div>
`;

  $(".final-view-vehicle").html(htmlFinalView);

  addExtraItems(selectedVehicle);
}

// Choose extra items and calculate the total cost

function addExtraItems(selectedVehicle) {
  // Add insurance
  $(".insurance-thumbnail-container").click(() => {
    const insuranceSelected = $(
        ".insurance-thumbnail-container input:checked"
      ).val(),
      travelDates = parseInt($("#travelling-dates").text()),
      insuranceCost = insuranceSelected * travelDates,
      html = `
  <p>Insurance</p>
  <p><span>$</span>${insuranceCost} <span>NZD</span></p>

  `;

    $(".insurance-line").html(html);

    updateTotalPrice(selectedVehicle, insuranceCost);
  });

  // Extra items

  function updateTotalPrice(selectedVehicle, insuranceCost) {
    const { price } = selectedVehicle,
      fuel = selectedVehicle.fuelConsumption,
      travelDates = parseInt($("#travelling-dates").text()),
      totalMilsage = parseFloat($("#total-mileage").text()),
      vehicleRentalCost = price * travelDates,
      fuelCharge = fuel * (totalMilsage / 100),
      totalPrice = (vehicleRentalCost + fuelCharge + insuranceCost).toFixed(2),
      html = `
            <h5 class="thumbnail-title">Quote Details</h5>
            <div class="quote-line">
              <p>${selectedVehicle.name}</p>
              <p><span>$</span> ${selectedVehicle.price} NZD/day</p>
            </div>
            <div class="quote-line">
              <p>Rental Days</p>
              <p>${travelDates} days</p>
            </div>
            <div class="quote-line subtotal">
              <p>Vehicle Rental Cost</p>
              <p><span>$</span> ${vehicleRentalCost} <span>NZD</span></p>
            </div>
            <div class="quote-line">
              <p>Fuel Consumption</p>
              <p><span>${selectedVehicle.fuelConsumption} </span>L/100km</p>
            </div>
            <div class="quote-line">
              <p>Total Milsage</p>
              <p><span>${totalMilsage}</span>km</p>
            </div>
            <div class="quote-line subtotal">
              <p>Fuel Charge</p>
              <p><span>$</span>${fuelCharge} <span>NZD</span></p>
            </div>
            <div class="quote-line insurance-line">
            <p>Insurance</p>
            <p><span>$</span>${insuranceCost} <span>NZD</span></p>
            </div>
            <div class="quote-line subtotal">
              <p>Total Extra Cost</p>
              <p><span>$</span>${insuranceCost} <span>NZD</span></p>
            </div>
            <div class="total-cost">
              <p>Total: <span>$</span> ${totalPrice} <span>NZD</span></p>
            </div>
            <div class="terms">
              <p>15% GST is included in the total of all rates.</p>
              <p>Full payment will be taken at vehicle collection.</p>
              <p>
                A 2%+GST surcharge will apply should a credit card be used as
                payment.
              </p>
            </div>
`;

    $(".quote-container").html(html);

    const htmlFinalView = `
  <h5 class="thumbnail-title">Quote Details</h5>
          <div class="quote-line subtotal">
            <p>Vehicle Rental Cost</p>
            <p><span>$</span> ${vehicleRentalCost}<span>NZD</span></p>
          </div>
          <div class="quote-line subtotal">
            <p>Fuel Charge</p>
            <p><span>$</span>${fuelCharge} <span>NZD</span></p>
          </div>
          <div class="quote-line subtotal">
            <p>Insurance Cost</p>
            <p><span>$</span>${insuranceCost} <span>NZD</span></p>
          </div>
          <div class="total-cost">
            <p>Total: <span>$</span> ${totalPrice} <span>NZD</span></p>
          </div>
          <div class="terms">
            <p>15% GST is included in the total of all rates.</p>
            <p>Full payment will be taken at vehicle collection.</p>
            <p>
              A 2%+GST surcharge will apply should a credit card be used as
              payment.
            </p>
  `;

    $(".final-view-quote").html(htmlFinalView);
  }
}

// Input validation

function InputValidation() {
  let inputDetails = [];

  $("#first-name,#last-name").blur((e) => {
    const nameRegex = /([A-Z][a-z]*)([\\s\\'-][A-Z][a-z]*)*/;

    nameRegex.test(e.target.value);

    checkInput(e, nameRegex);
  });

  $("#e-mail").blur((e) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    emailRegex.test(e.target.value);

    checkInput(e, emailRegex);
  });

  $("#phone").blur((e) => {
    const phoneRegex = /^02[1-9]\d\d\d\d\d[\d]+$/;

    phoneRegex.test(e.target.value);

    checkInput(e, phoneRegex);
  });

  function checkInput(e, nameRegex) {
    if (nameRegex.test(e.target.value)) {
      e.target.style.background = "rgba(48, 96, 116, 1)";
      inputDetails.push(e.target.value);
    } else {
      e.target.style.background = "salmon";
      $(e.target).effect("shake");
    }
  }

  $(".make-booking-view-btn").click(() => {
    const target_top = $(".confirm-booking-view").offset().top;

    $("html,body").animate({ scrollTop: target_top }, 200);
    $("html,body").scrollTop(target_top);
    displayItinerary(inputDetails);
  });
}

// Display the final itinerary

function displayItinerary(inputDetails) {
  console.log(inputDetails);

  const html = `

<div class="thumbnail-title">
<h5>Contact Details</h5>
<div class="edit-btn">
  <i class="fas fa-user-edit"></i>
  <h5>Edit</h5>
</div>
</div>
<div class="contact-detail-content-container">
<div class="contact-detail-line name">
  <h6>First Name:</h6>
  <p>${inputDetails[0]}</p>
</div>
<div class="contact-detail-line last-name">
  <h6>Last Name:</h6>
  <p>${inputDetails[1]}</p>
</div>
<div class="contact-detail-line e-mail">
  <h6>E-mail:</h6>
  <p>${inputDetails[2]}</p>
</div>
<div class="contact-detail-line phone">
  <h6>Phone:</h6>
  <p>${inputDetails[3]}</p>
</div>
</div>

`;

  $(".contact-detail-thumbnail-container").html(html);
}
