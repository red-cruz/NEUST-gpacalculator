import $ from "jquery";
import { courses } from "./main";

/**
 * @description Function to update the course table
 * @author RED
 */
export default function updateCourseTable() {
  // Update course count
  $("#courseCount").text(courses.length);

  const courseTable = $("#courseTable");
  courseTable.empty();

  if (courses.length === 0) {
    // Display message if no courses added
    courseTable.html(
      `<tr><td colspan="4" class="text-center">No courses added.</td></tr>`
    );
    $("#calculateBtn").hide();
  } else {
    // Iterate through courses and populate the table
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const row = `
        <tr>
          <td>${course.courseName}</td>
          <td>${course.grade}</td>
          <td>${course.units}</td>
          <td>
            <button type="button" class="btn bg-body-tertiary text-white editBtn" data-index="${i}" data-toggle="tooltip" data-placement="top" data-bs-theme="dark" title="Edit"><i class="fa-solid fa-pencil"></i></button>
            <button type="button" class="btn bg-body-tertiary text-danger deleteBtn" data-index="${i}" data-toggle="tooltip" data-placement="top"data-bs-theme="dark" title="Delete"><i class="fa-solid fa-xmark fa-lg"></i></button>
          </td>
        </tr>
      `;
      courseTable.append(row);
    }
    $("#calculateBtn").show();
  }
}
