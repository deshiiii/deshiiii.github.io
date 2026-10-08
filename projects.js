// The folder tree shown on the site.
//
// Each entry is either:
//   a folder: { name: "Folder name", children: [ ...more entries... ] }
//   a link:   { name: "Link text", href: "https://..." or "files/thing.pdf" }
//   a pop-up: { name: "Link text", text: `Text shown in a pop-up box` }
//             (wrap words in ==double equals== to highlight them)
//
// Folders can be nested as deep as you like. Put PDFs in the files/ folder
// and link them with a relative path, e.g. href: "files/report.pdf".
// Add open: true to a folder to have it expanded by default.

const PROJECTS = [
  {
    name: "About Me",
    open: true,
    children: [
      {
        name: "READ ME",
        // Shown in a pop-up box. Blank lines start a new paragraph.
        text: `Hi! I'm Dougal, am a Berlin-based Computer Scientist (PhD, EHESS) specialised in the analytical study of ==Culture, Brand and Marketing==.

Over the years, I have worked with some of the biggest players in the digital entertainment sector including ==Deezer==, ==EA== and ==Plaion==, and had the pleasure of helping their teams better understand user behaviour to optimise product and marketing.
From ==MMMs== to ==Complex Networks==, I bring a diverse set of computational methods to both marketing and product analytics.

In terms of my academic interests, I have always been fascinated by the interplay between cultural production, adoption and technologies that mediate these two processes. My doctoral research, conducted in collaboration with the Deezer music streaming platform via ==ANR-RECORDS==, engaged directly with these themes, exploring empirically how music streaming platforms' products and affordances shape culture diversity.`,
      },
      { name: "CV", href: "./aboutMe/CV.pdf" },
    ],
  },
  {
    name: "Marketing Science",
    open: true,
    children: [
      { name: "Bayesian MMMs Project", href: "./marketingScience/MMM_workflow.html" },
    ],
  },
  {
    name: "Music Streaming Analytics",
    open: true,
    children: [
      {
        name: "Research Papers",
        children: [
          { name: "Artist Gender Bias in Music RecSys (ImpactRS @RecSys)", href: "./musicStreaming/gender_bias_recsys.pdf" },
          { name: "Tracing Item Adoptions on Music Streaming Platforms (ISMIR)", href: "./musicStreaming/ismir.pdf" },
          { name: "Reframing the Filter Bubble (SciReports)", href: "./musicStreaming/sci_reports.pdf" },
          { name: "Interpreting Semantic Embedding Spaces (CompleNet)", href: "./musicStreaming/complex_networks.pdf" },
          { name: "PhD thesis (CAMS, EHESS)", href: "./musicStreaming/EHESS_PhD_Shakespeare.pdf" },
        ],
      },
      {
        name: "Media Features & Workshops",
        children: [
          { name: "Networks & Music - Emperical Approaches (workshop)", href: "https://necs.org/news/calls-for-papers/network-and-music-empirical-approaches-session-sunbelt-conference-2025"},
          { name: "Sound Japan: modernity, social constructions, power, (workshop)", href: "https://www.youtube.com/watch?v=W3yAh8Ttd_E&t=1020s"},
          { name: "Gender Bias in Music RecSys (article)", href: "https://www.upf.edu/web/mtg/news/-/asset_publisher/WM181VyAQipW/content/recommendation-algorithms-could-increase-the-gender-gap-in-music/maximized" },
          { name: "TV3 Catalan Interview (interview)", href: "https://www.3cat.cat/3catinfo/la-cara-b-de-les-playlists-com-han-canviat-la-forma-de-fer-cancons/noticia/3054530/" },
        ],
      },
    ],
  },
  {
    name: "Music",
    open: true,
    children: [
      { name: "Label & Event Series (RE)", href: "https://reverseengineering.software/" },
      { name: "Mixes & Production (Soundcloud)", href: "https://soundcloud.com/djdeshek" },
    ],
  }
];
