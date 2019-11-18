using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
	public class SecurityDbContext : DbContext
	{
		public SecurityDbContext(DbContextOptions<SecurityDbContext> options) : base(options)
		{

		}

		public DbSet<User> Users { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			//Write Fluent API configurations here

			//Property Configurations
			modelBuilder.Entity<UserRole>().HasKey(x => new { x.UserId, x.RoleId });

			modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
		}
	}
}
