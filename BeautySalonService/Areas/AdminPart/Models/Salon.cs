//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BeautySalonService.Areas.AdminPart.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Salon
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public Nullable<int> ID_City { get; set; }
        public string Address { get; set; }
        public System.Data.Entity.Spatial.DbGeometry Location { get; set; }
        public string Phone { get; set; }
        public Nullable<bool> Sex { get; set; }
        public string Description { get; set; }
        public Nullable<int> ID_Manager { get; set; }
        public byte[] IntroductionPic { get; set; }
        public Nullable<int> ID_pic { get; set; }
        public string CreatedDate { get; set; }
        public string ModifiedDate { get; set; }
        public Nullable<byte> status { get; set; }
    }
}
