module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Cherio/apps/myportfolio/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/d8d80__pnpm_c816ee81._.js",
  "chunks/[root-of-the-server]__e721d642._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/Cherio/apps/myportfolio/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];