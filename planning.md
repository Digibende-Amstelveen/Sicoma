# Sicoma
A simple, lightweight, extensible CMS.

# Requirements
- Page management
    - Page creation
    - Page visibility (public/unlisted/private)
        - *Public*: Visible in menu
        - *Unlisted*: Not visible in menu, but doesn't require authentication to visit
        - *Private*: Only for internal use
- API (headless CMS)
- Dashboard (headful CMS)
- Plugins via NPM

# Database schemes

## Page

```json
{
    "uri": "/hallo/wereld"|RandomURI,
    "visibility": "public"|"private",
    "meta": {
        "title": "Hallo, wereld",
        "description": null|"Dit is de homepagina van deze site.",
        "hero": "https://cdn.example.com/hallo-wereld.png"
    },
    "body": "
    # Hallo, wereld
    Hoe gaat het?
    "
}
```

## MenuItem

```json
{
    "id": "1",
    "link?": "/hallo/wereld"|null,
    "caption": "Hallo, wereld",
    "children": [
        MenuItem,
        MenuItem,
        MenuItem
    ]
}
```

## Config

```json
{
    "mainMenu?": MenuItem|null
}
```