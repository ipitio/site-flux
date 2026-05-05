export function buildImageVariantSet(src: string, widths: number[], fallbackWidth: number) {
  const match = src.match(/^(.*?)(\.[^.\/]+)$/);

  if (!match) {
    return [{ src, width: fallbackWidth }];
  }

  const [, prefix, extension] = match;

  return [
    ...widths.map((width) => ({
      src: `${prefix}-${width}${extension}`,
      width,
    })),
    { src, width: fallbackWidth },
  ];
}