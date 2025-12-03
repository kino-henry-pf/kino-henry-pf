export default function Table({
    head,
    body
}: {
    head: string[],
    body: string[][]
}) {
    return (
        <table className="w-full h-fit">
            <thead className="text-left">
                <tr>
                    {
                        head.map((th, index) => (
                            <th key={index} className="bg-white/3 px-4 py-3 first:rounded-l-md last:rounded-r-md">{th}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    body.map((row, index) => (
                        <tr key={index}>
                            {
                                row.map((td, index) => (
                                    <td
                                        key={index}
                                        className="px-4 pt-3"
                                    >{td}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}