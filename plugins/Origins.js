//
//░█████╗░██████╗░██╗░██████╗░██╗███╗░░██╗░██████╗
//██╔══██╗██╔══██╗██║██╔════╝░██║████╗░██║██╔════╝
//██║░░██║██████╔╝██║██║░░██╗░██║██╔██╗██║╚█████╗░
//██║░░██║██╔══██╗██║██║░░╚██╗██║██║╚████║░╚═══██╗
//╚█████╔╝██║░░██║██║╚██████╔╝██║██║░╚███║██████╔╝
//░╚════╝░╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝╚═╝░░╚══╝╚═════╝░
//
//Origins - script that mimics Origins mod
//Made by qIMIXERIp vk.com/svtlng
//Special thanks to vk.com/pvenom and vk.com/olegjdk

//config:
//...

//origin list
let originTags = ['Human', 'Enderian', 'Merling', 'Phantom', 'Elytrian', 'Blazeborn', 'Avian', 'Arachnid', 'Shulk', 'Feline']

//origin picker form (with url images)
let _main = mc.newSimpleForm()
_main.setTitle('Choose your origin')
_main.addButton('Human', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/null.png')
_main.addButton('Enderian', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/enderian.png')
_main.addButton('Merling', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/merling.png')
_main.addButton('Phantom', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/phantom.png')
_main.addButton('Elytrian', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/elytrian.png')
_main.addButton('Blazeborn', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/blazeborn.png')
_main.addButton('Avian', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/avian.png')
_main.addButton('Arachnid', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/arachnid.png')
_main.addButton('Shulk', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/shulk.png')
_main.addButton('Feline', 'https://raw.githubusercontent.com/TMGCH06/Origins-LXL/main/resources/feline.png')

let label = [
    'Just your normal minecraft experience',
    '§2+§rCan teleport with ender pearls without using any\n§2+§rCan reach further\n§4-§rTakes damage while in contact with water\n§4-§rIs afraid of pumpkins',
    "§2+§rCan see underwater\n§2+§rCan breathe underwater\n§2+§rFaster underwater block breaking\n§2+§rIncreased swim speed\n§2+§rDoes not sink underwater\n§4-§rCan't breathe when not in water",
    "§2+§rCan walk through solid blocks(Phantom state)\n§2+§rIs invisible(Phantom state)\n§4-§rGets hungry(Phantom state)\n§4-§rBurns on daylight\n§4-§rHas only 7 hearts",
    "§2+§rHas elytra wings by nature\n+Can launch themself to the air(30sec cooldown)\n§2+§rDeals more damage while elytra flying\n§4-§rCan only wear light armor\n§4-§rTakes more kinetic damage\n§4-§rGets debuffs in places with low cellings",
    "§2+§rIs immune to lava and fire\n§2+§rDeals more damage while burning\n§2+§rIs immune to poison & hunger effects\n§4-§rStarts game in The Nether\n§4-§rGets damage while in water",
    "§2+§rPermanent slow falling\n§2+§rA bit faster\n§4-§rCan't eat meat\n§4-§rCan only sleep at high places (Y: 80+)",
    "§2+§rCan climb walls\n§2+§rCoweb traps(30sec cooldown)\n§4-§rHas only 7 hearts\n§4-§rCan only eat meat",
    "§2+§rAdditional 9 slots thad don't drop after death\n§2+§rNatural protection\n§2+§rCan mine rock with bare hands\n§4-§rCan't use shields\n§4-§rExhausts faster",
    "§2+§rJump boost while running\n§2+§rNo fall damage\n§2+§rScares creepers away\n§2+§rNight vision\n§4-§rHas only 9 hearts\n§4-§rCan't mine rock if there're more than 2 of it nearby"
]

// Checking if players.json exist
mc.listen('onServerStarted', function() {
    colorLog('green', 'Origins script loaded.')
    let playerbase = file.readFrom('origins/players.json')
    if (playerbase == null) {
        logger.log("Origins player file did not exist, creating a new one")
        file.writeLine("")
    } else {
        logger.log("Origins player file exists, using the file");
    }
})

// Getting or setting player's origin
mc.listen('onJoin', function(player) {
    function _mainForm(){
        player.sendForm(_main, function(plr, data) {
            let cf = mc.newCustomForm()
            cf.setTitle(originTags[data])
            cf.addSwitch('Choose this origin? (No/yes)', false)
            cf.addLabel(label[data])
            plr.sendForm(cf, function(p, dat) {
                if (dat[0]) {
                    originObject[player.realName] = originTags[data];
                    file.writeTo('origins/players.json', JSON.stringify(originObject))
                    plr.sendText("Your choise is " + originTags[data], 0)
                } else {
                    _mainForm()
                }
            })

        })
    }
    let originJSON = file.readFrom('origins/players.json')
    let originObject = data.parseJson(originJSON)

    if (player.name in originObject) {
        logger.log("Player " + player.realName + " has origin " + originObject[player.realName])
        player.sendText("Your origin is " + originObject[player.realName], 0)
    } else {
        _mainForm()
    }
})

// So, this is origins' abilities code part

//Changing amount of health
mc.listen('onJoin', function(player) {
    let originJSON = file.readFrom('origins/players.json')
    let originObject = data.parseJson(originJSON)
    let nbt = player.getNbt()
    switch (originObject[player.realName]){
            case 'Feline':
                nbt.getTag('Attributes').getTag(1).getTag('DefaultMax').set(18)
                nbt.getTag('Attributes').getTag(1).getTag('Max').set(18)
                player.setNbt(nbt)
            break
            case 'Arachnid':
                nbt.getTag('Attributes').getTag(1).getTag('DefaultMax').set(14)
                nbt.getTag('Attributes').getTag(1).getTag('Max').set(14)
                player.setNbt(nbt)
            break
            case 'Phantom':
                nbt.getTag('Attributes').getTag(1).getTag('DefaultMax').set(14)
                nbt.getTag('Attributes').getTag(1).getTag('Max').set(14)
                player.setNbt(nbt)
            break
        }
})
