"use strict";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/all.css";
import $ from "jquery";
import "./theme";
import updateTable, * as course from "./course";
import * as gpa from "./gpa";

// Array to store courses
export let courses = [];

$(function () {
  // Initial update of the course table
  updateTable();

  // Add course button click event
  $("#gpaAddForm").on("submit", course.add);

  // Update course form submit event
  $("#gpaUpdateForm").on("submit", course.edit);

  // Edit course button click event
  $(document).on("click", ".editCourse", course.setEditInputs);

  // Delete course button click event
  $(document).on("click", ".removeCourse", course.remove);

  // Calculate course button click event
  $("#calculateBtn").on("click", gpa.calculate);

  // Reset course button click event
  $("#resetBtn").on("click", function () {
    courses = [];
    updateTable();
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
});
