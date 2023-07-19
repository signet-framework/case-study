# Folders and `_meta.json`

## Display Names and Ordering

Each folder can have its own `_meta.json`. Use this file to set what name is displayed in the left nav menu for each file and the order in which the names appear.

*Example:*

```json
{
  "folders": "Folders and _meta.json",
  "embed_image": "Embed an Image",
  "mdx_with_react": "MDX with React"
}
```

## Folders as Pages

A folder can also be a clickable page in its own right; just add a `.md` file with the same name as the folder *in the same directory* that the folder is in.

*See* the "Quickstart" page for an example of this setup.
