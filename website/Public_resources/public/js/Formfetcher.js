let formSubmit = document.querySelector('#formSubmit');
let btnSubmit = document.querySelector('#btnSubmit');

console.log(formSubmit);
btnSubmit.addEventListener("click", async () => {
  let PostMoodletoken = document.querySelector("#PostMoodletoken");
  let PostDiscordid = document.querySelector("#PostDiscordid");

  let formpost = {
    Moodle: PostMoodletoken.value,
    Discord: PostDiscordid.value,
  };

  let post = await fetch("https://localhost:8443/", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(formpost),
  });
});
