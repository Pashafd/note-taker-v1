import $ from "jquery";
$(function () {
  let modal = document.querySelector(".modal");
  let noteForm = document.querySelector(".note-form");
  let noteTable = document.querySelector(".note-table");
  let cancel = document.querySelector(".cancel-btn");
  let noteDeleteBtn;
  let noteList = [];
  //function accardion
  let accardion = function () {
    $(".tdNoteInnerTrigger").on("click", function () {
      $(this).next(".tdNoteContent").slideToggle();
    });
  };

  //check ls
  if (!localStorage.getItem("notes")) {
    localStorage.setItem("notes", JSON.stringify([]));
  }
  //push from ls notes
  noteList = JSON.parse(localStorage.getItem("notes"));
  appendNotes();

  function addNote(e) {
    e.preventDefault();

    let newNote = {};

    let formColor = document.querySelector("#formColor");
    let title = document.querySelector(".title");
    let note = document.querySelector(".note");

    if (title.value == "" || note.value == "") {
      title.style.border = "1px solid #b80c09";
      title.placeholder = "Input can not be empty";
      title.style.color = "#b80c09";

      note.style.border = "1px solid #b80c09";
      note.placeholder = "Input can not be empty";
      note.style.color = "#b80c09";

      setTimeout(() => {
        title.style.border = "1px solid gray";
        title.placeholder = "Input can not be empty";
        title.style.color = "gray";

        note.style.border = "1px solid gray";
        note.placeholder = "Input can not be empty";
        note.style.color = "gray";
      }, 3000);
    } else {
      newNote.title = title.value;
      newNote.color = note.value;
      newNote.color = formColor.value;

      title.value = "";
      note.value = "";

      noteList.push(newNote);
      appendNotes();
    }
    accardion();
  }

  function appendNotes() {
    let notes = Array.from(document.querySelectorAll(".noteItem"));

    if (notes.length > 0) {
      notes.forEach((note) => {
        note.remove();
      });
    }

    noteList.map((note) => {
      let tr = document.createElement("tr");
      tr.classList.add("noteItem");

      let tdTitle = document.createElement("td");
      tdTitle.innerText = note.title;
      tdTitle.style.fontFamily = "bold";
      tdTitle.style.fontSize = "26px";

      let tdNote = document.createElement("div");
      tdNote.classList.add("tdAccardion");

      let tdNoteInnerTrigger = document.createElement("div");
      tdNoteInnerTrigger.classList.add("tdNoteInnerTrigger");
      tdNoteInnerTrigger.innerText = "Show Note";

      let tdNoteContent = document.createElement("div");
      tdNoteContent.classList.add("tdNoteContent");
      tdNoteContent.innerText = note.note;

      tdNote.appendChild(tdNoteInnerTrigger);
      tdNote.appendChild(tdNoteContent);

      let tdDelete = document.createElement("td");
      tdDelete.innerHTML = "&times";
      tdDelete.classList.add("delete-item");

      let tdColor = document.createElement("td");
      tdColor.innerHTML = `<img class=${note.color} src="./src/img/iconmonstr-x-mark-4-24.png" />
      `;

      //apend cells to table row
      tr.appendChild(tdTitle);
      tr.appendChild(tdNote);
      tr.appendChild(tdDelete);
      tr.appendChild(tdColor);

      //append row to the table
      noteTable.appendChild(tr);
      getDeleteBtn();
      localStorage.setItem("notes", JSON.stringify(noteList));
    });
  }

  function getDeleteBtn() {
    noteDeleteBtn = Array.from(document.querySelectorAll(".delete-item"));

    noteDeleteBtn.forEach((btn) => {
      let noteTitle = btn.previousSibling.previousSibling.innerText;

      btn.addEventListener("click", (e) => {
        if (e.target.parentNode) {
          e.target.parentNode.remove();
          deleteNote(noteTitle);
        }
      });
    });
  }

  function deleteNote(noteTitle) {
    for (let i = 0; i < noteList.length; i++) {
      if (noteList[i].title === noteTitle) {
        noteList.splice(i, 1);
      }
    }

    localStorage.setItem("notes", JSON.stringify(noteList));
    appendNotes();
  }

  $("#formColor").css({
    background: "rgba(0, 0, 0, 0.192)",
    color: "brown",
  });

  $(".note").css({
    background: "rgba(0, 0, 0, 0.192)",
    color: "#fff",
  });

  $(".delete-item").on("click", function () {
    $(this.parentNode).fadeOut();
  });

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      $(".modal").toggle("slow");
    }
  });

  $(document).on("click", function (e) {
    let mod = document.querySelector(".modal-content");
    if (e.target !== mod && e.target == modal) {
      $(".modal").hide("slow");
    }
  });

  $(".add-not").on("click", function () {
    $(".modal").show("slow");
  });

  $(".cancel").on("click", function () {
    $(".modal").hide("slow");
  });

  noteForm.addEventListener("submit", (e) => {
    addNote(e);
  });

  accardion();
});
