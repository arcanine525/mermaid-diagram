// Export utilities for diagram

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Success status
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

/**
 * Download SVG as file
 * @param {SVGElement} svgElement - SVG element to download
 * @param {string} filename - Name of the file
 */
export function downloadSvg(svgElement, filename = 'diagram.svg') {
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
}

/**
 * Download diagram as PNG
 * @param {SVGElement} svgElement - SVG element to convert
 * @param {string} filename - Name of the file
 * @param {number} scale - Scale factor for resolution
 */
export function downloadPng(svgElement, filename = 'diagram.png', scale = 2) {
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        // White background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
            const pngUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = filename;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(pngUrl);
        }, 'image/png');

        URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;
}

/**
 * Get SVG element from container
 * @param {HTMLElement} container - Container with SVG
 * @returns {SVGElement|null}
 */
export function getSvgFromContainer(container) {
    if (!container) return null;
    return container.querySelector('svg');
}
