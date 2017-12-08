// 密码修改
function form12submit() {
	var p2 = $("#pass2").val();
	var p3 = $("#pass3").val();
	if (p2 != p3) {
		alert("输入密码不匹配");
		return false;
	}
	$.post( "../user/updateUserpassword", {
		id : $("#userId").val(),
		p1 : $("#pass1").val(),
		p2 : p2
	}, function(data) {
		if (data == "true") {
			alert("修改成功!!!");
			$('#myModal12').modal('hide');
		} else {
			alert("旧密码输入错误!!");
		}
	});
}


//用户管理
function findAllUsers() {
	$("#showdata").empty();
	$("#showdata").append('<h3 class="page-header text-info">用户管理</h3>');
	$("#showdata")
			.append(
					'<table id="table122" class="table table-bordered" width="100%" class="display compact"><thead><tr class="text-info"><th height="30px" width="70px" class="th1">用户名</th><th width="120px" class="th1">注册邮箱</th><th width="100px" class="th1">电话</th><th width="150px" class="th1">注册时间</th><th width="50px">查看</th><th width="30px">操作</th></tr></thead><tbody id="t122"></tbody></table>');
	$
			.ajax({
				type : 'post',
                dataType : 'json',
				url :  ".." +
				"/user/findAllUsers",
				cache : false,
				error : function(data) {
					alert("出错了！！");
				},
				success : function(data) {
                    var dataObj=data;

                   //alert(val);
                    for ( var i=0;i<dataObj.sTime.length;i++) {
                  // alert(dataObj.sDB[].id);
                        var val=dataObj.sDB[i].id;
                        $("#t122")
                            .append(

                               " <tr style='font-size: 13px;height: 45px;' id='hehhe'><td ondblclick='ShowElement(this)' id='username11'"+i+" userId='"+val+"'>"
                                + dataObj.sDB[i].username
                                + "</td><td ondblclick='ShowElement(this)'  userId='"+val+"'>"
                                + dataObj.sDB[i].email
                                + "</td><td ondblclick='ShowElement(this)'  userId='"+val+"'>"
                                + dataObj.sDB[i].phone
                                + "</td><td ondblclick='ShowElement(this)' >"
                                + dataObj.sTime[i]
                                + "</td><td><button type='button' onclick='findUserById("
                                + dataObj.sDB[i].id
                                + ")' class='btn btn-mini btn-info'>详细</button></td><td><button type='button' onclick='updateUserById("
                                + dataObj.sDB[i].id
                                + ")' class='btn btn-mini btn-info'>修改</button><button type='button' onclick='dele("
                                                                + dataObj.sDB[i].id  +")' class='btn btn-mini btn-info'>删除</button></td></tr>");
                    }
					$("#table122")
							.dataTable(
									{
										"bInfo" : true,
										"sPaginationType" : "full_numbers",
										"bPaginate" : true,
										"display": "compact",
										"bLengthChange" : true,
										"iDisplayLength" : 5,
										"aLengthMenu" : [ 5, 10, 20, 50, 100 ],
										"bProcessing" : true,
										"oLanguage" : {// 下面是一些汉语翻译
											"sSearch" : "搜索",
											"sLengthMenu" : "每页显示 _MENU_ 条记录",
											"sZeroRecords" : "没有检索到数据",
											"sInfo" : "显示 _START_ 至 _END_ 条 &nbsp;&nbsp;共 _TOTAL_ 条",
											"sInfoFiltered" : "(筛选自 _MAX_ 条数据)",
											"sInfoEmtpy" : "没有数据",
											"sProcessing" : "正在加载数据...",
											"oPaginate" : {
												"sFirst" : "首页",
												"sPrevious" : "前一页",
												"sNext" : "后一页",
												"sLast" : "末页"
											}
										},
									});
				}
			});
}

function findUserById(id) {
	$.ajax({
		data : {
			id : id
		},
		type : 'post',
		dataType : 'json',
		url :  '../user/findUserByUserId',
		cache : false,
		error : function(data) {
			alert("出错了！！");
		},
		success : function(data) {
			showInfo(data);
			$('#myModal22').modal('show');
		}
	});
}

function updateUserById(id) {
	$.ajax({
		data : {
			id : id
		},
		type : 'post',
		dataType : 'json',
		url :  '../user/findUserByUserId',
		cache : false,
		error : function(data) {
			alert("出错了！！");
		},
		success : function(data) {
			showInfo1(data);
			$('#myModal52').modal('show');
		}
	});
}



function form52submit() {
	$.post( '../user/updateUserById', {
		id : $("#id52").val(),
		username : $("#us52").val(),
		email : $("#em52").val(),
		phone : $("#te52").val(),
		created : $("#reg52").val()
	}, function(data) {
		alert(data);
		$('#myModal52').modal('hide');
		findAllUsers();
	});
}



function deleteUserById(id) {
	$.post("../user/deleteUserByUserId", {
		id : id
	}, function() {
		findAllUsers();
	});
}

function showInfo(data) {
    var json= data;
    var obj=eval(json);
    //alert(obj.data.username);
	$("#usernameID2").text(obj.data.username);
	$("#emailID2").text(obj.data.email);
	$("#telephoneID2").text(obj.data.phone);
	$("#regtimeID2").text(obj.time);
}

function showInfo1(data) {
    var json= data;
    var obj=eval(json);
	$("#us52").val(obj.data.username);
	$("#id52").val(obj.data.id);
	$("#em52").val(obj.data.email);
	$("#te52").val(obj.data.phone);
	$("#reg52").val(obj.time);
}
function dele(id){
    if(confirm("确认删除吗")){
        deleteUserById(id);
    }
    else{

        return;
    }
}

function ShowElement(element,id)
{
    //alert( $(element).parent().find('td:eq(1)').text());
  var id=$(element).attr("userId");
  // alert(id);
    var oldhtml = element.innerHTML;
    var newobj = document.createElement('input');
//创建新的input元素
    newobj.type = 'text';
//为新增元素添加类型
    newobj.onblur = function(){
    	 if(this.value==""){
             element.innerHTML = oldhtml;
        }else{

        element.innerHTML = this.value;
        upadteText(element,id);}
		//alert( this.value);

	//	element.innerHTML = this.value ? this.value : oldhtml;
      //  upadteText(element,id);
//当触发时判断新增元素值是否为空，为空则不修改，并返回原有值
       // updateUserTextById($(element).attr("userId"));

    }

    element.innerHTML = '';
    element.appendChild(newobj);
    newobj.focus();

}
function  upadteText(element,id){


    $.post( '../user/updateUserTextById', {
        id : id,
        username : $(element).parent().find('td:eq(0)').text(),
        email :  $(element).parent().find('td:eq(1)').text(),
        phone :$(element).parent().find('td:eq(2)').text(),
    }, function(data) {
    	alert(data);
        $('#myModal52').modal('hide');
        findAllUsers();
    });

}