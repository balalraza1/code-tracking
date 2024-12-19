import fs from "fs";
import path from "path";

const directories = ["src/icons", "src/badges", "src/mascot", "src/stickers"];
const rootIndexPath = "src/index.ts";

let rootExports = "";

directories.forEach((dir) => {
  const indexPath = path.join(dir, "index.ts");

  // Check if index.ts exists in the directory
  if (fs.existsSync(indexPath)) {
    const relativePath = path.relative("src", indexPath).replace(/\\/g, "/");
    const exportStatement = `export * from './${relativePath.replace(/\/index.ts$/, "")}';`;
    rootExports += `${exportStatement}\n`;
  } else {
    console.warn(`Warning: No index.ts file found in ${dir}`);
  }
});

// Write the root index.ts file
fs.writeFileSync(rootIndexPath, rootExports.trim(), "utf8");
console.log(`Root index.ts file created at ${rootIndexPath}`);
