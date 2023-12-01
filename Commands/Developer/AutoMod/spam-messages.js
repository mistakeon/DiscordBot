const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChatInputCommandInteraction, Client } = require("discord.js")

module.exports = {
    subCommand: "automod.spam-messages",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;

        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) 
        return await interaction.reply({
            content: "You dont have perms to setup automod within this server",
            ephemeral: true
        });
    }
}