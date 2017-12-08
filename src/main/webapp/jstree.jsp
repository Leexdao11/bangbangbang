<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/10/27
  Time: 11:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/jstree.min.js"></script>
    <title>jstree</title>
</head>
<body>
<div id="container"></div>
<script>
  $(function() {
    $('#container').jstree({
      'core' : {
        'data' : [
          { "text" : "Root noe", "children" : [
            { "text" : "Child node 1" ,"state" :{"selected":true}},
            { "text" : "Child node 2","children":[
                {"text":"youyige"}
            ] }
          ]
          }
        ]
      }
    });
  });
</script>
</body>
</html>
