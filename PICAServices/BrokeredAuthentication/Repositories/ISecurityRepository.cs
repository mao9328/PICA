using BrokeredAuthentication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Repositories
{
	public interface ISecurityRepository
	{
		Task<bool> ValidateCredentials(LoginModel model);

		Task<UserModel> GetUserByEmail(string userName);

		Task<bool> CreateUser(UserModel model);
	}
}
