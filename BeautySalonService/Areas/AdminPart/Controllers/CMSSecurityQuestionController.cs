using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSSecurityQuestionController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSSecurityQuestion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveSecurityQuestion(SecurityQuestion ObjSecurityQuestion)
        {
            try
            {
                ObjSecurityQuestion.CreatedDate = CommonFunction.GetDateNow();
                ObjSecurityQuestion.ModifiedDate = CommonFunction.GetDateNow();
                DB.SecurityQuestion.Add(ObjSecurityQuestion);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

        public JsonResult GetSecurityQuestion()
        {
            try
            {
                var Result = DB.SecurityQuestion.ToList();


                return Json(Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }



        public JsonResult DeleteSecurityQuestion(int ID)
        {
            try
            {
                var Result = DB.SecurityQuestion.SingleOrDefault(Item => Item.ID == ID);
                DB.SecurityQuestion.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }


        public JsonResult UpdateSecurityQuestion(SecurityQuestion ObjSecurityQuestion)
        {
            try
            {
                var Result = DB.SecurityQuestion.Where(item => item.ID == ObjSecurityQuestion.ID).ToList();
                Result[0].Question = ObjSecurityQuestion.Question;
                Result[0].ModifiedDate = CommonFunction.GetDateNow();

                DB.SaveChanges();



                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }
    }
}