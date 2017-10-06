'use babel';

const packageName = 'spaceatom-keybindings'
const notificationMessage = 'Do you want to set Spacemacsdark-syntax and one-dark-ui as your theme?'

export default {

  atomHaskellView : null,
  modalPanel : null,
  subscriptions : null,

  activate(state) {
    // Install the dependencies.
    require('atom-package-deps').install('spaceatom-keybindings')
      .then(this.askToEnableTheme())
  },

  askToEnableTheme() {
    let configAdded = atom.config.get(packageName + '.hasAddedConfiguration')
    if (!configAdded) {
      // Ask the user whether they want to use the default configuration or not.
      atom.notifications.addInfo(notificationMessage, {
        dismissable: true,
        buttons: [
          {
            text: 'Set my theme!',
            onDidClick: () => this.setTheme()
          },
          {
            text: 'No thanks!',
            onDidClick: () => this.markConfigAsSet()
          }
        ],
        description: 'You can always do this manually later on.'
      })
    }
  },

  markConfigAsSet() {
    atom.config.set(packageName + '.hasAddedConfiguration', true)
  },

  setTheme() {
    atom.config.set('core.themes', [
      "one-dark-ui",
      "spacemacsdark-syntax"
    ])

    this.markConfigAsSet()

    // TODO: Find a better way to dismiss the current notification.
    atom.notifications.getNotifications().forEach(function(notification) {
      if (notification.message === notificationMessage) {
        notification.dismiss()
      }
    })
  }
};
