using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSVisitorController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSVisitor
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveVisitor(string Vis_IP, string Vis_Browser, string Vis_Platform, string Vis_Referer, string Controller, string page,int? IDRelated=0)
        {
            try
            {
                Visitor ObjVisitor=new Visitor();
                ObjVisitor.Vis_Date  = CommonFunction.GetDateNow();
             ObjVisitor.Vis_IP =Vis_IP;
             ObjVisitor.Vis_Browser=Vis_Browser ;
             ObjVisitor.Vis_Platform=Vis_Platform;
             ObjVisitor.Vis_Referer = Vis_Referer;
             ObjVisitor.Controller = Controller;
             ObjVisitor.PageName = page;
             if (IDRelated != 0) ObjVisitor.IDRelated = IDRelated; 
                DB.SaveChanges();
                return Json(ObjVisitor.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

    }
}