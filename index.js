$(document).ready(function(){

    $name = $('#username'),//获取用户名输入框的节点
    $phone = $('#phone'),//获取电话号码输入框的节点
    $pas = $('#pass'),//获取密码输入框的节点
    $code = $('#VerificationCode'),//获取验证码输入框的节点
    $msg = $('#usernameVer'),//获取用户名输入错误时，提示框的div
    $ph = $('#phoneVer'),//获取电话号码输入错误时，提示框的div
    $ps = $('#passVer'),//获取密码输入错误时，提示框的div
    $btn = $('#but'),//获取验证的节点
    num = 6;//定义的全局变量，计时器的时候使用。

    //用户名字段验证
    //这是count函数，检测用户名字节数用的，那个用户名的字节数
    //不是有范围吗，拿这个函数来限定。
    function count(string){
        var $data = $(string);
        var str = $data.val();
        var strs = new Array();
        strs = str.split("");//这是讲字符串str分割成数组
        var sum = 0;
        var a = new TextEncoder("utf-8");//这是定义一个utf-8编码的一个对象
        for(var i=0;i < strs.length;i++){
            if(a.encode(strs[i]).length === 3){//这里的encode是检测每个字符占了几个字节
                sum+=2;//因为要求是14个字母或者是7个汉字，正好是2倍的关系
                        //有因为，在utf-8里面一个英文字母占1字节，一个汉字一般占3字节（我没找见特殊的）
                        //这里判断就是判断是否是汉字，如果是汉字，就是 +2。最后输出sum,sum 就是总的字节数
                        //后边判断用户名的时候叫   7<sum<14 就行了
            }else if(a.encode(strs[i]).length === 1){
                sum+=1;
            }     
        }
        return sum;
    }
    // 弹框提示
    //弹框提示函数，就是输入框获得焦点之后，在输入框上方弹出一个
    //提示框，id是标签的id值，content是要提示的文本。这是传的两个参数
    function tips(id,content){
        var $el = $(id);
        $el.html(content);
        $el.css("display","block");
    }
    //弹框隐藏
    //弹框隐藏函数，当输入框失去焦点时，弹框隐藏
    //因为有两个输入框都有弹框的功能，就定义成了tips和tipsover两个函数
    function tipsover(id){
        var $el = $(id);
        $el.css("display","none");
    }
    //用户名验证 
    //这是用户名验证，当用户名输入框失去焦点时验证
    //主要验证字节数范围，和用户名不能为空
    $name.blur(function(){
        tipsover("#tip1");
        console.log(count('#username'));
        var num = count('#username');
        if($name.val() === ''){
            $msg.html('用户名不能为空！');
            return false;
        }else if($name.val() != '' && num > 0 && num < 14 ){
            $msg.html('');
        }else if($name.val() != '' && num > 14 ){
            $msg.html('输入错误！');
        }
    })
    // 用户名弹框提示
    //这是用户名的弹框提示，当用户名输入框获得焦点时
    //出现弹框提示
    //“ \xa0 ” 表示空格
    $name.focus(function(){
        tips("#tip1","\xa0\xa0\xa0设置后不可修改，中英文均可，最长14个英文或7个汉字")
    })

    //手机号码验证
    //手机号验证，也是失去焦点时验证
    //主要就是用正则表达式进行验证，这里用三目运算符写的
    //可以改成  if  else
    $phone.blur(function(){
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        reg.test($phone.val()) ? $ph.html('') : $ph.html('手机号码格式不正确！');
    })

    //密码验证
    //密码验证，也是失去焦点时验证，
    //主要验证密码不为空，和密码的输入规则，这个规则就是
    //只允许数字或字母或特殊符号，不允许有空格，位数在8~14位之间
    $pas.blur(function(){
        tipsover("#tip2");
        if($pas.val() === ''){
            $ps.html('密码不能为空！');
            return false
        }else if($pas.val() != ''){
            $ps.html('');
        }
        var rex = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/;
        rex.test($pas.val()) ? $ps.html('') : $ps.html('密码设置不符合要求！');
    })
    //密码提示
    //这是密码提示上边的弹框，用了刚才上边写的 tips 函数
    //这个“ \xa0 ”是空格的意思
    $pas.focus(function(){
        tips("#tip2","\xa0\xa0\xa0长度为8~14个字符<br/>\xa0\xa0\xa0字母或数字以及标点符号至少包含两种<br/>\xa0\xa0\xa0不允许空格、中文");
    })

    //获取验证码效果
    //这个是获取验证码效果，当按钮被点击时，启动这个计时器
    //然后添加 disabled 属性，叫按钮变成不可选择里面的num就是
    //调用的一开始定义的全局变量。
    //下边那个 attr 是添加属性；removeAttr 是移除属性。
    $btn.click(function(){
        console.log($btn.val());
        var timer = setInterval(function(){
            num--;
            if(num === -1){
                clearInterval(timer);
                $btn.val('发送验证码');
                $btn.removeAttr('disabled');
                num = 6;               
            }else{
                $btn.val('已发送（'+ num + 's)');
                $btn.attr('disabled','true');
            }
        },1000);
    })
});

