<%@ page language="java" import="java.util.*"  contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>lwhl古董网站后台管理</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta content="width=device-width,initial-scale=1.0" name="viewport">
<script type="text/javascript"
	src="${pageContext.request.contextPath }/style/bootstrap/jquery-1.11.3.min.js"></script>
<link href="${pageContext.request.contextPath }/style/bootstrap/bootstrap.min.css"
	rel="stylesheet" />
<link href="${pageContext.request.contextPath }/style/bootstrap/bootstrap-responsive.min.css"
	rel="stylesheet" />
<link href="${pageContext.request.contextPath }/manage/jquerytable/jquery.dataTables.css" rel="stylesheet" />
<script type="text/javascript"
	src="${pageContext.request.contextPath }/style/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/manage/jquerytable/jquery.dataTables.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/style/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath }/manage/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/manage/js/main_web.js"></script>
	<script type="text/javascript">
        /* 鼠标点击特效 */
        var a_idx = 0;
        jQuery(document).ready(function($) {
            $("body").click(function(e) {
                var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善");
                var $i = $("<span/>").text(a[a_idx]);
                a_idx = (a_idx + 1) % a.length;
                var x = e.pageX,
                    y = e.pageY;
                $i.css({
                    "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
                    "top":y-20,
                    "left": x,
                    "position": "absolute",
                    "font-weight": "bold",
                    "color": "blue"
                });
                $("body").append($i);
                $i.animate({
                        "top": y - 180,
                        "opacity": 0
                    },
                    1500,
                    function() {
                        $i.remove();
                    });
            });
        });
	</script>
<style type="text/css">
.modal input {
	height: 28px;
}
</style>
</head>


<body>
	<input type="hidden" name="id" value="${user.id}" id="userId" />
	<div class="navbar navbar-inverse">
		<div class="navbar-inner">
			<div class="container">
				<a class="brand"
					href="${pageContext.request.contextPath }/manage/login">lwhl古董网站管理员</a>
				<div class="nav-collapse collapse" style="margin-right: 25px;">
					<ul class="nav pull-right">
						<h5>
							<span class="text-info">欢迎</span> <span class="dropdown">
								<button id="dLabel" type="button" data-toggle="dropdown"
									aria-haspopup="true" aria-expanded="false">
									${user.username} <span class="caret"></span>
								</button>
								<ul class="dropdown-menu" aria-labelledby="dLabel">
									<li><a href="#myModal11" data-toggle="modal">查看信息</a></li>
									<li><a href="#myModal12" data-toggle="modal">密码修改</a></li>
									<li><a href="${pageContext.request.contextPath }/user/login_out">注销</a></li>
								</ul> </span>
						</h5>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div id="myModal11" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="myModalLabel">用户基本信息查看</h3>
		</div>
		<div class="modal-body">
			<table class="table table-bordered">
				<tr>
					<td>用户名 ：</td>
					<td>${user.username}</td>
				</tr>
				<tr>
					<td>邮箱：</td>
					<td>${user.email}</td>
				</tr>
				<tr>
					<td>联系方式：</td>
					<td>${user.phone}</td>
				</tr>
				<tr>
					<td>注册时间：</td>
					<td><fmt:formatDate value="${user.created}" /></td>
				</tr>
			</table>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		</div>
	</div>
	<div id="myModal12" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="myModalLabel">密码修改</h3>
		</div>
		<div class="modal-body">
			<form id="form12" method="post">
				<table class="table table-bordered">
					<tr>
						<td>旧密码：</td>
						<td><input type="password" name="password11" id="pass1" />
						</td>
					</tr>
					<tr>
						<td>新密码：</td>
						<td><input type="password" name="password12" id="pass2" />
						</td>
					</tr>
					<tr>
						<td>确认密码：</td>
						<td><input type="password" name="password13" id="pass3" />
						</td>
					</tr>
				</table>
			</form>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
			<button type="button" class="btn btn-primary"
				onclick="form12submit()">保存</button>
		</div>
	</div>
	<div class="container-fluid">
		<div class="row-fluid">
			<div class="span2">
				<div class="accordion" id="accordion2">
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findAllUsers()"><span
								class="icon-home"></span>&nbsp;&nbsp;用户管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findAllNews()"> <span
									class="icon-home"></span>&nbsp;&nbsp;新闻管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findAllPosting()"> <span
									class="icon-home"></span>&nbsp;&nbsp;论坛管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findAllPostingReply()"> <span
									class="icon-home"></span>&nbsp;&nbsp;帖子管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findHolding()"> <span
									class="icon-home"></span>&nbsp;&nbsp;藏品管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="findOrders()"> <span
									class="icon-home"></span>&nbsp;&nbsp;订单管理</a>
						</div>
					</div>
					<div class="accordion-group">
						<div class="accordion-heading">
							<a class="accordion-toggle" onclick="find()"> <span
									class="icon-home"></span>&nbsp;&nbsp;网站常务</a>
						</div>
					</div>
				</div>
			</div>
			<div class="span10" style="height: 100%">
				<div id="showdata">
					<h3 align="center" style="margin-top: 250px;">
						<font face="楷体" size="15px">lwhl网站后台管理</font>
					</h3>
				</div>
			</div>
		</div>
	</div>
	






	

	<div id="myModal22" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="myModalLabel">用户基本信息查看</h3>
		</div>
		<div class="modal-body">
			<table class="table table-bordered">
				<tr>
					<td>用户名 ：</td>
					<td id="usernameID2"></td>
				</tr>
				<tr>
					<td>邮箱：</td>
					<td id="emailID2"></td>
				</tr>
				<tr>
					<td>电话号码：</td>
					<td id="telephoneID2"></td>
				</tr>
				<tr>
					<td>注册时间：</td>
					<td id="regtimeID2"></td>
				</tr>
			</table>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>
		</div>
	</div>
	<div id="myModal52" class="modal hide fade" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal"
				aria-hidden="true">×</button>
			<h3 id="myModalLabel">用户基本信息修改</h3>
		</div>
		<div class="modal-body">
			<form id="form52" method="post">
				<input type="hidden" name="id"  id="id52" />
				<table class="table table-bordered">
					<tr>
						<td>用户名:</td>
						<td><input type="text" id="us52" name="username"></td>
					</tr>
					<tr>
						<td>邮箱:</td>
						<td><input type="text" id="em52" name="email"></td>
					</tr>
					<tr>
						<td>电话号码:</td>
						<td><input type="text" id="te52" name="phone"></td>
					</tr>
					<tr>
						<td>注册时间:</td>
						<td><input type="text" id="reg52" name="created"
								   onfocus="WdatePicker({dateFmt:'yyyy年MM月dd日 HH时mm分ss秒'})"
								   readonly="readonly" /></td>
					</tr>
				</table>
			</form>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
			<button type="button" class="btn btn-primary"
				onclick="form52submit()">保存</button>
		</div>
	</div>
</body>
</html>
    