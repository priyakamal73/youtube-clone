function getVideoDetails() {
    const title = document.getElementById("searchbar").value;
    const message = document.getElementById("message");

    if (title === "") {
        message.style.display = "none";
    }
    else {
        let http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {

                let data = JSON.parse(http.responseText);
                localStorage.setItem("currentVideoDetails", JSON.stringify(data.result));
                localStorage.setItem("lastSearchText", title);


                const details = document.getElementById("details");
                const thumbnailImage = document.getElementById("thumbnail");
                const actualTitle = document.getElementById("actual-title");
                const duration = document.getElementById("duration");
                const views = document.getElementById("views");
                const description = document.getElementById("description");
                const channel = document.getElementById("channel");
                const date = document.getElementById("upload-date");
                const url = document.getElementById("url");

                message.style.display = "none";
                details.style.display = "block";

                thumbnailImage.src = data.result.thumbnail;
                actualTitle.innerHTML = data.result.title;
                duration.innerHTML = data.result.duration;
                views.innerHTML = data.result.views + " views";
                description.innerHTML = data.result.description;
                channel.innerHTML = "Uploaded by " + data.result.channel;
                date.innerHTML = "Uploaded " + data.result.uploaded;
                url.href = data.result.url;
                url.innerHTML = data.result.url; 
            }
        }

        http.open("get", "https://abhi-api.vercel.app/api/search/yts?text=" + title, true);
        http.send();

        message.innerHTML = "Fetching data. Please Wait";
        message.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", lastSearch);

function lastSearch() {

    const savedTitle = localStorage.getItem("lastSearchText");
    const savedData = localStorage.getItem("currentVideoDetails");
    const message = document.getElementById("message");
    const searchbar = document.getElementById("searchbar");
    if (savedTitle) {
        searchbar.value = savedTitle; 
    }

    if (savedData) {
        const data = JSON.parse(savedData);

        const details = document.getElementById("details");
        const thumbnailImage = document.getElementById("thumbnail");
        const actualTitle = document.getElementById("actual-title");
        const duration = document.getElementById("duration");
        const views = document.getElementById("views");
        const description = document.getElementById("description");
        const channel = document.getElementById("channel");
        const date = document.getElementById("upload-date");
        const url = document.getElementById("url");

        message.style.display = "none";
        details.style.display = "block";

        thumbnailImage.src = data.thumbnail;
        actualTitle.innerHTML = data.title;
        duration.innerHTML = data.duration;
        views.innerHTML = data.views + " views";
        description.innerHTML = data.description;
        channel.innerHTML = "Uploaded by " + data.channel;
        date.innerHTML = "Uploaded " + data.uploaded;
        url.innerHTML = data.url;
    }
}

function openVideo() {
    const savedData = localStorage.getItem("currentVideoDetails");
    const data = JSON.parse(savedData);

    const url = document.getElementById("url");

    url.href = data.url;
}

function clearDetails() {
    // const details = document.getElementById("details");
    // details.style.display = "none";
    // document.getElementById("thumbnail").src = "";
    // document.getElementById("actual-title").innerHTML = "";
    // document.getElementById("duration").innerHTML = "";
    // document.getElementById("views").innerHTML = "";
    // document.getElementById("description").innerHTML = "";
    // document.getElementById("channel").innerHTML = "";
    // document.getElementById("upload-date").innerHTML = "";
    // document.getElementById("url").innerHTML = "";

    // // Optionally hide message or clear input
    // document.getElementById("message").style.display = "none";
    document.getElementById("searchbar").value = "";

    localStorage.removeItem("currentVideoDetails");
}