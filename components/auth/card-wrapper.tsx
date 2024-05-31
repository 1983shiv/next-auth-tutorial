"use client"

import { Card, CardContent, CardHeader, CardFooter } from "@components/ui/card"
import { HeaderAuth } from "@components/auth/header"
import { Social } from "@components/auth/social"

interface CardWrapperProps {
    children: React.ReactNode,
    headerLabel : string,
    backButtonLabel : string,
    backButtonHref : string,
    showSocial? : boolean
}

export const CardWrapper = ({
    children, headerLabel, backButtonHref, backButtonLabel, showSocial
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
        <HeaderAuth label={headerLabel} />
        </CardHeader>
        <CardContent>
        {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
        )}
    </Card>
  )
}
