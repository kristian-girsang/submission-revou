// Get the name input element and set its value to the stored username
const nameInput = document.querySelector('#name');
const username = localStorage.getItem('username') || '';
nameInput.value = username;

// Save the input value to local storage when it changes
nameInput.addEventListener('change', e => {
    localStorage.setItem('username', e.target.value);
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var imgList = document.getElementsByClassName("banner");
    if (n > imgList.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = imgList.length
    }
    for (i = 0; i < imgList.length; i++) {
        imgList[i].style.display = "none";
    }
    imgList[slideIndex - 1].style.display = "block";
}

setInterval(() => {
    plusDivs(1)
}, 3000); // automatic slider every 3 seconds


// Check if the form data exists in the local storage
if (localStorage.getItem("messageFormData")) {
    // If it exists, set the form data to the values from the local storage
    var formData = JSON.parse(localStorage.getItem("messageFormData"));
    document.forms["message-form"]["full-name"].value = formData.fullName;
    document.forms["message-form"]["birth-date"].value = formData.birthDate;
    document.forms["message-form"]["gender"].value = formData.gender;
    document.forms["message-form"]["messages"].value = formData.messages;
    // Set the sender UI with the stored form data
    setSenderUI(formData.fullName, formData.birthDate, formData.gender, formData.messages);
}

function validateForm() {
    var name = document.forms["message-form"]["full-name"].value;
    var birthDate = document.forms["message-form"]["birth-date"].value;
    var gender = document.forms["message-form"]["gender"].value;
    var messages = document.forms["message-form"]["messages"].value;

    if (name == "" || birthDate == "" || gender == "" || messages == "") {
        alert("Input tidak boleh kosong");
        return false;
    }

    // Store the form data in the local storage
    var formData = {
        fullName: name,
        birthDate: birthDate,
        gender: gender,
        messages: messages
    };
    localStorage.setItem("messageFormData", JSON.stringify(formData));

    setSenderUI(name, birthDate, gender, messages);

    // Reset the form to its default values after press submit
    document.forms["message-form"].reset();
    

    return false;
}

function setSenderUI(name, birthDate, gender, messages) {
    document.getElementById("sender-full-name").textContent = name;
    document.getElementById("sender-birth-date").textContent = birthDate;
    document.getElementById("sender-gender").textContent = gender;
    document.getElementById("sender-messages").textContent = messages;
}


// Add a sticky class to the header element when the user scrolls down
window.onscroll = function () {
    stickyNavBar()
};
const navbar = document.getElementsByTagName("header")[0];
const sticky = navbar.offsetTop;

function stickyNavBar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

// Get the form and messages elements and add a new message when the form is submitted
const form = document.querySelector('form');
const messages = document.querySelector('.messages');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the form data as an object and create a new list item to display it
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const li = document.createElement('li');
    li.textContent = `${data.name} : ${data.message}`;
    messages.appendChild(li);

    // Reset the form after submission
    form.reset();
});


// Define days and months arrays
const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

function updateTime() {
    // Get current date and time
    const now = new Date();

    // Format date and time
    const formattedDate = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
    const formattedTime = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

    // Display formatted date and time
    const datetime = document.getElementById('datetime');
    datetime.innerHTML = formattedDate + '. Pukul: ' + formattedTime;
}

// Call updateTime once to initialize the time display
updateTime();

// Update the time every second
setInterval(updateTime, 1000);