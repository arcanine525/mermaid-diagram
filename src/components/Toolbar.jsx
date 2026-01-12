import { useState } from 'react';
import {
    Copy,
    Download,
    Image,
    ZoomIn,
    ZoomOut,
    RotateCcw,
    Check
} from 'lucide-react';

/**
 * Toolbar component with export and zoom controls
 */
function Toolbar({
    onCopy,
    onDownloadSvg,
    onDownloadPng,
    zoom,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    disabled
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const success = await onCopy();
        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="toolbar">
            {/* Zoom Controls */}
            <div className="zoom-controls">
                <button
                    className="zoom-btn"
                    onClick={onZoomOut}
                    disabled={zoom <= 25}
                    title="Zoom Out"
                >
                    <ZoomOut size={16} />
                </button>
                <span className="zoom-level">{zoom}%</span>
                <button
                    className="zoom-btn"
                    onClick={onZoomIn}
                    disabled={zoom >= 200}
                    title="Zoom In"
                >
                    <ZoomIn size={16} />
                </button>
                <button
                    className="zoom-btn"
                    onClick={onZoomReset}
                    title="Reset Zoom"
                >
                    <RotateCcw size={16} />
                </button>
            </div>

            {/* Export Actions */}
            <button
                className="toolbar-btn"
                onClick={handleCopy}
                disabled={disabled}
                title="Copy Code"
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
                className="toolbar-btn"
                onClick={onDownloadSvg}
                disabled={disabled}
                title="Download SVG"
            >
                <Download size={18} />
                <span>SVG</span>
            </button>

            <button
                className="toolbar-btn primary"
                onClick={onDownloadPng}
                disabled={disabled}
                title="Download PNG"
            >
                <Image size={18} />
                <span>PNG</span>
            </button>
        </div>
    );
}

export default Toolbar;
