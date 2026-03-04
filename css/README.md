# CSS Layer

The design language expressed as pure CSS. Framework-agnostic. Import what you need.

**Complete consumer guide**: See [AI-GUIDE.md](AI-GUIDE.md) — import strategy, HTML setup, design decisions, custom properties, classes, data attributes, font files, migration guide, and accessibility checklist.

## Quick Start

```css
/* Reading surface (teachings, reader, any sacred content) */
@import './css/reading.css';

/* Non-reading surface (dashboard, admin, platform) */
@import './css/index.css';

/* Operational surfaces (platform ops, deploy dashboards) */
@import './css/index.css';
@import './css/patterns/operations.css';
```

Set `data-org` and `data-theme` on `<html>`. All CSS responds to these attributes.

```html
<html data-org="srf" data-theme="light" lang="en">
```
