document.addEventListener("pagesloaded", function(e) {
  var PINS_COUNTER = 0;
  var PINS = [];
  var TEMP_PIN1 = { id: "100", type: "pin", pos: { x: 200, y: 200 }, pageId: "1" };
  var TEMP_PIN2 = { id: "101", type: "pin", pos: { x: 300, y: 300 }, pageId: "2" };


  var pages = document.getElementsByClassName("page");
  for (var i = 0; i < pages.length; i++) {
    var hammertime = new Hammer(pages[i]);
    hammertime.on('click tap', function(e) {
      var container = e.target.offsetParent;
      if (container.classList.contains("page")) {

        var pos = getMousePos(container, e);
        var newPin = addPin(container, pos);
        renderPin(newPin);
      }
    });
  }

  function addPin(target, pos) {
    var pin = {
      type: "pin",
      id: "pin_" + PINS_COUNTER,
      x: (pos.x * 100) / target.clientWidth,
      y: (pos.y * 100) / target.clientHeight,
      pageId: target.id,
      container: target
    };
    PINS.push(pin);
    console.table(PINS);
    return pin;
  }

  function renderPin(pin) {
    var pinDiv = document.createElement("div");
    pinDiv.className = "div-pin";
    pinDiv.id = pin.id;

    var hammertime = new Hammer(pinDiv);
    hammertime.on('click tap', function(e) {
      alert("click by pin " + pin.id);
    });

    var x = pin.x,
      y = pin.y;
    if (PDFViewerApplication.pageRotation === 0) {
      pinDiv.style.left = x + "%";
      pinDiv.style.top = y + "%";
    }
    else if (PDFViewerApplication.pageRotation === 90) {
      pinDiv.style.top = x + "%";
      pinDiv.style.right = "calc(" + y + "% - 37px)";
    }
    else if (PDFViewerApplication.pageRotation === 180) {
      pinDiv.style.right = "calc(" + x + "% - 43px)";
      pinDiv.style.bottom = "calc(" + y + "% - 55px)";
    }
    else if (PDFViewerApplication.pageRotation === 270) {
      pinDiv.style.bottom = "calc(" + x + "% - 49px)";
      pinDiv.style.left = y + "%";
    }

    var pinImg = document.createElement("img");
    pinImg.src = '../img/pin.png';
    pinDiv.appendChild(pinImg);
    pin.container.appendChild(pinDiv);
    PINS_COUNTER++;
  }

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    if (PDFViewerApplication.pageRotation === 0) {
      return {
        x: mouseEvent.center.x - rect.left,
        y: mouseEvent.center.y - rect.top
      };
    }
    else if (PDFViewerApplication.pageRotation === 90) {
      return {
        y: rect.right - mouseEvent.pageX,
        x: mouseEvent.pageY - rect.top
      };
    }
    else if (PDFViewerApplication.pageRotation === 180) {
      return {
        x: -(mouseEvent.clientX - rect.left),
        y: -(mouseEvent.clientY - rect.top)
      };
    }
  }

  var togglePinsButton = document.getElementById("togglePins");

  togglePinsButton.addEventListener("click", function(e) {
    var pins = Array.from(document.getElementsByClassName('div-pin'));
    if (e.target.innerText === "Hide") {
      e.target.innerText = "Show";
      pins.forEach(function(item) {
        item.style.display = "none";
      });
    }
    else {
      e.target.innerText = "Hide";
      pins.forEach(function(item) {
        item.style.display = "inline";
      });
    }
  });
  /*  var loadTempPinsButton = document.getElementById("loadPins");
   loadTempPinsButton.addEventListener("click", function(e) {
   createPin(document.getElementById("pageContainer" + TEMP_PIN1.pageId), TEMP_PIN1.pos);
   createPin(document.getElementById("pageContainer" + TEMP_PIN2.pageId), TEMP_PIN2.pos);
   });*/


  window.addEventListener("pagerendered", function(evt) {
    var target = evt.target;
    // Array.from(document.getElementsByClassName("div-pin")).forEach(function(pin) {
    //   pin.remove();
    // });
    PINS.forEach(function(pin) {
      if (pin.pageId === target.id) {
        renderPin(pin);
      }
    })
  });
});
