using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrokeredAuthentication.Models;
using BrokeredAuthentication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BrokeredAuthentication.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{

		private readonly ILogger<UserController> _logger;
		private readonly ISecurityService securityService;

		public UserController(ILogger<UserController> logger, ISecurityService secService)
		{
			_logger = logger;
			securityService = secService;
		}

		/// <response code="200">Autorize ok</response>
		/// <response code="400">Datos no validos o internal server error</response> 
		[HttpPost]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest, StatusCode = 400, Type = typeof(ResponseModel<bool>))]
		public async Task<ActionResult<ResponseModel<bool>>> Create(UserModel model)
		{
			try
			{
				if (!ModelState.IsValid)
				{
					throw new ApplicationException($"Datos no validos, { JsonConvert.SerializeObject(ModelState.Values.Select(x => x.Errors).ToList())}");
				}

				return Ok(new ResponseModel<bool>() { Result = await securityService.CreateUser(model) });
			}
			catch (ApplicationException e)
			{
				return BadRequest(new ResponseModel<bool>()
				{
					Message = e.Message,
					Result = false
				});
			}
			catch (Exception e)
			{
				_logger.LogError(e.Message);
				return BadRequest(new ResponseModel<bool>()
				{
					Message = e.Message,
					Result = false
				});
			}
		}
	}
}