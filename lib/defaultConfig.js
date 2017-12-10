const defaultConfig = {
  notifyPublishOnlyComment: 'This repository is marked as "publish only" and does not accept PRs or issues here. Please see the repositories contribution guide for more information.',
  notifyPublishOnlyOn: {
    issue: true,
    pullRequest: true
  }
}

module.exports = defaultConfig
