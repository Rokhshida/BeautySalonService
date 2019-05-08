using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BeautySalonService.Areas.AdminPart.Models;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSMessageController : Controller
    {

        BeautySalonEntities DB = new BeautySalonEntities();
        // GET: AdminPart/CMSMessage
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetNewMessages(int IDPersonTo)
        {
            var Result = DB.Usp_GetNewMessagesForPerson(iD_Person_To: IDPersonTo).ToList();
            return Json(Result, JsonRequestBehavior.AllowGet);


        }

        public JsonResult GetNewMessagesCnt(int IDPersonTo)
        {
            int Result = DB.Message.Where(item => item.ID_Person_To == IDPersonTo && item.IsRead == false).Count();
            return Json(Result, JsonRequestBehavior.AllowGet);


        }



        public JsonResult SaveMessage(Message ObjMessage)
        {
            try
            {

                DB.Message.Add(ObjMessage);

                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }

        }

        public JsonResult DeleteMessage(int ID)
        {
            try
            {
                var Result = DB.Message.SingleOrDefault(Item => Item.ID == ID);
                DB.Message.Remove(Result);
                DB.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);


            }
            catch (Exception EX) { throw EX; }
        }

        public JsonResult UpdateMessage(Message ObjMessage)
        {
            try
            {
                var Result = DB.Message.Where(item => item.ID == ObjMessage.ID).ToList();
                Result[0].ID_Person_From = ObjMessage.ID_Person_From;
                Result[0].ID_Person_To = ObjMessage.ID_Person_To ;
                Result[0].IsRead = ObjMessage.IsRead;
                Result[0].MessageBody = ObjMessage.MessageBody;
                Result[0].MessageTitle = ObjMessage.MessageTitle;
                Result[0].ReadDate = ObjMessage.ReadDate;
                Result[0].SendDate = ObjMessage.SendDate;
   

                DB.SaveChanges();



                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception EX) { throw EX; }
        }
    }
}