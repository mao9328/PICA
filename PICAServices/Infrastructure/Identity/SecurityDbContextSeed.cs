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
					context.Database.ExecuteSqlRaw("DBCC CHECKIDENT('dbo.Roles', RESEED, 1)");
					context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Roles ON");

					var roles = new List<Role>(){
						new Role(){Id= 1, Name = "PRODUCTOS_CONSULTA" },
						new Role(){Id= 2, Name = "PRODUCTOS_ADMON" },
						new Role(){Id= 3, Name = "CAMPANAS" },
						new Role(){Id= 4, Name = "ORDENES_CONSULTA" },
						new Role(){Id= 5, Name = "ORDENES_ADMON" },
						new Role(){Id= 6, Name = "CLIENTES_CONSULTA" },
						new Role(){Id= 7, Name = "CLIENTES_ADMON" }
					};

					await context.Roles.AddRangeAsync(roles);

					await context.SaveChangesAsync();

					context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT Roles OFF");

					transaction.Commit();
				}
			}

			int countUsers = await context.Users.CountAsync();

			if (countUsers == 0)
			{
				using (var transaction = context.Database.BeginTransaction())
				{
					var users = new List<User>() {
					new User {
						Email = "camacho.mauricio@javeriana.edu.co",
						LastName = "Camacho",
						FirstName = "Mauricio",
						Password = "Pruebas123*",
						UserRoles = new List<UserRole>(){
							new UserRole(){
								RoleId = 1
							},
							new UserRole(){
								RoleId = 2
							},
							new UserRole(){
								RoleId = 3
							},
							new UserRole(){
								RoleId = 4
							}
						}
					},
					new User {
					  Email = "murcia.juan@javeriana.edu.co",
					  LastName = "Murcia",
					  FirstName = "Juan",
					  Password = "Pruebas123*",
					  UserRoles = new List<UserRole>(){
							new UserRole(){
								RoleId = 1
							},
							new UserRole(){
								RoleId = 2
							},
							new UserRole(){
								RoleId = 3
							},
							new UserRole(){
								RoleId = 4
							}
						}
					 },
					new User {
					  Email = "leonardo-jurado@javeriana.edu.co",
					  LastName = "Jurado",
					  FirstName = "Leonardo",
					  Password = "Pruebas123*",
					  UserRoles = new List<UserRole>(){
							new UserRole(){
								RoleId = 1
							},
							new UserRole(){
								RoleId = 2
							},
							new UserRole(){
								RoleId = 3
							},
							new UserRole(){
								RoleId = 4
							}
						}
					 },
					new User {
					  Email = "ce.castrol@javeriana.edu.co",
					  LastName = "Castro",
					  FirstName = "Cristian",
					  Password = "Pruebas123*",
					  UserRoles = new List<UserRole>(){
							new UserRole(){
								RoleId = 1
							},
							new UserRole(){
								RoleId = 2
							},
							new UserRole(){
								RoleId = 3
							},
							new UserRole(){
								RoleId = 4
							}
						}
					 },
					new User {
					  Email = "elkin_torres@javeriana.edu.co",
					  LastName = "Torres",
					  FirstName = "Elkin",
					  Password = "Pruebas123*",
					  UserRoles = new List<UserRole>(){
							new UserRole(){
								RoleId = 1
							},
							new UserRole(){
								RoleId = 2
							},
							new UserRole(){
								RoleId = 3
							},
							new UserRole(){
								RoleId = 4
							}
						}
					 }
				};

					await context.Users.AddRangeAsync(users);

					await context.SaveChangesAsync();

					transaction.Commit();
				}
			}
		}
	}
}