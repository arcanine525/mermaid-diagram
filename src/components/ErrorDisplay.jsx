import { AlertCircle } from 'lucide-react';

/**
 * Error display component for syntax errors
 */
function ErrorDisplay({ message }) {
    // Clean up the error message
    const cleanMessage = message
        .replace(/Syntax error in graph/i, 'Syntax error:')
        .replace(/mermaid-\d+-[a-z0-9]+/gi, '')
        .trim();

    return (
        <div className="error-display">
            <AlertCircle size={20} />
            <div className="error-message">
                <strong>Syntax Error</strong>
                <p style={{ marginTop: '4px' }}>{cleanMessage}</p>
            </div>
        </div>
    );
}

export default ErrorDisplay;
