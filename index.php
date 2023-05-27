<?php
  $version = '1.0.0';
  $cssFile = 'style.css';
  $jsFile = 'script.js';

  $cssUrl = $cssFile . '?v=' . $version;
  $jsUrl = $jsFile . '?v=' . $version;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta tags -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Title -->
    <title>GPA Calculator</title>

    <!-- Favicon -->
    <link rel="icon" href="favicon.ico" type="image/x-icon" />

    <!-- CSS dependencies -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />

    <!-- Custom CSS -->
    <link rel="stylesheet" href="<?=$cssUrl?>" />
  </head>

  <body class="dark-mode">
    <div class="container">
      <h1>GPA Calculator</h1>

      <!-- GPA Form -->
      <form id="gpaForm">
        <div class="form-group">
          <label for="course">Course Name (Optional)</label>
          <input
            type="text"
            class="form-control"
            id="course"
            placeholder="Enter course name"
            autocomplete="off"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="grade">Grade</label>
            <input
              type="number"
              class="form-control"
              id="grade"
              placeholder="Enter grade"
              autocomplete="off"
              required
            />
          </div>
          <div class="form-group col-md-6">
            <label for="units">Units</label>
            <input
              type="number"
              class="form-control"
              id="units"
              placeholder="Enter units"
              autocomplete="off"
              required
            />
          </div>
        </div>
        <button type="button" class="btn btn-primary" id="addCourseBtn">
          Add Course
        </button>
      </form>

      <br />

      <!-- Course table -->
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>
              Course
              <span id="courseCount" class="badge badge-secondary"></span>
            </th>
            <th>Grade</th>
            <th>Units</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="courseTable"></tbody>
      </table>

      <!-- Calculate GPA button -->
      <button type="button" class="btn btn-primary" id="calculateBtn">
        Calculate GPA
      </button>
    </div>

    <!-- Theme switch -->
    <div class="theme-switch">
      <label class="theme-switch-label" for="themeSwitchInput">
        <input
          type="checkbox"
          class="theme-switch-input"
          id="themeSwitchInput"
        />
        <span class="theme-switch-slider"></span>
      </label>
    </div>

    <!-- JavaScript dependencies -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Custom JavaScript -->
    <script src="<?=$jsUrl?>"></script>
  </body>
</html>