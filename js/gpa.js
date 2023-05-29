"use strict";
import { courses } from "./app";
import updateTable from "./course";
import Swal from "sweetalert2";
import "@sweetalert2/theme-dark/dark.css";

/**
 * @description Function to calculate the GPA
 * @author RED
 */
export function calculate() {
  const totalUnits = courses.reduce(
    (sum, course) => sum + parseFloat(course.units),
    0
  );
  let totalGradePoints = 0;

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    const grade = parseFloat(course.grade);
    const units = parseFloat(course.units);
    totalGradePoints += grade * units;
  }
  const decimal = 2;
  const gpaRaw = totalGradePoints / totalUnits;
  const gpa = gpaRaw.toFixed(decimal);
  const formula = "Grades * Number of Units / Total Number of Units";
  const message = `<i>Formula: ${formula}</i>`;
  let imageUrl;

  if (gpa < 2.0) imageUrl = "img/1.gif";
  else if (gpa < 3.0) imageUrl = "img/2.gif";
  else if (gpa < 4.0) imageUrl = "img/3.gif";
  else if (gpa < 5.0) imageUrl = "img/4.gif";
  else imageUrl = "img/5.gif";

  // Show GPA calculation result and copy to clipboard
  Swal.fire({
    imageUrl: imageUrl,
    imageHeight: 200,
    // icon: "success",
    title: `Your GPA is ${gpa}`,
    html: message,
    confirmButtonText: "Copy GPA to Clipboard",
  }).then((result) => {
    if (result.isConfirmed) {
      const textarea = document.createElement("textarea");
      textarea.value = gpa;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      Swal.fire({
        icon: "success",
        title: "GPA copied to Clipboard",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
}

export function reset() {
  courses = [];
  updateTable();
  return courses;
}
