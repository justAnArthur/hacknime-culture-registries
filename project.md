Application solves problems

# Problems

- Validation data in tables
  - Required/Optional - Types
  - _Public/Private_
- Relations between tables
- Versioning
  - Storing every changes that was made. And by who.
  - Separete entitties for public.
- Security
  - Roles and permissions.
- Asking citizens for required data. (Like in google forms)
  - Send (on public) form to ciziens and on submit - make status in database like REQUSTED_.

# Requirements

- Security.
- Cheap.
- Easy to migrate.

# Main processes

- CRUD register (table) with column types, required/optional, 
  public/private, unique, relations.
- Filling and creating new row in register. With displaying versioning
  changes. and public versions.
    - Show and "deleted" rows.
    - Publish to web with date range.
- Creating and managing roles and permissions. 
- Export import data from .xls, .xml, .csv.
- Publish to web with date range.
- Aprove/Validation changes in register.
---
- analyze difference between two versions of register.


# Server architecture

```mermaid
flowchart TD
    backendWithTables
    cmsForAddingRowsAndChangingTablesTypes

    filesApi
    businessAnalyticsApi

    cmsForArticles

    database_main
    database_streamed

    cmsForAddingRowsAndChangingTablesTypes --> backendWithTables
    backendWithTables --> database_main
    cmsInTheWeb --> filesApi
    database --- database_streamed
    businessAnalyticsApi --> database_streamed
    cmsForArticles --> backendWithTables

    subgraph "cmsInTheWeb"
        cmsForAddingRowsAndChangingTablesTypes
        cmsForArticles
    end

    subgraph "database"
        database_main
        database_streamed
    end
```

```mermaid
erDiagram
  history {
    date created_at
    string[] attributes "that was changed"
    any[] values "new values"
    any[] old_values "old values"
  }

  record {
    string[] attributes
    any[] values
  }

  record ||--|{ history :has

  record ||--o{ published: has

  record }|--|{ type: "information about (types/private/) of attributes"

  published {
    date published_at
    string[] attributes
    any[] values
  }


```

# Database architecture

```mermaid

```

# Entities

Enum `Roles`: 
- Admin
- manager  

`User`:
> attributes:
- name
- email
- password
- role
`Register` 
> attributes:
  - name
  - law
  - shema
  - data 
> methods:
- create
- release
- import data
- export data

`Schema` 
attributes:
- name
- Map<"Property": "Value"> 

`Property`:
- name
- type
- validatio schema
- is unique
- is required
- is public
- is indintyfiei

`RegisterRelease`:
> attributes:
- register
> methods:
- publish
- sign
- 