/** Apply the site's display-name rule to externally supplied prose. */
export function fullProductNames(text: string): string {
  return text.replace(/(?<!Viglet )\b(Turing|Dumont|Shio)\b/g, 'Viglet $1')
}
