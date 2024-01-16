# Chip Input
Specifications: 
1. When you click on the input field, a list of items will appear.
2. As you type, the list should show only items that match what you're typing.
3. Clicking on an item should turn it into a chip at the top, and the input field should adjust automatically.
4. Once an item becomes a chip, it should no longer be in the list.
5. Each chip has an "X" icon. Clicking it removes the chip and adds the item back to the list.
6. Resize Event Handler Added: On Window Size change the suggestions should remain below the input.
7. Click Away Handler Added: On Click on somewhere else than input or suggestions, the suggestions should hide.
8. When the input is blank and the user presses backspace, the last chip (for example, Nick Giannopoulos) should get highlighted and on again pressing backspace it should get deleted
9. Scroll the suggestion user into view if not already.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
