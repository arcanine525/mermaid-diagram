// Diagram templates with sample Mermaid code

export const templates = {
    flowchart: {
        name: 'Flowchart',
        code: `flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix the issue]
    E --> B
    C --> F[Deploy]
    F --> G[End]

    style A fill:#06b6d4,stroke:#0891b2,color:#fff
    style G fill:#22c55e,stroke:#16a34a,color:#fff
    style B fill:#8b5cf6,stroke:#7c3aed,color:#fff`
    },

    sequence: {
        name: 'Sequence Diagram',
        code: `sequenceDiagram
    autonumber
    participant U as User
    participant C as Client
    participant S as Server
    participant DB as Database

    U->>C: Click Login
    C->>S: POST /api/login
    S->>DB: Query user
    DB-->>S: User data
    S-->>C: JWT Token
    C-->>U: Show Dashboard

    Note over U,DB: Authentication Flow`
    },

    class: {
        name: 'Class Diagram',
        code: `classDiagram
    class Animal {
        +String name
        +int age
        +makeSound() void
        +move() void
    }

    class Dog {
        +String breed
        +bark() void
        +fetch() void
    }

    class Cat {
        +String color
        +meow() void
        +scratch() void
    }

    class Bird {
        +float wingspan
        +fly() void
        +sing() void
    }

    Animal <|-- Dog
    Animal <|-- Cat
    Animal <|-- Bird`
    },

    state: {
        name: 'State Diagram',
        code: `stateDiagram-v2
    [*] --> Idle

    Idle --> Processing: Submit
    Processing --> Success: Valid
    Processing --> Error: Invalid

    Success --> Idle: Reset
    Error --> Idle: Retry

    Success --> [*]: Complete

    state Processing {
        [*] --> Validating
        Validating --> Saving
        Saving --> [*]
    }`
    },

    er: {
        name: 'ER Diagram',
        code: `erDiagram
    USER ||--o{ ORDER : places
    USER {
        int id PK
        string name
        string email
        date created_at
    }

    ORDER ||--|{ ORDER_ITEM : contains
    ORDER {
        int id PK
        int user_id FK
        date order_date
        string status
    }

    ORDER_ITEM }|--|| PRODUCT : includes
    ORDER_ITEM {
        int id PK
        int order_id FK
        int product_id FK
        int quantity
    }

    PRODUCT {
        int id PK
        string name
        float price
        int stock
    }`
    },

    gantt: {
        name: 'Gantt Chart',
        code: `gantt
    title Project Development Timeline
    dateFormat YYYY-MM-DD

    section Planning
    Requirements     :done, req, 2024-01-01, 7d
    Design          :done, des, after req, 10d

    section Development
    Frontend        :active, fe, 2024-01-18, 20d
    Backend         :be, 2024-01-20, 18d
    API Integration :api, after fe, 10d

    section Testing
    Unit Tests      :ut, after be, 7d
    E2E Tests       :e2e, after api, 5d

    section Deployment
    Staging         :stage, after e2e, 3d
    Production      :prod, after stage, 2d`
    }
};

export const templateList = Object.entries(templates).map(([key, value]) => ({
    id: key,
    name: value.name,
    code: value.code
}));

export const defaultCode = templates.flowchart.code;
