using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrokeredAuthentication.Models;
using BrokeredAuthentication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BrokeredAuthentication.Controllers
{
	[Produces("application/json")]
	[ApiController]
	[Route("api/[controller]")]
	public class SecurityController : ControllerBase
	{

		private readonly ILogger<SecurityController> _logger;
		private readonly ISecurityService securityService;

		public SecurityController(ILogger<SecurityController> logger, ISecurityService secService)
		{
			_logger = logger;
			securityService = secService;
		}

		/// <response code="200">Authentication ok</response>
		/// <response code="400">Invalid credentials o internal server error</response> 
		[HttpPost]
		[Route("Authenticate")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest, StatusCode = 400, Type = typeof(ResponseModel<string>))]
		public async Task<ActionResult<ResponseModel<string>>> Authenticate([FromBody]LoginModel model)
		{
			try
			{
				return Ok(new ResponseModel<string>() { Result = await securityService.Authenticate(model) });
			}
			catch (ApplicationException e)
			{
				return BadRequest(new ResponseModel<string>() { Message = e.Message });
			}
			catch (Exception e)
			{
				_logger.LogError(e.Message);

				return BadRequest(new ResponseModel<string>() { Message = e.Message });
			}
		}

		/// <response code="200">Autorize ok</response>
		/// <response code="400">Invalid token o internal server error</response> 
		[HttpPost]
		[Route("Autorize")]
		[ProducesResponseType(StatusCodes.Status200OK)]
		[ProducesResponseType(StatusCodes.Status400BadRequest, StatusCode = 400, Type = typeof(ResponseModel<bool>))]
		public async Task<ActionResult<ResponseModel<bool>>> Autorize(AutorizeModel model)
		{
			try
			{
				return Ok(new ResponseModel<bool>() { Result = await securityService.Autorize(model) });
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
