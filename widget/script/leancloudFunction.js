/**
 *本js专门处理leancloud云函数及其逻辑
 * 创建时间:2019.7.18
 * 创建人:李见波
 */
//初始化leancloud
var APP_ID = 'jjagdvss81s2w8gaho8pjsgttd2ormabhinggca2gmctoi5b';
var APP_KEY = '6aocso66b977p1lfdohqx28jligeytw75bob3218xvy9swhu';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});
//实例化云服务器数据表
var kitchen = AV.Object.extend("cafeKitchen");
var category = AV.Object.extend("category");
var menu = AV.Object.extend("menu");
var userAddress = AV.Object.extend("userAddress");
var customer = AV.Object.extend("customer");
var user = AV.Object.extend("_User");
var order = AV.Object.extend("order");
/**
 *获取所有订单信息............
 * 参数page:页数
 */
function getAllOrders(page) {
    var queryOrder = new AV.Query(order);
    var count = 10;
    var page = page || 1;
    var orderArr = [];
    queryOrder.addDescending('createdAt');
    queryOrder.include('customer');
    queryOrder.include('kitchenPointer');
    queryOrder.include('cafeCar');
    queryOrder.equalTo('status', "已付款");
    queryOrder.include('addressPointer');
    queryOrder.limit(count);
    queryOrder.skip((page - 1) * count);

    return queryOrder.find().then(function(dt) {

        dt.forEach(function(order) {
            var order = {
                id: order.id,
                payType: order.get("payType"),
                cartArr: order.get("cartArr"),
                status: order.get("status"),
                //				userName : order.get("addressPointer").get("userName"),
                //				userPhone : order.get("addressPointer").get("userPhone"),
                address: order.get("addressPointer"),
                kitchenName: order.get("kitchenPointer"),
                //				img : order.get("kitchenPointer").get("logo").url() ? order.get("kitchenPointer").get("logo").url() : 'widget://image/loading_more.gif',
                img: 'widget://image/phone.png',
                title: order.get("status"),
                msg: order.get("msg"),
                headline: order.get("addressPointer").get("userName"),
                subTitle: order.get("addressPointer").get("userPhone"),
                titleIcon: 'widget://image/phone.png',
                subTitleIcon: 'widget://image/payed.png',
                totalPrice: order.get("totalPrice"),
                createTime: order.get("createdAt"),
                remark: order.get("mark"),
            };
            orderArr.push(order);
        })
        console.log("订单》》》》" + JSON.stringify(orderArr));
        return orderArr;
    }).catch(function(err) {
        alert(JSON.stringify(err))
    })
}
