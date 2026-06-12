import {
  ComponentChild,
  ComponentProps,
  toChildArray,
  VNode
} from "preact";
import styles from "./Table.module.css";
import { joinClasses, mergeStyle } from "./utils";



export interface TableEntryProps extends ComponentProps<"th"> {
  content: ComponentChild[];
  contentClass?: string;
  headerBg?: string;
  cellBg?: string;
  headerFontSize?: string;
  cellFontSize?: string;
}

export function Entry(_props: TableEntryProps): null {
  return null;
}

interface TableProps extends ComponentProps<"table"> {
  orientation?: "col" | "row";
  contentClass?: string;
  headerClass?: string;
  headerBg?: string;
  cellBg?: string;
  headerFontSize?: string;
  cellFontSize?: string;
  borderWidth?: string;
  borderColor?: string;
  children: VNode<TableEntryProps> | VNode<TableEntryProps>[];
}


export function Table({
  children,
  orientation = "col",
  className,
  style,
  contentClass: parentContentClass = "",
  headerClass,
  headerBg,
  cellBg,
  headerFontSize,
  cellFontSize,
  borderWidth,
  borderColor,
  ...props
}: TableProps) {
  const headers = toChildArray(children)
    .filter((child) => (child as VNode).type === Entry)
    .map((child) => (child as VNode<TableEntryProps>).props);

  const tableClass = joinClasses(
    className,
    styles.table,
    styles[orientation],
  ).trim();

  const tableStyle = mergeStyle(style, {
    "--table-header-color": headerBg,
    "--table-cell-color": cellBg,
    "--table-header-fontsize": headerFontSize,
    "--table-cell-fontsize": cellFontSize,
    "--table-border-width": borderWidth,
    "--table-border-color": borderColor,
  });

  if (orientation === "row") {
    return (
      <table className={tableClass} style={tableStyle} {...props}>
        <tbody>
          {headers.map(
            ({
              children,
              content,
              className,
              contentClass,
              style,
              headerBg,
              cellBg,
              headerFontSize,
              cellFontSize,
              ...props
            }, i) => (
              <tr key={i}>
                <th
                  scope="row"
                  className={joinClasses(className, headerClass)}
                  style={mergeStyle(style, {
                    "--table-header-color": headerBg,
                    "--table-header-fontsize": headerFontSize,
                  })}
                  {...props}
                >
                  {children}
                </th>
                {content.map((cell, j) => (
                  <td
                    key={j}
                    className={joinClasses(contentClass, parentContentClass)}
                    style={{ "--table-cell-color": cellBg, "--table-cell-fontsize": cellFontSize }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ),
          )}
        </tbody>
      </table>
    );
  }

  const rowCount = Math.max(...headers.map((h) => h.content.length));
  return (
    <table className={tableClass} style={tableStyle} {...props}>
      <thead>
        <tr>
          {headers.map(
            (
              { children, content, className, contentClass, style, headerBg, cellBg, headerFontSize, cellFontSize, ...props },
              i,
            ) => (
              <th
                key={i}
                className={joinClasses(className, headerClass)}
                style={mergeStyle(style, {
                  "--table-header-color": headerBg,
                  "--table-header-fontsize": headerFontSize,
                })}
                {...props}
              >
                {children}
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, rowIdx) => (
          <tr key={rowIdx}>
            {headers.map(
              ({ content, children, contentClass = "", cellBg, cellFontSize, ...props }, colIdx) => (
                <td
                  key={colIdx}
                  {...props}
                  className={joinClasses(contentClass, parentContentClass)}
                  style={{ "--table-cell-color": cellBg, "--table-cell-fontsize": cellFontSize }}
                >
                  {content[rowIdx]}
                </td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
