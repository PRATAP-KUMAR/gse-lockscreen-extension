import St from 'gi://St';
import Gio from 'gi://Gio';
import Clutter from 'gi://Clutter';

import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

let inputText, getInput;

//
const secondaryColor = (lockscreenExt, n) => {
    const item = new PopupMenu.PopupBaseMenuItem();

    inputText = new St.Entry({
        hint_text: 'Please enter secondary color Ex: #454545',
        text: lockscreenExt._settings.get_string(`secondary-color-${n}`),
        track_hover: true,
        can_focus: true,
    });

    inputText.clutter_text.connect('activate', actor => {
        getInput = actor.get_text();
        lockscreenExt._settings.set_string(`secondary-color-${n}`, getInput);
    });

    item.connect('notify::active', () => inputText.grab_key_focus());
    item.add_child(new St.Label({text: 'Secondary Color', y_align: Clutter.ActorAlign.CENTER}));
    item.add_child(inputText);

    return item;
};

//
const useSystemSecondaryColor = (lockscreenExt, n) => {
    const item = new PopupMenu.PopupBaseMenuItem();

    const label = new St.Label({text: 'Use Systems Secondary Color', style_class: 'button', y_align: Clutter.ActorAlign.CENTER});

    item.add_child(label);

    item.connect('notify::active', () => label.grab_key_focus());

    item.connect('activate', () => {
        let systemColor = new Gio.Settings({schema_id: 'org.gnome.desktop.background'}).get_string('secondary-color');
        lockscreenExt._settings.set_string(`secondary-color-${n}`, systemColor);
        inputText.text = systemColor;
    });

    return item;
};

export {secondaryColor, useSystemSecondaryColor};