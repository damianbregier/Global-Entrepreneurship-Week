$(window).on("load", function () {
  AOS.init();

  $(".loader .inner").fadeOut(500, function () {
    $(".loader").fadeOut(800);
  });

  $(".items").isotope({
    filter: "*",
    animationOptions: {
      duration: 1500,
      easing: "linear",
      queue: false,
    },
  });
});

function toggleToolbar() {
  var toolbar = document.getElementById("disabled-toolbox");
  var style = toolbar.currentStyle || window.getComputedStyle(toolbar);

  if (style.marginLeft === "0px") {
    toolbar.style.marginLeft = "-150px";
  } else {
    toolbar.style.marginLeft = "0px";
  }
}

function increaseTextSize() {
  var increaseNum = 2;
  var body = document.body;
  var style = body.currentStyle || window.getComputedStyle(body);
  var numFontSizeValue = parseInt(style.fontSize, 10);
  numFontSizeValue += increaseNum;
  body.style.fontSize = numFontSizeValue + "px";
}

function reduceTextSize() {
  var reduceNum = 2;
  var body = document.body;
  var style = body.currentStyle || window.getComputedStyle(body);
  var numFontSizeValue = parseInt(style.fontSize, 10);
  numFontSizeValue += -reduceNum;
  body.style.fontSize = numFontSizeValue + "px";
}

function toggleGreyscale() {
  var body = document.body;
  var style = body.currentStyle || window.getComputedStyle(body);
  if (style.filter === "none") {
    body.style.filter = "grayscale(1)";
  } else {
    body.style.filter = "none";
  }
}

function toggleLinkUnderline() {
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) {
      if (
        links[i].style.textDecoration === "" ||
        links[i].style.textDecoration === "none"
      ) {
        links[i].style.textDecoration = "underline";
      } else {
        links[i].style.textDecoration = "none";
      }
    }
  }
}

//Change font for more clear and adds 2px in size
function clearFont(){
  var body = document.body;
  var style = body.currentStyle || window.getComputedStyle(body);

    body.style.fontFamily = "Verdna";
    body.style.fontSize = "16px";
}

function resetToDefault() {
  window.location.href = window.location.href;
}

//Read this function when document (page) is ready
$(document).ready(function () {
  //Activates superslide
  $("#slides").superslides({
    animation: "fade",
    play: 7000,
    pagination: false,
  });

  //Activate typing of title elements
  var typed = new Typed(".typed", {
    strings: [
      "17 listopada 2020 r.",
      "Światowy Tydzień Przedsiębiorczości",
      "Międzynarodowy Dzień Studenta",
    ],
    typeSpeed: 70,
    loop: true,
    startDelay: 1000,
    showCursor: false,
  });

  //Activate skills carousel
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 4,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 2,
      },
      768: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
  });
  //Get cursor position and start animation of loading chart
  //where cursor reach skills section + certain delay
  var skillsTopOffset = $(".skillsSection").offset().top;
  var statsTopOffset = $(".statsSection").offset().top;
  var countUpFinished = false;

  $(window).scroll(function () {
    if (window.pageYOffset > skillsTopOffset - $(window).height() + 200) {
      $(".chart").easyPieChart({
        easing: "easeInOut",
        barColor: "#fff",
        trackColor: false,
        scaleColor: false,
        lineWidth: 4,
        size: 152,
        onStep: function (from, to, percent) {
          $(this.el).find(".percent").text(Math.round(percent));
        },
      });
    }

    if (
      !countUpFinished &&
      window.pageYOffset > statsTopOffset - $(window).height() + 200
    ) {
      $(".counter").each(function () {
        var element = $(this);
        var endVal = parseInt(element.text());

        element.countup(endVal);
      });

      countUpFinished = true;
    }
  });
  //Activates fancy box
  $("[data-fancybox]").fancybox();

  $("#filters a").click(function () {
    $("#filters .current").removeClass("current");
    $(this).addClass("current");

    var selector = $(this).attr("data-filter");

    $(".items").isotope({
      filter: selector,
      animationOptions: {
        duration: 1500,
        easing: "linear",
        queue: false,
      },
    });

    return false;
  });

  $("#navigation li a").click(function (e) {
    e.preventDefault();

    var targetElement = $(this).attr("href");
    var targetPosition = $(targetElement).offset().top;
    $("html, body").animate(
      {
        scrollTop: targetPosition - 50,
      },
      "slow"
    );
  });

  const nav = $("#navigation");
  const navTop = nav.offset().top;

  $(window).on("scroll", stickyNavigation);

  function stickyNavigation() {
    var body = $("body");

    if ($(window).scrollTop() >= navTop) {
      body.css("padding-top", nav.outerHeight() + "px");
      body.addClass("fixedNav");
    } else {
      body.css("padding-top", 0);
      body.removeClass("fixedNav");
    }
  }
});
