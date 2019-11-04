using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrokeredAuthentication.Models;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace BrokeredAuthentication.Repositories
{
	public class SecurityRepository : BaseRepository, ISecurityRepository
	{
		public SecurityRepository(SecurityDbContext context) : base(context)
		{

		}

		public async Task<UserModel> GetUserByUserName(string userName)
		{
			var result = await context.Users.SingleAsync(x => x.Email.Equals(userName));

			return new UserModel()
			{
				Email = result.Email,
				FirstName = result.FirstName,
				LastName = result.LastName,
				Roles = result.UserRoles.Select(x => new RoleModel()
				{
					Id = x.Role.Id,
					Name = x.Role.Name
				}).ToList()
			};
		}

		public async Task<bool> ValidateCredentials(LoginModel model)
		{
			return await context.Users.Where(x => x.Email.Equals(model.User) && x.Password.Equals(model.Password)).CountAsync() > 0;
		}
	}
}
