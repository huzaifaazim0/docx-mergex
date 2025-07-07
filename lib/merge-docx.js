const fs = require("fs-extra");
const path = require("path");
const JSZip = require("jszip");
const { XMLParser, XMLBuilder } = require("fast-xml-parser");

const parser = new XMLParser({
    ignoreAttributes: false,
    preserveOrder: false,
});
const builder = new XMLBuilder({
    ignoreAttributes: false,
    preserveOrder: false,
});

async function readDocxXML(filePath) {
    const data = await fs.readFile(filePath);
    const zip = await JSZip.loadAsync(data);
    const xmlString = await zip.file("word/document.xml").async("string");
    const xml = parser.parse(xmlString);
    return { zip, xml };
}

function mergeBodies(documents) {
    const base = documents[0];
    const baseBody = base.xml["w:document"]["w:body"];

    if (!Array.isArray(baseBody["w:p"])) {
        baseBody["w:p"] = baseBody["w:p"] ? [baseBody["w:p"]] : [];
    }

    for (let i = 1; i < documents.length; i++) {
        const body = documents[i].xml["w:document"]["w:body"];
        let newParas = body["w:p"];
        if (!newParas) continue;

        if (!Array.isArray(newParas)) newParas = [newParas];

        // Optional: add a paragraph break between docs
        baseBody["w:p"].push({ "w:p": {} });

        baseBody["w:p"].push(...newParas);
    }

    return base;
}

async function writeMergedDocx(mergedDoc, outputPath) {
    const xmlString = builder.build(mergedDoc.xml);
    mergedDoc.zip.file("word/document.xml", xmlString);

    const buffer = await mergedDoc.zip.generateAsync({ type: "nodebuffer" });
    await fs.writeFile(outputPath, buffer);
    console.log(`✅ Merged .docx written to: ${outputPath}`);
}

async function mergeDocxFiles(inputDir, outputFilePath) {
    const files = (await fs.readdir(inputDir))
        .filter(f => f.endsWith(".docx"))
        .map(f => path.join(inputDir, f));

    if (files.length === 0) {
        throw new Error("❌ No .docx files found.");
    }

    const documents = await Promise.all(files.map(readDocxXML));
    const merged = mergeBodies(documents);
    await writeMergedDocx(merged, outputFilePath);
}

module.exports = mergeDocxFiles;
