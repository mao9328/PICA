using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
	public class SecurityDbContextSeed
	{
		public static async Task SeedAsync(SecurityDbContext context)
		{
			int count = await context.Roles.CountAsync();

			if (count == 0)
			{
				using (var transaction = context.Database.BeginTransaction())
				{
					var roles = new List<Role>(){
						new Role(){ Name = "PRODUCTOS_CONSULTA" },
						new Role(){ Name = "PRODUCTOS_ADMON" },
						new Role(){ Name = "CAMPANAS" },
						new Role(){ Name = "ORDENES_CONSULTA" },
						new Role(){ Name = "ORDENES_ADMON" },
						new Role(){ Name = "CLIENTES_CONSULTA" },
						new Role(){ Name = "CLIENTES_ADMON" }
					};

					await context.Roles.AddRangeAsync(roles);

					await context.SaveChangesAsync();

					transaction.Commit();
				}
			}

			int countUsers = await context.Users.CountAsync();

			if (countUsers == 0)
			{
				using (var transaction = context.Database.BeginTransaction())
				{
					var users = new List<User>() {
					new User { Email = "camacho.mauricio@javeriana.edu.co", LastName = "Camacho", FirstName = "Mauricio", Password = "Pruebas123*" },
					new User { Email = "murcia.juan@javeriana.edu.co", LastName = "Murcia", FirstName = "Juan", Password = "Pruebas123*" },
					new User { Email = "leonardo-jurado@javeriana.edu.co", LastName = "Jurado", FirstName = "Leonardo", Password = "Pruebas123*" },
					new User { Email = "ce.castrol@javeriana.edu.co", LastName = "Castro", FirstName = "Cristian", Password = "Pruebas123*" },
					new User { Email = "elkin_torres@javeriana.edu.co", LastName = "Torres", FirstName = "Elkin", Password = "Pruebas123*" }
				};

					await context.Users.AddRangeAsync(users);

					await context.SaveChangesAsync();

					transaction.Commit();
				}
			}
		}
	}
}