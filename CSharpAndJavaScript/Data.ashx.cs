using System;
using System.Collections.Generic;
using System.Data;
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
            string type = context.Request["type"].ToString();
            

            string str_response = "";
            switch (type)
            { 
                case "GetUser":
                    str_response = GetGuys();
                    break;
                case "CaseTrend":
                    if (context.Request["depName"] != null)
                    {
                        string depName = context.Request["depName"].ToString();
                        str_response = GetCaseTrend(depName);
                    }
                    else
                    {
                        str_response = GetCaseTrend("Example");
                    }
 
                    break;
                case "GetBrowserMatrix":
                    if (context.Request["depName"] != null)
                    {
                        string depNameBrowserMatrix = context.Request["depName"].ToString();
                        str_response = GetBrowserMatrix(depNameBrowserMatrix);
                    }
                    else
                    {
                        str_response = GetBrowserMatrix("Example");
                    }
                    break;
                case "GetPlatform":
                    if (context.Request["depName"] != null)
                    {
                        string depNamePlatform = context.Request["depName"].ToString();
                        str_response = GetBrowserMatrix(depNamePlatform);
                    }
                    else
                    {
                        str_response = GetBrowserMatrix("Example");
                    }
                    break;
                case "GetApp":
                    if (context.Request["depName"] != null)
                    {
                        string depNameApp = context.Request["depName"].ToString();
                        str_response = GetApp(depNameApp);
                    }
                    else
                    {
                        str_response = GetApp("Example");
                    }
                    break;
            }
            context.Response.Clear();
            context.Response.Write(str_response);
            context.Response.End();         
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        private string GetGuys()
        {
            var dt = GetDataTable();
            return GetJson(dt);
        }

        private string GetCaseTrend(string dep)
        {
            string result = "";
            Random r = new Random();
            
            for (int i = 0; i < 31; i++)
            { 
                int number = r.Next(50);
                result += number + ",";
            }
            result = result.Remove(result.LastIndexOf(','));
            result += "%";


            for (int o = 0; o < 31; o++)
            {
                int number = r.Next(60);
                result += number + ",";
            }
            result = result.Remove(result.LastIndexOf(','));
            result += "%";


            for (int p = 0; p < 31; p++)
            {
                int number = r.Next(70);
                result += number + ",";
            }
            result = result.Remove(result.LastIndexOf(','));

            return result;
        }
        private string GetPlatform(string dep)
        {
            string result = "";
            Random r = new Random();
            int x = r.Next(100);
            int y = r.Next(100 - x);
            int z = 100 - x - y;
            int[] array = new int[3] { x, y, z };
            foreach (int n in array)
            {
                int xx = r.Next(n);
                int yy = r.Next(n - xx);
                int zz = n - xx - yy;
                result += n + "," + xx + "," + yy + "," + zz + "%";
            }
            return result;
        }
        private string GetBrowserMatrix(string dep)
        {
            string result = "";
            Random r = new Random();
            int x = r.Next(100);
            int y = r.Next(100 - x);
            int z = 100 - x - y;
            int[] array = new int[3]{x,y,z};
            foreach (int n in array)
            {        
                int xx = r.Next(n);
                int yy = r.Next(n - xx);
                int zz = n - xx - yy;
                result += n + "," + xx+"," + yy +"," + zz + "%";
            }
            return result;
        }

        private string GetApp(string dep)
        {
            string result = "";
            Random r = new Random();
            int x = r.Next(100);
            int y = 100 - x;
            int[] array = new int[2] { x, y};
            foreach (int n in array)
            {
                int xx = r.Next(n);
                int yy = r.Next(n - xx);
                int zz = n - xx - yy;
                result += n + "," + xx + "," + yy + "," + zz + "%";
            }
            return result;
        }
        private DataTable GetDataTable()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("caseid", typeof(Int16));
            dt.Columns.Add("name", typeof(String));
            dt.Columns.Add("time", typeof(String));
            dt.Columns.Add("success", typeof(String));
            dt.Columns.Add("fail", typeof(String));
            dt.Columns.Add("result", typeof(String));
            dt.Columns.Add("platform", typeof(String));

            dt.Rows.Add(new object[] { 23244, "ExceptionHandlingTest", "2014-06-26 11:32:59", "0", "3","Fail","PC Android" });
            dt.Rows.Add(new object[] { 23249, "H5TestInBrowser", "2014-06/26 15:55:08", "0", "3", "Fail", "Android" });
            dt.Rows.Add(new object[] { 23250, "H5TestInBrowser2", "2014-06/26 15:55:11", "0", "3", "Fail", "Android" });
            dt.Rows.Add(new object[] { 23361, "H5TestInAndroidPhone", "2014-06/26 6:04:00", "1", "3", "Fail", "PC" });
            dt.Rows.Add(new object[] { 23454, "H5TestInAndroidPhone", "2014-06/26 6:11:26", "0", "0", "Warn", "PC Android" });
            dt.Rows.Add(new object[] { 23459, "H5TestEnterRimBooking", "2014-06/26 6:12:49", "1", "0", "Pass", "PC" });
            dt.Rows.Add(new object[] { 23460, "H5TestOrderInformation", "2014-06/26 6:13:44", "1", "0", "Pass", "PC Android" });
            dt.Rows.Add(new object[] { 23461, "H5TestInlandTravel", "2014-06/26 6:13:44", "1", "0", "Pass", "PC Android" });
            dt.Rows.Add(new object[] { 23463, "H5TestInlandBooking", "2014-06/26 6:13:44", "1", "0", "Pass", "PC Android" });
            dt.Rows.Add(new object[] { 23464, "H5TestInlandOrderInformation", "2014-06/26 6:13:44", "1", "0", "Pass", "PC Android" });
            dt.Rows.Add(new object[] { 23483, "H5TestOneDayDepart", "2014-06/26 6:16:44", "0", "1", "Fail", "Android" });
            dt.Rows.Add(new object[] { 23484, "H5TestOneDayTravel", "2014-06/26 6:19:44", "1", "0", "Pass", "PC Android" });
            dt.Rows.Add(new object[] { 23485, "H5TestOneDayBooking", "2014-06/26 6:13:44", "1", "0", "Pass", "Android" });
            dt.Rows.Add(new object[] { 23486, "H5TestOneDayDepart", "2014-06/26 6:43:44", "1", "0", "Pass", "PC Android" });
            return dt;
        }
        public string GetJson(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new

            System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows =
              new List<Dictionary<string, object>>();
            Dictionary<string, object> row = null;

            foreach (DataRow dr in dt.Rows)
            {
                row = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    row.Add(col.ColumnName.Trim(), dr[col]);
                }
                rows.Add(row);
            }
            return serializer.Serialize(rows);
        }
    }
}