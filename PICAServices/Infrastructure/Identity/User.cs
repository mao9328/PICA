using System.Collections.Generic;

namespace Infrastructure.Identity
{
	public class User
	{
		public User()
		{
			UserRoles = new HashSet<UserRole>();
		}

		public int Id { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public ICollection<UserRole> UserRoles { get; set; }

	}
}
