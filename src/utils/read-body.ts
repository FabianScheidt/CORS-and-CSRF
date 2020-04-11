export function readBody(request): Promise<string> {
  return new Promise<string>((resolve) => {
    let bodyChunks = [];
    request.on('data', (chunk) => {
      bodyChunks.push(chunk);
    }).on('end', () => {
      resolve(Buffer.concat(bodyChunks).toString());
    });
  });
}
