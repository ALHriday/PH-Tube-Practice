const videoContainer = document.querySelector("#video-container");

const buttonItems = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      for (const btn of data.categories) {
        document.getElementById("button-items").innerHTML += `
        <button id='buttons' onclick='categories(${btn.category_id})' id='btn-categories' class="btn">${btn.category}</button>
        `;
      }
    });
};

function categories(id) {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => videoItem(data.category))
    .catch((err) => console.log(err));

  document.querySelectorAll("#buttons").forEach((btn) => {
    btn.addEventListener("click", function () {
      btn.classList.add("bg-red-500", "text-white");
    });
    btn.classList.remove("bg-red-500", "text-white");
  });
}

buttonItems();

const videoCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => videoItem(data.videos));
};

videoCategories();

function releasedTime(time) {
  const hours = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minutes = parseInt(remainingSeconds / 60);
  remainingSeconds = parseInt(remainingSeconds % 60);
  return `${hours} Hours ${minutes} Minutes ${remainingSeconds} Seconds ago`;
}

const videoItem = (videos) => {
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
        <div class='h-96 flex flex-col justify-center items-center'>
        <img class='' src='https://img.icons8.com/?size=100&id=XiGRZwrWiO05&format=png&color=000000'>
        <h4 class='text-center text-4xl font-bold'>No Video Found!</h4>
        </div>`;
    videoContainer.classList.remove("grid");
  } else {
    videoContainer.classList.add("grid");
  }

  for (const video of videos) {
    videoContainer.innerHTML += `
        <div class="card p-4 h-[300px] flex flex-col justify-evenly bg-slate-100 text-black">
                <div class = 'w-full h-[50%] relative'>
                    <img class="object-cover w-full h-full" src=${
                      video.thumbnail
                    } alt="">
                    ${
                      video.others.posted_date?.length == 0
                        ? ""
                        : `<p class='absolute text-[10px] right-1 bottom-1 text-white py-1 px-2 bg-black'>${releasedTime(
                            `${video.others.posted_date}`
                          )}</p>`
                    }
                </div>
                <div class="flex gap-2">
                    <div class="w-16 h-16">
                        <img class="rounded-full object-cover w-full h-full" src=${
                          video.authors[0].profile_picture
                        } alt=""> 
                    </div>
                    <div class="flex flex-col gap-1">
                        <h4 class='text-md font-bold'>${video.title}</h4>
                        <h4 class='inline-flex'>${
                          video.authors[0].profile_name
                        }  ${
      video.authors[0].verified === true
        ? `<img class='w-6 h-6' src='https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000'>`
        : ""
    }</h4>
                        
                    </div>
                    
                </div>
                <div class='flex justify-end'>
                    <button class="btn btn-sm bg-red-400">Details</button>
                </div>
            </div>
        `;
  }
};
