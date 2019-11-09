using BrokeredAuthentication.Models;
using BrokeredAuthentication.Repositories;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Services
{
	public class SecurityService : ISecurityService
	{

		// Define const Key this should be private secret key  stored in some safe place
		private string key = "401b09eab3c013d4ca54922bb802bec8fd5318192b0a75f201d8b3727429090fb337591abd3e44453b954555b7a0812e1081c39b740293f765eae731f5a65ed1";

		private readonly ISecurityRepository rep;
		private readonly ILogger<SecurityService> _logger;

		public SecurityService(ISecurityRepository _rep, ILogger<SecurityService> logger)
		{
			rep = _rep;
			_logger = logger;
		}

		public async Task<string> Authenticate(LoginModel model)
		{

			bool flag = await rep.ValidateCredentials(model);

			if (!flag)
			{
				_logger.LogWarning("Credenciales invalidas");
				throw new ApplicationException("Credenciales invalidas");
			}

			var user = await rep.GetUserByUserName(model.User);

			// Create Security key  using private key above:
			// not that latest version of JWT using Microsoft namespace instead of System
			var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

			// Also note that securityKey length should be >256b
			// so you have to make sure that your private key has a proper length
			//
			var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

			//  Finally create a Token
			var header = new JwtHeader(credentials);

			//Some PayLoad that contain information about the  customer
			var payload = new JwtPayload("www.pica.com/abc-inc/brokeredauthentication", "www.pica.com/abc-inc/brokeredauthentication", new List<Claim>() { new Claim("sub", user.Email) }, DateTime.Now, DateTime.Now.AddHours(3), DateTime.Now);

			//
			var secToken = new JwtSecurityToken(header, payload);
			var handler = new JwtSecurityTokenHandler();

			// Token to String so you can use it in your client
			var tokenString = handler.WriteToken(secToken);

			return tokenString;
		}

		public async Task<bool> Autorize(AutorizeModel model)
		{
			try
			{
				SecurityToken validatedToken;

				var validations = new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
					ValidateIssuer = false,
					ValidateAudience = false
				};

				var handler = new JwtSecurityTokenHandler();
				// And finally when  you received token from client
				// you can  either validate it or try to  read		

				var claims = handler.ValidateToken(model.Token, validations, out validatedToken);

				if (!model.IdRol.HasValue)
				{
					return true;
				}

				var user = ((JwtSecurityToken)validatedToken).Subject;

				var userModel = await rep.GetUserByUserName(user);

				return userModel.Roles.Any(x => x.Id == model.IdRol);

			}
			catch (SecurityTokenException e)
			{
				_logger.LogWarning("Token no valido");
				throw new ApplicationException("Token no valido");
			}
			catch (ArgumentException ae)
			{
				_logger.LogWarning("Token no valido");
				throw new ApplicationException("Token no valido");
			}
			catch (Exception e)
			{
				_logger.LogError(e, "Error en la validacion del token");
				throw e;
			}
		}
	}
}
