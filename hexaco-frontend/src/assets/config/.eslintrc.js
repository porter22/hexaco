module.exports = {
    root: true,
    env: {
        es6: true,
        browser: true,
    },
    globals: {
        _: true,
        axios: true,
        $: true,
        jQuery: true,
        angular: true,
    },
    extends: [
        'airbnb-base',
        'plugin:vue/recommended',
    ],
    plugins: [],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2017,
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
            {
                VariableDeclarator: {
                    var: 2,
                    let: 2,
                    const: 3,
                },
                outerIIFEBody: 0,
                MemberExpression: 1,
                SwitchCase: 1,
            },
        ],
        'max-len': [
            'error',
            120,
            2,
            {
                ignoreUrls: true,
                ignoreTemplateLiterals: true,
                ignoreStrings: true,
                ignoreRegExpLiterals: true,
            },
        ],
        camelcase: 'off',
        'linebreak-style': 'off',
        'arrow-parens': 'off',
        'no-plusplus': 'off',
        'no-empty-pattern': 'off',
        'no-console': 'error',
        'no-debugger': 'error',
        'no-alert': 'error',
        'arrow-body-style': 'off',
        'space-before-function-paren': 0,
        'import/extensions': ['error', 'always'],
        'import/no-unresolved': 'off',
        'no-return-assign': ['error', 'except-parens'],
        'vue/max-attributes-per-line': ['error', {
            singleline: 3,
        }],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always',
                },
            },
        ],
    },
};
