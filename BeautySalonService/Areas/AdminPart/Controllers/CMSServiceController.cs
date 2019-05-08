using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
using System.IO;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSServiceController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSService
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetServiceWithPage(int CurrentPage, int PageSize)
        {
            int skip = PageSize * (CurrentPage - 1);
            var Result = DB.Usp_GetAllServices().ToList()
           .OrderByDescending(item => item.ID)
           .Skip(skip)
           .Take(PageSize);


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }


        public JsonResult GetSalonsOfService(int CurrentPage, int PageSize, int ID_Service)
        {
            int skip = PageSize * (CurrentPage - 1);
            var Result = DB.Usp_GetSalonsOfService(ID_Service).ToList()
           .OrderByDescending(item => item.ID_Salon)
           .Skip(skip)
           .Take(PageSize);


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }


        public JsonResult SaveService(Service ObjService)
        {
            try
            {

                DB.Service.Add(ObjService);

                DB.SaveChanges();
                return Json(ObjService.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

        public JsonResult DeleteService(int ID)
        {
            try
            {
                var Result = DB.Service.SingleOrDefault(Item => Item.ID == ID);
                var PicResult = DB.Picture.SingleOrDefault(Item => Item.ID == Result.ID_Pic);
                System.IO.File.Delete(Server.MapPath("~/FileArchives/Service/" + PicResult.PicturePath));
                DB.Picture.Remove(PicResult);
                DB.Service.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult UpdateService(Service ObjService)
        {
            try
            {
                var Result = DB.Service.Where(item => item.ID == ObjService.ID).ToList();
                Result[0].Name = ObjService.Name;
                Result[0].ID_Article = ObjService.ID_Article;
              

                DB.SaveChanges();



                return Json(ObjService.ID , JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }


        public void GetServiceImageFile(int ID)
        {
            string ImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchives/Service/");
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

                CommonFunction.HandleImageUpload(fileData, FinalPath, (int)CommonFunction.En_ImageSize.ServiceWidth, (int)CommonFunction.En_ImageSize.ServiceHeight);

                //
                ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


                if (ImageFileUrl.Length > 0)
                {
                    DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "Service", iD_Main: ID,iD_Main2:0);


                    DB.SaveChanges();

                }

            }


        }



    }
}