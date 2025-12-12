import * as Icon from "akar-icons"
import Link from "next/link"

export default function DataTable({
    resource,
    head,
    body
}: {
    resource: string,
    head: string[],
    body: {
        resourceId: string,
        value: (string | React.ReactNode)[]
    }[]
}) {
    return (
        <div className="overflow-x-auto container-x-padding lg:![padding-right:0] lg:![padding-left:0] scroll-bounce">
            <table className="w-full h-fit">
                <thead className="text-left">
                    <tr>
                        {
                            head.map((th, index) => (
                                <th key={index} className="bg-white/3 px-4 py-3 first:rounded-l-md">{th}</th>
                            ))
                        }
                        <th className="bg-white/3 px-4 py-3 first:rounded-l-md rounded-r-md"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        body.map((row, index) => (
                            <tr key={index} className="group">
                                {
                                    row.value.map((td, index) => (
                                        <td
                                            key={index}
                                            className="px-4 py-3 border-b-1 border-[var(--color-border)] group-last:border-b-0"
                                        >{td}</td>
                                    ))
                                }
                                <td className="px-4 py-3 border-b-1 border-[var(--color-border)] group-last:border-b-0 w-[1%]">
                                    <Link scroll={false} href={`/admin-dashboard/${resource}/${row.resourceId}`} className="w-fit h-fit">
                                        <Icon.ArrowRight
                                            className="size-4 transition-[transform,translate,opacity] my-auto opacity-0 -translate-x-5 group-hover:opacity-100 group-hover:-translate-x-0"
                                        />
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}