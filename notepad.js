const addNoteButton = document.querySelector("#add-note");
const noteContainer = document.querySelector("#notes-container");
const clearStorage = document.querySelector("#clear-storage");
const ntitle = document.querySelector("#ntitle");


const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");


trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

const colors = ["#abff67", "#67f0ff", "#ff9267", "#a96fff"];


function noteItem(content, date, color, title) {

    this.content = content;
    this.date = date;
    this.color = color;
    this.title = title;
}


addNoteButton.addEventListener('click', function () {
    let titleValue = ntitle.value;
    let d = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let noteTime = d.getDate() + ' ' + months[d.getMonth()];
    let noteColor = colors[Math.floor(Math.random() * (colors.length - 1))];
    let id;
    let createNote = new noteItem("", noteTime, noteColor, titleValue, id);

    let note = document.createElement("div");
    note.classList.add('note');

    let title = document.createElement("div");
    let data1 = document.createElement("div");
    let container = document.createElement("div");

    container.classList.add('container');

    title.innerHTML = createNote.title;
    data1.innerHTML = createNote.date;
    createNote.id = localStorage.length + 1;


    container.appendChild(title);
    container.appendChild(data1);

    note.appendChild(container);

    let eContent = document.createElement("div");
    eContent.setAttribute("contenteditable", "true");
    eContent.classList.add('econtent');
    note.appendChild(eContent);

    note.style.background = createNote.color;
    note.style.opacity = "1";

    noteContainer.appendChild(note);
    localStorage.setItem('note' + localStorage.length, JSON.stringify(createNote));

    ntitle.value = "";

    saveEditedNote();
});


for (let i = 0; i < localStorage.length; i++) {


    let note = document.createElement("div");
    note.classList.add('note');

    let noteParse = JSON.parse(localStorage["note" + i]);

    let title = document.createElement("div");
    let data1 = document.createElement("div");
    let container = document.createElement("div");
    container.classList.add('container');

    title.innerHTML = noteParse.title;
    data1.innerHTML = noteParse.date;
    container.appendChild(title);
    container.appendChild(data1);
    note.appendChild(container);

    let eContent = document.createElement("div");
    eContent.setAttribute("contenteditable", "true");
    eContent.classList.add('econtent');
    eContent.innerText = noteParse.content;
    note.appendChild(eContent);

    note.style.background = noteParse.color;
    noteContainer.appendChild(note);
}

clearStorage.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});



function saveEditedNote() {
    let allNotes = document.querySelectorAll('.econtent');

    for (let y = 0; y < allNotes.length; y++) {
        allNotes[y].addEventListener('keyup', function () {
            let c = JSON.parse(localStorage["note" + y]);
            c.content = this.innerHTML;
            localStorage.setItem("note" + y, JSON.stringify(c));
            console.log(y)
        })
    }

}

saveEditedNote();


function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

function deleteNote(event) {
    console.log()
}