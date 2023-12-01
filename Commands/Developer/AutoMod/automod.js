const {SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup tyhe auto mod system")
    .addSubcommand(command => 
        command
        .setName("flagged-words")
        .setDescription("Block profanity, sexual content, and slurs")
    )
    .addSubcommand(command => 
        command
        .setName("spam-messages")
        .setDescription("Block messages suspected of spam")
    )
    .addSubcommand(command => 
        command
        .setName("mention-spam")
        .setDescription("Block messages containing a certain amount of mentions")
        .addIntegerOption(option => 
            option
            .setName("number")
            .setDescription("The number of mentions required to block a message")
            .setRequired(true)
        )
    )
    .addSubcommand(command => 
        command
        .setName("keyword")
        .setDescription("Block given keyword in the server")
        .addStringOption(option => 
            option
            .setName("word")
            .setDescription("The word you want to block")
            .setRequired(true)
        )
    ),
}