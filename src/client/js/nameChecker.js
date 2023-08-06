function checkForName(inputText) {
    const matching = inputText.match(/^https?:\/\/(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/\S*)?$/)
    return matching;
}

export { checkForName }
