const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@/lib/utils": path.resolve(__dirname, "src/shadcn/lib/utils"),
      "@/components/ui": path.resolve(__dirname, "src/shadcn/components/ui/"),
    },
  },
};
