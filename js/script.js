// access of API
const LoadChannel = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const channeldata = await res.json();
    // console.log(channeldata.data[0].category_id);
    const CategoryContainer = document.getElementById('category_container');
    // create heading button dynamically
    channeldata.data?.forEach(data => {
        // console.log(data);
        const category = document.createElement('button');
        category.innerHTML = `
        <button onclick="HandleCategories(${data.category_id})" class="btn px-7  text-xl font-semibold focus:bg-orange-500 focus:text-white">${data.category}</button>`;
        CategoryContainer.appendChild(category);

    });
}
// Handle all category by category id
const HandleCategories = async (id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await (res.json());
    // console.log(data.message);
    const DrawContainer = document.getElementById('draw_container');
    // condition for no data
    if (data.message === "no data found!!!") {
        DrawContainer.textContent = '';
        DrawingFunction(DrawContainer);
    }
    else {
        DrawContainer.textContent = '';
    }
    DisplayTubeCart(id);

}
let global_id;
// Display each channel card dynamically 
const DisplayTubeCart = async (id) => {
    global_id = id;

    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await (res.json());
    const channels = data.data;
    const ChannelContainer = document.getElementById('channel_card');
    // console.log(channels);
    ChannelContainer.textContent = '';
    // console.log(ChannelContainer);


    channels.forEach(channel => {
        // console.log(channel.category_id);
        const postedDate = channel.others?.posted_date;
        const timeinhours = Math.floor(postedDate / 3600);
        const timeinMin = postedDate % 60;
        //console.log(postedDate, timeinhours, timeinMin);
        const channelcard = document.createElement('div');
        channelcard.classList = `card  bg-base-100  p-3`;

        channelcard.innerHTML = `
        <figure class="relative">
        <img class=" w-[100%] h-44 " src="${channel.thumbnail}" alt="Shoes" />
        </figure>
        <p class="absolute top-[50%] right-3">${postedDate === "" ? ""
                : `<span class=" text-xs  bg-stone-700 rounded-md text-white px-3 "> ${timeinhours}  hrs ${" "}${timeinMin} ${" "}min ago </span>`
            } </p >
        <div class="  flex gap-5 items-center p-5 pb-0">
        <div>
        <img class="w-10 h-10  rounded-full" src="${channel.authors[0].profile_picture}" alt="Shoes" />
        </div>
       <div>
       <p class="font-bold text-base">${channel.title}</p>
       </div>
       </div>
       <div class="flex gap-2 items-center">
       <p class="pl-20 text-sm">${channel.authors[0].profile_name}</p>
       <p>${channel?.authors[0]?.verified
                ? '<span class="verified-badge"><img width="16" height="16" src="https://img.icons8.com/color/96/verified-badge.png" alt="verified-badge"/></span>'
                : ""
            }</p>
       </div>
       
       <p class="pl-20 text-sm" >${channel.others.views} views</p>

`;

        ChannelContainer.appendChild(channelcard);

    });


}
DisplayTubeCart("1000");


// for drawing category
const DrawingFunction = (channel_id) => {
    const DrawingContainer = document.createElement('div');

    DrawingContainer.innerHTML = `
    
     <img class= "mx-auto mb-4" src="./images/Icon.png"">
        <p class="text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
`;
    channel_id.appendChild(DrawingContainer);
}
// Sorted by views
const SortViews = async () => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${global_id}`);
    const channeldata = await (res.json());

    const array = channeldata.data;
    // sort the object in array according to views
    array.sort((a, b) => {
        const aViews = parseFloat(a.others.views);
        const bViews = parseFloat(b.others.views);
        return bViews - aViews;
    });


    const ChannelContainer = document.getElementById('channel_card');
    ChannelContainer.textContent = '';
    // Display the channel card in sorted according to views
    array.forEach(channel => {
        // console.log(channel.category_id);
        const postedDate = channel.others?.posted_date;
        const timeinhours = Math.floor(postedDate / 3600);
        const timeinMin = postedDate % 60;
        //console.log(postedDate, timeinhours, timeinMin);

        const channelcard = document.createElement('div');
        channelcard.classList = `card  bg-base-100  p-3`;

        channelcard.innerHTML = `
        <figure class="relative">
        <img class="w-[100%] h-44" src="${channel.thumbnail}" alt="Shoes" />
        </figure>
        <p>${postedDate === "" ? ""
                : `<span class="absolute text-xs  bg-stone-700 rounded-md text-white px-3 top-[50%] left-[47%]"> ${timeinhours}  hrs ${" "}${timeinMin} ${" "}min ago </span>`
            } </p >
        <div class="  flex gap-5 items-center p-5 pb-0">
        <div>
        <img class="w-10 h-10  rounded-full" src="${channel.authors[0].profile_picture}" alt="Shoes" />
        </div>
       <div>
       <p class="font-bold text-base">${channel.title}</p>
       </div>
       </div>
       
       <p class="pl-20 text-sm">${channel.authors[0].profile_name}</p>
       <p class="pl-20 text-sm" >${channel.others.views} views</p>
       
         `;

        ChannelContainer.appendChild(channelcard);

    });

}

LoadChannel();