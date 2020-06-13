/** @jsx jsx */
import { jsx } from "@emotion/core";
import * as React from "react";
import { useTranslation, Box, H1, Label, TextArea, Markdown } from "@cabezonidas/shop-ui";

const enUs = {
  title: "Sandpit",
  label: "Markdown",
  preview: "Preview",
};

const esAr = {
  title: "Arenero",
  label: "Fuente",
  preview: "Vista preliminar",
};

export const Sandpit: React.FC = () => {
  const { t, i18n } = useTranslation();
  i18n.addResourceBundle("en-US", "translation", { sandpit: enUs }, true, true);
  i18n.addResourceBundle("es-AR", "translation", { sandpit: esAr }, true, true);

  const [value, setValue] = React.useState(placeholder);

  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const bindScroll: any = (e: React.UIEvent<HTMLTextAreaElement>) => {
      const scrollVal = e.currentTarget.scrollTop / e.currentTarget.scrollHeight;
      if (previewRef.current) {
        previewRef.current.scrollTo({ top: scrollVal * previewRef.current.scrollHeight });
      }
    };
    const textRefCurrent = textRef.current;
    textRefCurrent?.addEventListener("scroll", bindScroll);
    return () => textRefCurrent?.addEventListener("scroll", bindScroll);
  }, [textRef, previewRef]);

  return (
    <Box p="4" height="100%">
      <Box display="grid" gridTemplateRows="auto 1fr" height="100%">
        <H1>{t("sandpit.title")}</H1>
        <Box
          display="grid"
          gridTemplateColumns="1fr 1fr"
          gridGap="2"
          height="100%"
          overflow="hidden"
        >
          <Box display="grid" gridTemplateRows="auto 1fr">
            <Label htmlFor="markdown">{t("sandpit.label")}</Label>
            <TextArea
              ref={textRef}
              id="markdown"
              height="100% !important"
              maxLength={9999}
              onChange={e => setValue(e.target.value)}
              value={value}
            />
          </Box>
          <Box display="grid" gridTemplateRows="auto 1fr" overflow="hidden">
            <Box>{t("sandpit.preview")}</Box>
            <Markdown ref={previewRef} overflow="auto" body={value} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sandpit;

const placeholder = `---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

Inline \`code\`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

\`\`\`
Sample text here...
\`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

> Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
>
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

- 19^th^
- H~2~O


### [\\<ins>](https://github.com/markdown-it/markdown-it-ins)

++Inserted text++


### [\\<mark>](https://github.com/markdown-it/markdown-it-mark)

==Marked text==


### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language

# Videos
@[youtube](yJMXjXvUjEU)
\`\`\`
@[youtube](yJMXjXvUjEU)
@[youtube](http://www.youtube.com/embed/yJMXjXvUjEU)
@[youtube](https://www.youtube.com/watch?v=yJMXjXvUjEU&feature=feedrec_centerforopenscience_index)
@[youtube](http://www.youtube.com/user/IngridMichaelsonVEVO#p/a/u/1/QdK8U-VIH_o)
@[youtube](http://www.youtube.com/v/yJMXjXvUjEU?fs=1&amp;hl=en_US&amp;rel=0)
@[youtube](http://www.youtube.com/watch?v=yJMXjXvUjEU#t=0m10s)
@[youtube](http://www.youtube.com/embed/yJMXjXvUjEU?rel=0)
@[youtube](http://www.youtube.com/watch?v=yJMXjXvUjEU)
@[youtube](http://youtu.be/dQw4w9WgXcQ)
@[vimeo](19706846)
@[vimeo](https://vimeo.com/19706846)
@[vimeo](https://player.vimeo.com/video/19706846)
@[vine](etVpwB7uHlw)
@[vine](https://vine.co/v/etVpwB7uHlw/embed/simple)
@[vine](https://vine.co/v/etVpwB7uHlw/embed/postcard?audio=1)
@[vine](<iframe src="https://vine.co/v/etVpwB7uHlw/embed/simple?audio=1" width="600" height="600" frameborder="0"></iframe><script src="https://platform.vine.co/static/scripts/embed.js"></script>)
@[prezi](1kkxdtlp4241)
@[prezi](https://prezi.com/1kkxdtlp4241/valentines-day/)
@[prezi](https://prezi.com/e3g83t83nw03/destination-prezi-template/)
@[prezi](https://prezi.com/prg6t46qgzik/anatomy-of-a-social-powered-customer-service-win/)
@[osf](kuvg9)
@[osf](https://mfr.osf.io/render?url=https://osf.io/kuvg9/?action=download)
\`\`\`
`;
