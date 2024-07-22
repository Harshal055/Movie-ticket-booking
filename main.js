window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('navbar-opaque');
    navbar.classList.remove('navbar-transparent');
  } else {
    navbar.classList.remove('navbar-opaque');
    navbar.classList.add('navbar-transparent');
  }
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".coming-container", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 550,
    disableOnInteraction: false,
  },
  centeredSlides: true,
  speed: 500,
  breakpoints: {
    0: { slidesPerView: 2 },
    568: { slidesPerView: 3 },
    768: { slidesPerView: 4 },
    968: { slidesPerView: 5 },
  },
});

function toggleSignUpForm() {
  var signUpModal = document.getElementById('signupModal');
  if (signUpModal.style.display === 'none' || signUpModal.style.display === '') {
    signUpModal.style.display = 'block';
  } else {
    signUpModal.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('signupModal');
  var closeModalBtn = document.getElementById('closeModal');
  var closeAndLoginBtn = document.getElementById('closeAndLogin');
  closeModalBtn.addEventListener('click', function () { modal.style.display = 'none'; });
  closeAndLoginBtn.addEventListener('click', function () { modal.style.display = 'none'; });
  var signupForm = document.getElementById('signupForm');
  var ageInput = document.getElementById('age');
  signupForm.addEventListener('submit', function (event) {
    var age = parseInt(ageInput.value);
    if (age < 18) {
      alert('You must be at least 18 years old to sign up.');
      event.preventDefault();
    }
  });
});

var isLoggedIn = false;

function bookTicket(btn) {
  if (isLoggedIn) {
    showPopup(btn);
  } else {
    goLogin();
  }
}

function showPopup(btn) {
  var box = btn.closest('.box');
  var movieName = box.querySelector('h3').textContent;
  var moviePriceText = box.querySelector('#movie-price').textContent;
  var moviePrice = parseFloat(moviePriceText);
  var movieImage = box.querySelector('.box-img img').src;
  var modal = document.getElementById("myModal");
  var modalImage = document.getElementById("modal-image");
  var movieNameElement = document.getElementById("movie-name");
  var moviePriceElement = document.getElementById("movie-price");
  var quantityInput = document.getElementById("quantity");
  var totalPriceDisplay = document.getElementById("total-price");
  var payButton = document.getElementById("pay-button");
  modalImage.src = movieImage;
  movieNameElement.textContent = movieName;
  moviePriceElement.textContent = moviePrice.toFixed(2);
  quantityInput.value = 1;
  totalPriceDisplay.textContent = moviePrice.toFixed(2);
  var span = document.getElementsByClassName("close")[0];
  span.onclick = function () { modal.style.display = "none"; }
  quantityInput.oninput = function () {
    var quantity = parseInt(quantityInput.value);
    var totalPrice = quantity * moviePrice;
    totalPriceDisplay.textContent = totalPrice.toFixed(2);
  }
  payButton.onclick = function () {
    openPaymentPopup()
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  modal.style.display = "block";
}

function goLogin() {
  var loginSection = document.getElementById("Login");
  loginSection.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function validateLogin() {
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password1").value;
  if (email === "" || password === "") {
    var errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Please enter both email and password.";
    errorMessage.style.display = "block";
    return false;
  }
  if (email && password) {
    alert('Login successful!');
    isLoggedIn = true;
  } else {
    alert('Please enter both email and password');
  }
}

function openPaymentPopup() {
  var totalPrice = parseFloat(document.getElementById("total-price").innerText);
  document.getElementById("amount").value = totalPrice;
  document.getElementById("payment-popup").style.display = "block";
  document.querySelector(".payment-form").classList.add("active");
}

function closePaymentPopup() {
  document.getElementById("payment-popup").style.display = "none";
  document.querySelector(".payment-form").classList.remove("active");
}

document.getElementById("pay-button").addEventListener("click", openPaymentPopup);

function openSignUpModal() {
  var modal = document.getElementById("signupModal");
  modal.style.display = "block";
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("password1");
  var eyeIcon = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.src = "image'/img/eye-off.png";
  } else {
    passwordInput.type = "password";
    eyeIcon.src = "image'/img/eye.png";
  }
}

function bookedDone() {
  try {
    var cardNumber = document.getElementById("cardNumber").value;
    var expiryDate = document.getElementById("expiryDate").value;
    var cvv = document.getElementById("cvv").value;
    var amount = parseFloat(document.getElementById("amount").value);
    if (amount === 0) {
      throw new Error("Amount cannot be 0 Rs.");
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      throw new Error("Card number should be exactly 16 digits and contain only numbers.");
    }
    if (!/^\d+$/.test(expiryDate.replace("/", ""))) {
      throw new Error("Expiry date should only contain numbers in the format MM/YY.");
    }
    if (!/^\d{3}$/.test(cvv)) {
      throw new Error("CVV should be exactly 3 digits and contain only numbers.");
    }
    window.alert("Booking done successfully!");
    document.getElementById("payment-popup").style.display = "none";
  } catch (error) {
    window.alert(error.message);
  }
}

function closePayWindow() {
  document.getElementById("payment-popup").style.display = "none";
}

document.querySelector('.button-close').addEventListener('click', closePayWindow);
