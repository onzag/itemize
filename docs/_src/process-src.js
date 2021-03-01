/**
 * Simple cheap script that is used in order to check whether our custom table of generatedToc
 * is complete and matches the signature of the auto generated documentation
 */

const fs = require("fs");
const colors = require("colors");

fs.copyFileSync("./docs/_src/api-readme.md", "./docs/api/README.md");

const generatedToc = fs.readFileSync("./docs/api/modules.md", "utf-8");
const apiTocReadme = fs.readFileSync("./docs/_src/api-readme.md", "utf-8");

function getLinkFromLine(line) {
    const splitted = line.split("](");
    const possibleLinkValue = splitted[1];
    if (!possibleLinkValue) {
        return null;
    }

    if (!splitted[0].trim().startsWith("-") && !splitted[0].trim().startsWith("*")) {
        return null;
    }
    
    return possibleLinkValue.replace(")","").trim();
};

const foundLinksInGeneratedToc = generatedToc.split("\n").map(getLinkFromLine).filter((n) => !!n);
const foundLinksInapiTocReadme = apiTocReadme.split("\n").map(getLinkFromLine).filter((n) => !!n);

const foundInContentButNotInApi = foundLinksInGeneratedToc.filter((link) => {
    return !foundLinksInapiTocReadme.find((l) => l === link);
});

const foundInApiTocButNotInContent = foundLinksInapiTocReadme.filter((link) => {
    return !foundLinksInGeneratedToc.find((l) => l === link);
});

foundInContentButNotInApi.forEach((link) => {
    console.log(colors.red(`Found ${link} documentation in the generated documentation but not in our API TOC`));
});

foundInApiTocButNotInContent.forEach((link) => {
    console.log(colors.red(`Found ${link} documentation in our API TOC but not in our generated docs`));
});