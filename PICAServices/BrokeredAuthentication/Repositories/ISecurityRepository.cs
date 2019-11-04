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

		Task<UserModel> GetUserByUserName(string userName);
	}
}
