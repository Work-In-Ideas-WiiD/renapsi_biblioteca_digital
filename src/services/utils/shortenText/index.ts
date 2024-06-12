export function shortenText(text: string, maxLength: number) {

    if (!text) {
        return ""
    }
    if (text.length > maxLength) {
        return text.slice(0, maxLength).concat('...');
    }

    return text;
}