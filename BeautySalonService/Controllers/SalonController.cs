using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeautySalonService.Controllers
{
    public class SalonController : Controller
    {
        
        // GET: Salon
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult IndexSalonForm() {


            return View();
        }

        public ActionResult IndexAllSalon()
        {


            return View();
        }


      
    }
}