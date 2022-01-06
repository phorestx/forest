// For building on vercel: https://github.com/Automattic/node-canvas/issues/1779
if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(`${process.env.PWD}/node_modules/canvas/build/Release:`)
) {
    process.env.LD_LIBRARY_PATH = `${process.env.PWD}/node_modules/canvas/build/Release:${
        process.env.LD_LIBRARY_PATH || ""
    }`;
}

module.exports = function (eleventyConfig) {
    /*** COLLECTIONS ***/
    eleventyConfig.addCollection("featuredPosts", (collection) => {
        return collection
            .getFilteredByTags("post")
            .map((postShell) => postShell.data.post)
            .slice(0, 5);
    });

    eleventyConfig.addCollection("featuredBooks", (collection) => {
        return collection
            .getFilteredByTags("book")
            .map((bookShell) => bookShell.data.book)
            .slice(0, 6);
    });

    /*** BUILD ***/
    eleventyConfig.addPassthroughCopy("src/assets/fonts");
    eleventyConfig.addPassthroughCopy("src/assets/meta");

    return {
        // These are all optional, defaults are shown:
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site",
        },
    };
};
