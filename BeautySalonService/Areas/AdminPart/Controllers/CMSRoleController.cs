using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSRoleController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSRole
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult SaveRole(Role ObjRole)
        {
            try
            {

                DB.Role.Add(ObjRole);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

       
        public JsonResult GetRoleWithPage(int PageNum, int PageSize)
        {


            int skip = PageSize * (PageNum - 1);
            var Result = DB.Role.ToList()
           .OrderByDescending(item => item.ID)
           .Skip(skip)
           .Take(PageSize);
            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }

        public JsonResult DeleteRole(int ID)
        {
            try
            {
                var Result = DB.Role.SingleOrDefault(Item => Item.ID == ID);
                DB.Role.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult UpdateRole(Role ObjRole)
        {
            try
            {
                var Result = DB.Role.Where(item => item.ID == ObjRole.ID).ToList();
                Result[0].Name = ObjRole.Name;

                DB.SaveChanges();



                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }
    }
}