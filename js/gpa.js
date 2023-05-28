import { courses } from "./main";
import Swal from "sweetalert2";

/**
 * @description Function to calculate the GPA
 * @author RED
 */
export default function calculateGPA() {
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

  const gpa = totalGradePoints / totalUnits;
  const formula = "Grades * Number of Units / Total Number of Units";
  const message = "Your GPA is ${gpa.toFixed(2)}.\n\nFormula: ${formula}";

  // Show GPA calculation result and copy to clipboard
  Swal.fire({
    icon: "success",
    title: "GPA Calculated",
    text: message,
    confirmButtonText: "Copy GPA to Clipboard",
  }).then((result) => {
    if (result.isConfirmed) {
      const textarea = document.createElement("textarea");
      textarea.value = gpa.toFixed(2);
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
