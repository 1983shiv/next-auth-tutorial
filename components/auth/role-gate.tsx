"use client"
import { FormError } from "@components/form-error"
import { useCurrentRole } from "@hooks/use-current-role"
import { UserRole } from "@prisma/client"

interface RoleGateProp{
    children: React.ReactNode,
    allowedRole : UserRole
}

const RoleGate = ({ children, allowedRole} : RoleGateProp) => {
  const role = useCurrentRole()
  
   if(role !== allowedRole){
    return(
        <FormError message="You do not have permission to view this content."/>
    )
   }

   return(
    <>
    {children}
    </>
   )
}

export default RoleGate