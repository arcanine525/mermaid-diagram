import { useEffect, useCallback } from 'react';

/**
 * Keyboard shortcuts configuration
 */
const SHORTCUTS = {
    COPY: { key: 'c', ctrl: true, shift: false },
    SAVE: { key: 's', ctrl: true, shift: false },
    FULLSCREEN: { key: 'f', ctrl: true, shift: true },
    ZOOM_IN: { key: '=', ctrl: true, shift: false },
    ZOOM_OUT: { key: '-', ctrl: true, shift: false },
    ZOOM_RESET: { key: '0', ctrl: true, shift: false },
    THEME_TOGGLE: { key: 't', ctrl: true, shift: true },
    ESCAPE: { key: 'Escape', ctrl: false, shift: false }
};

/**
 * Custom hook for keyboard shortcuts
 * @param {Object} handlers - Object mapping action names to handler functions
 */
export function useKeyboardShortcuts(handlers) {
    const handleKeyDown = useCallback((e) => {
        const { key, ctrlKey, metaKey, shiftKey } = e;
        const ctrl = ctrlKey || metaKey; // Support Cmd on Mac

        // Check each shortcut
        for (const [action, shortcut] of Object.entries(SHORTCUTS)) {
            const handler = handlers[action];
            if (!handler) continue;

            const keyMatches = key.toLowerCase() === shortcut.key.toLowerCase();
            const ctrlMatches = shortcut.ctrl === ctrl;
            const shiftMatches = shortcut.shift === shiftKey;

            if (keyMatches && ctrlMatches && shiftMatches) {
                e.preventDefault();
                handler();
                return;
            }
        }
    }, [handlers]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}

/**
 * Get formatted shortcut text for display
 * @param {string} action - Action name
 * @returns {string} Formatted shortcut text
 */
export function getShortcutText(action) {
    const shortcut = SHORTCUTS[action];
    if (!shortcut) return '';

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const parts = [];

    if (shortcut.ctrl) {
        parts.push(isMac ? '⌘' : 'Ctrl');
    }
    if (shortcut.shift) {
        parts.push(isMac ? '⇧' : 'Shift');
    }

    // Format the key
    let keyDisplay = shortcut.key.toUpperCase();
    if (shortcut.key === '=') keyDisplay = '+';
    if (shortcut.key === '-') keyDisplay = '-';
    if (shortcut.key === 'Escape') keyDisplay = 'Esc';

    parts.push(keyDisplay);

    return parts.join(isMac ? '' : '+');
}

export { SHORTCUTS };
export default useKeyboardShortcuts;
