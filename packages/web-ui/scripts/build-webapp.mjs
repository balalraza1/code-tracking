import fs from "fs";
import esbuild from "esbuild";
import dotenv from "dotenv";
import autoprefixer from "autoprefixer";
import PostCssPlugin from "esbuild-plugin-postcss2";
import svgPlugin from "esbuild-svg";
const svgrConfig = { exportType: "named" };

async function main() {
  // Remove the "dist" directory if it exists
  if (fs.existsSync("./dist")) {
    fs.rmSync("./dist", { recursive: true });
  }

  // Load environment variables from .env file
  dotenv.config();

  // Read package.json to get dependencies and peerDependencies
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

  // Configuration options
  const source = "./index.ts";
  const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ];
  const loader = {
    ".js": "jsx",
    ".png": "dataurl",
    ".avif": "file",
    ".jpeg": "dataurl",
    ".jpg": "dataurl",
  };
  const define = { "process.env": JSON.stringify(process.env) };
  const plugins = [
    PostCssPlugin.default({
      plugins: [autoprefixer],
    }),
    svgPlugin(svgrConfig),
  ];

  try {
    const commonOptions = {
      entryPoints: [source],
      assetNames: "[name]",
      minify: true,
      bundle: true,
      target: "esnext",
      external,
      treeShaking: true,
      sourcemap: true,
      metafile: true,
      loader,
      define,
      plugins,
    };

    // Build the CommonJS version
    esbuild
      .build({
        outfile: "dist/index.cjs.js",
        format: "cjs",
        ...commonOptions,
      })
      .then(({ metafile }) => {
        console.log("cjs build successful");
        console.log("creating build dependency file");
        fs.writeFileSync(
          "dist/meta.cjs.json",
          JSON.stringify(metafile, null, 2),
          "utf-8"
        );
      });

    // Build the ES module version
    esbuild
      .build({
        entryPoints: [source],
        outdir: "dist/",
        format: "esm",
        splitting: true,
        ...commonOptions,
      })
      .then(({ metafile }) => {
        console.log("ESBuild successful");
        console.log("Creating build dependency file...");
        fs.writeFileSync(
          "dist/meta.esbuild.json",
          JSON.stringify(metafile, null, 2),
          "utf-8"
        );
      });
  } catch (e) {
    console.error(`× ${pkg.name}: Build failed due to an error.`);
    console.error(e);
  }
}

main();
