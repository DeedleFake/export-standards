import * as CSV from "csv-stringify/browser/esm/sync";

export function convertToCSV(html: string): string {
  const tree = new DOMParser().parseFromString(html, "text/html");
  const rows = Array.from(
    tree.querySelectorAll<HTMLTableRowElement>(
      "table#resultTable > tbody > tr",
    ),
  );
  if (rows.length === 0) {
    throw new Error("could not find table rows");
  }
  return CSV.stringify(rows.map(convertRow));
}

function convertRow(row: HTMLTableRowElement): Array<string> {
  return Array.from(
    row.querySelectorAll<HTMLTableCellElement>(":scope > td"),
  ).map((data) => data.innerText);
}
