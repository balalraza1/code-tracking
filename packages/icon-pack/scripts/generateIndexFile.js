import fs from "fs";
import path from "path";

const directories = ["src/icons", "src/mascot", "src/badges", "src/stickers"];
const rootIndexPath = "src/index.ts";

let rootExports = "";

directories.forEach((dir) => {
  const indexPath = path.join(dir, "index.ts");

  // Check if index.ts exists in the directory
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, "utf8");

    // Extract named exports from the file
    const matches = content.matchAll(
      /export\s+\{\s*([\w,\s]+)\s*\}\s*from\s*['"](.+?)['"];/g
    );

    for (const match of matches) {
      const [_, exportsList, sourcePath] = match;
      const relativePath = path
        .relative("src", path.join(dir, sourcePath))
        .replace(/\\/g, "/");
      rootExports += `export { ${exportsList.trim()} } from './${relativePath}';\n`;
    }
  } else {
    console.warn(`Warning: No index.ts file found in ${dir}`);
  }
});

// Write the root index.ts file
fs.writeFileSync(rootIndexPath, rootExports.trim(), "utf8");
console.log(`Root index.ts file created at ${rootIndexPath}`);
