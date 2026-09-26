# Docs

Written using Vitepress

## Structure

## Rules

### Description around diagram

Each diagram inside markdown codeblock has to have a comment below of it, for npm package `vitepress-plugin-diagrams` to work with cache. If not provide, the cache will flood the storage.

Every change in the diagram will be detected to clean up the old diagram, and create new, in `./src/public/diagrams/`

With the format of like `plantuml-vitepress-plugin-digrams-use-case-example-b6de774ff81a44366a862d86df5d7ad4.svg`, the suffix is a hash of the diagram content

```markdown
<!-- diagram id="vitepress-plugin-digrams-[diagram type]-[name]" -->
<!-- diagram id="vitepress-plugin-digrams-use-case-example" -->
<!-- diagram id="vitepress-plugin-digrams-class" -->
<!-- No -[name] if we don't have other instance of that same type -->
```
