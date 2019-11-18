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

		public async Task<UserModel> GetUserByEmail(string userName)
		{
			var result = await context.Users.Include(x => x.UserRoles).SingleAsync(x => x.Email.Equals(userName));

			return new UserModel()
			{
				Email = result.Email,				
				Roles = result.UserRoles.Select(x => new RoleModel()
				{
					Id = x.RoleId
				}).ToList()
			};
		}

		public async Task<bool> ValidateCredentials(LoginModel model)
		{
			return await context.Users.Where(x => x.Email.Equals(model.User) && x.Password.Equals(model.Password)).CountAsync() > 0;
		}

		public async Task<bool> CreateUser(UserModel model)
		{
			if (await context.Users.AnyAsync(x => x.Email.Equals(model.Email)))
			{
				throw new ApplicationException($"Ya existe un usuario con el email {model.Email}");
			}

			await context.Users.AddAsync(new User()
			{
				Email = model.Email,				
				Password = model.Password
			});

			return await context.SaveChangesAsync() > 0;
		}
	}
}
