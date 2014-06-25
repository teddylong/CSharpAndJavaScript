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
                    string depName = context.Request["depName"].ToString();
                    str_response = GetCaseTrend(depName);
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

        private DataTable GetDataTable()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("id", typeof(Int16));
            dt.Columns.Add("firstname", typeof(String));
            dt.Columns.Add("lastname", typeof(String));
            dt.Columns.Add("phone", typeof(String));
            dt.Columns.Add("email", typeof(String));
            

            dt.Rows.Add(new object[] { 1, "Michael", "Scofield", "123456", "asdas@loi.com" });
            dt.Rows.Add(new object[] { 2, "Lincoln", "Burrows", "989789","kliou@98.com" });
            dt.Rows.Add(new object[] { 3, "Theodore", "Bagwell", "646456","aasfdgh@ds.com" });
            dt.Rows.Add(new object[] { 4, "John", "Abruzzi", "34566634", "ghjgh7456@ds.com" });
            dt.Rows.Add(new object[] { 5, "Fernando", "Sucre", "12888", "lfbh63@ds.com" });
            dt.Rows.Add(new object[] { 6, "Sara", "Tancredi", "09876", "kjhgf@ds.com" });
            dt.Rows.Add(new object[] { 7, "Alexander", "Mahone", "76543232", "poiuyt@ds.com" });
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