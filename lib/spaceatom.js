'use babel';

import KeybindingPanelView from './keybinding-panel-view'
import { CompositeDisposable } from 'atom'

const packageName = 'spaceatom-keybindings'
const notificationMessage = 'Do you want to set Spacemacsdark-syntax and one-dark-ui as your theme?'

export default {

  keybindingPanelView: null,
  keybindingPanel: null,
  subscriptions : null,

  activate(state) {
    // Setup the view for the keybinding panel.
    //setupView(state)

    // Install the dependencies.
    let dependenciesInstalled = atom.config.get(packageName + '.stopAskingToInstall')
    if (!dependenciesInstalled) {
      require('atom-package-deps').install('spaceatom-keybindings')
        .then(this.askToEnableTheme())
    }

    //this.keybindingResolver()
  },

  setupView(state) {
    this.keybindingPanelView = new KeybindingPanelView(state.testViewState)
    this.keybindingPanel = atom.workspace.addBottomPanel({
      item: this.keybindingPanelView.getElement(),
      visible: false
    })
    this.subscriptions = new CompositeDisposable()
  },

  deactivate() {
    this.keybindingPanel.destroy();
    this.keybindingPanelView.destroy();
  },

  askToEnableTheme() {
    this.markPackagesAsInstalled()
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

  /*
   * Mark the packages as having been installed, so we can cut down on the
   * startup time of the package.
   */
  markPackagesAsInstalled() {
    atom.config.set(packageName + '.stopAskingToInstall', true)
  },

  /*
   * Mark the configuration as having been set, so we avoid asking again.
   */
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
  },

  keybindingResolver() {
    this.subscriptions.add(atom.keymaps.addKeystrokeResolver(({event}) => {
      if (event.code === 'Space' && event.ctrlKey && event.type === 'keyup') {
        this.keybindingPanel.isVisible() ? this.keybindingPanel.hide() : this.keybindingPanel.show()
      }
      console.log(event.code)
    }))
  }
};
