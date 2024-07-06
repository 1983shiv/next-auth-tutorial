import { ExtendedUser } from '@next-auth';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Badge } from '@components/ui/badge';

interface UserInfoProp {
    user?: ExtendedUser;
    label: string;
}

const UserInfo = ({ user, label }: UserInfoProp) => {
    return (
        <Card className="w-[600px] shadow-md">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">{label}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium">ID </span>
                    <span className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.id}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium">Name </span>
                    <span className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.name}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium">Email </span>
                    <span className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.email}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium">Role </span>
                    <span className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {user?.role}
                    </span>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                    <span className="text-sm font-medium">Two Factor Authentication </span>
                    <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
                        {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
};

export default UserInfo;
