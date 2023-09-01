const LoadChannel = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const channeldata = await res.json();
    // console.log(channeldata.data[0].category_id);

    const CategoryContainer = document.getElementById('category_container');

    channeldata.data?.forEach(data => {
        // console.log(data);
        const category = document.createElement('button');
        category.innerHTML = `
        <button onclick="HandleCategories(${data.category_id})" class="btn px-7 text-xl font-semibold">${data.category}</button>`;
        CategoryContainer.appendChild(category);
    });
}

const HandleCategories = async (id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await (res.json());
    // console.log(data.message);
    const ChannelContainer = document.getElementById('channel_card');
    const DrawContainer = document.getElementById('draw_container');
    if (data.message === "no data found!!!") {
        DrawContainer.textContent = '';
        DrawingFunction(DrawContainer);
    }
    else {
        DrawContainer.textContent = '';
    }
    DisplayTubeCart(data.data, ChannelContainer);
}



const DisplayTubeCart = (channels, ChannelContainer) => {
    //console.log(channels);
    ChannelContainer.textContent = '';
    // console.log(ChannelContainer);


    channels.forEach(channel => {
        // console.log(channel.category_id);
        const channelcard = document.createElement('div');
        channelcard.classList = `card  bg-base-100  p-3`;
        channelcard.innerHTML = `
        <figure>
        <img class="w-[100%] h-36" src="${channel.thumbnail}" alt="Shoes" />
        </figure>
        <div class=" flex gap-5 items-center p-5 pb-0">
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

// for drawing category
const DrawingFunction = (channel_id) => {


    const DrawingContainer = document.createElement('div');
    //DrawingContainer.classList = `container mx-auto `;
    DrawingContainer.innerHTML = `
    <img class="mx-auto mb-4"  src="Icon.png" alt="">
    <p class="text-4xl font-bold">Oops!! Sorry, There is no <br> content here</p>
   
    `
    channel_id.appendChild(DrawingContainer);
}
LoadChannel();