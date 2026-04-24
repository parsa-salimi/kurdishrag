const markdownIt = require("markdown-it");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Static asset passthrough
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  // Watch targets (trigger rebuild when these change)
  eleventyConfig.addWatchTarget("style.css");

  // Plugins
  eleventyConfig.addPlugin(pluginRss);

  // Markdown: images alone in a paragraph render as <figure> + <figcaption>
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  md.core.ruler.after("inline", "image_to_figure", function (state) {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length - 2; i++) {
      if (
        tokens[i].type === "paragraph_open" &&
        tokens[i + 1].type === "inline" &&
        tokens[i + 2].type === "paragraph_close" &&
        tokens[i + 1].children.length === 1 &&
        tokens[i + 1].children[0].type === "image"
      ) {
        const imgToken = tokens[i + 1].children[0];
        const alt = imgToken.content;
        imgToken.attrSet("loading", "lazy");

        tokens[i].tag = "figure";
        tokens[i].attrSet("class", "essay-figure");
        tokens[i + 2].tag = "figure";

        if (alt) {
          const captionToken = new state.Token("html_inline", "", 0);
          captionToken.content = `<figcaption>${md.utils.escapeHtml(alt)}</figcaption>`;
          tokens[i + 1].children.push(captionToken);
        }
      }
    }
  });

  eleventyConfig.setLibrary("md", md);

  // Filters
  eleventyConfig.addFilter("ratingColor", (rating) => {
    if (rating >= 9) return "rating-hi";
    if (rating >= 7) return "rating-mid";
    return "rating-lo";
  });

  eleventyConfig.addFilter("toFixed", (num, places = 1) =>
    Number(num).toFixed(places),
  );

  eleventyConfig.addFilter("padZero", (num, width = 2) =>
    String(num).padStart(width, "0"),
  );

  eleventyConfig.addFilter("readableDate", (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("isoDate", (date) => {
    const d = date instanceof Date ? date : new Date(date);
    return d.toISOString().split("T")[0];
  });

  eleventyConfig.addFilter("startsWith", (str, prefix) =>
    String(str || "").startsWith(prefix),
  );

  eleventyConfig.addFilter("hasPositions", (items) =>
    Array.isArray(items) && items.some((i) => typeof i.position === "number"),
  );

  // Aggregated "latest" feed across albums, essays, and dated lists
  eleventyConfig.addCollection("latest", (collectionApi) => {
    const toDateStr = (d) =>
      d instanceof Date ? d.toISOString().split("T")[0] : d;

    const albums = collectionApi.getFilteredByTag("albums").map((item) => ({
      type: "album",
      date: toDateStr(item.data.date),
      primary: item.data.artist,
      secondary: item.data.album,
      rating: item.data.rating,
      url: item.url,
      dateObj: item.data.date,
    }));

    const lists = collectionApi
      .getFilteredByTag("lists")
      .filter((item) => item.data.date)
      .map((item) => ({
        type: "list",
        date: toDateStr(item.data.date),
        primary: item.data.title,
        secondary: "",
        url: item.url,
        dateObj: item.data.date,
      }));

    const essays = collectionApi.getFilteredByTag("essays").map((item) => ({
      type: "essay",
      date: toDateStr(item.data.date),
      primary: item.data.title,
      secondary: "",
      url: item.url,
      dateObj: item.data.date,
    }));

    return [...albums, ...lists, ...essays]
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      .slice(0, 10);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
