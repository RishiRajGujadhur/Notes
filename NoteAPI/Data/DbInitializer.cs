namespace NoteAPI.Data
{
    public class DbInitializer
    {
        private readonly NotesDbContext _context;

        public DbInitializer(NotesDbContext context)
        {
            _context = context;
        }

        public void Initialize()
        {
            _context.Database.EnsureCreated(); // Creates database if it doesn't exist 

            // Seed some initial data (optional)
            if (!_context.Notes.Any())
            {
                _context.Notes.Add(new Note { Title = "Sample Note 1", Content = "This is a sample" });
                _context.Notes.Add(new Note { Title = "Sample Note 2", Content = "Another note" });
                _context.SaveChanges();
            }
        }
    }
}
