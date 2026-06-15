type Props = {
    children: React.ReactNode
}

export default function DataFromFilterWrapper({ children }: Props) {
    return (
        <>
            {children}
        </>
    );
}