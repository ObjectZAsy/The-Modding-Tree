addLayer("m", {
    name: "miners", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "miners", // Name of prestige currency
    baseResource: "ore", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('m', 13)) mult = mult.times(upgradeEffect('m', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for miners", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Cave Miners",
            description: "Double your ore gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Silver Pickaxes",
            description: "Scales effect based on miners.",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Fierce Miners",
            description: "Ore boosts miner gain.",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        },
        21: {
            title: "Deep Cave Miners",
            description: "Multiplies ore gain by 20.",
            cost: new Decimal(20),
        },
        22: {
            title: "Golden Pickaxes",
            description: "Scales effect based on miners more.",
            cost: new Decimal(120),
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Miners with... axes?!",
            description: "Ore boots miner gain more.",
            cost: new Decimal(400),
            effect() {
                return player.points.add(10).pow(0.2)
            },
        },
    },
    layerShown(){return true}
}),

addLayer("e", {
    name: "excavators", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFF80",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "excavators", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "E: Reset for excavators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        
    },
    layerShown(){return true}
})

