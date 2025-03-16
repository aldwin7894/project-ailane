/* eslint-disable global-require */
import cssnanoPlugin from "cssnano";
import flexBugsFixesPlugin from "postcss-flexbugs-fixes";
import nestingPlugin from "postcss-nesting";
import presetEnvPlugin from "postcss-preset-env";

export default {
  plugins: [
    flexBugsFixesPlugin,
    nestingPlugin,
    presetEnvPlugin({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 3,
    }),
    ...(process.env.NODE_ENV === "production"
      ? [
          cssnanoPlugin({
            preset: "advanced",
          }),
        ]
      : []),
  ],
};
