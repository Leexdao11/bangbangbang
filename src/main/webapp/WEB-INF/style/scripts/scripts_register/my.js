     var ok1=false;
     var ok2=false;
     var ok3=false;
     var ok4=false;
$(function(){
	$("#username").blur(function(){
		
		
		 var un=$("#username").val();
		 if(un==""){
			 $(this).next().text('用户名不能为空').removeClass('state1').addClass('state3');
			 ok1=false;
			 return ;
		 }
		 
		
		 $.ajax({                 
	         type: "POST",
	         url: "../getsameUser.do?username="+un,
	         dataType: "text", 
	         success: function (data){
	        	   if(data=="notexist"){
	        		   
	        		   $("#result4").html("用户名可用").removeClass('state1').addClass('state4');
	        		   ok1=true;
	        	   }
	        	   if(data=="exist"){
	        		  
	        		   $("#result4").html("用户名已经存在!").removeClass('state1').addClass('state3');
	        		   ok1=false;
	        	   }
	        	      
	        	      
	        	      
	}
	}); 
		
	});
	
	
	

	
	

	
$('input[name="password"]').focus(function(){
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

//验证确认密码
    $('input[name="repass"]').focus(function(){
    $(this).next().text('请再次输入密码').removeClass('state1').addClass('state2');
}).blur(function(){
	
    if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!='' && $(this).val() == $("#password").val()){
        $(this).next().text('输入成功').removeClass('state1').addClass('state4');
        ok3=true;
    }else{
        $(this).next().text('两次密码输入不一致').removeClass('state1').addClass('state3');
        ok3=false;
    }
     
});

//验证邮箱
$('input[name="email"]').focus(function(){
    $(this).next().text('请输入正确的EMAIL格式').removeClass('state1').addClass('state2');
}).blur(function(){
    if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1){
        $(this).next().text('请输入正确的EMAIL格式').removeClass('state1').addClass('state3');
        ok4=false;
    }else{                  
        $(this).next().text('输入成功').removeClass('state1').addClass('state4');
        ok4=true;
    }
     
});

//提交按钮,所有验证通过方可提交

$('#qr').click(function(){
    if(ok1 && ok2 && ok3 && ok4){
        $("#myform").submit();
    }else{
        return false;
    }
});
 
});