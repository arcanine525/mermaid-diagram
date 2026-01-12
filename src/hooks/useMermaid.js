import { useState, useEffect, useCallback, useRef } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid with dark theme
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    fontFamily: 'Space Grotesk, sans-serif',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    },
    sequence: {
        useMaxWidth: true,
        wrap: true
    },
    gantt: {
        useMaxWidth: true
    }
});

/**
 * Custom hook for Mermaid diagram rendering
 * @param {string} code - Mermaid code to render
 * @param {number} debounceMs - Debounce delay in milliseconds
 * @returns {Object} - { svg, error, isRendering, containerRef }
 */
export function useMermaid(code, debounceMs = 300) {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    const [isRendering, setIsRendering] = useState(false);
    const containerRef = useRef(null);
    const timeoutRef = useRef(null);
    const renderIdRef = useRef(0);

    const renderDiagram = useCallback(async (mermaidCode) => {
        if (!mermaidCode.trim()) {
            setSvg('');
            setError(null);
            return;
        }

        setIsRendering(true);
        const currentRenderId = ++renderIdRef.current;

        try {
            // Generate unique ID for the diagram
            const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            // Parse and render
            const { svg: renderedSvg } = await mermaid.render(id, mermaidCode);

            // Only update if this is the latest render
            if (currentRenderId === renderIdRef.current) {
                setSvg(renderedSvg);
                setError(null);
            }
        } catch (err) {
            if (currentRenderId === renderIdRef.current) {
                setError(err.message || 'Invalid Mermaid syntax');
                setSvg('');
            }
        } finally {
            if (currentRenderId === renderIdRef.current) {
                setIsRendering(false);
            }
        }
    }, []);

    useEffect(() => {
        // Clear previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Debounce the render
        timeoutRef.current = setTimeout(() => {
            renderDiagram(code);
        }, debounceMs);

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [code, debounceMs, renderDiagram]);

    return {
        svg,
        error,
        isRendering,
        containerRef
    };
}

export default useMermaid;
