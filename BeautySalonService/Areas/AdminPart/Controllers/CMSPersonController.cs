using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
using System.IO;

namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSPersonController : Controller
    {


        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSPerson
        public ActionResult Index()
        {
            return View();
        }

        public void SendMembershipEmail(Person ObjPerson)
        {
            try
            {
                EmailModel ObjEmail = new EmailModel();
                ObjEmail.To = ObjPerson.Email;
                ObjEmail.Subject = "Rokhshida Membership";
                ObjEmail.Body = "we are happy that you join us.";
                ObjEmail.Email = CommonFunction.Email_From;
                ObjEmail.Password = CommonFunction.Email_From_Password;


                ////admin manager role
                //if (ObjPerson.ID_Role == 2)
                //{
                //    ObjEmail.Subject = "عضویت شما به عنوان مدیر سالن در سایت رخشیدا";
                //    ObjEmail.Body = "عضویت شما با موفقیت انجام شد";

                //}
                //else if (ObjPerson.ID_Role == 3)
                //{
                //    ObjEmail.Subject = "عضویت شمادر سایت رخشیدا";
                //    ObjEmail.Body = "عضویت شما با موفقیت انجام شد";

                //}


                CommonFunction.SendEmailTo(ObjEmail);

            }
            catch (Exception Ex) { throw Ex; }
        }


        public JsonResult SavePerson(Person ObjPerson)
        {
            try
            {

                ObjPerson.password = CommonFunction.EncodePasswordToBase64(ObjPerson.password);
                ObjPerson.CreatedDate = CommonFunction.GetDateNow();
                ObjPerson.ModifiedDate = CommonFunction.GetDateNow();
                DB.Person.Add(ObjPerson);
                DB.SaveChanges();
                SendMembershipEmail(ObjPerson);
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }
        public JsonResult UpdatePerson(Person ObjPerson)
        {
            try
            {

                Person Result = DB.Person.Where(item => item.ID == ObjPerson.ID).SingleOrDefault();
                ObjPerson.ModifiedDate = CommonFunction.GetDateNow();
                Result = ObjPerson;

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }


        public JsonResult DeletePerson(int ID)
        {
            try
            {
                var Result = DB.Person.SingleOrDefault(Item => Item.ID == ID);
                DB.Person.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult GetPersonWithPage(int CurrentPage, int PageSize, string TxtPersonSearch)
        {
             try
            {

            int skip = PageSize * (CurrentPage - 1);

            var Result = DB.Usp_GetPerson(TxtPersonSearch).ToList()
           .OrderByDescending(item => item.ID)
           .Skip(skip)
           .Take(PageSize);
            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
            }
             catch (Exception EX) { throw EX; }
        }


        public void GetSiteSettingImageFiles(int ID)
        {
            string ImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchives/PersonImage/");
            String CurrentDate = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "-");
            foreach (string item in Request.Files)
            {

                var Filename = Request.Files[item].FileName;
                var DotPos = Filename.LastIndexOf(".");
                var FileameWithoutExtension = Filename.Substring(0, DotPos);
                var FileExtension = Filename.Substring(DotPos);
                var CurrentTime = DateTime.Now.Hour + "_" + DateTime.Now.Minute;

                var FinalPath = SaveLocation + FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;

                //Request.Files[item].SaveAs(FinalPath);

                //for resize
                byte[] fileData = null;
                using (var binaryReader = new BinaryReader(Request.Files[item].InputStream))
                {
                    fileData = binaryReader.ReadBytes(Request.Files[item].ContentLength);
                }

                CommonFunction.HandleImageUpload(fileData, FinalPath, (int)CommonFunction.En_ImageSize.PersonWidth , (int)CommonFunction.En_ImageSize.PersonHeight);

              ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


                if (ImageFileUrl.Length > 0)
                {
                    DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "Person", iD_Main: ID, iD_Main2: 0);
                    
                    DB.SaveChanges();

                }

            }
            

        }

    }
}