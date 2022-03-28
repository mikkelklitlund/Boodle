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
    <a class="nav-link " href="../Setup/index.php">Setup Boodle</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="../Install_guide/index.php">Bot Status</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="../Install_guide/index.php">Guide</a>
  </li>
</ul>
</section>

<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Guide til setup
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
       I denne guide vil der blive vist, hvordan man instiller og installere Boodle. i guiden vil der blive vist billedeksempler, samt forklarende teskt.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Trin 1
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
       <img src="./step_1.png">
       Først login formen, ved at bruge dit Discord-login. Dette gøres <a href ='https://discord.com/api/oauth2/authorize?client_id=953227423862890526&permissions=292058032192&scope=bot%20applications.commands' target="_blank">her </a>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Trin 2
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Vælg den server, som du gerne vil tilføje Boodle til. Tryk derefter continue. 
        <img src="./step_2.png" >
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
          Trin 3
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
      <div class="card-body">
        <img src="./moodletoken_del1.png" height="300" width="400">
        For at modtage information fra Boodle, kræves en Moodletoken. 
        Denne moodletoken findes <a href="https://www.moodle.aau.dk/user/managetoken.php" target="_blank">her</a>
      </div>
    </div>
  </div>
</div>




    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="../public/js/bootstrap.min.js"></script>
</body>

</html>