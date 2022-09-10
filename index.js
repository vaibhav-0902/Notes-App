// console.log("hello");
showNotes();

// Adding Items to Local Storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);

    showNotes();

});


// Showing the added Notes on the web page
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card note-card my-2 mx-2 col-md-3 m-auto">
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1}</h5>
                <p className="card-text">${element}</p>
                <button class="btn btn-primary" id="${index}" onclick="deleteNotes(this.id)">Delete Note</button>
            </div>
        </div>
        `;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `<p>Nothing here in your notes.<br> Add to notes with the help of <b>'Add Notes'</b> Section.</p>`;
    }
}


// Deleting Notes From localStorage
function deleteNotes(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


// Searching a note from added notes

let search = document.getElementById("searchTxt");

search.addEventListener("input", function() {

    let inputVal = search.value.toLowerCase();
    // console.log(inputVal);


    let notesCard = document.getElementsByClassName("note-card");
    Array.from(notesCard).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0];
        console.log(cardTxt);

        if(cardTxt.innerHTML.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});
