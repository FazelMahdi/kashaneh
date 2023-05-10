function copyToClipboardOldBrowser(text: string) {
  const dummy = document.createElement('textarea');
  dummy.style.opacity = '0';
  dummy.style.position = 'absolute';
  dummy.style.top = '0';
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}

export async function copyToClipboard(text: string) {
  if (!navigator?.clipboard) {
    return copyToClipboardOldBrowser(text);
  }

  await navigator?.clipboard.writeText(text);
}
