(function () {
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  const handlePress = function (event) {
    event.target.classList.add("pressed");
  };

  const handleRelease = function (event) {
    event.target.classList.remove("pressed");
  };

  const handleCancel = function (event) {
    event.target.classList.remove("pressed");
  };

  const items = document.querySelectorAll(".projectItem");
  items.forEach(item => {
    item.addEventListener("mousedown", handlePress);
    item.addEventListener("mouseup", handleRelease);
    item.addEventListener("mouseleave", handleCancel);
    item.addEventListener("touchstart", handlePress);
    item.addEventListener("touchend", handleRelease);
    item.addEventListener("touchcancel", handleCancel);
  });

  const tc = document.querySelector(".tc");
  const tc_main = tc.querySelector(".tc-main");
  tc.addEventListener("click", function (event) {
    pop();
  });
  tc_main.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  const toggleClass = (selector, className) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      element.classList.toggle(className);
    });
  };

  const pop = imageURL => {
    const tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
      tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
  };

  const popItems = document.querySelectorAll("a.popItem");
  popItems.forEach(item => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const imageURL = this.getAttribute("pop-url");
      pop(imageURL);
    });
  });

  const setCookie = (name, value, expirationDays) => {
    if (expirationDays) {
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + expirationDays);
      expires = `; expires=${expirationDate.toUTCString()}`;
    }
    document.cookie = `${name}=${value}${expires}; path=/`;
  };

  const getCookie = name => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const cookieParts = cookie.split("=");
      if (cookieParts[0].trim() === name) {
        return cookieParts[1];
      }
    }
    return null;
  };

  document.addEventListener("DOMContentLoaded", function () {
    const html = document.querySelector("html");
    let themeState = getCookie("themeState") || "Light";

    const changeTheme = theme => {
      html.dataset.theme = theme;
      setCookie("themeState", theme, 365);
      themeState = theme;
    };

    changeTheme(themeState);

    const themeSwitch = document.getElementById("theme-switch");
    if (themeState == "Dark") {
      themeSwitch.checked = false;
    }
    themeSwitch.addEventListener("change", function () {
      if (themeState == "Dark") {
        changeTheme("Light");
      } else if (themeState == "Light") {
        changeTheme("Dark");
      } else {
        changeTheme("Dark");
      }
    });
  });

  window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelector(".loading").style.display = "none";
    }, 100);
  });
})();
