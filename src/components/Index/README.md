# Index
The website index page is considerably larger than all other pages. Since the site's design already subdivides the page into independent sections, we found that separating each section into its own React component makes the page easier to digest and maintain.

> [!IMPORTANT]
> Please note that all sections inherit their CSS styling from the `src/pages/index.css` and `src/global.css` files. This may not be immediately obvious, since none of the section components directly import any CSS (i.e. the CSS import happens in `src/pages/index.tsx`.
