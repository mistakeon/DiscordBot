const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, RoleSelectMenuBuilder, ActionRowBuilder, ComponentType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("show-roles")
    .setDescription("Show roles using role selecet menu.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const roleMenu = new RoleSelectMenuBuilder()
            .setCustomId(interaction.id)
            .setMinValues(0)
            .setMaxValues(2);

        const actionRow = new ActionRowBuilder().setComponents(roleMenu);

        const reply = await interaction.reply({components: [actionRow], ephemeral: true})

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.RoleSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60_000,
        });

        collector.on('collect', (interaction) => {
            if (!interaction.values.length) {
                interaction.reply({ content: "You have emptied your selection.", ephemeral: true });
                return;
            }

            interaction.reply({ content: `You have now selected: ${interaction.values.join(', ')}`, ephemeral: true });
        });
    }
}
