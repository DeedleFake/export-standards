import * as CSV from "csv-stringify/browser/esm/sync";

export function convertToCSV(html: string): string {
  const tree = new DOMParser().parseFromString(html, "text/html");

  const headers = Array.from(
    tree.querySelectorAll<HTMLTableCellElement>(
			"table#resultTable > thead > tr > th",
    ),
  ).map((data) => data.innerText);
  if (headers.length == 0) {
    throw new Error("count not find table headers");
  }

  const rows = Array.from(
    tree.querySelectorAll<HTMLTableRowElement>(
      "table#resultTable > tbody > tr",
    ),
  ).map(convertRow);
  if (rows.length === 0) {
    throw new Error("could not find table rows");
  }

  return CSV.stringify([headers, ...rows]);
}

function convertRow(row: HTMLTableRowElement): Array<string> {
  return Array.from(
    row.querySelectorAll<HTMLTableCellElement>(":scope > td"),
  ).map((data) => data.innerText);
}
