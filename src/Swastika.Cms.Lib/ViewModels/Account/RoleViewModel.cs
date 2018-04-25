﻿using System;
using Swastika.Domain.Data.ViewModels;
using Microsoft.EntityFrameworkCore.Storage;
using Newtonsoft.Json;
using Swastika.Cms.Lib.Models.Cms;
using Swastika.Cms.Lib.Models.Account;
using System.Collections.Generic;
using Swastika.Cms.Lib.ViewModels.Account;
using Swastika.Identity.Models.AccountViewModels;

namespace Swastika.Cms.Lib.ViewModels.BackEnd
{
    public class RoleViewModel
        : ViewModelBase<SiocCmsAccountContext, AspNetRoles, RoleViewModel>
    {
        #region Properties

        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("concurrencyStamp")]
        public string ConcurrencyStamp { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("normalizedName")]
        public string NormalizedName { get; set; }
        #region Models

        #endregion

        #region Views

        #endregion
        #endregion

        #region Contructors

        public RoleViewModel() : base()
        {
        }

        public RoleViewModel(AspNetRoles model, SiocCmsAccountContext _context = null, IDbContextTransaction _transaction = null)
            : base(model, _context, _transaction)
        {
        }

        #endregion

        #region Overrides

        #endregion

        #region Expands

        #endregion

    }
}
