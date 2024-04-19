using Microsoft.AspNetCore.Mvc;
using NoteAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace NoteAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _context;

        public NotesController(NotesDbContext context)
        {
            _context = context;
        }

        // GET: api/notes (Memory Matrix Retrieval) 
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotes()
        {
            return await _context.Notes.ToListAsync(); // Extract all imprints
        }

        // GET: api/notes/5 (Single Imprint Access)
        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound(); // Error: Imprint non-existent
            return note; // Imprint successfully acquired
        }

        // POST: api/notes (Mnemonic Encoding)
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(Note note)
        {
            _context.Notes.Add(note);
            await _context.SaveChangesAsync(); // Commit imprint to knowledge vault

            return CreatedAtAction("GetNote", new { id = note.Id }, note); // Imprint logged
        }

        // PUT: api/notes/5 (Mnemonic Modification)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(int id, Note note)
        {
            var initialNote = await _context.Notes.FindAsync(id);
            if (initialNote == null) return BadRequest(); // Error: Imprint non-existent 
            initialNote.Content = note.Content;
            initialNote.Title = note.Title;
            _context.Entry(initialNote).State = EntityState.Modified; // Flag imprint for revision
            await _context.SaveChangesAsync();  // Commit revision to knowledge vault

            return NoContent(); // Revision successful
        }

        // DELETE: api/notes/5 (Mnemonic Purge)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound(); // Error: Imprint non-existent

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync(); // Commit deletion 

            return NoContent(); // Purge successful
        }
    }
}