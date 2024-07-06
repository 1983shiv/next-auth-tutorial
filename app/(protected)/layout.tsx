import NavBar from "./_components/navbar";

interface ProtectedLayout {
    children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayout) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-100 to-slate-400">
            <NavBar />
            {children}
        </div>
    );
};

export default ProtectedLayout;
