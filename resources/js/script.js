function init() {
    $(".load-html").each(function () {
        $(this).load(this.dataset.source);
    });
}

function addEnterEvenToButtons() {
    document.getElementById("titleInput").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("buttonAddTitle").click();
            document.getElementById("titleInput").focus();
        }
    });
}

function saveLocalStorage(nameInfo, tag) {
    currentList = JSON.parse(localStorage.getItem(tag)) || [];
    currentList.push(nameInfo);
    localStorage.setItem(tag, JSON.stringify(currentList));
}

function removeNameLocalStorage() {

}

