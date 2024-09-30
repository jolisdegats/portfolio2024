module.exports = { 
  "env": {
    "browser": false,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [ "plugin:json/recommended", "plugin:react/recommended"],
  "ignorePatterns": ["tsconfig.json", "turbo.json", "tsconfig/*.json", ".eslintrc.js"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "plugins": ["react", "prettier", "import"],
  "rules": {
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        "assertionStyle": "as",
        "objectLiteralTypeAssertions": "never"
      }
    ],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "array-bracket-spacing": [0],
    "brace-style": [0],
    "comma-dangle": [0],
    "import/no-unresolved": [
      2,
      {
        "ignore": ["/styles", ".jpg", ".png"]
      }
    ],
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"]
      }
    ],
    "indent": [0, 2],
    "multiline-ternary": [0],
    "no-case-declarations": [1],
    "no-extra-semi": "off",
    "no-unused-expressions": [1],
    "operator-linebreak": [0],
    "prettier/prettier": [0],
    "react/jsx-no-target-blank": [1],
    "react/no-deprecated": [0],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/display-name": "warn",
    "require-atomic-updates": [1],
    "sort-keys": [0]
  },
  "settings": {
    "react": {
      "version": "18"
    }
  }, 
tabWidth: 2, 
trailingComma: 'none'
}