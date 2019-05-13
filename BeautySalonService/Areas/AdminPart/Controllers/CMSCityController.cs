using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;

namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSCityController : Controller
    {

        BeautySalonEntities DB = new BeautySalonEntities();

        // GET: AdminPart/CMSCity
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SaveCity(City ObjCity)
        {
            try
            {
                ObjCity.CreatedDate = CommonFunction.GetDateNow();
                ObjCity.ModifiedDate = CommonFunction.GetDateNow();
                DB.City.Add(ObjCity);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX)
            {


                throw EX;
            }

        }

        public JsonResult GetProvinceOfCity(int ID)
        {
            try
            {


                var Result = DB.City.Where(Item => Item.ID == ID).SingleOrDefault();
                var Jsonresult = Json(Result, JsonRequestBehavior.AllowGet);
               // Jsonresult.MaxJsonLength = int.MaxValue;
                return Jsonresult;
            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult GetCity(int ID_Province)
        {
            try
            {

                
                var Result = DB.City.Where(Item => Item.ID_Province == ID_Province).ToList();
                var Jsonresult = Json(Result, JsonRequestBehavior.AllowGet);
                Jsonresult.MaxJsonLength = int.MaxValue;
                return Jsonresult;
            }
            catch (Exception EX) { throw EX; }
        }
        public JsonResult GetCityPaging(int PageNum, int PageSize, int ID_Province)
        {
            try
            {

                int skip = PageSize * (PageNum - 1);
                var Result = DB.City.Where(Item => Item.ID_Province == ID_Province).ToList()
                    .OrderBy(item => item.Name)
                    .Skip(skip)
                    .Take(PageSize);
                var Jsonresult = Json(Result, JsonRequestBehavior.AllowGet);
                Jsonresult.MaxJsonLength = int.MaxValue;
                return Jsonresult;
            }
            catch (Exception EX) { throw EX; }
        }
        public JsonResult UpdateCity(City ObjCity)
        {
            try
            {


                var Result = DB.City.Where(Item => Item.ID == ObjCity.ID).SingleOrDefault();
                Result.ID_Province = ObjCity.ID_Province;
                Result.Name = ObjCity.Name;
                Result.ModifiedDate = CommonFunction.GetDateNow();
                return Json(Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }


        public JsonResult DeleteCity(int ID)
        {
            try
            {
                var Result = DB.City.Where(Item => Item.ID == ID).SingleOrDefault();
                DB.City.Remove(Result);
                DB.SaveChanges();

                return Json(Result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }

    }
}