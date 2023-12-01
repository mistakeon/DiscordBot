const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, AttachmentBuilder} = require("discord.js");

const { profileImage } = require("discord-arts");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("memberinfo")
    .setDescription("view your or any member's information.")
    .setDMPermission(false)
    .addUserOption((option) => option
        .setName("member")
        .setDescription("View a member's information. Leave empty to view your own.")
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        await interaction.deferReply()
        const member = interaction.options.getMember("member") || interaction.member;

        if(member.user.bot) return interaction.editReply({
            embeds: 
            [
                new EmbedBuilder().setDescription("At this moment, bots are not supported for this command.")
            ],
            ephemeral: true
        });

        try {
            const fetchedMembers = await interaction.guild.members.fetch();

            const profileBuffer = await profileImage(member.id);
            const imageAttachment = new AttachmentBuilder(profileBuffer, {name: 'profile.png' });

            const joinPosition = Array.from(fetchedMembers
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .keys())
                .indexOf(member.id) + 1;

            const topRoles = member.roles.cache
            .sort((a, b) => a.position - b.position)
            .map(role => role)
            .slice(0, 3);

            const userBadges = member.user.flags.toArray()

            const joinTime = parseInt(member.joinedTimestamp / 1000);
            const createdTime = parseInt(member.user.createdTimestamp / 1000);

            const Booster = member.premiumSince ? "<:discordboost7:1179087497012187246>" : "✖️";

            const Embed = new EmbedBuilder()
            .setAuthor({name: `${member.user.tag} | General Information`, iconURL: member.displayAvatarURL()})
            .setColor(member.displayColor)
            .setDescription(`On <t:${joinTime}:D>, ${member.user.username} joined as the **${addSuffix(joinPosition)}** member of this guild.`)
            .setImage("attachment://profile.png")
            .addFields([
                {name: "Badges", value: `${addBadges(userBadges).join("")}`, inline: true},
                {name: "Booster", value: `${Booster}`, inline: true},
                {name: "Top Roles", value: `${topRoles.join("").replace(`<@${interaction.guildId}>`)}`, inline: false},
                {name: "Created", value: `<t:${createdTime}:R>`, inline: true},
                {name: "Joined", value: `<t:${joinTime}:R>`, inline: true},
                {name: "Identifier", value: `${member.id}`, inline: false},
                {name: "Avatar", value: `[Link](${member.displayAvatarURL()})`, inline: true},
                {name: "Banner", value: `[Link](${(await member.user.fetch()).bannerURL()})`, inline: true},
            ]);

            interaction.editReply({embeds: [Embed], files: [imageAttachment]});
        } catch (error) {
            interaction.editReply({content: "An error occurd: Contact The Developer"});
            throw error;
        }

    }
}

function addSuffix(number) {
    if(number % 100 >= 11 && number % 100 <= 13)
        return number + "th";

    switch(number % 10) {
        case 1: return number + "st";
        case 2: return number + "nd";
        case 3: return number + "rd";
    }
    return number + "th";
}

function addBadges(badgeNames) {
    if(!badgeNames.length) return ["X"];
    const badgeMap = {
        "ActiveDeveloper": "<:activedeveloper:1179087495078625320>",
        "BugHunterLevel1": "<:discordbughunter1:1179087502590607450>",
        "BugHunterLevel2": "<:discordbughunter2:1179087504742289408>",
        "PremiumEarlySupporter": "<:discordearlysupporter:1179087506071892068>",
        "Partner": "<:discordpartner:1179087478750183494>",
        "Staff": "<:discordstaff:1179087481136750653>",
        "HypeSquadOnlineHouse1": "<:hypesquadbravery:1179087484831940799>", // bravery
        "HypeSquadOnlineHouse2": "<:hypesquadbrilliance:1179087487524667413>", // brilliance
        "HypeSquadOnlineHouse3": "<:hypesquadbalance:1179087482906751006>", // balance
        "Hypesquad": "<:hypesquadevents:1179087489256914964>",
        "CertifiedModerator": "<:olddiscordmod:1179087491869986837>",
        "VerifiedDeveloper": "<:discordbotdev:1179087500187283537>",
    };
  
    return badgeNames.map(badgeName => badgeMap[badgeName] || '❔');
}