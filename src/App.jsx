import { useState, useRef, useCallback, useEffect } from 'react';
import { Workflow, CheckCircle2, XCircle, Sun, Moon, Keyboard } from 'lucide-react';

// Components
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import TemplateBar from './components/TemplateBar';
import Toolbar from './components/Toolbar';

// Hooks
import useMermaid from './hooks/useMermaid';
import useLocalStorage from './hooks/useLocalStorage';
import useTheme from './hooks/useTheme';
import useKeyboardShortcuts, { getShortcutText } from './hooks/useKeyboardShortcuts';

// Utils
import { templateList, templates, defaultCode } from './utils/templates';
import { copyToClipboard, downloadSvg, downloadPng, getSvgFromContainer } from './utils/export';

function App() {
    // State
    const [code, setCode] = useLocalStorage('mermaid-code', defaultCode);
    const [activeTemplate, setActiveTemplate] = useState('flowchart');
    const [zoom, setZoom] = useState(100);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);

    // Theme
    const { theme, toggleTheme, isDark } = useTheme();

    // Mermaid rendering
    const { svg, error, isRendering } = useMermaid(code, 300);

    // Ref for SVG container
    const previewRef = useRef(null);

    // Template selection handler
    const handleSelectTemplate = useCallback((templateId) => {
        setActiveTemplate(templateId);
        if (templates[templateId]) {
            setCode(templates[templateId].code);
        }
    }, [setCode]);

    // Export handlers
    const handleCopy = useCallback(async () => {
        return await copyToClipboard(code);
    }, [code]);

    const handleDownloadSvg = useCallback(() => {
        const container = document.querySelector('.diagram-wrapper');
        const svgElement = getSvgFromContainer(container);
        if (svgElement) {
            downloadSvg(svgElement, `diagram-${activeTemplate}.svg`);
        }
    }, [activeTemplate]);

    const handleDownloadPng = useCallback(() => {
        const container = document.querySelector('.diagram-wrapper');
        const svgElement = getSvgFromContainer(container);
        if (svgElement) {
            downloadPng(svgElement, `diagram-${activeTemplate}.png`);
        }
    }, [activeTemplate]);

    // Zoom handlers
    const handleZoomIn = useCallback(() => {
        setZoom(prev => Math.min(prev + 25, 200));
    }, []);

    const handleZoomOut = useCallback(() => {
        setZoom(prev => Math.max(prev - 25, 25));
    }, []);

    const handleZoomReset = useCallback(() => {
        setZoom(100);
    }, []);

    // Fullscreen handlers
    const handleToggleFullscreen = useCallback(() => {
        setIsFullscreen(prev => !prev);
    }, []);

    const handleEscape = useCallback(() => {
        if (isFullscreen) {
            setIsFullscreen(false);
        }
        if (showShortcuts) {
            setShowShortcuts(false);
        }
    }, [isFullscreen, showShortcuts]);

    // Keyboard shortcuts
    useKeyboardShortcuts({
        COPY: handleCopy,
        SAVE: () => { }, // Auto-saved to localStorage
        FULLSCREEN: handleToggleFullscreen,
        ZOOM_IN: handleZoomIn,
        ZOOM_OUT: handleZoomOut,
        ZOOM_RESET: handleZoomReset,
        THEME_TOGGLE: toggleTheme,
        ESCAPE: handleEscape
    });

    // Determine status
    const isValid = svg && !error;
    const hasContent = code.trim().length > 0;

    return (
        <div className="app" data-theme={theme}>
            {/* Header */}
            <header className="header">
                <div className="logo">
                    <div className="logo-icon">
                        <Workflow />
                    </div>
                    <span>Mermaid Visualizer</span>
                </div>

                <div className="header-actions">
                    {hasContent && (
                        <div className={`status ${isValid ? 'valid' : 'error'}`}>
                            <span className="status-dot" />
                            {isValid ? (
                                <>
                                    <CheckCircle2 size={14} />
                                    <span>Valid</span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={14} />
                                    <span>Error</span>
                                </>
                            )}
                        </div>
                    )}

                    <button
                        className="icon-btn"
                        onClick={() => setShowShortcuts(true)}
                        title="Keyboard Shortcuts"
                        aria-label="Show keyboard shortcuts"
                    >
                        <Keyboard size={18} />
                    </button>

                    <button
                        className="icon-btn"
                        onClick={toggleTheme}
                        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>
            </header>

            {/* Template Bar */}
            <TemplateBar
                templates={templateList}
                activeTemplate={activeTemplate}
                onSelectTemplate={handleSelectTemplate}
            />

            {/* Main Content */}
            <main className="main-content">
                <CodeEditor
                    code={code}
                    onChange={setCode}
                />
                <Preview
                    ref={previewRef}
                    svg={svg}
                    error={error}
                    isRendering={isRendering}
                    zoom={zoom}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={handleToggleFullscreen}
                />
            </main>

            {/* Toolbar */}
            <Toolbar
                onCopy={handleCopy}
                onDownloadSvg={handleDownloadSvg}
                onDownloadPng={handleDownloadPng}
                zoom={zoom}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onZoomReset={handleZoomReset}
                disabled={!isValid}
            />

            {/* Keyboard Shortcuts Modal */}
            {showShortcuts && (
                <div className="modal-overlay" onClick={() => setShowShortcuts(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2>Keyboard Shortcuts</h2>
                        <div className="shortcuts-list">
                            <div className="shortcut-item">
                                <span>Copy Code</span>
                                <kbd>{getShortcutText('COPY')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Toggle Fullscreen</span>
                                <kbd>{getShortcutText('FULLSCREEN')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Zoom In</span>
                                <kbd>{getShortcutText('ZOOM_IN')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Zoom Out</span>
                                <kbd>{getShortcutText('ZOOM_OUT')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Reset Zoom</span>
                                <kbd>{getShortcutText('ZOOM_RESET')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Toggle Theme</span>
                                <kbd>{getShortcutText('THEME_TOGGLE')}</kbd>
                            </div>
                            <div className="shortcut-item">
                                <span>Exit Fullscreen / Close</span>
                                <kbd>Esc</kbd>
                            </div>
                        </div>
                        <button
                            className="modal-close"
                            onClick={() => setShowShortcuts(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
