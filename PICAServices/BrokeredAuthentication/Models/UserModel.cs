using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Models
{
	public class UserModel
	{
		public int Id { get; set; }
		public string Email { get; set; }		
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public List<RoleModel> Roles { get; set; }
	}
}
