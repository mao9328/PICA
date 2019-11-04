using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Identity
{
	public class Role
	{

		public Role()
		{
			this.UserRoles = new HashSet<UserRole>();
		}

		public int Id { get; set; }
		public string Name { get; set; }

		public ICollection<UserRole> UserRoles { get; set; }
	}
}
