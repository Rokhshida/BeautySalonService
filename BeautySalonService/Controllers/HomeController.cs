using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Controllers;
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

            VisitSave("Home", "Services");
            return View();
        }
        public ActionResult Gallery()
        {
            return View();
        }

       
        public ActionResult Contact()
        {

            return View();
            
        }

        public ActionResult googlemap()
        {

            return View();

        }
     public void VisitSave(string Controller,string page) 
     {   var browser = Request.Browser; 
         var REFERER = Request.ServerVariables["HTTP_REFERER"];
         CMSVisitorController ObjControl=new CMSVisitorController();
         ObjControl.SaveVisitor(GetUser_IP(), browser.Browser, browser.Platform, REFERER, Controller, page);
      
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