export default {
    Query: {
        async match(parent, { id }, { models, pubgApi }) {
            let match = await models.Match.find(id)

            if (!match) throw Error('Attempt to load match without a player')

            if (!match.gameMode) {
                const pubgMatch = await pubgApi.getMatch(id)
                match = await models.Match.create(pubgMatch)
            }

            return match
        },
    },
}
