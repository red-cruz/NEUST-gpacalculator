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
  const gpaRaw = totalGradePoints / totalUnits;
  const gpa = gpaRaw.toFixed(2);
  const formula = "Grades * Number of Units / Total Number of Units";
  const message = `<i>Formula: ${formula}</i>`;
  let imageUrl;

  if (gpa < 2.0) imageUrl = "img/1.gif";
  else if (gpa < 3.0) imageUrl = "img/2.gif";
  else if (gpa == 3.0) imageUrl = "img/3.gif";
  else if (gpa < 5.0) imageUrl = "img/4.gif";
  else imageUrl = "img/5.gif";

  // Show GPA calculation result and copy to clipboard
  Swal.fire({
    imageUrl: imageUrl,
    imageHeight: 200,
    title: `Your GPA is ${gpa}`,
    html: message,
    confirmButtonText: "Copy GPA",
  }).then((result) => {
    if (result.isConfirmed) {
      copyGPA(gpa);
    }
  });
}

export function reset() {
  courses = [];
  updateTable();
  return courses;
}

async function copyGPA(gpa) {
  try {
    // Use the Clipboard API to write the text to the clipboard
    await navigator.clipboard.writeText(gpa);
    Swal.fire({
      icon: "success",
      title: "GPA copied to Clipboard",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops! Unable to copy GPA to Clipboard,",
      text: `Please try again or manually copy the GPA value. If the issue persists, ensure that your browser supports the Clipboard API and that you have granted necessary permissions. Error: ${error}`,
      showConfirmButton: false,
    });
  }
}
