module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => ['npm run build-types', 'npm run build'],
  '*.json': ['prettier --write'],
};
