export default function ({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return <div>
        <div>
            test
        </div>
        <div>
            {children}
        </div>
    </div>
}