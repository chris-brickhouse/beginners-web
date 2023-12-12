let cart = [];
const json = [
  {
    id: 1,
    price: 10,
    name: "Run The Jewels",
    album: "3",
    desc: "Run the Jewels kicked off 2017 with a bang(er) - RTJ3. This album absolutely set the tone for a year of political strife, spitting lines like 'He wore a bad toupee and a spray tan' and 'Get that punk mother*** out of here'. \n\n They clearly show where they stand on the side of social issues, and what better way to address these than with dual perspectives from two very intelligent men of diffent races and backgrounds. Also, you can't beat appearances by Zack de la Rocha. You can't even really compare this to the other albums because it has a totally different vibe of urgency and retaliation for what is being done to us as a people. We the People. ",
    img: "Images/image1.png",
    video: "https://www.youtube.com/embed/saR7SYa6nAs",
  },
  {
    id: 2,
    price: 12,
    name: "The Menzingers",
    album: "After The Party",
    desc: "This album means more to me than most others because it has become 'the album' for my wife and I. It really does cover all of the bases - nostalgia, fun, some seriousness and the catchy hooks that they are known for. \n\n I could include a lot more about this but it would probably sound super mushy so I'll let you form your own opinions on the matter. This album is the magnificent crescendo of their career, every time I think they won't be able to top themselves, they do. Anxiously awaiting the next album. ",
    img: "Images/image2.png",
    video: "https://www.youtube.com/embed/n3SxjX--x3U",
  },
  {
    id: 3,
    price: 15,
    name: "The War on Drugs",
    album: "A Deeper Understanding",
    desc: "For me, this album came out of nowhere and blew me away. The album obviously pulls a lot of Petty and Springsteen influence, but songwriter Adam Granduciel has created a soundscape all of his own. This sounds like it should have been made in the 80's, a more simple time and place. This music somehow makes me happy and sad at the same time. Figure that shit out.",
    img: "Images/image3.png",
    video: "https://www.youtube.com/embed/XdowyvdK8Qk",
  },
  {
    id: 4,
    price: 13,
    name: "PallBearer",
    album: "Heartless",
    desc: "Pallbearer are easily one of my favorite metal bands, but I think they have transcended the label of 'doom metal' in many ways. They have the staying power, ability to write extremely complex songs all while featuring absolutely beautiful vocals.\n\nThere isn't a weak song on this album, every song manages to be different than the others and this album sets many moods, levels of energy and atmospheres.\n\nEven at this point in their career, I would put them against some of the best bands in the business as well as history, I think they would hold their ground alongside bands like Led Zeppelin and Black Sabbath in skill and songwriting skills, but just need to continue to release amazing albums to really cement their place in the halls of Valhalla.",
    img: "Images/image4.png",
    video: "https://www.youtube.com/embed/t1rQPtZowT8",
  },
  {
    id: 5,
    price: 12,
    name: "Chealsea Wolfe",
    album: "Hiss Spun",
    desc: "Chelsea has been around for a few years now but this is my introduction to her, and what an introduction is was. \n\nThis album really makes a strong case for her being one of the premiere woman vocalists in metal, alongside contemporaries like Myrkur, but personally I prefer Chelsea. I would compare her vocals to Beth Gibbons of Portishead at times, easily one of my favorite female artists of all time.\n\nThe music sets a very dark atmosphere without being corny and 'goth', powered by emotionally stressed lyrics that paint a portrait of despair. I will wear this album out and wait for the next from her.",
    img: "Images/image5.png",
    video: "https://www.youtube.com/embed/ZDU78eHCezw",
  },
];

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

  loadCart();

  if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    if (cart.length > 0) {
      cart.forEach((x) => {
        addCart(x, true);
      });
    }
  }
});

const loadCart = () => {
  let html = "";
  for (let i = 0; i <= json.length - 1; i++) {
    html += `<tr class="product-row">
      <td><img src="${json[i].img}" class="thumb" /></td>      
      <td>
        <h4 class="grey-header">${json[i].name} - '${json[i].album}'</h4>
        ${json[i].desc}
      </td>
      <td><input id="product-${
        json[i].id
      }" value="1" class="form-control form-control-sm" /></td>
      <td>$${json[i].price.toFixed(2)}</td>
      <td nowrap><button type="button" class="button" onClick="addCart(${
        json[i].id
      })"><i class="fa-solid fa-cart-circle-plus"></i></button></td>
    </tr>`;
  }
  document.querySelectorAll("#product-body")[0].innerHTML = html;
};

const addCart = (id, init) => {
  let html = "";
  let i = json.findIndex((x) => x.id === id);
  if (i > -1) {
    html += `<tr class="product-row">
      <td><img src="${json[i].img}" class="thumb" /></td>      
      <td>
        <h4 class="grey-header">${json[i].name} - '${json[i].album}'</h4>
        ${json[i].desc}
      </td>
      <td><input id="product-${
        json[i].id
      }" value="1" class="form-control form-control-sm" /></td>
      <td class="price">$${json[i].price.toFixed(2)}</td>
      <td nowrap><button type="button" class="button" onClick="removeCart(${
        json[i].id
      })"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`;
  }
  document.querySelectorAll("#cart-body")[0].innerHTML += html;

  document
    .querySelectorAll("#cart-count")[0]
    .setAttribute("data-count", cart.length);

  let price = 0;
  document.querySelectorAll(".price").forEach((x) => {
    price += parseFloat(x.innerHTML.replace("$", ""));
    console.log(x.innerHTML);
  });

  document.querySelectorAll("#cart-total")[0].innerHTML =
    "$" + price.toFixed(2);

  if (!init) {
    cart.push(id);
    alert(`${json[i].name} - '${json[i].album} added to cart.`);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  document.querySelectorAll("#no-items")[0].classList.add("hide");
  document.querySelectorAll("#cart-item-count")[0].innerHTML = cart.length;
};

// fetch("/api/get/products")
//   .then((data) => data.json())
//   .then((data) => console.log(data));
