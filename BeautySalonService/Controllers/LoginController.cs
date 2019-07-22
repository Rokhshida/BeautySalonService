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
            if (Result[0].ApprovedState == (int)CommonFunction.En_ApproveState.Approved)
            {

                {

                    Session["Sess_Name"] = Result[0].Name;
                    Session["Sess_Family"] = Result[0].Family;
                    Session["Sess_IDPerson"] = Result[0].ID;
                    Session["Sess_Email"] = Result[0].Email;
                    Session["Sess_PicPath"] = Result[0].PicturePath;
                    Session["Sess_ID_Role"] = Result[0].ID_Role;
                    if (Session["Sess_PicPath"] == null) { Session["Sess_PicPath"] = "DefaultPerson.jpg"; }
                    if (Result[0].ID_Role != 3)
                    { return Redirect("/AdminPart/CMSHome"); }
                    else
                    {

                        return Redirect("/");
                    }

                }
            }else
            {
                Session["Sess_Msg"] = "نام گاربری شما در حال حاضر تایید نشده است ";
                return Redirect("/Login");
            
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