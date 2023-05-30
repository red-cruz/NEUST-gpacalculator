"use strict";
import $ from "jquery";
import { courses } from "./app";

/**
 * @description add course
 * @export
 * @param {JQuery.Event} e
 */
export function add(e) {
  e.preventDefault();
  e.stopPropagation();
  /** @type {HTMLFormElement} */
  const form = e.target;
  const courseName = $("#course").val();
  const grade = $("#grade").val();
  const units = $("#units").val();
  const course = {
    courseName: courseName || getDefaultCourseName(courseName),
    grade: grade,
    units: units,
  };

  if (!form.checkValidity()) return;

  courses.push(course);
  updateTable();
  form.reset();
  setTimeout(() => {
    form.classList.remove("was-validated");
  }, 0);
}

/**
 * @description edit course
 * @export
 * @param {JQuery.Event} e
 */
export function edit(e) {
  e.preventDefault();
  e.stopPropagation();
  /** @type {HTMLFormElement} */
  const form = e.target;
  const index = $(form).data("index");
  const course = courses[index];
  course.courseName = $("#updateCourseName").val();
  course.grade = $("#updateGrade").val();
  course.units = $("#updateUnits").val();

  if (!form.checkValidity()) return;

  updateTable();
  $(form).parents(".modal").find("[data-bs-dismiss]").first().trigger("click");
  setTimeout(() => {
    form.classList.remove("was-validated");
  }, 0);
}

/**
 * @description set input
 * @export
 * @param {JQuery.Event} e
 */
export function setEditInputs(e) {
  e.stopPropagation();
  const index = $(e.target).data("index");
  const course = courses[index];
  const courseName = course.courseName;
  const grade = course.grade;
  const units = course.units;
  $("#updateCourseName").val(courseName);
  $("#updateGrade").val(grade);
  $("#updateUnits").val(units);
  $("#gpaUpdateForm").data("index", index);
}

/**
 * @description remove course
 * @export
 * @param {JQuery.Event} e
 */
export function remove(e) {
  e.stopPropagation();
  const index = $(e.target).data("index");
  courses.splice(index, 1);
  updateTable();
}

/**
 * @description Function to update the course table
 * @author RED
 */
export default function updateTable() {
  $("#courseCount").show();
  // Update course count
  $("#courseCount").text(courses.length);

  const courseTable = $("#courseTable");
  courseTable.empty();

  if (courses.length === 0) {
    $("#courseCount").hide();

    // Display message if no courses added
    courseTable.html(
      `<tr>
        <td colspan="4" class="text-center">
          No courses added.
        </td>
      </tr>`
    );
    $("#calculateBtn").hide();
    $("#resetBtn").hide();
  } else {
    // Iterate through courses and populate the table
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const row = $("#courseRowTemplate tbody > tr").clone();
      row.find(".courseName").text(course.courseName);
      row.find(".courseGrade").text(course.grade);
      row.find(".courseUnits").text(course.units);
      row.find(".removeCourse").data("index", i);
      row.find(".editCourse").data("index", i);
      courseTable.append(row);
    }
    $("#calculateBtn").show();
    $("#resetBtn").show();
  }
}

function getDefaultCourseName() {
  const length = courses.length;
  const prevCourse = courses[length - 1];
  let index = 1;
  let defaultCourseName = `Course ${length + index}`;
  if (length)
    if (prevCourse.courseName === defaultCourseName)
      defaultCourseName = `Course ${length + index + "a"}`;
  return defaultCourseName;
}
