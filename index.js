const getComment = require('./lib/getComment')
const defaultConfig = require('./lib/defaultConfig')

module.exports = (robot) => {
  console.log('Say hello to publish-only-bot!')

  robot.on(['pull_request.opened', 'pull_request.reopened', 'issues.opened', 'issues.reopened'], computerSaysNo)

  async function computerSaysNo (context) {
    try {
      const config = await context.config('config.yml', defaultConfig)
      const comment = getComment(config.notifyPublishOnlyComment, defaultConfig.notifyPublishOnlyComment)

      addComment(context, comment)

      return close(context, context.issue())
    } catch (err) {
      if (err.code !== 404) {
        throw err
      }
    }
  }
}

async function addComment (context, comment) {
  context.github.issues.createComment(context.issue({ body: comment }))
}

async function close (context, params) {
  const closeParams = Object.assign({}, params, { state: 'closed' })

  return context.github.issues.edit(closeParams)
}
