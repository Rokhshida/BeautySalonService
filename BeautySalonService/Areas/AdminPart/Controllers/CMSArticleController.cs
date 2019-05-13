using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSArticleController : Controller
    {
        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSArticle
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public JsonResult GetA_Article(int ID)
        {
            try
            {
                Article Result = DB.Article.Where(item => item.ID == ID).SingleOrDefault();

                return Json(Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }
        public JsonResult GetArticleWithPage(int PageNum, int PageSize)
        {
            int skip = PageSize * (PageNum - 1);
            var Result = DB.Usp_GetArticles().ToList()
           .OrderByDescending(item => item.ID)
           .Skip(skip)
           .Take(PageSize);


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }



        public JsonResult GetArticles()
        {

            var Result = DB.Article.ToList();
           


            var jsonResult = Json(Result, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;


        }
        [ValidateInput(false)]
        public JsonResult SaveArticle(Article ObjArticle)
        {
            try
            {
                ObjArticle.ID_Person = (int)Session["Sess_IDPerson"];
                ObjArticle.CreatedDate = CommonFunction.GetDateNow();
                ObjArticle.ModifiedDate = CommonFunction.GetDateNow();
                DB.Article.Add(ObjArticle);

                DB.SaveChanges();
                return Json(ObjArticle.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

        public JsonResult DeleteArticle(int ID)
        {
            try
            {
                var Result = DB.Article.SingleOrDefault(Item => Item.ID == ID);
                DB.Article.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }
        [ValidateInput(false)]
        public JsonResult UpdateArticle(Article ObjArticle)
        {
            try
            {
                var Result = DB.Article.Where(item => item.ID == ObjArticle.ID).ToList();
                Result[0].ID_Person = (int)Session["Sess_IDPerson"];
                Result[0].SiteContent = ObjArticle.SiteContent;
                Result[0].Title = ObjArticle.Title;
                Result[0].ModifiedDate = CommonFunction.GetDateNow();
                DB.SaveChanges();



                return Json(ObjArticle.ID, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }


        //public void GetServiceImageFile(int ID)
        //{
        //    string ImageFileUrl = "";

        //    string SaveLocation = Server.MapPath("~/FileArchives/Article/");
        //    String CurrentDate = DateTime.Now.ToString("dd/MM/yyyy").Replace("/", "-");
        //    foreach (string item in Request.Files)
        //    {

        //        var Filename = Request.Files[item].FileName;
        //        var DotPos = Filename.LastIndexOf(".");
        //        var FileameWithoutExtension = Filename.Substring(0, DotPos);
        //        var FileExtension = Filename.Substring(DotPos);
        //        var CurrentTime = DateTime.Now.Hour + "_" + DateTime.Now.Minute;

        //        var FinalPath = SaveLocation + FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;
        //        Request.Files[item].SaveAs(FinalPath);
        //        ImageFileUrl = FileameWithoutExtension + "_" + CurrentDate + "_" + CurrentTime + FileExtension;


        //        if (ImageFileUrl.Length > 0)
        //        {
        //            DB.Usp_InsertPic(picPath: ImageFileUrl, tableName: "Article", iD_Main: ID, iD_Main2: 0);


        //            DB.SaveChanges();

        //        }

        //    }


        //}
    }
}