---
layout: default
aside:
    header: "Some Heckin' Real Talk"
    content: "A Pretty Heckin' Website was one big document.  We'll use to Jekyll to serve the same content, but in digestible pieces."
---

## Foreword

A Pretty Jekyllin' website is a proving ground for some basic [Jekyll](https://jekyllrb.com) framework customization for use with [Github Pages](https://docs.github.com/en/pages).  While the basic templates encourage usage for websites like blogs, I though it would be an interesting to build a template that would work like a book or manual.  

See the original [A Pretty Heckin' Website](https://philotfarnsworth.github.io/APrettyHeckinWebsite/)

<div>
    <p>
        We've broken out of the intended static site design with A Pretty Jekyllin' Website, using javascript to serve our files in a central view screen.  Since Jekyllin' serves unstyled files from our urls that we fetch from, we forgo building an SPA history mimic function and instead track this information in our navigation area in the header above.  While I've added a build utility in Jekyll, A Pretty Jekyllin' Website still runs the same lightweight front end, now enhanced by allowing users to load content in bite sized chunks.  f they find the content boring, they can quit reading without having loaded the entirety of this website based screed.  While there's still some warts from preserving our original flex layout from A Pretty Heckin' Website, the rest of code could be easily adapted and applied to any Jekyll based website.
    </p>

    {% include aside.html %}
</div>

Our javascript has been augmented from the original implementation, building our navigation and implementing some small animations to help make our transition while toggling our navigation smoother.  Due to some limitations in Jekyll and the build process outlined in the Github Pages Jekyll integration, this code is a little messier than would be ideal.  I hope to address this issue in the final form of the 'A Pretty (blank)in' Website', which will be built using the Hugo static site framework.  This page will be updated when that page goes live.

To begin, click the next button on the bottom left of the page.

<p class="disclaimer">
    Disclaimer: This is not an authoritative source on HyperText Markup Language,
    <abbr>HTML</abbr>, Cascading Style Sheets, <abbr>CSS</abbr> or Javascript, <abbr>JS</abbr>.
    I suggest <a href="https://developer.mozilla.org/">Mozilla Web Docs</a> for web technology documentation.
    Please excuse any intentional attempts at comedy.
</p>
