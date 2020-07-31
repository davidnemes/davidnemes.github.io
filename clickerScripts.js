let currentPoints=0
let clickingLevel=1


let getClick = (b) => {
    currentPoints++
    $(".points").text(currentPoints)
}

$(".mainButton").on("click", () => {
    getClick()
})

//upgrade -ek

let level1 = {}

let level2 = {
    cost1: 30,
    cost2: "Cost: 60",
    level: 'Level 2',
    title: "Upgrade to level 3",
    description: "This upgrade will let you score 5 with one click.",
    upgrade: 1,
}
let level3 = {
    cost1: 60,
    cost2: "Cost: 90",
    level: 'Level 3',
    title: "Upgrade to level 4",
    description: "This upgrade will let you score 10 with one click.",
    upgrade: 2,
}
let level4 = {
    cost1: 90,
    cost2: "Cost: 120",
    level: 'Level 4',
    title: "Upgrade to level 5",
    description: "This upgrade will let you score 20 with one click.",
    upgrade: 5,
}
let level5 = {
    cost1: 120,
    cost2: ":)",
    level: 'Level 5',
    title: "MAX",
    description: "Good job! You maximalized your earnings!",
    upgrade: 10,
}

let level6 = {
    upgrade: 20,
}

let Levels = [level1, level2, level3, level4, level5, level6]

let loadUpgradeMenu = (levelnumber) => {
    $(".upgradeTitle").text(Levels[clickingLevel].title)
    $(".upgradeDescription").text(Levels[clickingLevel].description)
    $(".upgradeCost").text(Levels[clickingLevel].cost2)
}

$(".upgradeButton").on("click", () => {
    if (clickingLevel<5) {
        if (currentPoints>=Levels[clickingLevel].cost1) {
            getClick = (b) => {
                currentPoints= currentPoints + Levels[clickingLevel].upgrade
                $(".points").text(currentPoints)
            }
            currentPoints= currentPoints-Levels[clickingLevel].cost1
            $(".points").text(currentPoints)
            loadUpgradeMenu()
            $('.clickingLevel').text(Levels[clickingLevel].level)
            clickingLevel++
        } else {console.log("You dont have enough points!")}
    } else {console.log('Max Level!')}
})


//vége
