$(function(){
$('input[name="newpass"]').focus(function(){
    $(this).next().text('密码应该为6-20位之间').removeClass('state1').addClass('state2');
}).blur(function(){
    if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!=''){
        $(this).next().text('输入成功').removeClass('state1').addClass('state4');
        ok2=true;
    }else{
        $(this).next().text('密码应该为6-20位之间').removeClass('state1').addClass('state3');
        ok2=false;
    }
     
});
$('input[name="renewpass"]').focus(function(){
    $(this).next().text('请再次输入密码').removeClass('state1').addClass('state2');
}).blur(function(){
	
    if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!='' && $(this).val() == $('input[name="renewpass"]').val()){
        $(this).next().text('输入成功').removeClass('state1').addClass('state4');
        ok3=true;
    }else{
        $(this).next().text('两次密码输入不一致').removeClass('state1').addClass('state3');
        ok3=false;
    }
     
});
});