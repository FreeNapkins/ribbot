const Discord = require('discord.js')
const bot = new Discord.Client()


const token = '' //Discord Bot Token goes here
var userProfiles = [] // stores all profiles
let userIndex = 0
const PREFIX = '>'
bot.on('ready', () => {
    console.log('This bot is online')
})



bot.on('message', message => {
    
    let args = message.content.substring(PREFIX.length).split(" ")

    //Arguments
    switch(args[0]){

        //Creates a profile and identifies a person
        case 'createprofile':
            let newProfile = new AnimalCrosser(message.author.id)
            newProfile.discordName = message.author.username
            newProfile.discordPicURL = message.author.avatarURL();
            userProfiles.push(newProfile)
            message.channel.send('Thank you ' + newProfile.discordName + '! You have been registered. Please type `>updateinfo [Real name] [Character\'s name] [Friend code] [Island name]` to update your information')
            break
        
        
        //Fills in the Real name, character name, friendcode, and island name.
        case 'updateinfo':
            let success = false
            userIndex = findUserID(userProfiles, message.author.id)
            if (userProfiles[userIndex].discordID === message.author.id) {
                userProfiles[userIndex].realName = args[1]
                userProfiles[userIndex].charName = args[2]
                userProfiles[userIndex].friendCode = args[3]
                userProfiles[userIndex].islandName = args[4]
                success = true
                userProfiles[userIndex].playerCard = updatePlayerCard(userIndex)
                message.channel.send('Information updated!')
                displayPlayerCard(userIndex, message)
            }
            if (success === false) {
                message.channel.send('You do not have a profile registered. Please type `>createprofile` to register')
            }
            break

        //pulls up someones profile
        case 'viewprofile':
            userIndex = findUserName(userProfiles, args[1])
                displayPlayerCard(userIndex, message)

        break  

        //user informs and registers who is visiting their island (Should reset daily, WIP)
        case 'visitor':
            userIndex = findUserID(userProfiles, message.author.id)
            userProfiles[userIndex].islandNPC = args[1]
            message.channel.send(userProfiles[userIndex].islandNPC + ' Is visiting ' + userProfiles[userIndex].discordName + '\'s island. Please let them know if you want to visit!')
            break
        
        case 'whosvisiting':
            let dialogue = 'Here is who is visiting today:\n'
            for (let i = 0; i < userProfiles.length; i++) {
                dialogue = dialogue.concat(userProfiles[i].islandNPC + ' is visiting ' + userProfiles[i].discordName + '\'s island.\n')
                console.log(userProfiles[i].islandNPC)
            }
            message.channel.send('```' + dialogue + '```')
            break

    }

})


bot.login(token)


//Updates the embed associated with a player
function updatePlayerCard(i) {
    updatedCard = new Discord.MessageEmbed()
                    .setTitle('Animal Crosser Profile')
                    .addField('Discord name', userProfiles[i].discordName)
                    .addField('Name', userProfiles[i].realName)
                    .addField('Character Name', userProfiles[i].charName)
                    .addField('Friend Code', userProfiles[i].friendCode)
                    .addField('Island Name', userProfiles[i].islandName)
                    .setThumbnail(userProfiles[i].discordPicURL)
    return updatedCard
}

function displayPlayerCard(i, msg) {
    msg.channel.send(userProfiles[i].playerCard)  
}

//Searches for a User via discordID
function findUserID(profiles, discordID){
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].discordID === discordID)
        return i
    }
    return -1
}

//Searches for a User via name
function findUserName(profiles, name){
    for (let i = 0; i < profiles.length; i++) {
        if (profiles[i].discordName === name)
        return i
    }
    return -1
}


//User's profile
class AnimalCrosser {
    constructor(id) {
        this.discordID = id //unique Discord ID
        this.discordName = '' //Discord display name
        this.discordPicURL = '' //Discord display picture URL
        this.realName = '' //User's IRL name
        this.charName = '' //User's Animal Crossing Name
        this.friendCode = '' //User's Nintendo Switch friend code
        this.islandName = '' //User's Island's name
        this.DIY = [] //List of DIY recipes knowss
        this.catalog = [] //List of items in the User's catalog
        this.wishlist = [] //List of items the User is looking for
        this.islandNPC = '' //The name of the NPC who is visiting (resets daily)
        this.turnipPrice = 0 //The current updated price of the User (resets at 12AM and 10PM). if = 0, needs to be updated
        this.playerCard = new Discord.MessageEmbed() //Player's basic information in a Discord Embed card
        this.villagerDIY = { //information on a villager currently crafting something. Should reset at 12PM, 6PM and 9PM.
            villager: '',
            recipe: ''   
    }
}

    catalogItem(item) {
        this.catalog.push(item)
    }

    learnDIY(recipe) {
        this.DIY.push(recipe)
    }

    villagerCraft(v, r) {
        this.villagerDIY.villager = v
        this.villagerDIY.recipe = r
    }

    npcVisit(npc) {
        this.islandNPC = npc
    }

    turnipPriceUpdate(price) {
        this.turnipPrice = price
    }
    

    
    
}


//test zone
