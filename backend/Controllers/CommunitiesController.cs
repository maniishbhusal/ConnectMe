using backend.Context;
using backend.Models.Domain;
using backend.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommunitiesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public CommunitiesController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // POST: api/communities
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCommunity([FromBody] CommunityCreationDto dto)
        {
            try
            {
                var userId = User.FindFirstValue("UserID");
                if (userId == null)
                    return Unauthorized();

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                    return NotFound("User not found");

                var community = new Community
                {
                    Id = Guid.NewGuid(),
                    Name = dto.Name,
                    Description = dto.Description,
                    ProfileImageUrl = dto.ProfileImageUrl,
                    CreatedBy = userId,
                    CreatedByUser = user,
                    DateCreated = DateTime.UtcNow
                };

                _context.Communities.Add(community);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCommunityById), new { id = community.Id }, community);
            }
            catch (DbUpdateException ex)
            {
                // Handle specific exceptions related to database updates
                return Conflict("A community with this name already exists.");
            }
            catch (Exception ex)
            {
                // Handle any other unexpected exceptions
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while creating the community.");
            }
        }

        // GET: api/communities/{id}
        [HttpGet("{id}")]
        [AllowAnonymous] // Publicly accessible
        public async Task<IActionResult> GetCommunityById(Guid id)
        {
            var community = await _context.Communities.FindAsync(id);
            if (community == null) return NotFound();

            return Ok(community);
        }
    }
}
