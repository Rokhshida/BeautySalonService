using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
using System.IO;
using BeautySalonService.Areas.AdminPart.Controllers;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSSiteSettingController : Controller
    {

        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSSiteSetting
        public ActionResult Index()
        {
            return View();
        }



        public JsonResult GetSiteSetting(int ID_UseType)
        {
            try
            {

                var Result = DB.Usp_GetSiteSettingWithPicture().Where(item => item.ID_UseType == ID_UseType).ToList();
                if (ID_UseType != 1)
                {
                    return Json(Result[0], JsonRequestBehavior.AllowGet);
                }
                else { return Json(Result, JsonRequestBehavior.AllowGet); }


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult GetAllSiteSettingwithPage(int PageNum, int PageSize)
        {
            try
            {
                int skip = PageSize * (PageNum - 1);
                var Result = DB.Usp_GetSiteSettingWithPicture().ToList()
               .OrderByDescending(item => item.ID)
               .Skip(skip)
               .Take(PageSize);
                var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
                jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

               
            }
            catch (Exception EX) { throw EX; }
        }


        
      

        [ValidateInput(false)]
        public JsonResult SaveSiteSetting(SiteSetting ObjSiteSetting)
        {
            try
            {
                ObjSiteSetting.CreatedDate = CommonFunction.GetDateNow();
                ObjSiteSetting.ModifiedDate = CommonFunction.GetDateNow();

                DB.SiteSetting.Add(ObjSiteSetting);

                DB.SaveChanges();
                return Json(ObjSiteSetting.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }




        public JsonResult DeleteSiteSetting(int ID)
        {
            try
            {
                var Result = DB.SiteSetting.SingleOrDefault(Item => Item.ID == ID);
                var PicResult=DB.Picture.SingleOrDefault(Item=>Item.ID ==Result.ID_Pic);
               System.IO.File.Delete(Server.MapPath( "~/FileArchives/SiteSettingImage/"+PicResult.PicturePath));
                DB.Picture.Remove(PicResult);
                DB.SiteSetting.Remove(Result);
                DB.SaveChanges();
                

                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }


        public JsonResult DeleteSiteSettingPic(int ID)
        {
            try
            {
                var Result = DB.SiteSetting.SingleOrDefault(Item => Item.ID == ID);
                var PicResult = DB.Picture.SingleOrDefault(Item => Item.ID == Result.ID_Pic);
               
                System.IO.File.Delete(Server.MapPath("~/FileArchives/SiteSettingImage/" + PicResult.PicturePath));
                DB.Picture.Remove(PicResult);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        [ValidateInput(false)]

        public JsonResult UpdateSiteSetting(SiteSetting ObjSiteSetting)
        {
            try
            {
                var Result = DB.SiteSetting.Where(item => item.ID == ObjSiteSetting.ID).ToList();
                Result[0].Title = ObjSiteSetting.Title;
                Result[0].Comment = ObjSiteSetting.Comment;
                Result[0].ID_UseType = ObjSiteSetting.ID_UseType;
                Result[0].Link = ObjSiteSetting.Link;
                Result[0].SubTitle = ObjSiteSetting.SubTitle;
                Result[0].ModifiedDate = CommonFunction.GetDateNow();
                DB.SaveChanges();



                return Json(ObjSiteSetting.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }
        public void GetSiteSettingImageFiles(int ID)
        {


            string ImageFileUrl = "";

            string SaveLocation = Server.MapPath("~/FileArchives/SiteSettingImage/");
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

                CommonFunction.HandleImageUpload(fileData, FinalPath, (int)CommonFunction.En_ImageSize.BannerWidth, (int)CommonFunction.En_ImageSize.BannerHeight);

                //



                ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


                if (ImageFileUrl.Length > 0)
                {
                    DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "SiteSetting", iD_Main: ID,iD_Main2:0);
                    //Picture objpic = new Picture();
                    //objpic.PicturePath = ImageFileUrl;
                    //DB.Picture.Add(objpic);
                    //DB.SaveChanges();

                    //SiteSetting_Picture objSiteSetting_Pic = new SiteSetting_Picture();
                    //objSiteSetting_Pic.ID_SiteSetting = ID;
                    //objSiteSetting_Pic.ID_Picture = objpic.ID;
                    //objSiteSetting_Pic.UseType = 1;
                    //DB.SiteSetting_Picture.Add(objSiteSetting_Pic);

                    DB.SaveChanges();

                }

            }
            //2-Save Attach Files:
            //if (ArchPersonelImageFileUrl.Length > 0)
            //{


            //    Picture objpic = new Picture();
            //    objpic.PicturePath=ArchPersonelImageFileUrl;
            //    DB.Picture.Add(objpic);
            //    DB.SaveChanges();

            //    SiteSetting_Picture objSiteSetting_Pic = new SiteSetting_Picture();
            //    objSiteSetting_Pic.ID_SiteSetting = ID;
            //    objSiteSetting_Pic.ID_Picture =objpic.ID;
            //    objSiteSetting_Pic.UseType = 1;
            //    DB.SiteSetting_Picture.Add(objSiteSetting_Pic);

            //    DB.SaveChanges();

            //}


        }
    }
}