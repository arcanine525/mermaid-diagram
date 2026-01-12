import {
    GitBranch,
    MessageSquare,
    Boxes,
    CircleDot,
    Database,
    BarChart3
} from 'lucide-react';

const templateIcons = {
    flowchart: GitBranch,
    sequence: MessageSquare,
    class: Boxes,
    state: CircleDot,
    er: Database,
    gantt: BarChart3
};

/**
 * Template bar component with diagram type buttons
 */
function TemplateBar({ templates, activeTemplate, onSelectTemplate }) {
    return (
        <div className="template-bar">
            {templates.map((template) => {
                const Icon = templateIcons[template.id] || GitBranch;
                const isActive = activeTemplate === template.id;

                return (
                    <button
                        key={template.id}
                        className={`template-btn ${isActive ? 'active' : ''}`}
                        onClick={() => onSelectTemplate(template.id)}
                        title={template.name}
                    >
                        <Icon size={16} />
                        <span>{template.name}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default TemplateBar;
