using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
using System.IO;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSSalonController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSSalon
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult IndexSalonService()
        {
            return View();
        }

        public JsonResult GetSalonWithPage(int CurrentPage, int PageSize)
        {
            int skip = PageSize * (CurrentPage - 1);
            var Result = DB.Usp_GetAllSalon().ToList()
           .OrderByDescending(item => item.ID)
           .Skip(skip)
           .Take(PageSize);


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }
         [ValidateInput(false)]
        public JsonResult SaveSalon(Salon  ObjSalon)
        {
            try
            {
                ObjSalon.CreatedDate = CommonFunction.GetDateNow();
                ObjSalon.ModifiedDate = CommonFunction.GetDateNow();
                DB.Salon.Add(ObjSalon);

                DB.SaveChanges();
                return Json(ObjSalon.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

        public JsonResult DeleteSalon(int ID)
        {
            try
            {
                var Result = DB.Salon.SingleOrDefault(Item => Item.ID == ID);
                var PicResult = DB.Picture.SingleOrDefault(Item => Item.ID == Result.ID_pic);
                System.IO.File.Delete(Server.MapPath("~/FileArchives/Salon/" + PicResult.PicturePath));
                DB.Picture.Remove(PicResult);
                DB.Salon.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult DeleteSalonPic(int ID)
        {
            try
            {
                var Result = DB.Salon.SingleOrDefault(Item => Item.ID == ID);
                var PicResult = DB.Picture.SingleOrDefault(Item => Item.ID == Result.ID_pic);
                System.IO.File.Delete(Server.MapPath("~/FileArchives/Salon/" + PicResult.PicturePath));
                DB.Picture.Remove(PicResult);
               
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

         [ValidateInput(false)]
        public JsonResult UpdateSalon(Salon ObjSalon)
        {
            try
            {
                var Result = DB.Salon.Where(item => item.ID == ObjSalon.ID).ToList();
                Result[0].Address = ObjSalon.Address;
                Result[0].Description = ObjSalon.Description;
                Result[0].ID_City = ObjSalon.ID_City;
                Result[0].ID_Manager = ObjSalon.ID_Manager;
                Result[0].Location = ObjSalon.Location;
                Result[0].Name = ObjSalon.Name;
                Result[0].Phone = ObjSalon.Phone;
                Result[0].Sex = ObjSalon.Sex;
                Result[0].ModifiedDate = CommonFunction.GetDateNow();
                DB.SaveChanges();



                return Json(ObjSalon.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }


        public void GetSalonImageFile(int ID)
        {
            string ImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchives/Salon/");
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

                CommonFunction.HandleImageUpload(fileData, FinalPath, (int)CommonFunction.En_ImageSize.SalonWidth, (int)CommonFunction.En_ImageSize.SalonHeight);

                //

                ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


                if (ImageFileUrl.Length > 0)
                {
                    DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "Salon", iD_Main: ID,iD_Main2:0);
                   

                    DB.SaveChanges();

                }

            }
           

        }




        //for set service of a salon
        public JsonResult GetServiceOfSalon(int CurrentPage, int PageSize, int ID_Salon)
        {
            int skip = PageSize * (CurrentPage - 1);
            var Result = DB.Usp_GetServicesOfSalon(ID_Salon).ToList()
           .OrderByDescending(item => item.ID_Service)
           .Skip(skip)
           .Take(PageSize);


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }
         [ValidateInput(false)]

        public JsonResult SaveSalon_Service(SalonService ObjSalonService)
        {
            try
            {
                ObjSalonService.CreatedDate = CommonFunction.GetDateNow();
                ObjSalonService.ModifiedDate = CommonFunction.GetDateNow();

                DB.SalonService.Add(ObjSalonService);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }




        public JsonResult DeleteSalonService(int ID_Salon,int ID_Service)
        {
            try
            {
                var Result = DB.SalonService.SingleOrDefault(Item => Item.ID_Salon == ID_Salon && 
                Item.ID_Service == ID_Service);
                DB.SalonService.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }
         [ValidateInput(false)]
        public JsonResult UpdateSalonService(SalonService ObjSalonService)
        {
            try
            {
                var Result = DB.SalonService.Where(Item => Item.ID_Salon == ObjSalonService.ID_Salon &&
                Item.ID_Service == ObjSalonService.ID_Service).ToList();
                Result[0].Comment = ObjSalonService.Comment;
                Result[0].ModifiedDate = CommonFunction.GetDateNow();

                DB.SaveChanges();



                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }

        public void GetSalonServiceImageFile(int ID_Salon,int ID_Service)
        {
            string ImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchives/SalonService/");
            String CurrentDate = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "-");
            foreach (string item in Request.Files)
            {

                var Filename = Request.Files[item].FileName;
                var DotPos = Filename.LastIndexOf(".");
                var FileameWithoutExtension = Filename.Substring(0, DotPos);
                var FileExtension = Filename.Substring(DotPos);
                var CurrentTime = DateTime.Now.Hour + "_" + DateTime.Now.Minute;

                var FinalPath = SaveLocation + FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;
                Request.Files[item].SaveAs(FinalPath);
                ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


                if (ImageFileUrl.Length > 0)
                {
                    DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "SalonService", iD_Main: ID_Salon, iD_Main2: ID_Service);


                    DB.SaveChanges();

                }

            }


        }

    }
}