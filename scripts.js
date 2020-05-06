let data1 = {
    photo: "images/taj.jpg",
    title: "Beautiful Landscape",
    description: "This is a picture about a lake and a beautiful hill far away. I think the main reason why this picture is wonderful is the reflection of the hill on the smooth watersurface."
}

let data2 = {
    photo: "images/ut.jpg",
    title: "Long Road",
    description: "This is a picture about a road. In this photo, I like the colors the most."
}

let data3 = {
    photo: "images/lila-taj.jpg",
    title: "Imaginary landscape",
    description: 'You could think: "Why is this imaginary?" Well, the color will tell you (and if you look at the mountain far away).'
}

let data4 = {
    photo: "images/big-winter-tree.jpg",
    title: "Winter tree",
    description: "I won't lie to you, this black-white tree looks amazing."
}

let data5 = {
    photo: "images/havas-taj.jpg",
    title: "Wonderful winter landscape",
    description: "Oh yeah, Christmas time... or not. Did you know that in Australia Christmas is in the middle of the Summer?"
}

let data6 = {
    
    photo: "images/fold-az-urbol.jpg",
    title: "Amazing Space",
    description: "Look how amazing the earth looks like from the space!"
}

let imagesData = [data1, data2, data3, data4, data5, data6]

let currentPhoto = 0;

let loadPhoto = (photoNumber) => {
    $('#photo').attr('src', imagesData[currentPhoto].photo);
    $(".photo-title").text(imagesData[currentPhoto].title);
    $(".photo-description").text(imagesData[currentPhoto].description);
    $(".thumbnail").css("border", "4px solid lightgray");
    $(".thumbnail").css("box-shadow", "0px 10px 5px grey");
    $(`.${currentPhoto}`).css("border", "6px solid #202020").css("box-shadow", "0px 0px 20px black");
}



$(".rightArrow").on("click", () => {
    if (currentPhoto < 5) {
        currentPhoto++
        loadPhoto(currentPhoto)
    } else {}
});

$(".leftArrow").on("click", () => {
    if (currentPhoto > 0) {
        currentPhoto = currentPhoto - 1
        loadPhoto(currentPhoto)
    } else {}
})

//Thumbnails

let thumbnailGenerator = 0;
let indexClicked = 0;

imagesData.forEach((item, index) => {
    $(".thumbnailContainer").append(`<img class='thumbnail ${index}' src='${imagesData[thumbnailGenerator].photo}' data-index='${index}'>`)
    thumbnailGenerator++
    $(".thumbnail").on("click", (event) => {
        indexClicked = $(event.target).attr('data-index');
        let numberIndex = parseInt(indexClicked); // ez a sor csak az elején kellett, hogy ne string hanem number legyen az indexClicked, de inkább otthagytam hátha később kelleni fog.
        currentPhoto = numberIndex
        loadPhoto(currentPhoto)
    })
})

//vége

loadPhoto(currentPhoto);