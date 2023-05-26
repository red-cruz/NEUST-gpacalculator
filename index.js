$(document).ready(function () {
  // Array to store courses
  let courses = [];

  // Function to update the course table
  function updateCourseTable() {
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
              <button type="button" class="btn btn-sm btn-primary editBtn" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Edit"><i class="far fa-edit"></i></button>
              <button type="button" class="btn btn-sm btn-danger deleteBtn" data-index="${i}" data-toggle="tooltip" data-placement="top" title="Delete"><i class="far fa-trash-alt"></i></button>
            </td>
          </tr>
        `;
        courseTable.append(row);
      }
      $("#calculateBtn").show();
    }
  }

  // Initial update of the course table
  updateCourseTable();

  // Function to calculate the GPA
  function calculateGPA() {
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
    const message = `Your GPA is ${gpa.toFixed(2)}.\n\nFormula: ${formula}`;

    // Show GPA calculation result and copy to clipboard
    Swal.fire({
      icon: "success",
      title: "GPA Calculated",
      text: message,
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
