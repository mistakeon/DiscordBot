const { ChatInputCommandInteraction, Client } = require("discord.js");
const { loadCommands } = require("../../../Handlers/commandHandler");

module.exports = {
    subCommand: "reload.commands",
    /**
     * 
     * @param {*} interaction 
     * @param {*} client 
     */
    execute(interaction, client) {
        loadCommands(client);
        interaction.reply({content: "Reloaded Commands", ephemeral: true});
    }
}