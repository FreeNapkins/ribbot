class AnimalCrosser {
    constructor(id) {
        this.discordID = id
        this.realName = ''
        this.charName = ''
        this.friendCode = ''
        this.islandName = ''
        this.DIY = []
        this.catalog = []
        this.wishlist = []
        this.islandNPC = ''
        this.turnipPrice = 0
        this.villagerDIY = {
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




