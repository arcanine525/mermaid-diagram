// Syntax highlighting for Mermaid code
// Tokenizes and highlights keywords, strings, arrows, etc.

const TOKEN_TYPES = {
    KEYWORD: 'keyword',
    DIRECTIVE: 'directive',
    ARROW: 'arrow',
    STRING: 'string',
    COMMENT: 'comment',
    BRACKET: 'bracket',
    LABEL: 'label',
    STYLE: 'style',
    NUMBER: 'number',
    DEFAULT: 'default'
};

// Mermaid keywords
const KEYWORDS = [
    'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
    'stateDiagram-v2', 'erDiagram', 'gantt', 'pie', 'mindmap', 'timeline',
    'gitGraph', 'journey', 'quadrantChart', 'xychart-beta',
    'subgraph', 'end', 'direction', 'TB', 'TD', 'BT', 'RL', 'LR',
    'participant', 'actor', 'class', 'state', 'note', 'loop', 'alt', 'else',
    'opt', 'par', 'critical', 'break', 'rect', 'activate', 'deactivate',
    'autonumber', 'title', 'section', 'dateFormat', 'excludes', 'includes',
    'done', 'active', 'crit', 'milestone', 'after',
    'PK', 'FK', 'UK'
];

// Style keywords
const STYLE_KEYWORDS = [
    'style', 'classDef', 'linkStyle', 'fill', 'stroke', 'color',
    'stroke-width', 'font-size', 'font-family'
];

/**
 * Tokenize a line of Mermaid code
 * @param {string} line - Line to tokenize
 * @returns {Array<{type: string, value: string}>}
 */
export function tokenizeLine(line) {
    const tokens = [];
    let remaining = line;
    let pos = 0;

    while (remaining.length > 0) {
        let matched = false;

        // Comments (%%...)
        const commentMatch = remaining.match(/^%%.*$/);
        if (commentMatch) {
            tokens.push({ type: TOKEN_TYPES.COMMENT, value: commentMatch[0] });
            break;
        }

        // Strings in quotes
        const stringMatch = remaining.match(/^"[^"]*"|^'[^']*'/);
        if (stringMatch) {
            tokens.push({ type: TOKEN_TYPES.STRING, value: stringMatch[0] });
            remaining = remaining.slice(stringMatch[0].length);
            matched = true;
            continue;
        }

        // Arrows
        const arrowMatch = remaining.match(/^(-->|->|==>|=>|-.->|-.-|--o|--x|<-->|<->|o--|x--|--\||--\)|\(--)(\|[^|]*\|)?/);
        if (arrowMatch) {
            tokens.push({ type: TOKEN_TYPES.ARROW, value: arrowMatch[0] });
            remaining = remaining.slice(arrowMatch[0].length);
            matched = true;
            continue;
        }

        // Sequence diagram arrows
        const seqArrowMatch = remaining.match(/^(->>|-->>|-)?>|^(--)?>>|^-[x)]|^--[x)]/);
        if (seqArrowMatch) {
            tokens.push({ type: TOKEN_TYPES.ARROW, value: seqArrowMatch[0] });
            remaining = remaining.slice(seqArrowMatch[0].length);
            matched = true;
            continue;
        }

        // Brackets with content
        const bracketMatch = remaining.match(/^(\[[^\]]*\]|\([^)]*\)|\{[^}]*\}|\(\([^)]*\)\)|\[\[[^\]]*\]\])/);
        if (bracketMatch) {
            tokens.push({ type: TOKEN_TYPES.BRACKET, value: bracketMatch[0] });
            remaining = remaining.slice(bracketMatch[0].length);
            matched = true;
            continue;
        }

        // Keywords
        const wordMatch = remaining.match(/^[a-zA-Z_][a-zA-Z0-9_-]*/);
        if (wordMatch) {
            const word = wordMatch[0];
            let type = TOKEN_TYPES.DEFAULT;

            if (KEYWORDS.includes(word)) {
                type = TOKEN_TYPES.KEYWORD;
            } else if (STYLE_KEYWORDS.includes(word)) {
                type = TOKEN_TYPES.STYLE;
            }

            tokens.push({ type, value: word });
            remaining = remaining.slice(word.length);
            matched = true;
            continue;
        }

        // Numbers
        const numberMatch = remaining.match(/^[0-9]+(\.[0-9]+)?/);
        if (numberMatch) {
            tokens.push({ type: TOKEN_TYPES.NUMBER, value: numberMatch[0] });
            remaining = remaining.slice(numberMatch[0].length);
            matched = true;
            continue;
        }

        // Directives (:::)
        const directiveMatch = remaining.match(/^:::[a-zA-Z0-9_-]+/);
        if (directiveMatch) {
            tokens.push({ type: TOKEN_TYPES.DIRECTIVE, value: directiveMatch[0] });
            remaining = remaining.slice(directiveMatch[0].length);
            matched = true;
            continue;
        }

        // Colon labels
        if (remaining[0] === ':') {
            const labelMatch = remaining.match(/^:[^;\n]*/);
            if (labelMatch) {
                tokens.push({ type: TOKEN_TYPES.LABEL, value: labelMatch[0] });
                remaining = remaining.slice(labelMatch[0].length);
                matched = true;
                continue;
            }
        }

        // Default: single character
        if (!matched) {
            tokens.push({ type: TOKEN_TYPES.DEFAULT, value: remaining[0] });
            remaining = remaining.slice(1);
        }
    }

    return tokens;
}

/**
 * Highlight a line of Mermaid code to HTML
 * @param {string} line - Line to highlight
 * @returns {string} HTML with syntax highlighting
 */
export function highlightLine(line) {
    const tokens = tokenizeLine(line);

    return tokens.map(token => {
        const escapedValue = escapeHtml(token.value);
        if (token.type === TOKEN_TYPES.DEFAULT) {
            return escapedValue;
        }
        return `<span class="syntax-${token.type}">${escapedValue}</span>`;
    }).join('');
}

/**
 * Escape HTML special characters
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Highlight full Mermaid code
 * @param {string} code - Full code to highlight
 * @returns {string} HTML with syntax highlighting
 */
export function highlightCode(code) {
    return code.split('\n').map(highlightLine).join('\n');
}

export { TOKEN_TYPES };
