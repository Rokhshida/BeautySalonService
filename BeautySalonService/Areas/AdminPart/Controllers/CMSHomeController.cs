using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CMSHomeController : Controller
    {
        // GET: AdminPart/CMSHome
        public ActionResult Index()
        {
            return View();
        }
    }
}