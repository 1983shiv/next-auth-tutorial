function AuthLayout({children} : {children : React.ReactNode}) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-gray-100 to-slate-400">
        <div className="bg-[radial-gradient(ellipse_at_top, __var(--tw-gradient-stops))] from-sky-400 to-blue-800">{children}</div></div>
  )
}

export default AuthLayout