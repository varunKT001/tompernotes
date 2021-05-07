//name of the project : notes taking app
//author : Varun kumar tiwari 
let notes = localStorage.getItem('notes');
let noteTitle = localStorage.getItem('title');

if (notes === null || noteTitle === null){
    localStorage.clear();
}
console.log('This is sasta-Notes');
let imp = new Array(100);
let text = document.getElementById('textAreaNote');
let title = document.getElementById('textAreaTitle');
text.value = '';
title.value = '';
displayNotes();

let btn = document.getElementById('addNote');
btn.addEventListener('click', function (event) {
    let notes = localStorage.getItem('notes');
    let noteTitle = localStorage.getItem('title');
    let text = document.getElementById('textAreaNote');
    let title = document.getElementById('textAreaTitle');
    if (notes == null && noteTitle == null) {
        notesArr = [];
        titleArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
        titleArr = JSON.parse(noteTitle);
    }
    if (text.value.trim().length == 0) {
        alert('Kuch to likh de re baba');
    }
    else if (title.value.trim().length == 0) {
        alert('Yarr title to likho!');
    }
    else {
        notesArr.push(text.value);
        titleArr.push(title.value);
    }
    localStorage.setItem('notes', JSON.stringify(notesArr));
    localStorage.setItem('title', JSON.stringify(titleArr));
    text.value = '';
    title.value = '';
    displayNotes();
})
function displayNotes() {
    let notes = localStorage.getItem('notes');
    let noteTitle = localStorage.getItem('title');
    if (notes == null && noteTitle == null) {
        notesArr = [];
        titleArr = [];
    }
    else {
        notesArr = JSON.parse(notes);
        titleArr = JSON.parse(noteTitle);
    }
    let html = '';
    notesArr.forEach(function (element, index) {
        if (imp[index] == true) {
            html += `<div class="note" style="border: 2px solid red">
        <div class="noteIndex" style="margin-bottom: 10px">
        <h3 class="titleHeading" style="display: inline">${titleArr[index]}</h3>
        <button class="btn" style="float: right; margin-bottom: 5px" onclick="openNote(${index})"><span id="close" class="material-icons" style="; font-size: 15px">open_in_full</span></button>
        <button class="btn" style="float: right; margin-bottom: 5px; margin-right: 2px" onclick="changeToImp(${index})" ondblclick="removeImp(${index})"><span id="imp" class="material-icons" style="; font-size: 15px">label_important</span></button>
        </div>
        <div class="content">
        <p class="noteText">${element}</p>
        </div>
        <button id="deleteNote" onclick="deleteNote(${index})" class="btn" >Delete note</button>
        </div>
        `;
        } 
        else {
            html += `<div class="note">
        <div class="noteIndex" style="margin-bottom: 10px">
        <h3 class="titleHeading" style="display: inline">${titleArr[index]}</h3>
        <button class="btn" style="float: right; margin-bottom: 5px" onclick="openNote(${index})"><span id="close" class="material-icons" style="; font-size: 15px">open_in_full</span></button>
        <button class="btn" style="float: right; margin-bottom: 5px; margin-right: 2px" onclick="changeToImp(${index})" ondblclick="removeImp(${index})"><span id="imp" class="material-icons" style="; font-size: 15px">label_important</span></button>
        </div>
        <div class="content">
        <p class="noteText">${element}</p>
        </div>
        <button id="deleteNote" onclick="deleteNote(${index})" class="btn" >Delete note</button>
        </div>
        `;
        }
    });
    if (notesArr.length != 0 && titleArr.length != 0) {
        document.getElementById('notes').innerHTML = html;
    }
    else {
        document.getElementById('notes').innerHTML = 'You do not have any note right now!';
        imp = [];
    }
}
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title');
    let notesArr = JSON.parse(notes);
    let titleArr = JSON.parse(title);
    notesArr.splice(index, 1);
    titleArr.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArr));
    localStorage.setItem('title', JSON.stringify(titleArr));
    displayNotes();
    if (imp[index] === true) {
        removeImp(index);
    }
}

let searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', function () {
    let searchText = searchBox.value;
    let note = document.getElementsByClassName('note');
    Array.from(note).forEach(function (element) {
        let noteText = element.getElementsByTagName('p')[0].innerText;
        let titleText = element.getElementsByTagName('h3')[0].innerText;
        if (noteText.includes(searchText) || titleText.includes(searchText)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';
        }
    })
})
function openNote(index){
        let notes = localStorage.getItem('notes');
        let noteTitle = localStorage.getItem('title');
        let notesArr = JSON.parse(notes);
        let titleArr = JSON.parse(noteTitle);
        
        let container = document.getElementsByClassName('container');
        let bigNote = document.getElementById('bigNotes');
        if (imp[index] === true) {
            bigNote.innerHTML = `<div style="margin: 5px">
            <div class="noteIndex" style="margin:5px 5px">
            <h3 class="titleHeading" style="display: inline">${titleArr[index]}</h3>
            <button class="btn" style="float: right; margin: -2px 0px" onclick="closeNote()"><span id="close" class="material-icons" style="font-size: 15px" >close</span></button>
            </div>
            <div class="content" style="height: 355px">
            <p class="noteText">${notesArr[index]}</p>
            </div>
            </div>`;    
            bigNote.style.border = '2px solid red';
        } 
        else {     
            bigNote.innerHTML = `<div style="margin: 5px">
            <div class="noteIndex" style="margin:5px 5px">
            <h3 class="titleHeading" style="display: inline">${titleArr[index]}</h3>
            <button class="btn" style="float: right; margin: -2px 0px" onclick="closeNote()"><span id="close" class="material-icons" style="font-size: 15px" >close</span></button>
            </div>
            <div class="content" style="height: 355px">
            <p class="noteText">${notesArr[index]}</p>
            </div>
            </div>`;
        }
        bigNote.style.display = 'block';
        container[0].style.opacity = 0.2;
        bigNote.style.opacity = 1;
}
function closeNote(){
        console.log('fired');
        let bigNote = document.getElementById('bigNotes');
        let container = document.getElementsByClassName('container');
        bigNote.style.display = 'none';
        bigNote.style.border = '2px solid rgb(57, 216, 84)';
        container[0].style.opacity = 1;
}
let home = document.getElementById('home');
home.addEventListener('click', function(event){
    alert('Bas sajawat ke liye lagaya hai!');
})

function changeToImp(index){
    for (let i = 0; i < imp.length; i++) {
        if (i === index) {
            imp[i] = true;
        }
    }
    displayNotes();
}
function removeImp(index){
    for (let i = 0; i < imp.length; i++) {
        if (i === index) {
            imp[i] = false;
        }
    }
    displayNotes();
}




