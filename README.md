# Markdown Reader

## About

A Javascript Markdown reader produced using:

* [Bootstrap 4](https://getbootstrap.com/)
* [Font Awesome](https://fontawesome.com/)
* [Showdown JS](https://github.com/showdownjs/showdown)
  - Used for converting the markdown to html

## Usage

Because I'm very lazy, you can run the application by simply running the `run.sh` script at the project root.

```bash
bash run.sh
```

This will automatically build the `json` that defines the structure of the project, `create_structure.py`.

## Notes on the use of markdown

### Creating links

To navigate between the pages, you'll need to call Javascript. Because the markdown reader will render it as `<a href="THE LINK HERE"></a>`, we can actually pass it the javascript needed to render pages. I would like to make this significantly more inteligent later on. But for now, you can do this:

```markdown
[I'll take you to the homepage!](javascript:loadMarkdownFromFile('markdown/index.md');)
```

Which will render it like this on the page:

```html
<a href="javascript:loadMarkdownFromFile('markdown/index.md');">I'll take you to the homepage!</a>
```

The link ([I'll take you to the homepage!](javascript:loadMarkdownFromFile('markdown/index.md');)) when clicked will load the index page for the site.

### Documentation

There may be times when you want some documentation on your markdown file. The `create_structure.py` function has the ability to understand a very simple form of documenting a file to include additional information. See the about me page as an example:

```markdown
<!---DOC:About me;A page about me;Sean Lewis-->
# About me
```

Where the format is:

```markdown
<!---DOC:TITLE;DESCRIPTION;AUTHOR-->
```
