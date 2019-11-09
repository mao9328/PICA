using BrokeredAuthentication.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Services
{
	public interface ISecurityService
	{
		Task<string> Authenticate(LoginModel model);
		Task<bool> Autorize(AutorizeModel model);
	}
}
