const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadEvents } = require("../../../Handlers/eventHandler");

module.exports = {
    subCommand: "reload.events",
    /**
     * 
     * @param {*} interaction 
     * @param {*} client 
     */
    execute(interaction, client) {
        for(const [key, value] of client.events)
        client.removeListener(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({content: "Reloaded Events", ephemeral: true});
    }
}