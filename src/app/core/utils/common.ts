export async function getTextFromClipboard(): Promise<string | null> {
  if (!navigator.clipboard) return null;
  return await navigator.clipboard.readText();
}
