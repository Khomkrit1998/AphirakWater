import { cn } from "@workspace/ui/lib/utils"

function InfoTable({
  head,
  rows,
  className,
}: {
  head: string[]
  rows: string[][]
  className?: string
}) {
  return (
    <div className={cn("overflow-x-auto rounded-[18px] border", className)}>
      <table className="w-full min-w-[480px] border-collapse text-left">
        <thead className="bg-tint text-sm font-semibold text-ink-700">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className="px-4 py-3.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-[15px] text-ink-600">
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-line-soft">
              {row.map((cell, i) =>
                i === 0 ? (
                  <th
                    key={i}
                    scope="row"
                    className="px-4 py-[15px] font-semibold text-foreground"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={i} className="px-4 py-[15px]">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { InfoTable }
