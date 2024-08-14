export function countWordsInMarkdown(markdown: string): number {
	let text = markdown;

	// Comments
	text = text.replace(/<!--(.*?)-->/gs, '');
	// Tabs to spaces
	text = text.replace(/\t/g, '    ');
	// More than 1 space to 4 spaces
	text = text.replace(/ {2,}/g, '    ');
	// Footnotes
	text = text.replace(/^\[[^\]]*\][^(].*/gm, '');
	// Indented blocks of code
	text = text.replace(/^( {4,}[^-*]).*/gm, '');
	// Custom header IDs
	text = text.replace(/{#.*}/g, '');
	// Replace newlines with spaces for uniform handling
	text = text.replace(/\n/g, ' ');
	// Remove images
	text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, '');
	// Remove HTML tags
	text = text.replace(/<\/?[^>]*>/g, '');
	// Remove special characters
	text = text.replace(/[#*`~\-–^=<>+|/:]/g, '');
	// Remove footnote references
	text = text.replace(/\[[0-9]*\]/g, '');
	// Remove enumerations
	text = text.replace(/[0-9#]*\./g, '');

	return text.split(/\s+/).filter(Boolean).length;
}
