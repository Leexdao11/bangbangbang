var username;
var age;
var descriptions;
var cotents;
var hobby;
var email;
var nowwork;
var skills;
var blogs;
var suggesttions;
var purl;
var mp3;
$(document).ready(function(){
	
	$(".show4").click(function(){
		
		 var memberid= $(this).prev('input:hidden').val();
		
		 $.ajax({                 
	         type: "POST",
	         url: "modifyMember.do?id="+memberid,
	         dataType: "json", 
	         success: function (data){
	        	username=data[0].user.username;
	        	age=data[0].user.age;
	        	descriptions=data[0].descriptions;
	        	hobby=data[0].user.hobby;
	        	email=data[0].user.email;
	        	nowwork=data[0].nowwork;
	        	cotents=data[0].cotents;
	        	skills=data[0].skills;
	        	blogs=data[0].blogs;
	        	suggesttions=data[0].suggesttions;
	        	purl=data[0].purl;
	        	mp3=data[0].mp3;
	        	$("#membername").text(username);
	        	$("#memberage").text(age);
	        	$("#memberdescriptions").text(cotents);
	        	$("#memberhobby").text(hobby);
	        	$("#memberemail").text(email);
	        	$("#membernowwork").text(nowwork);
	        	$("#memberskills").text(skills);
	        	$("#memberblogs").text(blogs);
	        	$("#membersuggesttions").text(suggesttions);
	        	$("#memberpurl").attr("src",purl); 
	        	$("#mp3").attr("src",mp3); 
	}
	});       
	});
 $("#jplusdesc1").click(function(){
      console.log('jplusdesc1');
	 
	  $(".jplusdesc").css("display","block");
	  $(".j_mymessages").css("display","none");
  $(".j_mypl").css("display","none");
	  $(".menuList").css("display","none");
  
  });
});
	
	
	