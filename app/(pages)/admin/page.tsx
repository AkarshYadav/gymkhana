
import { Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import { getSalesData, getUserData,getProductData } from "@/actions/admin_actions/dashboard_action";
import { formatCurrency , formatNumber } from "@/utils/formatter";
export default async function AdminDashboard(){
    const [salesData ,userData,productData] = await Promise.all([
       getSalesData(),
         getUserData(),
         getProductData()
    ]) 
    return(
        <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         <DashboardCard title="Sales" subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
         body={formatCurrency(salesData.amount)} />

          <DashboardCard title="Customers" subtitle={`${formatNumber(userData.averageValuePerUser)} Average Value`}
         body={formatCurrency(userData.userCount)} />

          <DashboardCard title="Products" subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
         body={formatNumber(productData.activeCount)} />
        </div>
        </div>
    )
}

interface DashboardCardProps{
    title: string;
    subtitle: string;
    body: string;
}
function DashboardCard({title, subtitle, body}: DashboardCardProps){
    return(
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">{title}</CardTitle>
                <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{body}</p>
            </CardContent>
        </Card>
    )
}