﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class BeautySalonEntities : DbContext
    {
        public BeautySalonEntities()
            : base("name=BeautySalonEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Article> Article { get; set; }
        public virtual DbSet<City> City { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<Picture> Picture { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Salon> Salon { get; set; }
        public virtual DbSet<SalonService> SalonService { get; set; }
        public virtual DbSet<SecurityQuestion> SecurityQuestion { get; set; }
        public virtual DbSet<Service> Service { get; set; }
        public virtual DbSet<SiteSetting> SiteSetting { get; set; }
        public virtual DbSet<UseType> UseType { get; set; }
        public virtual DbSet<SalonPhone> SalonPhone { get; set; }
    
        public virtual ObjectResult<Usp_CheckLogin_Result> Usp_CheckLogin(string username, string password)
        {
            var usernameParameter = username != null ?
                new ObjectParameter("username", username) :
                new ObjectParameter("username", typeof(string));
    
            var passwordParameter = password != null ?
                new ObjectParameter("password", password) :
                new ObjectParameter("password", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_CheckLogin_Result>("Usp_CheckLogin", usernameParameter, passwordParameter);
        }
    
        public virtual ObjectResult<Usp_GetAllSalon_Result> Usp_GetAllSalon()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetAllSalon_Result>("Usp_GetAllSalon");
        }
    
        public virtual ObjectResult<Usp_GetAllServices_Result> Usp_GetAllServices()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetAllServices_Result>("Usp_GetAllServices");
        }
    
        public virtual ObjectResult<Usp_GetArticles_Result> Usp_GetArticles()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetArticles_Result>("Usp_GetArticles");
        }
    
        public virtual ObjectResult<Usp_GetNewMessagesForPerson_Result> Usp_GetNewMessagesForPerson(Nullable<int> iD_Person_To)
        {
            var iD_Person_ToParameter = iD_Person_To.HasValue ?
                new ObjectParameter("ID_Person_To", iD_Person_To) :
                new ObjectParameter("ID_Person_To", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetNewMessagesForPerson_Result>("Usp_GetNewMessagesForPerson", iD_Person_ToParameter);
        }
    
        public virtual ObjectResult<Usp_GetPerson_Result> Usp_GetPerson(string searchText)
        {
            var searchTextParameter = searchText != null ?
                new ObjectParameter("SearchText", searchText) :
                new ObjectParameter("SearchText", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetPerson_Result>("Usp_GetPerson", searchTextParameter);
        }
    
        public virtual ObjectResult<Usp_GetSalonsOfService_Result> Usp_GetSalonsOfService(Nullable<int> iD_Service)
        {
            var iD_ServiceParameter = iD_Service.HasValue ?
                new ObjectParameter("ID_Service", iD_Service) :
                new ObjectParameter("ID_Service", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetSalonsOfService_Result>("Usp_GetSalonsOfService", iD_ServiceParameter);
        }
    
        public virtual ObjectResult<Usp_GetServicesOfSalon_Result> Usp_GetServicesOfSalon(Nullable<int> iD_Salon)
        {
            var iD_SalonParameter = iD_Salon.HasValue ?
                new ObjectParameter("ID_Salon", iD_Salon) :
                new ObjectParameter("ID_Salon", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetServicesOfSalon_Result>("Usp_GetServicesOfSalon", iD_SalonParameter);
        }
    
        public virtual ObjectResult<Usp_GetSiteSettingWithPicture_Result> Usp_GetSiteSettingWithPicture()
        {
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<Usp_GetSiteSettingWithPicture_Result>("Usp_GetSiteSettingWithPicture");
        }
    
        public virtual int Usp_InsertPic(string picPath, string tableName, Nullable<int> iD_Main, Nullable<int> iD_Main2)
        {
            var picPathParameter = picPath != null ?
                new ObjectParameter("PicPath", picPath) :
                new ObjectParameter("PicPath", typeof(string));
    
            var tableNameParameter = tableName != null ?
                new ObjectParameter("TableName", tableName) :
                new ObjectParameter("TableName", typeof(string));
    
            var iD_MainParameter = iD_Main.HasValue ?
                new ObjectParameter("ID_Main", iD_Main) :
                new ObjectParameter("ID_Main", typeof(int));
    
            var iD_Main2Parameter = iD_Main2.HasValue ?
                new ObjectParameter("ID_Main2", iD_Main2) :
                new ObjectParameter("ID_Main2", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Usp_InsertPic", picPathParameter, tableNameParameter, iD_MainParameter, iD_Main2Parameter);
        }
    
        public virtual ObjectResult<USp_GetArticlesOfPerson_Result> USp_GetArticlesOfPerson(Nullable<int> iD_Person)
        {
            var iD_PersonParameter = iD_Person.HasValue ?
                new ObjectParameter("ID_Person", iD_Person) :
                new ObjectParameter("ID_Person", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction<USp_GetArticlesOfPerson_Result>("USp_GetArticlesOfPerson", iD_PersonParameter);
        }
    }
}
