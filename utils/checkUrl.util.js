exports.isValidUrl = (string) => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-zA-Z0-9$_.+!*\'(),-]+)\\.)+([a-zA-Z]{2,})|localhost)' + // domain name or localhost
        '(\\:[0-9]{2,5})?' + // port
        '(\\/.*)?$', 'i'); // path
    return urlPattern.test(string);
}