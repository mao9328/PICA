using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BrokeredAuthentication.Models
{
	public class ResponseModel<T>
	{		
		public T Result { get; set; }
		public string Message { get; set; } = "";
	}
}
