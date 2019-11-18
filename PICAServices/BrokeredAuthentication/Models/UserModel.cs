using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Models
{
	public class UserModel
	{
		public int Id { get; set; }

		[Required]
		[EmailAddress(ErrorMessage = "El email no es valido")]
		public string Email { get; set; }

		public string Password { get; set; }

		public List<RoleModel> Roles { get; set; }
	}
}
