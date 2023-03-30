module.exports = {
	stories: [
		'../src/readme.stories.mdx',
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(ts|tsx)',
		'../src/**/*.story.@(ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-docs',
			options: { transcludeMarkdown: true },
		},
	],
	framework: '@storybook/react',
};
