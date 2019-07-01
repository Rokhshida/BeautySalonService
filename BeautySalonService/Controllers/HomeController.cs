using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeautySalonService.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        // GET: Home
        public ActionResult About()
        {
            return View();
        }

        public ActionResult Services()
        {
            return View();
        }
        public ActionResult Gallery()
        {
            return View();
        }

        public ActionResult AllSalon()
        {
            return View();
        }
        public ActionResult Contact()
        {

            return View();
            
        }


     public void VisitSave() 
     {   var browser = Request.Browser; 
         var REFERER = Request.ServerVariables["HTTP_REFERER"]; 
         // var REFERER = Request.UrlReferrer;
         //DB.Tbl_Visit.Add(new Tbl_Visit()
         //{ Vis_Date = MiladiToShamsi(DateTime.Now) + "_" + DateTime.Now.Hour + ":" + DateTime.Now.Minute + ":" + DateTime.Now.Second,
         //    Vis_IP = GetUser_IP(), Vis_Browser = browser.Browser, Vis_Platform= browser.Platform, Vis_Referer = REFERER }); 
         //DB.SaveChanges();
     } 
        protected string GetUser_IP()
        { 
            string VisitorsIPAddr = string.Empty; 
             if (HttpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"] != null) 
             { VisitorsIPAddr = HttpContext.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString(); } 
             else if (HttpContext.Request.UserHostAddress.Length != 0)
             { VisitorsIPAddr = HttpContext.Request.UserHostAddress; }
             return VisitorsIPAddr;
        } 



    }


}