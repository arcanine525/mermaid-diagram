import { forwardRef } from 'react';
import { Eye, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import ErrorDisplay from './ErrorDisplay';

/**
 * Preview component for rendered diagram
 */
const Preview = forwardRef(function Preview({
    svg,
    error,
    isRendering,
    zoom,
    isFullscreen,
    onToggleFullscreen
}, ref) {
    return (
        <div className={`preview-panel ${isFullscreen ? 'fullscreen' : ''}`} ref={ref}>
            <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Eye size={16} />
                    <span>Preview</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isRendering && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-cyan)' }}>
                            <Loader2 size={14} className="spinning" />
                            <span style={{ fontSize: '0.8rem' }}>Rendering...</span>
                        </div>
                    )}
                    <button
                        className="fullscreen-btn"
                        onClick={onToggleFullscreen}
                        title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen (Ctrl+Shift+F)'}
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                </div>
            </div>
            <div className="preview-container">
                {error ? (
                    <ErrorDisplay message={error} />
                ) : svg ? (
                    <div
                        className="diagram-wrapper"
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                        dangerouslySetInnerHTML={{ __html: svg }}
                    />
                ) : (
                    <div style={{
                        color: 'var(--text-muted)',
                        textAlign: 'center',
                        padding: '40px'
                    }}>
                        <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>No diagram to display</p>
                        <p style={{ fontSize: '0.9rem' }}>Start typing Mermaid code or select a template</p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default Preview;
