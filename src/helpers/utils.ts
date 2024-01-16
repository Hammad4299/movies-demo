
export function encodeStringToBase64(toBeEncoded: string) {
    const buff = Buffer.from(toBeEncoded);
    const base64encoded = buff.toString("base64");
    return base64encoded;
}

export function decodeBase64EncodedString(toBeDecoded: string) {
    const buff = Buffer.from(toBeDecoded, "base64");
    const text = buff.toString("ascii");
    return text;
}
