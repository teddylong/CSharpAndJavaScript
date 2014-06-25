using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CSharpAndJavaScript
{
    /// <summary>
    /// Summary description for Data
    /// </summary>
    public class Data : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            
            //string result = "[{"\""id"\"":"\""112824"\"",'firstname':'sdf','lastname':'sdf','phone':'fsdf','email':'sdf@ads.ds'}]";
            StringBuilder jsonBuilder = new StringBuilder();
            jsonBuilder.Append("[");
            jsonBuilder.Append("{");
            jsonBuilder.Append("\"");
            jsonBuilder.Append("id");
            jsonBuilder.Append("\":\"12345");
            jsonBuilder.Append("\",");

            jsonBuilder.Append("\"");
            jsonBuilder.Append("firstname");
            jsonBuilder.Append("\":\"sdf");
            jsonBuilder.Append("\",");

            jsonBuilder.Append("\"");
            jsonBuilder.Append("lastname");
            jsonBuilder.Append("\":\"sdf");
            jsonBuilder.Append("\",");

            jsonBuilder.Append("\"");
            jsonBuilder.Append("phone");
            jsonBuilder.Append("\":\"12345");
            jsonBuilder.Append("\",");

            jsonBuilder.Append("\"");
            jsonBuilder.Append("email");
            jsonBuilder.Append("\":\"sdf@ads.ds");
            jsonBuilder.Append("\"");

            jsonBuilder.Append("}]");

            context.Response.Clear();
            context.Response.Write(jsonBuilder.ToString());
            context.Response.End();
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}