//  got help to create the url from: https://stackoverflow.com/questions/17734343/how-to-insert-javascript-variables-into-a-url
// got help to removing <p> tags from summary from: https://stackoverflow.com/questions/49545458/how-can-i-remove-this-p-tag-from-my-json-fetch
import "./styles.css";

if (document.readyState !== "loading") {
  console.log("document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  const input = document.getElementById("input-show");
  const searchbtn = document.getElementById("submit-data");
  const resultsdata = document.getElementById("results");

  searchbtn.addEventListener("click", () => {
    const searchquery = input.value;

    const url = `https://api.tvmaze.com/search/shows?q=${searchquery}`;

    fetch(url)
      .then((response) => response.json())
      .then((jsondata) => {
        resultsdata.innerHTML = "";
        for (let i = 0; i < jsondata.length; i++) {
          let show = jsondata[i];

          const name = show.show.name;
          const image = show.show.image;
          const ogsummary = show.show.summary;

          const summary = ogsummary.replace(/(<([^>]+)>)/gi, "");

          const outputdiv = document.createElement("div");
          outputdiv.className = "show-data";

          const imgrow = document.createElement("img");
          imgrow.src = image ? image.medium : "";

          const showinfoDiv = document.createElement("div");
          showinfoDiv.className = "show-info";

          const namerow = document.createElement("h1");
          namerow.textContent = name;

          const summaryrow = document.createElement("p");
          summaryrow.textContent = summary;

          showinfoDiv.appendChild(namerow);
          showinfoDiv.appendChild(summaryrow);

          outputdiv.appendChild(imgrow);
          outputdiv.appendChild(showinfoDiv);

          resultsdata.appendChild(outputdiv);
        }
      });
  });
}
