let timer;
let params = [
  {
    minRatio: 0,
    maxRatio: 1,
    images: ["img/600x1200_1.jpg", "img/600x1200_2.jpg", "img/600x1200_3.jpg"],
    width: 300,
    height: 600,
  },

  {
    minRatio: 1,
    maxRatio: 1.5,
    images: [
      "img/1000x1200_1.jpg",
      "img/1000x1200_2.jpg",
      "img/1000x1200_3.jpg",
    ],
    width: 500,
    height: 600,
  },

  {
    minRatio: 1.5,
    maxRatio: Infinity,
    images: [
      "img/3000x1500_1.jpg",
      "img/3000x1500_2.jpg",
      "img/3000x1500_3.jpg",
    ],
    width: 1000,
    height: 500,
  },
];

let state = {
  currentPic: 0,
  currentConfig: undefined,
};

let slider = document.getElementById("slider");
let picsrow = document.getElementById("pics-row");
let сircles = document.getElementById("сircles");

chooseConfig();
prepareElements();
slideTo();
window.addEventListener("resize", function () {
  chooseConfig();
  prepareElements();
  slideTo();
});

function prepareElements() {
  picsrow.innerHTML = "";
  params[state.currentConfig].images.forEach((image) => {
    let img = document.createElement("img");
    picsrow.appendChild(img);
    img.src = image;
    img.style.width = params[state.currentConfig].width + "px";
  });
  slider.style.width = params[state.currentConfig].width + "px";
  slider.style.height = params[state.currentConfig].height + "px";
  picsrow.style.width =
    params[state.currentConfig].width *
      params[state.currentConfig].images.length +
    "px";
  picsrow.style.height = params[state.currentConfig].height + "px";

  сircles.innerHTML = "";
  params[state.currentConfig].images.forEach((image, index) => {
    let img = document.createElement("img");
    img.src = "img/100x100_2.png";
    img.classList.add("button-circle");
    let button = document.createElement("button");
    сircles.appendChild(button);
    button.appendChild(img);
    button.onclick = function circleHandler() {
      state.currentPic = index;
      slideTo();
      clearTimeout(timer);
      autoSlide();
    };
  });
}

function autoSlide() {
  if (timer !== undefined) {
    clearTimeout(timer);
  }
  timer = setTimeout(slideRight, 4500);
}

document.getElementById("slider-left").onclick = slideLeft;
function slideLeft() {
  state.currentPic--;
  if (state.currentPic < 0) {
    state.currentPic = params[state.currentConfig].images.length - 1;
  }
  slideTo();
}

document.getElementById("slider-right").onclick = slideRight;

function slideRight() {
  state.currentPic++;
  if (state.currentPic > params[state.currentConfig].images.length - 1) {
    state.currentPic = 0;
  }
  slideTo();
}

function slideTo() {
  picsrow.style.left =
    -params[state.currentConfig].width * state.currentPic + "px";
  clearTimeout(timer);
  autoSlide();
  highlightCircle();
}

function highlightCircle() {
  let circles = Array.from(document.getElementById("сircles").children);
  circles.forEach((circle, index) => {
    if (index === state.currentPic) {
      circle.firstChild.src = "img/100x100.png";
    } else {
      circle.firstChild.src = "img/100x100_2.png";
    }
  });
}

function chooseConfig() {
  let ratio = window.innerWidth / window.innerHeight;
  state.currentConfig = params.findIndex(
    (config) => config.minRatio <= ratio && ratio < config.maxRatio
  );
}
