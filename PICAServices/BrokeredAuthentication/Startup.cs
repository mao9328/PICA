using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrokeredAuthentication.Repositories;
using BrokeredAuthentication.Services;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.OpenApi.Models;

namespace BrokeredAuthentication
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			string connection = Configuration.GetConnectionString("dev");

			services.AddDbContext<SecurityDbContext>(options => options.UseSqlServer(connection));

			services.AddScoped<ISecurityRepository, SecurityRepository>();

			services.AddScoped<ISecurityService, SecurityService>();

			services.Configure<IISServerOptions>(options =>
			{
				options.AutomaticAuthentication = false;
			});

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo { Title = "KallSony's BrokeredAuthentication", Version = "v1" });
			});

			services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseSwagger();

			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
			});

			app.UseRouting();

			app.UseAuthorization();

			app.UseCors(options => options.WithOrigins("*").AllowAnyMethod());

			app.UseEndpoints(endpoints =>
			{

				endpoints.MapControllers().RequireCors("OpenLegs");
			});
		}
	}
}
