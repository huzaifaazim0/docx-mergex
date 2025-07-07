---

## 📦 docx-mergex

Merge multiple `.docx` files into one — with formatting preserved — using pure Node.js.
No Python. No LibreOffice. Just ZIP-level OpenXML parsing and reassembly.

---

### ✅ Features

* **🔒 Full formatting preserved:** styles, bold, lists, paragraphs, tables
* **⚡ No external deps:** pure Node.js (no Python or LibreOffice)
* **🖥️ Cross-platform:** macOS, Linux, and Windows
* **🛠️ CLI & API:** use from the command line or in your code
* **🔄 Safe merge:** keeps metadata, stylesheets, and zip structure untouched
* **🧪 CI/CD-ready:** perfect for templating pipelines and bulk automation

---

### 🚀 CLI Usage

```bash
npx docx-mergex <input-folder> [output.docx]
```

* `<input-folder>`: directory containing your `.docx` files
* `[output.docx]`: (optional) output filename (defaults to `merged.docx`)

**Example:**

```bash
npx docx-mergex ./my-docx-folder merged.docx
```

> Files are merged in **alphabetical order** by filename.

---

### 📚 Programmatic API

```js
const mergeDocx = require("docx-mergex");

mergeDocx("./docs", "combined.docx")
  .then(() => console.log("✅ Merge complete"))
  .catch(err => console.error("❌ Merge failed:", err));
```

* `./docs`: folder containing `.docx` files
* `"combined.docx"`: desired output path

---

### ⚠️ Limitations

* Only `word/document.xml` contents are merged — **headers, footers, and numbering** beyond the body are **not** preserved
* **No** page/section breaks are inserted by default (coming soon)
* Input files must be valid `.docx` (e.g. Word exports, Google Docs exports)
* Non-`.docx` files and hidden folders are skipped silently

---

### ❌ Common Errors

| Error                                    | Cause                                           | Solution                                   |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| `EISDIR: illegal operation on directory` | Output path is a directory, not a file          | Provide a valid `.docx` filename           |
| The XML document isn’t in Word format    | Merged XML is malformed or ZIP structure broken | Ensure input docs are valid; update module |
| No `.docx` files found                   | Input folder contains no `.docx` files          | Check folder path and file extension       |

---

### 🧪 Testing Locally

1. **Link the module** (from its folder):

   ```bash
   npm link
   ```
2. **In your test folder, link it in:**

   ```bash
   npm link docx-mergex
   ```
3. **Prepare sample docs:**

   ```bash
   mkdir test-docs
   cp ~/Downloads/*.docx test-docs/
   ```
4. **Run the CLI:**

   ```bash
   docx-mergex ./test-docs merged.docx
   ```
5. **Verify** in Microsoft Word or LibreOffice.
6. **To unlink after testing:**

   ```bash
   # In test folder
   npm unlink docx-mergex

   # In module folder
   npm unlink
   ```

---

### 🤖 Roadmap / Coming Soon

* Insert section/page breaks between merged documents
* Merge headers, footers, and numbering
* Recursive merging from nested folders
* Option to insert filename as heading before each document
* CLI flag for custom merge order

---

### 👥 Contributing

We welcome contributions!

1. Fork this repo
2. Run `npm install`
3. Make your changes (add features, fix bugs)
4. Test via:

   ```bash
   node bin/cli.js <input> <output>
   ```
5. Submit a Pull Request with a clear description of your changes

---

### 📄 License

MIT © 2025 Huzaifa Azim
