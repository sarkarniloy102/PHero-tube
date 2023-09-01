const LoadChannel = async (id = 1001) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    DisplayTubeCart(data.data);
    console.log(data.data[0].title);
}

const DisplayTubeCart = (channel) => {

}

LoadChannel();