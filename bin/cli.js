#!/usr/bin/env node

const path = require("path");
const mergeDocxFiles = require("../lib/merge-docx");

const inputDir = process.argv[2];
const outputFile = process.argv[3] || "merged.docx";

if (!inputDir) {
    console.error("❌ Usage: docx-mergex <input-folder> [output.docx]");
    process.exit(1);
}

mergeDocxFiles(path.resolve(inputDir), path.resolve(outputFile))
    .catch(err => {
        console.error("❌ Merge failed:", err.message);
        process.exit(1);
    });
