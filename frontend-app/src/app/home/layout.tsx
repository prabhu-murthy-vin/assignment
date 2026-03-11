import Footer from "@/components/page-components/footer";
import Header from "@/components/page-components/header";

export default function ({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <>
        <Header />
        <main style={{ minHeight: "100vh", padding: "1rem", marginTop: "90px" }}>
            {children}
        </main>
        <Footer />
    </>
}