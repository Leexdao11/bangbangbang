package com.controller;



import com.alibaba.fastjson.JSONObject;
import com.entity.User;
import com.service.WebManageService;
import com.utils.MD5keyUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Controller
public class WebManageController {

	/**
	 *
	 */


	@Autowired
	public  WebManageService webManageService;

	/**
	 * 用户管理
	 */
	//修改密码
	@RequestMapping("user/updateUserpassword")
	public void updateUserpassword(HttpServletResponse response,
			@RequestParam("id") Long id,
			@RequestParam("p1") String p1,
			@RequestParam("p2") String p2) throws
			Exception {
		User user = webManageService.findUserByUserId(id);
		MD5keyUtil md5 = new MD5keyUtil();
		String p11 = md5.getkeyBeanofStr(p1);
		String p21 = md5.getkeyBeanofStr(p2);
		if (p11.equals(user.getUserpass())) {
			user.setUserpass(p21);
			webManageService.updateUser(user);
			response.getWriter().print("true");
		} else {
			response.getWriter().print("false");
		}
	}
	
	//注销
	@RequestMapping("user/login_out")
	public String login_out(HttpSession session){
		session.removeAttribute("user");
		return "manager_login";
	}

	@RequestMapping(value = "user/findAllUsers", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject findAllUsers(HttpServletResponse response) throws Exception{
		JSONObject result = new JSONObject();
		try {
			List<User> users = webManageService.findAllUsers();
			System.out.println(users);
			ArrayList<User> a = new ArrayList<User>();
			List<String> itDate=new ArrayList<String>();
			for (User u : users) {
				if (u.getUsername() == null) {
					u.setUsername("无");
				}
				if (u.getPhone() == null) {
					u.setPhone("无");
				}
				if (u.getEmail() == null) {
					u.setEmail("无");
				}
				Date date = u.getCreated();//得到数据库的时间
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String s = sdf.format(date);
				itDate.add(s);
				a.add(u);
			}


			result.put("sDB", a);
			result.put("sTime", itDate);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return result;
		}

//		for(String p:itDate){
//			System.out.println(p);
//		}
//		JSONArray json = new JSONArray();
//		response.getWriter().println(json);
//		String sDB = json.fromObject(a).toString();
//		String sTime = json.fromObject(itDate).toString();
//		String s = "{"+"\"sTime\""+":"+sTime+","+"\"sDB\""+":"+""+sDB+"}";
//		System.out.println(s);
////发送前台
//		PrintWriter out = response.getWriter();
//		out.print(s);
//		return s;
	}
	
	@RequestMapping(value="user/findUserByUserId", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public JSONObject findUserByUserId(HttpServletResponse response,
									   @RequestParam("id") Long id) throws Exception {
		User user = webManageService.findUserByUserId(id);
		Date date=user.getCreated();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
		String s=sdf.format(date);
		response.setContentType("text/html;charset=UTF-8");
		JSONObject jo = new JSONObject();
		jo.put("data",user);
		jo.put("time",s);
		//System.out.println(jo);
		return jo;

	}
	
	@RequestMapping("user/updateUserById")
	public void updateUserById(
			HttpServletResponse response,
			@RequestParam("id") Long id,
			@RequestParam("username") String username,
			@RequestParam("email") String email,
			@RequestParam("phone") String phone)
			throws Exception {
		User user = webManageService.findUserByUserId(id);
		user.setUsername(username);
		user.setPhone(phone);
		user.setEmail(email);
		final String pattern1 = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
		final Pattern pattern = Pattern.compile(pattern1);
		final Matcher mat = pattern.matcher(email);
		if (!mat.find()) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("邮箱格式不正确，修改失败");
			return;
		}
		final String pattern2 = "^[1][3,4,5,8][0-9]{9}$";
		final Pattern pattern3= Pattern.compile(pattern2);
		final Matcher mat1 = pattern3.matcher(phone);
		if (!mat1.find()) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("手机号格式不正确，修改失败");
			return;
		}

		webManageService.updateUser(user);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("修改成功");
	}

