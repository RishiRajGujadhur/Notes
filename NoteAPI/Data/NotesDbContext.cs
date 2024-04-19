using Microsoft.EntityFrameworkCore; 

namespace NoteAPI.Data
{
	public class NotesDbContext : DbContext
	{
		public DbSet<Note> Notes { get; set; }

        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {
        }
    }
}