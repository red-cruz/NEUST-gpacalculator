import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import Swal from "sweetalert2";
import updateCourseTable from "./course";
import calculateGPA from "./gpa";

// Array to store courses
export let courses = [];

$(function () {
  // Initial update of the course table
  updateCourseTable();

  // Add course button click event
  $("#addCourseBtn").click(function () {
    const courseName = $("#course").val();
    const grade = $("#grade").val();
    const units = $("#units").val();

    if (!grade || !units) {
      // Show warning if grade or units are missing
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter grade and units.",
        timer: 1500,
      });
      return;
    }

    // Create course object and add it to the array
    const course = {
      courseName: courseName || `Course ${courses.length + 1}`,
      grade: grade,
      units: units,
    };

    courses.push(course);
    updateCourseTable();
    $("#course").val("");
    $("#grade").val("");
    $("#units").val("");
  });

  // Edit course button click event
  $(document).on("click", ".editBtn", function () {
    const index = $(this).data("index");
    const course = courses[index];
    const courseName = course.courseName;
    const grade = course.grade;
    const units = course.units;

    // Show edit course dialog
    Swal.fire({
      title: "Edit Course",
      html: `
        <form class="swal-edit">
          <label for="editCourseName">Course Name</label>
          <input type="text" class="swal2-input" id="editCourseName" value="${courseName}">
          <label for="editGrade">Grade</label>
          <input type="text" class="swal2-input" id="editGrade" value="${grade}">
          <label for="editUnits">Units</label>
          <input type="text" class="swal2-input" id="editUnits" value="${units}">
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Course",
      cancelButtonText: "Cancel",
      focusConfirm: false,
      preConfirm: () => {
        const editCourseName = $("#editCourseName").val();
        const editGrade = $("#editGrade").val();
        const editUnits = $("#editUnits").val();

        if (!editGrade || !editUnits) {
          // Show error if grade or units are missing
          Swal.showValidationMessage("Please enter grade and units.");
          return false;
        }

        // Update the course object in the array
        courses[index].courseName = editCourseName;
        courses[index].grade = editGrade;
        courses[index].units = editUnits;

        updateCourseTable();
      },
    });
  });

  // Delete course button click event
  $(document).on("click", ".deleteBtn", function () {
    const index = $(this).data("index");
    courses.splice(index, 1);
    updateCourseTable();
  });

  // Calculate GPA button click event
  $("#calculateBtn").click(function () {
    calculateGPA();
  });

  // Dark mode theme switch
  $("#themeSwitchInput").change(function () {
    $("body").toggleClass("dark-mode");
  });
});
