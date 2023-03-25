export const stringShortener = (word: string, length: number = 255) => {
    if (word.length > length) {
        return word.substring(0, length) + '...'
    } else {
        return word
    }
}