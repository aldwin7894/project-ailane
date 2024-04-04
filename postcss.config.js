/* eslint-disable global-require */
import autoprefixerPlugin from "autoprefixer";
import cssnanoPlugin from "cssnano";
import flexBugsFixesPlugin from "postcss-flexbugs-fixes";
import importPlugin from "postcss-import";
import nestingPlugin from "postcss-nesting";
import presetEnvPlugin from "postcss-preset-env";
import tailwindPlugin from "tailwindcss";

export default {
  plugins: [
    importPlugin,
    tailwindPlugin,
    flexBugsFixesPlugin,
    nestingPlugin,
    presetEnvPlugin({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    autoprefixerPlugin,
    ...(process.env.NODE_ENV === "production"
      ? [
          cssnanoPlugin({
            preset: "advanced",
          }),
        ]
      : []),
  ],
};
