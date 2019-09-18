var users = [];
var sort_users = [];
var main = document.querySelector(".users__block");
var select = document.getElementById("order");
var url = "https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture";
var modal = document.querySelector(".modal");
var modalcont = document.querySelector(".modal_content");
var close = document.querySelector(".close");
var modal_img = document.getElementById("modal_user_img");
var modal_info = document.getElementById("modal_user_info");


function getUsersInfo() {

    modal.style.display = "block";

    for (let i = 0; i < users.length; i++) {

        if (users[i].picture.medium == this.childNodes[0].src) {

            modal_img.src = users[i].picture.large;
            modal_info.innerText = "city: " + users[i].location.city + "\n" +
                "Street: " + users[i].location.street + "\n" +
                "State: " + users[i].location.state + "\n" +
                "Email: " + users[i].email + "\n" +
                "Phone: " + users[i].phone;

        }
    }
}

function closeclick() {

    modal.style.display = "none";

}


function userSort() {

    var users_names = [];

    for (var i = 0; i < users.length; i++) {

        users_names.push(users[i].name.last);

    }

    users_names.sort();

    if (select.value == 2) {
        index = users.length - i - 1;
    }

    for (let i = 0; i < users.length; i++) {

        var index = i;

        if (select.value == 2) {
            index = users.length - i - 1;
        }
        if (select.value == 0) {
            byOption();
            return;
        }
        for (let j = 0; j < users.length; j++) {

            if (users[j].name.last == users_names[i]) {

                sort_users[index] = users[j];

            }
        }
    }
    showUsers(sort_users);
}


function showUsers(userArr) {

    main.innerHTML = "";

    for (let i = 0; i < userArr.length; i++) {

        main.innerHTML += "<div class='user'><img class='user_img' src=" +
            userArr[i].picture.medium + "></img>" + "<div class='user_name'>" + userArr[i].name.title + ". " +
            userArr[i].name.first + " " + userArr[i].name.last + "</div>" + "</div>";

    }

    addEventlistenerForUsers();

}

function addEventlistenerForUsers() {

    var derived_users = document.getElementsByClassName("user");

    for (let i = 0; i < derived_users.length; i++) {

        derived_users[i].addEventListener('click', getUsersInfo);

    }
}

function byOption() {

    var request = new XMLHttpRequest();
    main.innerHTML = "";

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            try {
                var data = JSON.parse(request.responseText);
                users = data.results;
                showUsers(users);

            } catch (err) {
                console.log(err.message + " in " + request.responseText);
                return;
            }

        }
    };

    request.open("GET", url, true);
    request.send();
}


byOption();