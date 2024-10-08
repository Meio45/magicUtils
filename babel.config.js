module.exports = {
    presets: [['@babel/preset-env']],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: {version: 3, proposals: true},
                helpers: true,
                useESModules: true,
                regenerator: true,
                absoluteRuntime: './node_modules'
            }
        ]
    ]
};
