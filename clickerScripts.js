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
        } else {alert("You don't have enough points!")}
    } else {alert('Max Level!')}
})

//robot

let robotLevel=0

let robotExists = false

let a

let robot = () => {
    currentPoints++
    $(".points").text(currentPoints)
}

let ifRobotBought = () => {
    currentPoints=currentPoints-RobotLevels[robotLevel].cost1
    $(".points").text(currentPoints)
    a = window.setInterval(robot, 3000)
    $('.autoSwitch').css('display', 'block')
}

let noRobot = {
    cost1: 200,
    cost2: 'Cost: 500',
    title: 'Develop your robot!',
    description: 'Upgrade your robot to earn 3 points in each 3 sec!',
    currentRobotPerformance: 1,
}

let robotLevel1 = {
    cost1: 500,
    cost2: 'Cost: 1000',
    title: 'Develop your robot!',
    description: 'Upgrade your robot to earn 5 points in each 3 sec!',
    currentRobotPerformance: 3,
}

let robotLevel2 = {
    cost1: 1000,
    upgrade: 3,
    title: 'Max',
    description: 'Good job! You have the best robot you can have.',
    cost2: ' ',
    currentRobotPerformance: 5,
}

let robotLevel3 = {
    upgrade: 5,
}

let RobotLevels = [noRobot, robotLevel1, robotLevel2, robotLevel3]

let loadRobotMenu= (levelnumber) => {
    $(".autoTitle").text(RobotLevels[robotLevel].title)
    $(".autoDescription").text(RobotLevels[robotLevel].description)
    $(".autoCost").text(RobotLevels[robotLevel].cost2)
    $('.currentRobotPerformance').text(RobotLevels[robotLevel].currentRobotPerformance)
}

$('.autoBuy').on('click', () => {
    if (robotLevel<3) {
        if (currentPoints>=RobotLevels[robotLevel].cost1) {
                if (robotExists) {
                    clearInterval(a)
                    
                    robot = () => {
                        currentPoints=currentPoints+RobotLevels[robotLevel].upgrade
                        $(".points").text(currentPoints)
                    }
                    currentPoints=currentPoints-RobotLevels[robotLevel].cost1
                    $(".points").text(currentPoints)
                    a = window.setInterval(robot, 3000)
                    loadRobotMenu()
                    robotLevel++
                } else {
                    ifRobotBought()
                    loadRobotMenu()
                    robotExists = true
                    robotLevel++
                }
        } else {alert("You don't have enough points!")}
    } else {alert('Max Level!')}
})

let robotIsOn = true

$('.autoOffButton').on('click', () => {
    if (robotIsOn) {
        clearInterval(a)
        $('.autoOffButton').css('background', '#ff2e2e')
        $('.autoOffButton').css('border', '5px inset #cc2525')
        $('.autoOnButton').css('background', 'rgb(224, 223, 223)')
        $('.autoOnButton').css('border', '5px outset black')
        robotIsOn=false
    } else {}
})

$('.autoOnButton').on('click', () => {
    if (robotIsOn) {} 
    else {
        a = window.setInterval(robot, 3000)
        $('.autoOffButton').css('background', 'rgb(224, 223, 223)')
        $('.autoOffButton').css('border', '5px outset black')
        $('.autoOnButton').css('background', '#08ff26')
        $('.autoOnButton').css('border', '5px inset #00cb19')
        robotIsOn=true
    }
})


//vége
