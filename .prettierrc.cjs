/** @type {import('prettier').Config} */
module.exports = {
	singleQuote: true,
	trailingComma: 'all',
	plugins: ['prettier-plugin-svelte'],
	pluginSearchDirs: ['.'],
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
