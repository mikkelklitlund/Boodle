<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../public/css/bootstrap.css">
    <link rel="stylesheet" href="../public/css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.0/css/all.css">
    <title>Boodle</title>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
<div class="container">
  <a class="navbar-brand" href="#">Moodlecord</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <form action>
        <input type="button"value="English" onclick="location.href ='http://127.0.0.1:5500/BoodleHjemmeside.html'; ">
    </form>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="/dashboard">Boodle</a>
      </li>
    </ul>
  </div>
  </div>
</nav>




<section class="top-titel">
    <div class="container text-center">
        <h1>Velkommen <?php echo $_SESSION['user']['username']; ?>!</h1>
        <p>Discord#0000.</p>
    </div>
</section>

<section class="dashboard-nav">
<ul class="nav nav-pills nav-fill justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="../Setup/index.php">Setup Boodle</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="../Install_guide/index.php">Bot Status</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="../Install_guide/index.php">Guide</a>
  </li>
</ul>
</section>

<form>
  <div class="form-group">
    <label for="exampleInputEmail1">Moodle-Token</label>
    <input type="MoodleToken" class="form-control" id="exampleMoodleToken" aria-describedby="moodletokenHelp" placeholder="Enter Moodle-token">
    <small id="moodletokenHelp" class="form-text text-muted">We'll never share your Moodle-token with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Discord-id</label>
    <input type="text" class="form-control" id="exampleDiscordid" placeholder="Discord-id">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="../public/js/bootstrap.min.js"></script>
</body>

</html>