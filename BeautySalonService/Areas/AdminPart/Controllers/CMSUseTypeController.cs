using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSUseTypeController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSUseType
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetUseType()
        {
            try
            {

                var Result = DB.UseType.ToList();
                 return Json(Result, JsonRequestBehavior.AllowGet);
                


            }
            catch (Exception EX) { throw EX; }
        }


    }
}