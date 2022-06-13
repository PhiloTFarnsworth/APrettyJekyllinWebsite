# A Pretty Jekyllin' Website
## A minimalist Jekyll site on Github Pages

A Pretty Jekyllin' Website is a test run of building a website on Github pages using Jekyll integration to create a more modern interpretation of [A Pretty Heckin' Website](https://philotfarnsworth.github.io/APrettyHeckinWebsite/).  While Jekyll is ideally suited for blog posts, I felt it would be informative to try and see if I could build a 'manual' or 'book' template that leveraged Jekyll's conveniences.  

This project is meant to be more of an intermediate approach to this project and content.  I invite you to see the final iteration, [A Pretty HuGOin' Website](https://github.com/PhiloTFarnsworth/APrettyHuGOinWebsite), which I think refines the static site approach to this specific type of content.

### Features
Github Pages Jekyll integration offers several quality of life features that does improve some aspects of web design.  Templates allow for breaking our original content into several small bite-size pieces of information.  Additionally Jekyll imposes some order onto the structure of the project, which can be welcome to organize your data.  Finally, much of the build is automated with Github Pages after following their Jekyll integration instructions.

### Critique

That being said, there are several difficulties related to using Jekyll that I would be remiss not to mention.  Being a static site generator, it is not necessarily suited for extensive Javascript integration, and while we can serve rendered html to allow for relatively easy fetching of content, all our javascript must be written to load on the first page, which can be tricky for individual page implementations.

Some other difficulties are related to the versioning of Jekyll offered with Github Pages, which sadly lacks some extra features like ordering Jekyll collections, which would've provided some utility in building the site.  This version of Jekyll also requires some depreciated software, such as Ruby's Sass gem, while I built the css using Dart Sass, though it is unclear at this time whether it is possible to remove this dependency without breaking Github's build process.  

As a final thought, I also thought that Github Page's documentation could've been clearer, as the process of building a Jekyll website is somewhat convoluted and their documentation tries to cover several use cases in a single tutorial.  While Jekyll's documentation offers several good examples, the lack of dedicated reference area for information like generated metadata and properties of custom collections adds some difficulty.  Many of these properties are described within the documentation, but often in a way that makes quick reference difficult.  

### Future Updates
This project was intended to further explore publishing on Github Pages.  While our new features are working as intended, some code is not ideal or properly refactored.  Some of this is due to limitations of the Github Jekyll integration, and I look forward to addressing these concerns in the ultimate form '[A Pretty HuGOin' Website](https://github.com/PhiloTFarnsworth/APrettyHuGOinWebsite)', which will be built using the Hugo static site framework.
