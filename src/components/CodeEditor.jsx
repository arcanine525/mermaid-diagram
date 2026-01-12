import { useMemo, useRef, useEffect, useCallback } from 'react';
import { Code2 } from 'lucide-react';
import { highlightCode } from '../utils/syntaxHighlight';

/**
 * Code Editor component with line numbers and syntax highlighting
 */
function CodeEditor({ code, onChange }) {
    const textareaRef = useRef(null);
    const highlightRef = useRef(null);
    const lineNumbersRef = useRef(null);

    // Calculate line numbers
    const lineNumbers = useMemo(() => {
        const lines = code.split('\n').length;
        return Array.from({ length: lines }, (_, i) => i + 1);
    }, [code]);

    // Generate highlighted HTML
    const highlightedCode = useMemo(() => {
        return highlightCode(code);
    }, [code]);

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const handleKeyDown = (e) => {
        // Handle Tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue = code.substring(0, start) + '  ' + code.substring(end);
            onChange(newValue);

            // Set cursor position after tab
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 2;
            }, 0);
        }
    };

    // Sync scrolling between textarea, highlight, and line numbers
    const handleScroll = useCallback((e) => {
        const scrollTop = e.target.scrollTop;
        const scrollLeft = e.target.scrollLeft;

        if (highlightRef.current) {
            highlightRef.current.scrollTop = scrollTop;
            highlightRef.current.scrollLeft = scrollLeft;
        }
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = scrollTop;
        }
    }, []);

    return (
        <div className="editor-panel">
            <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code2 size={16} />
                    <span>Mermaid Code</span>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {code.split('\n').length} lines
                </span>
            </div>
            <div className="editor-container">
                <div className="line-numbers" ref={lineNumbersRef}>
                    {lineNumbers.map(num => (
                        <div key={num}>{num}</div>
                    ))}
                </div>

                {/* Syntax highlighted layer (background) */}
                <pre
                    ref={highlightRef}
                    className="code-highlight"
                    aria-hidden="true"
                    dangerouslySetInnerHTML={{ __html: highlightedCode + '\n' }}
                />

                {/* Editable textarea (foreground, transparent) */}
                <textarea
                    ref={textareaRef}
                    className="code-textarea"
                    value={code}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    placeholder="Enter your Mermaid code here..."
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    aria-label="Mermaid code editor"
                />
            </div>
        </div>
    );
}

export default CodeEditor;
