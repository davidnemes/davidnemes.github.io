let currentPoints=0
let clickingLevel=1

let writePoints = (a) => {
    $(".points").text(currentPoints)
}

$(".mainButton").on("click", () => {
    currentPoints++
    writePoints(currentPoints)
})

//upgrade -ek

$(".2").on("click", () => {
    if (currentPoints >= 30) {
        $(".mainButton").on("click", () => {
            currentPoints++
            writePoints(currentPoints)
        })
        currentPoints= currentPoints - 30
        writePoints(currentPoints)
        clickingLevel++
        $(".clickingLevel").text("Level 2")
        $(".2").on("click", () => {
            event.preventDefault()
        })
        //document.querySelector("#id-checkbox").addEventListener("click", function(event) {
            //document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
            //event.preventDefault();
   //}, false);
    } else {
        console.log("You do not have enough points!")
    }
})


//dtrtj

$(".3").one("click", () => {
    if (currentPoints >= 60) {
        $(".mainButton").on("click", () => {
            currentPoints= 5
            writePoints(currentPoints)
        })
        currentPoints= currentPoints - 60
        writePoints(currentPoints)
        clickingLevel++
        $(".clickingLevel").text("Level 3")
        
    } else {
        console.log("You do not have enough points!")
    }
})

$(".4").one("click", () => {
    if (currentPoints >= 90) {
        $(".mainButton").on("click", () => {
            currentPoints++
            writePoints(currentPoints)
        })
        currentPoints= currentPoints - 90
        writePoints(currentPoints)
        clickingLevel++
        $(".clickingLevel").text("Level 4")
        
    } else {
        console.log("You do not have enough points!")
    }
})

$(".5").one("click", () => {
    if (currentPoints >= 120) {
        $(".mainButton").on("click", () => {
            currentPoints++
            writePoints(currentPoints)
        })
        currentPoints= currentPoints - 120
        writePoints(currentPoints)
        clickingLevel++
        $(".clickingLevel").text("Level 5")
        
    } else {
        console.log("You do not have enough points!")
    }
})

//vége

writePoints(currentPoints)