	@RequestMapping(value = "user/deleteUserByUserId")
	public String deleteUserByUserId(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String uid = request.getParameter("id");
		webManageService.deleteUserByUserId(Long.parseLong(uid));
		response.getWriter().print("");
		return null;
	}

	@RequestMapping(value ="user/updateUserTextById",produces = "application/json;charset=UTF-8")
	@ResponseBody
	public void updateUserTextById(
			HttpServletResponse response,
			@RequestParam("id") Long id,
			@RequestParam("username") String username,
			@RequestParam("email") String email,
			@RequestParam("phone") String phone)
			throws Exception {
		User user = webManageService.findUserByUserId(id);
		System.out.println(id);
		System.out.println(user);
		System.out.println(username);
		System.out.println(phone);
		user.setUsername(username);
		user.setPhone(phone);
		user.setEmail(email);
		final String pattern1 = "^([a-z0-9A-Z]+[-|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
		final Pattern pattern = Pattern.compile(pattern1);
		final Matcher mat = pattern.matcher(email);
		if (!mat.find()) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("邮箱格式不正确，修改失败");
			return;
		}
		final String pattern2 = "^[1][3,4,5,8][0-9]{9}$";
		final Pattern pattern3= Pattern.compile(pattern2);
		final Matcher mat1 = pattern3.matcher(phone);
		if (!mat1.find()) {
			response.setContentType("text/html;charset=utf-8");
			response.getWriter().write("手机号格式不正确，修改失败");
			return;
		}

		webManageService.updateUser(user);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().write("修改成功");
	}

	@RequestMapping(value ="/webManage1")
	public ModelAndView webManage1() throws Exception {
		return new ModelAndView("webManage1");
	}

//	@RequestMapping(value ="/jpush")
//	public  void Jpush() throws APIConnectionException, APIRequestException {
//		JPushClient jPushClient = new JPushClient("6f88af79ddd8a704f48195d0", "d2644cabc1346c84039f2f87");
//
//		String  alert="hahahaha";
//		String  userId="account_519";
//		//JPushHelper.sendPush(userId,alert);
//		PushPayload pushPayload=sendPush(userId,alert);
//		PushResult result = jPushClient.sendPush(pushPayload);
//		System.out.println(result);
//		System.out.println("123qqqq.................");
//	}
		//单例
//	private static  JPushHelper jPushHelper=null;
//	private JPushHelper(){
//		JPushClient jPushClient = new JPushClient("6f88af79ddd8a704f48195d0", "d2644cabc1346c84039f2f87");  //appkey和matersecret
//	}
//	public static synchronized JPushHelper getInstance(){
//		if(jPushHelper==null){
//			jPushHelper=new JPushHelper();
//		}
//		return jPushHelper;
//	}



//		public  static PushPayload sendPush(String userId, String alert) throws APIConnectionException, APIRequestException {
//
//			//JSONObject json = new JSONObject();
//			//json.put("huaxin",map1);
//			Map<String,String> map = new HashMap<String,String>();
//			map.put("id","123");
//			return	PushPayload.newBuilder()
//					. setPlatform(Platform.ios())       //推送的平台  Platform.ios()--ios平台  Platform.android()--安卓平台
//					.setAudience(Audience.all())       //推送的对象
//					.setNotification(Notification.newBuilder()
//							.addPlatformNotification(IosNotification.newBuilder()
//									.setAlert(alert)      //alert为推送内容
//									.setBadge(1)         //角标显示的数字
//									.setSound("happy")    //设置推送的声音
//									.addExtras(map)       //附加字段
//									.build())
//							.build())
//					.setMessage(Message.content("hehhehhe"))  //推送内容是 - 内容为 MSG_CONTENT 的消息
//					.setOptions(Options.newBuilder()
//							.setApnsProduction(true)
//							.build())
//					.build();
//
//
//
//			//JSONObject jsonObject = new JSONObject();
//			//jsonObject.put("msg", "llll");
//			//return jsonObject;
//		}

	}


