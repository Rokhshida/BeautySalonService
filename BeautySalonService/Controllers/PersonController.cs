using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeautySalonService.Controllers
{
    public class PersonController : Controller
    {
       
        // GET: Person
        public ActionResult Index()
        {
            Session["Sess_IDRole"] = 3;
            return View();
        }


        public ActionResult IndexSalonManager()
        {
            Session["Sess_IDRole"] = 2;
         
            return View();
        }

        public ActionResult ApproveMembership() 
        {
            return View();
        
        }

    }
}