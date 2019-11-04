using Infrastructure.Identity;

namespace BrokeredAuthentication.Repositories
{
	public abstract class BaseRepository
	{
		protected readonly SecurityDbContext context;

		public BaseRepository(SecurityDbContext _context)
		{
			context = _context;
		}
	}
}
