const navigate = (id) => {
  id = id === "" ? "home" : id;
  var elems = document.querySelectorAll(".content-item");

  [].forEach.call(elems, function (el) {
    el.classList.remove("show");
    el.classList.add("hide");
  });

  document.getElementById(id).classList.add("show");
  document.getElementById(id).classList.remove("hide");
  history.pushState({}, "", "/" + id === "home" ? "" : id);
};

window.addEventListener("load", function () {
  let url = document.location.href;
  let route = url.split("/")[url.split("/").length - 1];

  if (route.length > 0) {
    navigate(route);
  }
});

fetch("/api/get/products")
  .then((data) => data.json())
  .then((data) => console.log(data));
