const { GuildMember, InteractionCollector, EmbedBuilder } = require("discord.js");
const Schema = require("../../Models/Welcome");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        Schema.findOne({Guild: member.guild.id}, async (err, data) => {
            if (!data) return;
            let channel = data.Channel;
            let Msg = data.Msg || " ";
            let Role = data.Role;

            const {user, guild} = member;
            const welcomeChannel = member.guild.channels.cache.get(data.Channel);

            const welcomeEmbed = new EmbedBuilder()
            .setAuthor({
                name: "KtLN Empire",
                    url: "https://www.youtube.com/channel/UC3t4kgvlgizdpqPQro3fOkQ",
                    iconURL: "https://yt3.googleusercontent.com/jCBQt65bFTlCF4BIOUBrk5DJsJlJar70iGxwHOtoZJTK3rWRquFKYjwQbSkkw2UclDVDp0XhhdE=s176-c-k-c0x00ffffff-no-rj"
                })
                .setDescription(`**!KtLN ברוכים הבאים אל שרת הקהילה של **\n!משתמשים ${guild.memberCount} אנחנו עכשיו\n👇🏻 מוזמנים לבדוק את החדרים \n» <#729681839211675661>\n» <#798982746356711484>\n» <#896095089577824256>`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor("#d0640b")
                .setFooter({
                    text: "by mistake",
                })
                .setTimestamp();

            welcomeChannel.send({embeds: [welcomeEmbed]});
            member.roles.add(data.Role);

        })
    }
}