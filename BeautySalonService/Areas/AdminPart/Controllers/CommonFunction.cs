


﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Net;
using System.Net.Mail;
using BeautySalonService.Areas.AdminPart.Models;
using System.Globalization;
namespace BeautySalonService.Areas.AdminPart.Controllers
{
    public class CommonFunction
    {
       
     public  enum En_ImageSize
    {
        
        BannerWidth = 700,
        BannerHeight =800,
         PersonWidth=100,
         PersonHeight=100,
         SalonWidth=480,
         SalonHeight=600,
         ServiceWidth=300,
         ServiceHeight=300


    }

     //public static string Email_From = "heidarnezhada1@gmail.com";
     //public static string Email_From_Password = "125412541254@va@va@va";
     public static string Email_From = "beautySalon.Rokhshida@gmail.com";
     public static string Email_From_Password = "pari$a@v@1398";
    
//for encrypt
        public static string EncodePasswordToBase64(string password)
     {
         try
         {
             byte[] bytes = Encoding.Unicode.GetBytes(password);
             byte[] inArray = HashAlgorithm.Create("SHA1").ComputeHash(bytes);
             return Convert.ToBase64String(inArray);
         }
         catch (Exception Ex) { throw Ex; }
        }
//

        //for image

        private static  Image RezizeImage(Image img, int maxWidth, int maxHeight)
        {
            try { 
            if (img.Height < maxHeight && img.Width < maxWidth) return img;
            using (img)
            {
                Double xRatio = (double)img.Width / maxWidth;
                Double yRatio = (double)img.Height / maxHeight;
                Double ratio = Math.Max(xRatio, yRatio);
                int nnx = (int)Math.Floor(img.Width / ratio);
                int nny = (int)Math.Floor(img.Height / ratio);
                Bitmap cpy = new Bitmap(nnx, nny, PixelFormat.Format32bppArgb);
                using (Graphics gr = Graphics.FromImage(cpy))
                {
                    gr.Clear(Color.Transparent);

                    // This is said to give best quality when resizing images
                    gr.InterpolationMode = InterpolationMode.HighQualityBicubic;

                    gr.DrawImage(img,
                        new Rectangle(0, 0, nnx, nny),
                        new Rectangle(0, 0, img.Width, img.Height),
                        GraphicsUnit.Pixel);
                }
                return cpy;
            }
            }
            catch (Exception Ex) { throw Ex; }  
        }




        private static MemoryStream BytearrayToStream(byte[] arr)
        {
            try { 
            return new MemoryStream(arr, 0, arr.Length);
            }
            catch (Exception Ex) { throw Ex; }
        }

        public static void HandleImageUpload(byte[] binaryImage, string path, int maxWidth, int maxHeight)
        {
            try { 
            Image img = RezizeImage(Image.FromStream(BytearrayToStream(binaryImage)),maxWidth, maxHeight);
            img.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);
            }
            catch (Exception Ex) { throw Ex; }
        }



        public static void SendEmailTo(EmailModel model)
        {

            try { 

            using (MailMessage mm = new MailMessage(model.Email, model.To))
            {

                mm.Subject = model.Subject;

                mm.Body = model.Body;
                if (model.Attachment != null)
                {
                    if (model.Attachment.ContentLength > 0)
                    {

                        string fileName = Path.GetFileName(model.Attachment.FileName);

                        mm.Attachments.Add(new Attachment(model.Attachment.InputStream, fileName));

                    }

                }

                mm.IsBodyHtml = false;

                using (SmtpClient smtp = new SmtpClient())
                {

                    smtp.Host = "smtp.gmail.com";

                    smtp.EnableSsl = true;

                    NetworkCredential NetworkCred = new NetworkCredential(model.Email, model.Password);

                    smtp.UseDefaultCredentials = false;

                    smtp.Credentials = NetworkCred;

                    smtp.Port = 587;

                    smtp.Send(mm);

                   

                }

            }
            }
            catch (Exception Ex) { throw Ex; }

        }

        public static string GetDateNow() {

            try {
                PersianCalendar Cal = new PersianCalendar();
                string StrMonth;
                string StrDay;
                if (Cal.GetDayOfMonth(DateTime.Now).ToString().Length == 1) StrDay = "0" + Cal.GetDayOfMonth(DateTime.Now).ToString(); else StrDay = Cal.GetDayOfMonth(DateTime.Now).ToString();
                if (Cal.GetMonth(DateTime.Now).ToString().Length == 1) StrMonth = "0" + Cal.GetMonth(DateTime.Now).ToString(); else StrMonth = Cal.GetMonth(DateTime.Now).ToString();
                return Cal.GetYear(DateTime.Now).ToString() +"/" +StrMonth +"/" +StrDay;

            }
            catch (Exception Ex) { throw Ex; }
        }
        
    

    }

}


//

//for email



//
//for resize

//for resize


//instead of Request.Files[item].SaveAs(FinalPath);
//write this:

//   //for resize
//                byte[] fileData = null;
//                using (var binaryReader = new BinaryReader(Request.Files[item].InputStream))
//                {
//                    fileData = binaryReader.ReadBytes(Request.Files[item].ContentLength);
//                }

//                HandleImageUpload(fileData, FinalPath);

//                //
