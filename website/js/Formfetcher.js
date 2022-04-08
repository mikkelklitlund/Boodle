let formSubmit = document.querySelector('#formSubmit');
let btnSubmit = document.querySelector('#btnSubmit');

btnSubmit.addEventListener("click", async () => {
  let PostMoodletoken = document.querySelector("#PostMoodletoken");
  //let PostDiscordid = document.querySelector("#PostDiscordid");

  let formpost = {
    Moodle: PostMoodletoken.value,
    //Discord: PostDiscordid.value,
  };

  let post = await fetch("https://fs-21-sw-2-a219a.p2datsw.cs.aau.dk/node0/", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(formpost),
  });
});
