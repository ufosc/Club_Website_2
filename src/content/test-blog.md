---
slug: "/test"
date: "2024-09-19"
title: "My Test Post"
author: ["Michail Zeipekki"]
featuredImage: ../images/blog/2024-01-16-spring-casual-coding.jpeg
subtitle: This is my subtitle
---

This is my first post on my new fake blog! How exciting!

I'm sure I'll write a lot more interesting things in the future.

> A salted duck egg is a Chinese preserved food product made by soaking duck
> eggs in brine, or packing each egg in damp, salted charcoal. In Asian
> supermarkets, these eggs are sometimes sold covered in a thick layer of salted
> charcoal paste. The eggs may also be sold with the salted paste removed,
> wrapped in plastic, and vacuum packed. From the salt curing process, the
> salted duck eggs have a briny aroma, a gelatin-like egg white and a
> firm-textured, round yolk that is bright orange-red in color.

You can also write code blocks here!

```tsx
import '../global.css'
import './BlogPostTemplate.css'

import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ArticleCard from '../components/ArticleCard/ArticleCard'

interface ArticleBodyPrompts {
  data: any;
  children?: any;
}

// hello world
const ArticleBody: React.FC<ArticleBodyPrompts> = ({ data, children }) => {
  const { frontmatter } = data.markdownRemark
  let img = getImage(frontmatter.featuredImage?.childImageSharp?.gatsbyImageData)
  return (
    <div className="article-layout">
      <div className="article-layout__matter">
        <div className="article-layout__matter__meta">
          <h3 className="date">{frontmatter.date}</h3>
          <h2>{frontmatter.title}</h2>
          <h3 className="subtitle">{frontmatter.subtitle}</h3>
          <h3 className="author">
            {
              frontmatter.author.map((author: string, i: number) => {
                if (i == frontmatter.author.length - 1) {
                  return author
                }
                return author + ", "
              })
            }
          </h3>
        </div>
        <GatsbyImage image={img} />
        <div id="inner-html" dangerouslySetInnerHTML={{
          __html: data.markdownRemark.html
        }} />
      </div>
      { children }
      <div className="article-layout__recc">
        {
          (data.previous !== null || data.next !== null) ?
            (<h3> Read More </h3>) : null
        }
        <div className="article-layout__recc__articles">
          {
            (data.previous !== null) ? (
              <ArticleCard data={data.previous.frontmatter} />
            ) : null
          }
          {
            (data.next !== null) ? (
              <ArticleCard data={data.next.frontmatter} />
            ) : null
          }
        </div>
      </div>
    </div>
  )
}
```

| Number | Title                                    | Year |
| :----- | :--------------------------------------- | ---: |
| 1      | Harry Potter and the Philosopher’s Stone | 2001 |
| 2      | Harry Potter and the Chamber of Secrets  | 2002 |
| 3      | Harry Potter and the Prisoner of Azkaban | 2004 |

This is a paragraph.

    This is a paragraph.

# Header 1

## Header 2

    Header 1
    ========

    Header 2
    --------

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6

    # Header 1 #
    ## Header 2 ##
    ### Header 3 ###
    #### Header 4 ####
    ##### Header 5 #####
    ###### Header 6 ######

> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     Markdown.generate();

    > ## This is a header.
    > 1. This is the first list item.
    > 2. This is the second list item.
    >
    > Here's some example code:
    >
    >     Markdown.generate();

- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue

```markdown
- Red
- Green
- Blue

* Red
* Green
* Blue

- Red
- Green
- Blue
```

- `code goes` here in this line
- **bold** goes here

```markdown
- `code goes` here in this line
- **bold** goes here
```

1. Buy flour and salt
1. Mix together with water
1. Bake

```markdown
1. Buy flour and salt
1. Mix together with water
1. Bake
```

1. `code goes` here in this line
1. **bold** goes here

```markdown
1. `code goes` here in this line
1. **bold** goes here
```

Paragraph:

    Code

<!-- -->

    Paragraph:

        Code

---
---

    * * *

    ***

    *****

    - - -

    ---------------------------------------

This is [an example](http://example.com "Example") link.

[This link](http://example.com) has no title attr.

This is [an example][id] reference-style link.

[id]: http://example.com "Optional Title"

    This is [an example](http://example.com "Example") link.

    [This link](http://example.com) has no title attr.

    This is [an example] [id] reference-style link.

    [id]: http://example.com "Optional Title"

*single asterisks*

_single underscores_

**double asterisks**

***double underscores***

    *single asterisks*

    _single underscores_

    **double asterisks**

    __double underscores__

This paragraph has some `code` in it.

    This paragraph has some `code` in it.
