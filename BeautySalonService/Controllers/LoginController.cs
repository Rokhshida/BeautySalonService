using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
using BeautySalonService.Areas.AdminPart.Controllers;
namespace BeautySalonService.Controllers
{
    public class LoginController : Controller
    {

        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CheckLogin(string username, string password)
        {
            

           // var Result = DB.Usp_CheckLogin(username,password).ToList();
            var Result = DB.Usp_CheckLogin(username, CommonFunction.EncodePasswordToBase64(password)).ToList();

            if (Result.Count != 0)
            {
                Session["Sess_Name"] = Result[0].Name;
                Session["Sess_Family"] = Result[0].Family;
                Session["Sess_IDPerson"] = Result[0].ID;
                Session["Sess_Email"] = Result[0].Email;
                Session["Sess_PicPath"] = Result[0].PicturePath;
                if (Result[0].ID_Role == 1)
                { return Redirect("/AdminPart/CMSHome"); }
                else
                {

                    return Redirect("/");
                }

            }

            else
            {
                Session["Sess_Msg"] = "نام کاربری یا رمز عبور صحیح نمی باشد.";
                return Redirect("/Login");
            }


        }
    }
}