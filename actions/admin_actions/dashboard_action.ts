import db from "@/utils/db"

export async function getSalesData(){
    const data = await db.order.aggregate({
        _sum:{pricePaid:true},
        _count:true,
    })
    return{
        amount:(data._sum.pricePaid || 0)/100,
        numberOfSales:data._count,
    }
}

export async function getUserData(){
  const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum:{pricePaid:true},
        })
  ])

return{
    userCount,
    averageValuePerUser:userCount===0?0:(orderData._sum.pricePaid || 0)/userCount/100
}
}

export async function getProductData(){
   const [activeCount, inactiveCount]= await Promise.all([
    db.product.count({
        where:{
            isAvailableForPurchase:true
        }}
    ),
    db.product.count({
        where:{
            isAvailableForPurchase:false
        }}
    )
   ]) 
    return{
         activeCount,
         inactiveCount
    }
}