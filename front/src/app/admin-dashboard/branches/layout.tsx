import Script from "next/script";

export default function AdminBranchesLayout({
    children
} : {
    children: React.ReactNode
}) {
    return (
        <>
            <Script
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&loading=async`}
                strategy="beforeInteractive"
            />
            {children}
        </>
    )
}