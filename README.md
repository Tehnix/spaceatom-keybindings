# spaceatom-keybindings
Spacemacs-esque keybindings for Atom for the people that are coming from Spacemacs and still have that muscle memory. Also takes care of install required packages.

The package will install,

-   [vim-mode-plus](https://atom.io/packages/vim-mode-plus) the preferred vim mode
-   [keystroke](https://atom.io/packages/keystroke) to define commands through keystrokes (i.e. several commands in a row)
-   [copy-file-contents](https://atom.io/packages/copy-file-contents) to copy a files contents
-   [platformio-ide-terminal](https://atom.io/packages/platformio-ide-terminal) to manipulate terminals
-   [spacemacsdark-syntax-atom](https://github.com/Tehnix/spacemacsdark-syntax-atom) a nice Spacemacs dark theme (optional if you want to enable this)

And then it adds the keybindings found in the `keymaps` folder. They are divided into a core part in `spaceatom.cson` and then language specific parts.
